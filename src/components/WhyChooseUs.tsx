import React from 'react';
import { DoorClosed, Sparkles, ShieldCheck, Tag } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      index: '01',
      title: 'Hostel Room Pickup',
      tag: 'Zero Stress',
      description: 'Skip hauling heavy laundry across campus. Our trusted campus valets collect directly from your hostel room, hall, or lodge.'
    },
    {
      index: '02',
      title: 'Stain-Free & Steam Pressed',
      tag: 'Look Sharp',
      description: 'Presentation shirts, hoodies, native wear, and jeans washed in color-safe enzymes and pressed with professional steam.'
    },
    {
      index: '03',
      title: 'Zero Lost Clothes Guarantee',
      tag: '100% Tracked',
      description: 'Individual barcode tagging on every laundry bag and separate machine cycles mean your favorite fits never get mixed up.'
    },
    {
      index: '04',
      title: 'Student-Friendly Rates',
      tag: 'From ₦350',
      description: 'Transparent pay-per-item rates starting at ₦350 or semester plans that cover all your laundry from matriculation to exams.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4EC6C1]/15 text-[#003BEE] font-bold text-xs uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#003BEE]" />
            <span>The FreshFits Campus Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A192F]">
            Why Students & Campus Leaders <span className="text-[#003BEE]">Choose FreshFits</span>
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Focus on your lectures, projects, and campus life while we handle the wash, iron, and folding.
          </p>
        </div>

        {/* 4 Benefits in clean modern cards with Teal tags & Gold accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.index}
              className="p-7 rounded-2xl bg-[#F8FAFF] border border-blue-100 hover:border-[#003BEE] transition-all hover:shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-extrabold text-[#003BEE] bg-white px-2.5 py-1 rounded-md border border-blue-200">
                    {benefit.index}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#4EC6C1]/20 text-[#003BEE]">
                    {benefit.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0A192F] group-hover:text-[#003BEE] transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-blue-100/80 flex items-center justify-between text-xs font-semibold text-[#C8A24C]">
                <span>FreshFits Standard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24C]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
