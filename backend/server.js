require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const Contact = require('./models/Contact');

const app = express();

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

// Nodemailer Transporter setup (for sending query emails)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'vinaybarrenkula@gmail.com',
    pass: process.env.EMAIL_PASS // App Password from Google Account
  }
});

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Portfolio Backend API Running' });
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message, inquiryType } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // 1. Save to MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            try {
                const newContact = new Contact({ name, email, message });
                await newContact.save();
            } catch (dbErr) {
                console.error("Database save warning:", dbErr.message);
            }
        }

        // 2. Send Email Notification if EMAIL_PASS is set
        if (process.env.EMAIL_PASS) {
            try {
                const mailOptions = {
                    from: `"${name}" <${email}>`,
                    to: process.env.EMAIL_TO || 'vinaybarrenkula@gmail.com',
                    subject: `New Portfolio Inquiry [${inquiryType || 'General'}]: ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h2 style="color: #4f46e5;">New Inquiry from Portfolio Website</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Sender Email:</strong> ${email}</p>
                            <p><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                            <p><strong>Message:</strong></p>
                            <div style="background: #f9fafb; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px;">
                                ${message.replace(/\n/g, '<br/>')}
                            </div>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log(`Email notification sent to ${process.env.EMAIL_TO || 'vinaybarrenkula@gmail.com'}`);
            } catch (mailErr) {
                console.error("Email send warning:", mailErr.message);
            }
        }

        res.status(201).json({ success: true, message: 'Inquiry received successfully!' });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ error: 'Server error while submitting inquiry.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
