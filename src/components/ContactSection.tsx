import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playTechClick, playSuccessChime } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC + 5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    playTechClick(800);
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    playSuccessChime();
    fireConfetti();
    setFormSubmitted(true);

    // Auto open mailto with drafted message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Recruiter'}`);
    const body = encodeURIComponent(`${formData.message}\n\nSender Email: ${formData.email}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Initiate Direct Communication
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Actively open to Python Developer, DevOps/Cloud & Network Automation roles. Available for immediate interview discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live IST Time & Availability Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>LOCAL TIME (BANGALORE, INDIA):</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE NOW</span>
                </span>
              </div>
              <div className="text-2xl font-mono font-bold text-white tracking-tight">
                {currentTime || '11:15:00 AM IST'}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Based in Bangalore / Andhra Pradesh. Ready for in-office, hybrid, or remote opportunities.
              </p>
            </div>

            {/* Quick Action Channels */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">EMAIL</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-mono font-semibold text-white hover:text-cyan-400"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">PHONE / WHATSAPP</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-xs sm:text-sm font-mono font-semibold text-white hover:text-emerald-400"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTechClick(800)}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center space-x-2 text-xs font-mono text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTechClick(800)}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center space-x-2 text-xs font-mono text-slate-200 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Repos</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#070b18]/95 border border-cyan-500/30 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Send Direct Inquiry</span>
              </h3>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Inquiry Dispatched!</h4>
                  <p className="text-xs text-slate-300">
                    Your email client will open with the drafted message addressed to sivakumarannam143@gmail.com.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-mono text-cyan-400 hover:underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">YOUR NAME / COMPANY</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe / Tech Corp"
                        className="w-full bg-black/60 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">YOUR EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="recruiter@company.com"
                        className="w-full bg-black/60 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">MESSAGE DETAILS *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Siva, we are interested in discussing your Python automation / telecom telemetry experience for an opening..."
                      className="w-full bg-black/60 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Direct Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

