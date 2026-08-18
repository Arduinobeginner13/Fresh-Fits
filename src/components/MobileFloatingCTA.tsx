import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface MobileFloatingCTAProps {
  onSchedulePickup: () => void;
  onOpenTracking: (orderId: string) => void;
  activeOrder?: Order;
}

export const MobileFloatingCTA: React.FC<MobileFloatingCTAProps> = ({
  onSchedulePickup,
  onOpenTracking,
  activeOrder
}) => {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-2 rounded-2xl bg-[#0A192F]/95 backdrop-blur-md shadow-2xl border border-blue-800/40 flex items-center justify-between gap-2">
        {activeOrder ? (
          <button
            onClick={() => onOpenTracking(activeOrder.id)}
            className="flex-1 flex items-center gap-2 px-3 py-2 text-left rounded-xl hover:bg-white/10 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4EC6C1] animate-pulse shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[11px] font-mono font-bold text-white block truncate">
                {activeOrder.orderNumber}
              </span>
              <span className="text-[10px] text-[#4EC6C1] font-bold block truncate">
                {activeOrder.status}
              </span>
            </div>
          </button>
        ) : (
          <div className="px-3 py-1 text-white">
            <span className="text-[10px] font-mono uppercase text-[#4EC6C1] font-bold block">Hostel Pickup</span>
            <span className="text-xs font-bold text-white">FreshFits Wash & Fold</span>
          </div>
        )}

        <button
          onClick={onSchedulePickup}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C8A24C] text-[#0A192F] text-xs font-black uppercase tracking-wider hover:bg-[#d6b15a] active:scale-98 transition-all shrink-0 shadow-md"
          id="mobile-floating-book-btn"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Pickup</span>
        </button>
      </div>
    </div>
  );
};
