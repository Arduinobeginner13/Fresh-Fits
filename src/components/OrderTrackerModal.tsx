import React, { useEffect } from 'react';
import { 
  X, Check, Clock, Phone, MapPin, Truck, ShieldCheck, 
  Package, Sparkles, RefreshCw, ChevronRight, MessageCircle 
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onUpdateOrderStatus?: (orderId: string, newStatus: OrderStatus) => void;
}

const STAGES: OrderStatus[] = [
  'Pickup',
  'Collected',
  'At Facility',
  'Washing',
  'Ready',
  'Out for Delivery',
  'Delivered'
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  order,
  onClose,
  onUpdateOrderStatus
}) => {
  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const currentStageIndex = STAGES.indexOf(order.status);
  const activeIdx = currentStageIndex === -1 ? 0 : currentStageIndex;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  // Advance simulation for interactive testing
  const advanceStage = () => {
    if (onUpdateOrderStatus && activeIdx < STAGES.length - 1) {
      const nextStage = STAGES[activeIdx + 1];
      onUpdateOrderStatus(order.id, nextStage);
    }
  };

  const rollbackStage = () => {
    if (onUpdateOrderStatus && activeIdx > 0) {
      const prevStage = STAGES[activeIdx - 1];
      onUpdateOrderStatus(order.id, prevStage);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E3DEC9] overflow-hidden max-h-[92vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tracker Header */}
        <div className="p-5 sm:p-6 bg-[#003BEE] text-white flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span id="tracker-modal-title" className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs">
                Order {order.orderNumber}
              </span>
              <span className="text-xs font-bold text-[#003BEE] bg-[#4EC6C1] px-2.5 py-0.5 rounded-full shadow-xs">
                Live Tracking
              </span>
            </div>
            <p className="text-xs text-blue-100 font-medium">
              Placed on {order.date} · {order.serviceTypes.map((s) => s.replace('_', ' ')).join(', ')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden"
            id="close-tracker-modal"
            aria-label="Close tracking window"
            title="Close tracking window (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Tracker Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-slate-50">
          
          {/* Main Status Hero Card */}
          <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#003BEE] uppercase tracking-wider block mb-1">
                Current Care Status
              </span>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#4EC6C1] animate-ping" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F]">
                  {order.status}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Estimated Delivery: <span className="font-bold text-[#003BEE]">{order.estimatedDeliveryDate} ({order.estimatedDeliveryTimeSlot})</span>
              </p>
            </div>

            {/* Courier / Valet Info */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-2 w-full sm:w-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#003BEE] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {order.driverName ? order.driverName.charAt(0) : 'V'}
                </div>
                <div>
                  <span className="font-bold text-[#0A192F] block">{order.driverName || 'FreshFits Campus Valet'}</span>
                  <span className="text-[11px] text-slate-500 font-medium">Hostel Laundry Courier</span>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <a
                  href={`tel:${order.driverPhone || '+2348031123456'}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-[#003BEE] hover:bg-blue-50 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href="https://wa.me/2348031123456"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4EC6C1] text-[#003BEE] text-xs font-bold hover:bg-[#45b5b0] shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 7-Stage Visual Progression Pipeline */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0A192F] uppercase tracking-wider block">
              Hostel Garment Journey
            </span>

            {/* Stage Grid / Stepper */}
            <div className="relative pt-2">
              {/* Stepper bar background */}
              <div className="hidden md:block absolute top-[22px] left-[4%] right-[4%] h-[3px] bg-blue-100 z-0" />
              <div 
                className="hidden md:block absolute top-[22px] left-[4%] h-[3px] bg-[#003BEE] z-0 transition-all duration-500"
                style={{ width: `${(activeIdx / (STAGES.length - 1)) * 92}%` }}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
                {STAGES.map((stage, idx) => {
                  const isCompleted = idx < activeIdx;
                  const isCurrent = idx === activeIdx;
                  const isUpcoming = idx > activeIdx;

                  return (
                    <div 
                      key={stage}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between shadow-xs ${
                        isCurrent
                          ? 'bg-[#003BEE] text-white border-[#003BEE] shadow-lg scale-105'
                          : isCompleted
                          ? 'bg-white text-[#0A192F] border-blue-200'
                          : 'bg-white/60 text-slate-400 border-slate-200'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono mb-2 ${
                        isCurrent
                          ? 'bg-[#C8A24C] text-[#0A192F] font-black'
                          : isCompleted
                          ? 'bg-[#003BEE] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <span className={`text-[11px] font-bold leading-tight ${isCurrent ? 'text-white' : 'text-[#0A192F]'}`}>
                        {stage}
                      </span>

                      <span className={`text-[9px] mt-1 uppercase tracking-wider font-extrabold ${
                        isCurrent ? 'text-[#4EC6C1]' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {isCurrent ? 'In Progress' : isCompleted ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Status Simulation Controller */}
          {onUpdateOrderStatus && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#003BEE] block">Live Status Simulator</span>
                <p className="text-slate-600">Simulate order updates from hostel pickup to final delivery.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={rollbackStage}
                  disabled={activeIdx === 0}
                  className="px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous Stage
                </button>
                <button
                  onClick={advanceStage}
                  disabled={activeIdx === STAGES.length - 1}
                  className="px-4 py-1.5 rounded-xl bg-[#003BEE] text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-40 flex items-center gap-1 shadow-xs"
                >
                  <span>Advance Stage</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Addresses and Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location & Times */}
            <div className="p-5 rounded-3xl bg-white border border-blue-100 space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[#003BEE] uppercase tracking-wider block">
                Pickup & Return Details
              </span>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#003BEE] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0A192F] block">Hostel / Doorstep Address</span>
                    <span className="text-slate-600">{order.pickupAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#003BEE] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0A192F] block">Scheduled Window</span>
                    <span className="text-slate-600">{order.pickupDate} ({order.pickupTimeSlot})</span>
                  </div>
                </div>
              </div>

              {order.specialNotes && (
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <span className="font-bold text-[#0A192F]">Special Care Note: </span>
                  {order.specialNotes}
                </div>
              )}
            </div>

            {/* Receipt Summary */}
            <div className="p-5 rounded-3xl bg-white border border-blue-100 space-y-4 shadow-xs">
              <span className="text-xs font-bold text-[#003BEE] uppercase tracking-wider block">
                Itemized Receipt
              </span>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                {order.items.map((entry, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-slate-700">
                    <span className="font-medium">{entry.quantity}x {entry.item.name}</span>
                    <span className="font-mono font-bold text-[#0A192F]">{formatNaira(entry.item.price * entry.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-[#0A192F]">
                <span>Total Paid</span>
                <span className="text-base font-extrabold text-[#003BEE]">{formatNaira(order.total)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tracker Footer */}
        <div className="p-5 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">
            Questions about your order? FreshFits campus concierge is on standby.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#003BEE] text-white text-xs font-bold tracking-wider uppercase hover:bg-blue-700 transition-all shadow-md"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
