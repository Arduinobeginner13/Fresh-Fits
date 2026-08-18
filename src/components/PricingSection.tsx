import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Plus, Minus, ShoppingBag, ShieldCheck } from 'lucide-react';
import { SUBSCRIPTION_PLANS, PAY_AS_YOU_GO_ITEMS } from '../data/laundryData';
import { SubscriptionPlan, PayAsYouGoItem } from '../types';

interface PricingSectionProps {
  onChoosePlan: (plan: SubscriptionPlan) => void;
  onPlaceOneTimeOrder: (preselectedItems?: Record<string, number>) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onChoosePlan,
  onPlaceOneTimeOrder
}) => {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'payasyougo'>('subscriptions');
  const [quickCart, setQuickCart] = useState<Record<string, number>>({});

  const updateQuantity = (itemId: string, delta: number) => {
    setQuickCart((prev) => {
      const current = prev[itemId] || 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: updated };
    });
  };

  const totalItemsCount = Object.values(quickCart).reduce<number>((sum, count) => sum + Number(count), 0);
  const totalQuickAmount = Object.entries(quickCart).reduce<number>((sum, [id, count]) => {
    const item = PAY_AS_YOU_GO_ITEMS.find((i) => i.id === id);
    return sum + (item ? item.price * Number(count) : 0);
  }, 0);

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#F0F4FF] border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003BEE]/10 text-[#003BEE] font-bold text-xs uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#003BEE]" />
            <span>Student & Campus Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A192F] mb-4">
            Transparent <span className="text-[#003BEE]">Rates & Semester Plans</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Lock in a recurring semester plan for hassle-free weekly hostel pickups, or pay as you go per item.
          </p>

          {/* Clean Segmented Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-blue-200 mt-8 shadow-xs">
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'subscriptions'
                  ? 'bg-[#003BEE] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#003BEE]'
              }`}
              id="tab-subscriptions"
            >
              Semester Plans
            </button>
            <button
              onClick={() => setActiveTab('payasyougo')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'payasyougo'
                  ? 'bg-[#003BEE] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#003BEE]'
              }`}
              id="tab-payasyougo"
            >
              Pay As You Go Rates
            </button>
          </div>
        </div>

        {/* --- SUBSCRIPTIONS TAB --- */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isRecommended = plan.isPopular;

                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all ${
                      isRecommended
                        ? 'bg-white border-2 border-[#003BEE] shadow-2xl scale-[1.02]'
                        : 'bg-white border border-blue-100 hover:border-[#003BEE] hover:shadow-lg'
                    }`}
                  >
                    {/* Recommended Pill in Teal */}
                    {isRecommended && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#4EC6C1] text-[#003BEE] text-[11px] font-black tracking-wider uppercase shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Most Popular Campus Plan</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Plan Name & Price */}
                      <div>
                        <span className="text-xs font-mono font-bold tracking-wider text-[#003BEE] uppercase block mb-1">
                          FreshFits Membership
                        </span>
                        <h3 className="text-2xl font-extrabold text-[#0A192F] tracking-tight">
                          {plan.name}
                        </h3>
                        <div className="mt-4 flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#003BEE]">
                            {formatNaira(plan.price)}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="pt-6 border-t border-slate-100 space-y-3.5">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs text-slate-700">
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-200">
                              <Check className="w-3 h-3 text-[#003BEE]" />
                            </div>
                            <span className={idx === 0 || idx === 1 ? 'font-bold text-[#0A192F]' : 'font-medium'}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Choose a Plan CTA */}
                    <div className="pt-8 mt-6 border-t border-slate-100">
                      <button
                        onClick={() => onChoosePlan(plan)}
                        className={`w-full py-3.5 px-6 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                          isRecommended
                            ? 'bg-[#C8A24C] text-[#0A192F] hover:bg-[#d6b15a] shadow-md hover:shadow-lg'
                            : 'bg-white border-2 border-[#003BEE] text-[#003BEE] hover:bg-[#003BEE] hover:text-white'
                        }`}
                        id={`choose-plan-${plan.id}`}
                      >
                        <span>Select {plan.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center text-xs text-slate-500 max-w-xl mx-auto font-medium">
              All FreshFits semester plans include personalized waterproof laundry bags, priority turnaround during exam weeks, and free hostel collection & doorstep return.
            </div>
          </div>
        )}

        {/* --- PAY AS YOU GO TAB --- */}
        {activeTab === 'payasyougo' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            {/* Clean Pricing Table */}
            <div className="bg-white rounded-3xl border border-blue-100 overflow-hidden shadow-lg">
              <div className="px-6 sm:px-8 py-5 border-b border-blue-100 flex items-center justify-between bg-blue-50/50">
                <div>
                  <h3 className="text-xl font-bold text-[#0A192F]">
                    Student Pay As You Go Rates
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    No commitments. Cleaned, steam-pressed, and delivered directly to your dorm door.
                  </p>
                </div>
                <span className="hidden sm:inline-block text-xs font-mono font-bold text-[#003BEE] bg-white px-3 py-1 rounded-full border border-blue-200">
                  Prices in NGN (₦)
                </span>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-100">
                {PAY_AS_YOU_GO_ITEMS.map((item) => {
                  const qty = quickCart[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      className="px-6 sm:px-8 py-4 flex items-center justify-between gap-4 hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-[#0A192F] block">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {item.description}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        {/* Price Display */}
                        <div className="text-right">
                          <span className="text-base font-extrabold text-[#003BEE]">
                            {formatNaira(item.price)}
                          </span>
                        </div>

                        {/* Interactive Item Selector */}
                        <div className="flex items-center rounded-xl border border-blue-200 bg-white p-1 shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={qty === 0}
                            className="p-1.5 text-slate-500 hover:text-[#003BEE] hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-mono font-bold text-[#0A192F]">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-slate-500 hover:text-[#003BEE] hover:bg-blue-50 rounded-lg"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Table Footer CTA */}
              <div className="p-6 sm:p-8 bg-blue-50/50 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {totalItemsCount > 0 ? (
                    <div>
                      <span className="text-xs font-bold text-[#003BEE] uppercase tracking-wider">Selected {totalItemsCount} items</span>
                      <p className="text-xl font-extrabold text-[#0A192F]">
                        Estimated Total: <span className="text-[#003BEE]">{formatNaira(totalQuickAmount)}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 font-medium">
                      Select items above to estimate your order, or book a hostel pickup directly.
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onPlaceOneTimeOrder(totalItemsCount > 0 ? quickCart : undefined)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold tracking-wider uppercase hover:bg-[#d6b15a] transition-all shadow-md"
                  id="place-one-time-order-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Book Hostel Pickup ({totalItemsCount > 0 ? `${totalItemsCount} items` : 'Any Load'})</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
