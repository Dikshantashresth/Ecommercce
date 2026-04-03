'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '9779800000000';
const EMAIL = 'hello@inovate.com';

const serviceOptions = ['Instrumentation', 'Automation', 'Process Engineering', 'Electrical Engineering', 'Electronics Engineering', 'Maintenance & Support', 'Product Inquiry', 'Other'];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Quote Request: ${form.service}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputCls = "w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors";

  return (
    <section className="py-24 bg-gray-100 dark:bg-zinc-900/30 rounded-3xl border border-gray-200 dark:border-white/5" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full border border-teal-500/20 mb-4">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 dark:from-white to-gray-400 dark:to-zinc-400 bg-clip-text text-transparent mb-4">Contact Us</h2>
          <p className="text-gray-500 dark:text-zinc-400 max-w-lg mx-auto">Have a project in mind? Reach out and let&apos;s engineer something great together.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-white/5 rounded-2xl p-5 transition-transform duration-300 will-change-transform transform-gpu hover:scale-[1.02] group shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0"><Mail className="h-5 w-5 text-teal-500" /></div>
            <div><p className="text-sm text-gray-500 dark:text-zinc-500">Email Us</p><p className="text-gray-900 dark:text-white font-semibold group-hover:text-teal-500 transition-colors">{EMAIL}</p></div>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-white/5 rounded-2xl p-5 transition-transform duration-300 will-change-transform transform-gpu hover:scale-[1.02] group shadow-sm dark:shadow-none">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0"><MessageCircle className="h-5 w-5 text-emerald-500" /></div>
            <div><p className="text-sm text-gray-500 dark:text-zinc-500">WhatsApp</p><p className="text-gray-900 dark:text-white font-semibold group-hover:text-emerald-500 transition-colors">Chat with us</p></div>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-950/60 border border-gray-200 dark:border-white/5 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Request a Quote</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1.5">Name</label><input type="text" name="name" value={form.name} onChange={handleChange} required className={inputCls} placeholder="Your name" /></div>
            <div><label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1.5">Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required className={inputCls} placeholder="you@email.com" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1.5">Phone</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+977 9800000000" /></div>
            <div><label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1.5">Service Needed</label>
              <select name="service" value={form.service} onChange={handleChange} required className={`${inputCls} appearance-none cursor-pointer`}>
                <option value="" disabled>Select a service</option>
                {serviceOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
          </div>
          <div><label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1.5">Message</label><textarea name="message" value={form.message} onChange={handleChange} rows={4} required className={`${inputCls} resize-none`} placeholder="Tell us about your project..." /></div>
          <button type="submit" className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-8 rounded-xl transition-colors active:scale-[0.98]"><Send className="h-4 w-4" /><span>Send Quote Request</span></button>
        </form>
      </div>
    </section>
  );
}
