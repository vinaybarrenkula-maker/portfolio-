import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [inquiryType, setInquiryType] = useState<'General' | 'Project'>('General');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, inquiryType })
      });
      
      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setSuccessMessage(data?.message || 'Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(data?.message || data?.error || 'Unable to send your message. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Unable to connect to the server. Please check your internet connection.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-20 relative">
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Left Column: Contact info cards */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h3 className="text-3xl font-extrabold mb-4 leading-tight">
            Let's Collaborate <br />
            On Your Next <span className="text-gradient-indigo">MERN Project</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Seeking an energetic intern, full-time developer, or freelance collaborator? Drop me a line.
          </p>

          <div className="glass rounded-2xl p-6 border border-white/5 bg-black/10 flex items-center gap-4 hover:glow-accent transition-all duration-300">
            <div className="p-3 bg-indigo-500/15 text-indigo-400 rounded-xl">
              <FiMapPin size={22} />
            </div>
            <div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-semibold">Location</div>
              <div className="text-sm font-medium mt-0.5">Hyderabad, India</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5 bg-black/10 flex items-center gap-4 hover:glow-accent transition-all duration-300">
            <div className="p-3 bg-indigo-500/15 text-indigo-400 rounded-xl">
              <FiMail size={22} />
            </div>
            <div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-semibold">Email</div>
              <a href="mailto:vinaybarrenkula@gmail.com" className="text-sm font-medium mt-0.5 hover:text-indigo-300 transition-colors">vinaybarrenkula@gmail.com</a>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <a 
              href="https://github.com/vinaybarrenkula-maker" 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 glass rounded-2xl p-4 border border-white/5 bg-black/10 flex justify-center items-center gap-2 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FiGithub size={20} /> <span className="text-xs font-semibold uppercase tracking-wider">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/vinay-barrenkula-0a0b69354/" 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 glass rounded-2xl p-4 border border-white/5 bg-black/10 flex justify-center items-center gap-2 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FiLinkedin size={20} /> <span className="text-xs font-semibold uppercase tracking-wider">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 border border-white/5 bg-black/10"
          >
            {/* Inquiry Toggle */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5 mb-8 max-w-xs">
              {(['General', 'Project'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInquiryType(type)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    inquiryType === type 
                      ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' 
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {type} Inquiry
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.02] dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-indigo-500 focus:bg-white/[0.04] transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.02] dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-indigo-500 focus:bg-white/[0.04] transition-all"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="relative group">
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.02] dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-foreground focus:outline-none focus:border-indigo-500 focus:bg-white/[0.04] transition-all resize-none"
                  placeholder="Tell me about your project or offer..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs uppercase tracking-widest transition-all disabled:opacity-50 hover:glow-accent"
              >
                {status === 'loading' ? 'Sending Message...' : 'Send Inquiry'}
              </button>

              {status === 'success' && (
                <p className="text-emerald-400 text-xs font-semibold text-center mt-2">
                  ✓ {successMessage || "Your message has been sent successfully."}
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs font-semibold text-center mt-2">
                  ⚠️ {errorMessage || 'Unable to send your message. Please try again.'}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
