import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/laundryData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50 border-t border-blue-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-[#003BEE] uppercase block mb-3">
            Campus Help & Answers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A192F]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-blue-100 border-y border-blue-100">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-5 sm:py-6 transition-colors">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group cursor-pointer"
                  id={`faq-toggle-${idx}`}
                >
                  <span className="text-base sm:text-lg font-bold text-[#0A192F] group-hover:text-[#003BEE] transition-colors">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#003BEE] group-hover:text-white transition-all">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#003BEE] group-hover:text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#003BEE] group-hover:text-white" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pr-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
