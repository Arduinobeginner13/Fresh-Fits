import React, { useState } from 'react';
import { ArrowRight, Clock, Plus, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/laundryData';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAFBFD] border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-18 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003BEE]/10 text-[#003BEE] font-bold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A24C]" />
              <span>Campus Tailored Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A192F]">
              Specialized <span className="text-[#003BEE]">Laundry Services</span>
            </h2>
          </div>
          <p className="text-base text-slate-600 max-w-sm">
            From lecture outfits and casual tees to presentation suits and backpack spa sessions, we keep every fit spotless.
          </p>
        </div>

        {/* 5 Editorial Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES_DATA.map((service, index) => {
            const isLarge = index === 0 || index === 3;
            
            return (
              <div
                key={service.id}
                className={`group flex flex-col justify-between bg-white rounded-3xl border border-blue-100/90 overflow-hidden hover:border-[#003BEE] hover:shadow-xl transition-all duration-300 ${
                  isLarge && index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden bg-blue-50 ${
                  isLarge && index === 0 ? 'h-64 sm:h-72' : 'h-60 sm:h-64'
                }`}>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Turnaround badge in Teal & Blue */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#003BEE] text-white text-xs font-bold flex items-center gap-1.5 shadow-md border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-[#4EC6C1]" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A192F] group-hover:text-[#003BEE] transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#C8A24C] font-bold uppercase tracking-wider mb-2.5">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Actions: Learn More & Quick Book */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="text-xs font-bold uppercase tracking-wider text-[#003BEE] hover:text-[#0028A8] flex items-center gap-1.5 transition-colors"
                      id={`learn-more-${service.id}`}
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold hover:bg-[#d6b15a] active:scale-95 transition-all shadow-xs"
                      id={`book-${service.id}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Book Pickup</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onBookService={(serviceId) => {
          setActiveModalService(null);
          onSelectServiceForBooking(serviceId);
        }}
      />
    </section>
  );
};
