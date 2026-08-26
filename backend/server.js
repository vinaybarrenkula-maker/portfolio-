require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const dns = require('dns');

// Force IPv4 DNS resolution order for Node.js to resolve potential IPv6 routing issues on cloud hosts
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

const Contact = require('./models/Contact');

const app = express();

// Trust reverse proxies (e.g. Render, Vercel) for accurate client IP rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
const mongoURI = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : null;

if (mongoURI) {
  mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error("MongoDB Connection Error:", err.message));
} else {
  console.warn("WARNING: MONGO_URI environment variable is not set on server.");
}

// In-Memory Simple Rate Limiter (Max 5 submissions per 10 minutes per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const isRateLimited = (ip) => {
    const now = Date.now();
    const userRecord = rateLimitMap.get(ip);

    if (!userRecord) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (now > userRecord.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    userRecord.count += 1;
    if (userRecord.count > MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    return false;
};

// Cleanup old rate limit records every 15 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
        if (now > record.resetTime) {
            rateLimitMap.delete(ip);
        }
    }
}, 15 * 60 * 1000);

// Initialize Resend client if API key is provided
let resendClient = null;
if (process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY.trim());
    console.log("✅ Resend API initialized for HTTPS email delivery.");
}

// Helper to create Nodemailer Transporter using IPv4 & Port 465 fallback
const getSmtpTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        family: 4,
        auth: {
            user: process.env.EMAIL_USER || 'vinaybarrenkula@gmail.com',
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000
    });
};

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Portfolio Backend API Running' });
});

app.post('/api/contact', async (req, res) => {
    try {
        // Rate Limiting Check
        const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (isRateLimited(clientIp)) {
            console.warn(`[RATE LIMIT EXCEEDED] IP: ${clientIp}`);
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later."
            });
        }

        let { name, email, message, inquiryType } = req.body;

        // Trim input fields
        name = typeof name === 'string' ? name.trim() : '';
        email = typeof email === 'string' ? email.trim() : '';
        message = typeof message === 'string' ? message.trim() : '';
        inquiryType = (inquiryType === 'Project' ? 'Project' : 'General');

        // Validation Rules
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || name.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid name (1-100 characters)."
            });
        }

        if (!email || !emailRegex.test(email) || email.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (!message || message.length > 5000) {
            return res.status(400).json({
                success: false,
                message: "Please enter a message (1-5000 characters)."
            });
        }

        // 1. Save to MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            try {
                const newContact = new Contact({ name, email, message });
                await newContact.save();
                console.log(`Saved contact entry for ${name} (${email}) to MongoDB.`);
            } catch (dbErr) {
                console.error("Database save warning:", dbErr.message);
            }
        }

        // 2. Email Delivery Logic
        const recipientEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_TO || 'vinaybarrenkula@gmail.com';
        const senderEmail = process.env.EMAIL_FROM || 'Portfolio Inquiry <onboarding@resend.dev>';
        const subject = `New Portfolio Inquiry [${inquiryType}]: ${name}`;
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #4f46e5;">New Inquiry from Portfolio Website</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Sender Email:</strong> ${email}</p>
                <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; white-space: pre-wrap;">
                    ${message}
                </div>
            </div>
        `;

        // Option A: Send via Resend HTTPS API (Recommended for Cloud Deployments)
        if (resendClient || process.env.RESEND_API_KEY) {
            try {
                const client = resendClient || new Resend(process.env.RESEND_API_KEY.trim());
                const resendResponse = await client.emails.send({
                    from: senderEmail,
                    to: [recipientEmail],
                    replyTo: email,
                    subject: subject,
                    html: htmlContent
                });

                if (resendResponse.error) {
                    console.error("❌ Resend API Error:", resendResponse.error);
                    throw new Error(resendResponse.error.message || "Resend API dispatch failed");
                }

                console.log(`✅ Email notification sent successfully via Resend HTTPS API to ${recipientEmail}`);
                return res.status(200).json({
                    success: true,
                    message: "Your message has been sent successfully."
                });
            } catch (resendErr) {
                console.error("❌ Resend delivery exception:", resendErr.message);
                return res.status(500).json({
                    success: false,
                    message: "Unable to send your message. Please try again."
                });
            }
        }

        // Option B: Fallback to Nodemailer SMTP
        if (process.env.EMAIL_PASS) {
            try {
                const mailTransporter = getSmtpTransporter();
                await mailTransporter.sendMail({
                    from: `"${name}" <${process.env.EMAIL_USER || 'vinaybarrenkula@gmail.com'}>`,
                    replyTo: email,
                    to: recipientEmail,
                    subject: subject,
                    html: htmlContent
                });

                console.log(`✅ Email notification sent successfully via Nodemailer SMTP to ${recipientEmail}`);
                return res.status(200).json({
                    success: true,
                    message: "Your message has been sent successfully."
                });
            } catch (smtpErr) {
                console.error("❌ Nodemailer SMTP send error:", smtpErr.message);
                return res.status(500).json({
                    success: false,
                    message: "Unable to send your message. Please try again."
                });
            }
        }

        // Option C: No email credentials configured
        console.error("⚠️ Email service is not configured. Missing RESEND_API_KEY or EMAIL_PASS in environment variables.");
        return res.status(500).json({
            success: false,
            message: "Email service is not configured. Please check RESEND_API_KEY."
        });

    } catch (error) {
        console.error("Contact form route exception:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to send your message. Please try again."
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
