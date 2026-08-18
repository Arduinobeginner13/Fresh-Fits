import React, { useState } from 'react';
import { Sparkles, Calendar, User, ArrowRight, Menu, X, ShieldCheck, Shirt } from 'lucide-react';
import { Order } from '../types';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenAccount: () => void;
  onOpenTracking: (orderId?: string) => void;
  activeOrder?: Order;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAccount,
  onOpenTracking,
  activeOrder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#003BEE]/95 text-white backdrop-blur-md border-b border-[#002FB8] transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#003BEE] flex items-center justify-center font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform border-2 border-[#C8A24C]">
                <Shirt className="w-5 h-5 text-[#003BEE]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white uppercase font-sans">
                    Fresh<span className="text-[#C8A24C]">Fits</span>
                  </span>
                  <span className="bg-[#4EC6C1] text-[#003BEE] text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">
                    Campus
                  </span>
                </div>
                <span className="block text-[10px] tracking-wider text-blue-100 uppercase font-sans font-medium">
                  Wash & Fold Atelier
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-blue-100">
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-white hover:underline underline-offset-4 decoration-[#C8A24C] decoration-2 transition-all focus:outline-hidden"
              id="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="hover:text-white hover:underline underline-offset-4 decoration-[#C8A24C] decoration-2 transition-all focus:outline-hidden"
              id="nav-pricing"
            >
              Semester Plans & Rates
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-white hover:underline underline-offset-4 decoration-[#C8A24C] decoration-2 transition-all focus:outline-hidden"
              id="nav-how-it-works"
            >
              Hostel Pickup Flow
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-white hover:underline underline-offset-4 decoration-[#C8A24C] decoration-2 transition-all focus:outline-hidden"
              id="nav-about"
            >
              Why FreshFits
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-white hover:underline underline-offset-4 decoration-[#C8A24C] decoration-2 transition-all focus:outline-hidden"
              id="nav-contact"
            >
              Support & Ambassadorship
            </button>
          </nav>

          {/* Right Action Group */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Active Order Mini-Tracker Pill */}
            {activeOrder && (
              <button
                onClick={() => onOpenTracking(activeOrder.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
                id="nav-active-order-pill"
                title="View live order progress"
              >
                <span className="w-2 h-2 rounded-full bg-[#4EC6C1] animate-ping" />
                <span className="font-mono text-[11px] text-[#4EC6C1] font-bold">{activeOrder.orderNumber}</span>
                <span className="text-blue-100">· {activeOrder.status}</span>
              </button>
            )}

            {/* Customer Account Button */}
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-white hover:bg-white/15 transition-colors border border-white/20"
              id="nav-account-btn"
            >
              <User className="w-3.5 h-3.5 text-[#C8A24C]" />
              <span>Student Account</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-bold tracking-wide uppercase hover:bg-[#d6b15a] active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
              id="nav-schedule-pickup-btn"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Hostel Pickup</span>
            </button>
          </div>

          {/* Mobile Menu & Quick CTA Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-bold uppercase tracking-wider shadow-xs"
              id="mobile-quick-schedule-btn"
            >
              Book Pickup
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/15 focus:outline-hidden"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#002FB8] text-white border-b border-blue-900 px-5 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top duration-200">
          {activeOrder && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking(activeOrder.id);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white"
              id="mobile-nav-active-order"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4EC6C1] animate-pulse" />
                <span className="font-mono text-[#4EC6C1]">{activeOrder.orderNumber}</span>
                <span className="text-blue-200">· {activeOrder.status}</span>
              </div>
              <span className="text-[#C8A24C] font-bold text-[11px] flex items-center gap-1">
                Live Track <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          )}

          <div className="flex flex-col space-y-3 pt-2 text-base font-semibold text-blue-100">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 border-b border-white/10 flex items-center justify-between hover:text-white"
              id="mobile-nav-services"
            >
              <span>Services & Care</span>
              <span className="text-xs bg-[#4EC6C1]/20 text-[#4EC6C1] px-2 py-0.5 rounded font-bold">5 Specialties</span>
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2 border-b border-white/10 flex items-center justify-between hover:text-white"
              id="mobile-nav-pricing"
            >
              <span>Semester Plans & Rates</span>
              <span className="text-xs text-[#C8A24C]">From ₦350</span>
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 border-b border-white/10 hover:text-white"
              id="mobile-nav-how-it-works"
            >
              Hostel Pickup & Flow
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 border-b border-white/10 hover:text-white"
              id="mobile-nav-about"
            >
              Why FreshFits Campus
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 border-b border-white/10 hover:text-white"
              id="mobile-nav-contact"
            >
              Support & Ambassadorship
            </button>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 bg-white/10 text-xs font-bold text-white hover:bg-white/20"
              id="mobile-nav-account"
            >
              <User className="w-4 h-4 text-[#C8A24C]" />
              <span>My Account</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold tracking-wide uppercase shadow-md"
              id="mobile-nav-schedule"
            >
              <span>Book Pickup</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
