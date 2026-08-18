import React, { useState } from 'react';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { LegalModal } from './LegalModals';

interface FooterProps {
  onSchedulePickup: () => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSchedulePickup, onOpenAccount }) => {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-12 border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-blue-900/40">
          
          {/* Brand & Manifesto: 5 Cols */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#003BEE] text-[#C8A24C] flex items-center justify-center text-base font-black shadow-md border border-white/20">
                FF
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-wide text-white uppercase block">
                  FreshFits
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#4EC6C1] uppercase block">
                  Wash & Fold
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Wear FreshFits. Stay Sharp. Own Your Campus. Premium doorstep laundry care, hostel pickups, and semester plans designed for students.
            </p>

            <div className="pt-2">
              <button
                onClick={onSchedulePickup}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-black uppercase tracking-wider hover:bg-[#d6b15a] transition-all shadow-md"
                id="footer-schedule-btn"
              >
                Schedule Hostel Pickup
              </button>
            </div>
          </div>

          {/* Navigation Links: 3 Cols */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs font-bold text-[#4EC6C1] uppercase tracking-wider block mb-2">
              Campus Quick Links
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">
                  Campus Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">
                  Semester Plans & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                  How Pickup Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
                  FreshFits Quality Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
                  Hostel Help & Inquiries
                </button>
              </li>
              <li>
                <button onClick={onOpenAccount} className="hover:text-white transition-colors">
                  Student Account
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Support & Contact: 4 Cols */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-xs font-bold text-[#4EC6C1] uppercase tracking-wider block mb-2">
              Campus Valet & Support
            </span>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href="https://wa.me/2348031123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#4EC6C1] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#4EC6C1]" />
                <span>WhatsApp: +234 803 112 3456</span>
              </a>

              <a
                href="mailto:support@freshfitslaundry.com"
                className="flex items-center gap-2 hover:text-[#4EC6C1] transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-300" />
                <span>Email: support@freshfitslaundry.com</span>
              </a>

              <p className="text-[11px] text-slate-400 pt-2 font-medium">
                Active on university campuses across Lagos & Nigeria. Daily hostel pickup & doorstep delivery.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal, Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} FreshFits Wash & Fold. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModalType('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-blue-900/60 hover:bg-[#003BEE] text-white transition-colors flex items-center justify-center shadow-xs"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </footer>
  );
};
