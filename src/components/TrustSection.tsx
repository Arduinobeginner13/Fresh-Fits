import React from 'react';
import { Sparkles, Shield, HeartHandshake, Truck, Headphones, Droplets, Award, Zap, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      title: 'Hostel & Lodge Priority Pickup',
      description: 'Dedicated campus valets pickup and drop off directly at your hostel gate or doorstep with zero campus hassle.'
    },
    {
      title: 'Zero Mix-up Tagging System',
      description: 'Every student order is tagged individually and washed in private dedicated machines—never mixed with other students.'
    },
    {
      title: 'Fabric-Conscious Steam Ironing',
      description: 'Wrinkle-free steam pressing for presentation shirts, corporate wear, jeans, and casual outfits to keep you sharp for lectures.'
    },
    {
      title: '24–48 Hour Standard Turnaround',
      description: 'Fast, reliable cycle so you never run out of clean clothes between exams, assignments, and campus events.'
    },
    {
      title: 'Active Student WhatsApp Support',
      description: 'Direct access to your campus concierge team via WhatsApp whenever you need urgent pickup or rescheduling.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#003BEE] uppercase block">
              The FreshFits Campus Guarantee
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A192F] leading-[1.12]">
              Wear FreshFits. <br />
              <span className="text-[#003BEE]">Own Your Campus.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              We know university life is demanding. Studying, classes, and projects leave little time for laundry. FreshFits delivers professional wash, iron, and folding right to your hostel door.
            </p>

            <div className="pt-4">
              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#C8A24C]" />
                  <span className="text-xs font-bold text-[#0A192F] tracking-wider uppercase block">
                    100% Campus Care Protocol
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  We use premium fabric conditioners, hygienic eco-detergents, and protective packaging so your outfits look crisp, smell fresh, and last all semester.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Trust Pillars */}
          <div className="lg:col-span-7 divide-y divide-blue-100 border-y border-blue-100">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-8 group">
                <div className="sm:w-1/3">
                  <span className="font-mono text-xs font-bold text-[#003BEE] block mb-1">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[#0A192F] group-hover:text-[#003BEE] transition-colors">
                    {pillar.title}
                  </h3>
                </div>
                <div className="sm:w-2/3">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
