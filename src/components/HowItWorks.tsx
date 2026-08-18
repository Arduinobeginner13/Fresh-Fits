import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

interface HowItWorksProps {
  onSchedulePickup: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onSchedulePickup }) => {
  const steps = [
    {
      num: '01',
      stage: 'Hostel Room Pickup',
      tag: 'Step 1',
      description: 'Book online in 60 seconds. Our campus valet picks up right from your room, hall, or student lodge.'
    },
    {
      num: '02',
      stage: 'Color Sort & Deep Wash',
      tag: 'Step 2',
      description: 'Separated by color and fabrics. Washed with premium hypoallergenic & stain-lifting solutions.'
    },
    {
      num: '03',
      stage: 'Steam Press & Crisp Fold',
      tag: 'Step 3',
      description: 'Precision steam ironing on shirts/pants, and crisp boutique folds for hoodies, tees & bedding.'
    },
    {
      num: '04',
      stage: 'Doorstep Return in 24–48h',
      tag: 'Step 4',
      description: 'Delivered fresh and sealed in protective FreshFits bags directly back to your room door.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F0F4FF] border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-18 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003BEE]/10 text-[#003BEE] font-bold text-xs uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#003BEE]" />
              <span>Effortless Campus Laundry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A192F]">
              How FreshFits <span className="text-[#003BEE]">Works For You</span>
            </h2>
          </div>
          <p className="text-base text-slate-600 max-w-sm">
            From quick hostel pickup to razor-sharp return, experience zero laundry stress in 4 simple steps.
          </p>
        </div>

        {/* Continuous Journey Progression */}
        <div className="relative">
          {/* Desktop connecting guideline across stages */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-blue-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={step.num}
                className="relative bg-white p-7 rounded-2xl border border-blue-100 transition-all hover:border-[#003BEE] hover:shadow-xl group"
              >
                {/* Step Marker */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#003BEE] text-white font-mono text-sm font-extrabold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {step.num}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#4EC6C1]/20 text-[#003BEE]">
                    {step.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-[#0A192F] group-hover:text-[#003BEE] transition-colors">
                    {step.stage}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Micro Indicator bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-[#003BEE] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4EC6C1]" /> Stage {idx + 1}
                  </span>
                  <span className="text-[#C8A24C] font-bold">100% Tracked</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking Trigger */}
        <div className="mt-14 pt-8 border-t border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-base font-bold text-[#0A192F]">
              Have laundry piled up in your room right now?
            </p>
            <p className="text-sm text-slate-500">
              Schedule a pickup today and get it back fresh and steam-pressed in 24–48 hours.
            </p>
          </div>
          <button
            onClick={onSchedulePickup}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold tracking-wider uppercase hover:bg-[#d6b15a] shadow-md hover:shadow-lg transition-all"
            id="how-it-works-schedule-btn"
          >
            <span>Book Hostel Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
