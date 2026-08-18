import React, { useEffect } from 'react';
import { X, Clock, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden max-h-[90vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual */}
        <div className="relative h-56 sm:h-64 w-full bg-[#003BEE] overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001D7E] via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-xs transition-colors"
            id="close-service-modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4EC6C1] text-[#003BEE] text-xs font-extrabold tracking-wider uppercase mb-2 shadow-xs">
              <Clock className="w-3.5 h-3.5" />
              {service.turnaround} Turnaround
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {service.name}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#003BEE] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A24C]" />
              <span>Campus Service Overview</span>
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {service.description}
            </p>
          </div>

          {/* Key Care Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#003BEE] mb-3">
              FreshFits Quality Process
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-800 font-medium">
                  <Check className="w-4 h-4 text-[#003BEE] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Care Recommendation */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-[#C8A24C]/30 text-xs text-slate-800 space-y-1">
            <span className="font-bold text-[#8A6715] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C8A24C]" />
              Garment & Fabric Suitability
            </span>
            <p className="text-slate-700">{service.careNotes}</p>
          </div>

          {/* Common Items */}
          <div>
            <span className="text-xs text-slate-500 block mb-2 font-bold uppercase tracking-wider">Popular campus items for this service:</span>
            <div className="flex flex-wrap gap-2">
              {service.popularItems.map((item, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-500 block font-medium">Hostel Turnaround</span>
            <span className="text-xs font-extrabold text-[#003BEE]">{service.turnaround}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold uppercase tracking-wider hover:bg-[#d6b15a] transition-all shadow-md"
              id="book-this-service-modal-btn"
            >
              <span>Book Hostel Pickup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
