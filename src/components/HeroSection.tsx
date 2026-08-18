import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2, Zap, Award } from 'lucide-react';

interface HeroSectionProps {
  onSchedulePickup: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSchedulePickup,
  onExploreServices
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#003BEE] via-[#0034D4] to-[#0026A5] text-white pt-10 pb-20 md:pt-16 md:pb-28 lg:pb-32">
      {/* Background glow accents in Royal Blue, Teal, and Gold */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#4EC6C1]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C8A24C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Text Column: 7 Cols */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Campus Tag Pill in Teal */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4EC6C1]/20 border border-[#4EC6C1]/50 text-xs font-bold tracking-wider uppercase text-[#4EC6C1]">
              <Zap className="w-3.5 h-3.5 text-[#C8A24C]" />
              <span>Campus Wash & Fold Atelier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24C]" />
              <span className="text-white font-medium">Hostel Pickups</span>
            </div>

            {/* Main Tagline & Brand Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                Wear <span className="text-[#C8A24C]">FreshFits.</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                Stay Sharp.
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#4EC6C1] italic leading-[1.05]">
                Own Your Campus.
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-blue-100 font-normal leading-relaxed max-w-xl">
              We pick up your laundry directly from your hostel, dorm room, or campus lodge, clean and steam press every garment to perfection, and return them fresh to your door in 24–48 hours.
            </p>

            {/* Actions / CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onSchedulePickup}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C8A24C] text-[#0A192F] text-sm font-extrabold tracking-wide hover:bg-[#d8b55d] active:scale-[0.99] transition-all shadow-lg hover:shadow-xl group"
                id="hero-schedule-pickup-btn"
              >
                <span>Book Hostel Pickup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#0A192F]" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-bold transition-all"
                id="hero-explore-services-btn"
              >
                <span>View Semester Plans</span>
              </button>
            </div>

            {/* Key Micro Guarantees in Teal & Gold */}
            <div className="pt-6 border-t border-blue-400/30 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4EC6C1]" />
                <span className="font-semibold text-white">Hostel Room Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8A24C]" />
                <span className="font-semibold text-white">24–48h Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4EC6C1]" />
                <span className="font-semibold text-white">From ₦350 / Item</span>
              </div>
            </div>

          </div>

          {/* Right Editorial Visual: 5 Cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Frame Container with Gold & Royal Blue border */}
              <div className="relative overflow-hidden rounded-3xl bg-white/10 shadow-2xl border-2 border-white/20 aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1400&auto=format&fit=crop"
                  alt="Students on campus wearing crisp fresh streetwear and stylish neatly folded clothes"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay at bottom for card reading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D7E]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating FreshFits Student Badge Overlay */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C8A24C]/40 shadow-xl text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#003BEE]" />
                        <span className="text-[11px] font-extrabold tracking-wider text-[#003BEE] uppercase">
                          FreshFits Promise
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        Zero lost clothes · Color separated · Steam pressed
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#003BEE] text-white flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5 text-[#C8A24C]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Teal Tag */}
              <div className="hidden sm:flex items-center gap-1.5 absolute -top-4 -right-4 px-4 py-2 rounded-full bg-[#4EC6C1] text-[#003BEE] text-xs font-black tracking-wide uppercase shadow-lg">
                <Award className="w-3.5 h-3.5" />
                <span>#1 Campus Choice</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
