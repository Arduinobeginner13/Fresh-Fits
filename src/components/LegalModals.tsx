import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E3DEC9] overflow-hidden max-h-[85vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-white border-b border-[#EDE9DB] flex items-center justify-between">
          <h3 className="font-serif text-xl font-semibold text-[#1C1B18]">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78756C] hover:text-[#1C1B18] hover:bg-[#F0ECE1]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-bold text-[#0A192F]">1. Information We Collect</p>
              <p>FreshFits Wash & Fold collects information necessary to coordinate hostel pickups and doorstep deliveries, including your student name, hostel/room location, phone/WhatsApp number, and specific garment instructions.</p>
              
              <p className="font-bold text-[#0A192F] pt-2">2. How We Use Information</p>
              <p>Your details are strictly utilized to coordinate valet pickups, update live order tracking notifications, process electronic payments, and provide student customer support.</p>
              
              <p className="font-bold text-[#0A192F] pt-2">3. Data Security & Storage</p>
              <p>All student account data is securely stored and handled with industry standards. We never sell or distribute your contact details.</p>
            </>
          ) : (
            <>
              <p className="font-bold text-[#0A192F]">1. Garment Care Standards</p>
              <p>FreshFits Wash & Fold adheres to proper fabric sorting, individual student batch washing, and precise steam iron finishing. Pre-existing tears or defects are noted during intake.</p>
              
              <p className="font-bold text-[#0A192F] pt-2">2. Pickup & Turnaround Times</p>
              <p>Standard campus turnaround is 24 to 48 hours. Express 24h turnaround is available for urgent lecture and event needs.</p>
              
              <p className="font-bold text-[#0A192F] pt-2">3. Semester Subscription Plans</p>
              <p>Semester plans provide weekly garment quotas that reset every Monday morning. Weekly quotas ensure consistent turnaround for all campus members.</p>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#003BEE] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
