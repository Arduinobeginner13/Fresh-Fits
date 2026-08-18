import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, ArrowRight, CheckCircle2, Send, Clock, MapPin } from 'lucide-react';

interface ContactSectionProps {
  onSchedulePickup: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSchedulePickup }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#003BEE] uppercase block mb-3">
              Campus Support & Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A192F]">
              Get in Touch with FreshFits
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-sm font-medium">
            Have questions about hostel pickups, room delivery, or custom semester packages? Our campus team is available 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Channels & Campus Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Card */}
            <a
              href="https://wa.me/2348031123456?text=Hello%20FreshFits%20Campus%20Concierge,%20I%20have%20an%20inquiry%20regarding%20hostel%20laundry%20pickup."
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-3xl bg-white border border-blue-100 hover:border-[#003BEE] transition-all group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#4EC6C1]/20 border border-[#4EC6C1]/40 flex items-center justify-center text-[#003BEE]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-[#0A192F] block">
                      Campus WhatsApp Valet
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Fast hostel support · &lt; 5 mins response</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform group-hover:text-[#003BEE]" />
              </div>
            </a>

            {/* Email & Info Cards */}
            <div className="p-6 rounded-3xl bg-white border border-blue-100 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#003BEE] mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#0A192F] block">Student Email Support</span>
                  <a href="mailto:support@freshfitslaundry.com" className="text-xs text-slate-600 hover:text-[#003BEE]">
                    support@freshfitslaundry.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-4 h-4 text-[#003BEE] mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#0A192F] block">Pickup & Return Hours</span>
                  <span className="text-xs text-slate-600">Monday – Sunday: 7:00 AM – 9:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-[#003BEE] mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#0A192F] block">Campus Hubs</span>
                  <span className="text-xs text-slate-600">UNILAG, LASU, Covenant, Babcock, UI & major campuses nationwide</span>
                </div>
              </div>
            </div>

            {/* Primary Action Card Banner */}
            <div className="p-6 rounded-3xl bg-[#003BEE] text-white space-y-3 shadow-xl">
              <span className="text-[10px] tracking-[0.2em] text-[#4EC6C1] uppercase block font-mono font-bold">
                Stay Fresh. Stay Sharp.
              </span>
              <h3 className="text-2xl font-black">
                Ready for FreshFits?
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed font-medium">
                Skip the laundry room queues and book your hostel pickup in under 60 seconds.
              </p>
              <button
                onClick={onSchedulePickup}
                className="mt-2 w-full py-3 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold uppercase tracking-wider hover:bg-[#d6b15a] transition-all shadow-md"
                id="contact-schedule-pickup-btn"
              >
                Schedule Hostel Pickup
              </button>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-md">
            {isSent ? (
              <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A192F]">
                  Message Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-medium">
                  Thanks for reaching out. A FreshFits campus concierge rep will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#0A192F] mb-4">
                  Send Campus Team a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tunde Adeyemi"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#003BEE]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tunde@campus.edu"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#003BEE]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      placeholder="+234 800..."
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#003BEE]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#003BEE]"
                    >
                      <option>General Inquiry</option>
                      <option>Hostel Pickup Location Help</option>
                      <option>Semester Subscription Inquiry</option>
                      <option>Express Garment Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your campus laundry needs or special instructions..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-blue-100 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#003BEE]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#003BEE] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md"
                    id="submit-contact-form"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
