import React, { useState, useEffect } from 'react';
import { 
  X, Check, ChevronRight, ChevronLeft, Calendar, MapPin, 
  CreditCard, ShieldCheck, Plus, Minus, Clock, Sparkles, Building2, Truck
} from 'lucide-react';
import { SERVICES_DATA, PAY_AS_YOU_GO_ITEMS, INITIAL_USER_PROFILE } from '../data/laundryData';
import { ServiceType, PayAsYouGoItem, Order, UserProfile, BookingState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialItems?: Record<string, number>;
  userProfile: UserProfile;
  onOrderCreated: (newOrder: Order) => void;
}

const PICKUP_TIME_SLOTS = [
  '09:00 AM – 11:00 AM',
  '11:00 AM – 01:00 PM',
  '01:00 PM – 03:00 PM',
  '04:00 PM – 06:00 PM',
  '06:00 PM – 08:00 PM'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialItems,
  userProfile,
  onOrderCreated
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(
    initialServiceId ? [initialServiceId as ServiceType] : ['wash_fold']
  );
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(initialItems || {});
  const [addressType, setAddressType] = useState<'saved' | 'new'>('saved');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    userProfile.savedAddresses[0]?.id || ''
  );
  const [customAddress, setCustomAddress] = useState({
    street: '',
    city: 'Lagos',
    state: 'Lagos State',
    landmark: '',
    contactPhone: userProfile.phone
  });

  // Dates generator (Next 7 days starting from tomorrow)
  const [availableDates, setAvailableDates] = useState<{ label: string; dateStr: string; day: string }[]>([]);
  const [selectedPickupDate, setSelectedPickupDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(PICKUP_TIME_SLOTS[0]);
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'apple_pay' | 'cash'>('card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Generate next 6 days
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 1);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      const dateStr = `${monthName} ${dayNum}, ${d.getFullYear()}`;
      dates.push({
        label: i === 0 ? 'Tomorrow' : `${dayName}, ${monthName} ${dayNum}`,
        dateStr,
        day: `${dayName} ${dayNum}`
      });
    }
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedPickupDate(dates[0].dateStr);
    }
  }, []);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServices([initialServiceId as ServiceType]);
    }
    if (initialItems && Object.keys(initialItems).length > 0) {
      setSelectedItems(initialItems);
      // Auto move to items or address step if pre-filled
      setCurrentStep(2);
    }
  }, [initialServiceId, initialItems]);

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

  if (!isOpen) return null;

  // Toggle Service
  const toggleService = (serviceId: ServiceType) => {
    if (selectedServices.includes(serviceId)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== serviceId));
      }
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  // Item Quantities
  const updateItemQty = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Calculate pricing math
  const itemsSubtotal = Object.entries(selectedItems).reduce((sum, [itemId, qty]) => {
    const item = PAY_AS_YOU_GO_ITEMS.find((i) => i.id === itemId);
    return sum + (item ? item.price * (qty as number) : 0);
  }, 0);

  // If user has active subscription, delivery fee is ₦0, else standard flat delivery fee ₦1,200
  const isSubscriber = !!userProfile.activePlan;
  const standardDeliveryFee = isSubscriber ? 0 : 1200;
  const expressFee = deliverySpeed === 'express' ? 2000 : 0;
  const pickupDeliveryFee = standardDeliveryFee + expressFee;

  const totalBeforeDiscount = itemsSubtotal + pickupDeliveryFee;
  const finalTotal = Math.max(0, totalBeforeDiscount - appliedDiscount);

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'CAMPUS10' || code === 'FRESHFIT' || code === 'STAYSHARP' || code === 'WELCOME') {
      const disc = Math.round(itemsSubtotal * 0.15);
      setAppliedDiscount(disc);
      setPromoMessage('Campus promo code applied: 15% Student Discount!');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid promo code. Try CAMPUS10 or FRESHFIT');
    }
  };

  // Submission handler
  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Determine pickup address text
      let finalAddress = '';
      if (addressType === 'saved') {
        const saved = userProfile.savedAddresses.find((a) => a.id === selectedAddressId);
        finalAddress = saved ? saved.address : userProfile.savedAddresses[0]?.address || 'Hall 4 (Room B204), Main Campus';
      } else {
        finalAddress = `${customAddress.street}, ${customAddress.city}, ${customAddress.state}`;
      }

      // Convert items
      const orderItems = Object.entries(selectedItems).map(([id, qty]) => ({
        item: PAY_AS_YOU_GO_ITEMS.find((i) => i.id === id) || PAY_AS_YOU_GO_ITEMS[0],
        quantity: Number(qty)
      }));

      // Calculate estimated delivery
      const estDate = 'In 48 Hours';

      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber: `FF-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pickup',
        serviceTypes: selectedServices,
        items: orderItems.length > 0 ? orderItems : [{ item: PAY_AS_YOU_GO_ITEMS[0], quantity: 5 }],
        subtotal: itemsSubtotal > 0 ? itemsSubtotal : 1750,
        pickupDeliveryFee,
        discount: appliedDiscount,
        total: finalTotal > 0 ? finalTotal : 1750,
        pickupAddress: finalAddress,
        deliveryAddress: finalAddress,
        pickupDate: selectedPickupDate || 'Tomorrow',
        pickupTimeSlot: selectedTimeSlot,
        estimatedDeliveryDate: estDate,
        estimatedDeliveryTimeSlot: '04:00 PM – 06:00 PM',
        paymentMethod,
        paymentStatus: 'paid',
        specialNotes: specialInstructions,
        driverName: 'Emmanuel (Campus Valet)',
        driverPhone: '+234 803 112 3456',
        statusHistory: [
          {
            status: 'Pickup',
            timestamp: 'Just now',
            description: 'Pickup scheduled. FreshFits Campus Valet assigned.',
            completed: true
          },
          {
            status: 'Collected',
            timestamp: 'Pending doorstep arrival',
            description: 'Valet will collect and barcode-tag your items at your hostel.',
            completed: false
          },
          {
            status: 'At Facility',
            timestamp: 'Pending',
            description: 'Sorting and fabric inspection at FreshFits Atelier.',
            completed: false
          },
          {
            status: 'Washing',
            timestamp: 'Pending',
            description: 'Hypoallergenic student cycle wash & stain care.',
            completed: false
          },
          {
            status: 'Ready',
            timestamp: 'Pending',
            description: 'Steam pressed and neatly folded in FreshFits bags.',
            completed: false
          },
          {
            status: 'Out for Delivery',
            timestamp: 'Pending',
            description: 'Campus rider dispatched to your hostel/room.',
            completed: false
          },
          {
            status: 'Delivered',
            timestamp: 'Pending',
            description: 'Delivered fresh and crisp to your room door.',
            completed: false
          }
        ]
      };

      onOrderCreated(newOrder);
      setIsSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E3DEC9] overflow-hidden max-h-[92vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#003BEE] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs">
              Step {currentStep} of 6
            </span>
            <span className="text-xs font-semibold text-blue-100 hidden sm:inline-block">
              {currentStep === 1 && 'Select Care Category'}
              {currentStep === 2 && 'Customize Bag Items'}
              {currentStep === 3 && 'Hostel / Room Pickup Address'}
              {currentStep === 4 && 'Schedule Date & Time'}
              {currentStep === 5 && 'Review Summary'}
              {currentStep === 6 && 'Secure Payment'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            id="close-booking-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="w-full bg-blue-900/20 h-1.5">
          <div 
            className="bg-[#C8A24C] h-1.5 transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>

        {/* Scrollable Step Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* ================= STEP 1: SELECT SERVICES ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1B18]">
                  Select Services
                </h3>
                <p className="text-xs sm:text-sm text-[#5A574E] mt-1">
                  Choose the specialized treatment categories needed for your items.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SERVICES_DATA.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);

                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-white border-[#1C1B18] shadow-xs'
                          : 'bg-white/60 border-[#E3DEC9] hover:bg-white hover:border-[#CCC6B4]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-semibold text-[#1C1B18]">
                            {srv.name}
                          </span>
                        </div>
                        <p className="text-xs text-[#78756C]">
                          {srv.tagline}
                        </p>
                        <span className="text-[11px] font-mono text-[#8B5E3C] block pt-1">
                          {srv.turnaround}
                        </span>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#1C1B18] border-[#1C1B18] text-white' : 'border-[#DDD8CB]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 2: SELECT ITEMS ================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1C1B18]">
                    Select Items
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A574E] mt-1">
                    Add garment quantities to estimate your order accurately.
                  </p>
                </div>
                {itemsSubtotal > 0 && (
                  <span className="font-serif text-base font-semibold text-[#1C1B18]">
                    Subtotal: {formatNaira(itemsSubtotal)}
                  </span>
                )}
              </div>

              <div className="divide-y divide-[#EDE9DB] border border-[#E3DEC9] rounded-xl bg-white overflow-hidden">
                {PAY_AS_YOU_GO_ITEMS.map((item) => {
                  const qty = selectedItems[item.id] || 0;

                  return (
                    <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-[#FAF9F6]">
                      <div>
                        <span className="text-sm font-medium text-[#1C1B18] block">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#78756C]">
                          {formatNaira(item.price)} each
                        </span>
                      </div>

                      <div className="flex items-center rounded-lg border border-[#DDD8CB] bg-[#FAF9F6] p-1">
                        <button
                          onClick={() => updateItemQty(item.id, -1)}
                          disabled={qty === 0}
                          className="p-1 text-[#5A574E] hover:text-[#1C1B18] disabled:opacity-20"
                          aria-label={`Remove one ${item.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-medium text-[#1C1B18]">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateItemQty(item.id, 1)}
                          className="p-1 text-[#5A574E] hover:text-[#1C1B18]"
                          aria-label={`Add one ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-[#F4F1E6] border border-[#E5E0D0] text-xs text-[#615D52]">
                <span className="font-semibold text-[#1C1B18]">Note: </span>
                Our valet counts and logs each item upon doorstep collection. Any item adjustments will be reflected transparently in your digital receipt.
              </div>
            </div>
          )}

          {/* ================= STEP 3: PICKUP LOCATION ================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1B18]">
                  Pickup Location
                </h3>
                <p className="text-xs sm:text-sm text-[#5A574E] mt-1">
                  Specify where our laundry valet should collect and return your garments.
                </p>
              </div>

              {/* Address Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAddressType('saved')}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-medium transition-all ${
                    addressType === 'saved'
                      ? 'bg-white border-[#1C1B18] text-[#1C1B18] shadow-xs'
                      : 'bg-white/60 border-[#DDD8CB] text-[#78756C]'
                  }`}
                >
                  Saved Addresses
                </button>
                <button
                  onClick={() => setAddressType('new')}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-medium transition-all ${
                    addressType === 'new'
                      ? 'bg-white border-[#1C1B18] text-[#1C1B18] shadow-xs'
                      : 'bg-white/60 border-[#DDD8CB] text-[#78756C]'
                  }`}
                >
                  Enter New Address
                </button>
              </div>

              {addressType === 'saved' ? (
                <div className="space-y-3">
                  {userProfile.savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                        selectedAddressId === addr.id
                          ? 'bg-white border-[#1C1B18] shadow-xs'
                          : 'bg-white/60 border-[#E3DEC9] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#8B5E3C] mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#1C1B18]">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFECE4] text-[#615D52]">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#5A574E] mt-1">{addr.address}</p>
                        </div>
                      </div>

                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedAddressId === addr.id ? 'bg-[#1C1B18] border-[#1C1B18]' : 'border-[#DDD8CB]'
                      }`}>
                        {selectedAddressId === addr.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 bg-white p-5 rounded-xl border border-[#E3DEC9]">
                  <div>
                    <label className="text-xs font-medium text-[#423F38] block mb-1">Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 14 Admiralty Way, Flat 3B"
                      value={customAddress.street}
                      onChange={(e) => setCustomAddress({ ...customAddress, street: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDD8CB] text-xs focus:outline-none focus:border-[#1C1B18]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#423F38] block mb-1">City / Area</label>
                      <input
                        type="text"
                        placeholder="Lekki / Victoria Island"
                        value={customAddress.city}
                        onChange={(e) => setCustomAddress({ ...customAddress, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD8CB] text-xs focus:outline-none focus:border-[#1C1B18]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#423F38] block mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        placeholder="+234..."
                        value={customAddress.contactPhone}
                        onChange={(e) => setCustomAddress({ ...customAddress, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD8CB] text-xs focus:outline-none focus:border-[#1C1B18]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#423F38] block mb-1">Gate / Landmark Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Black gate opposite bakery"
                      value={customAddress.landmark}
                      onChange={(e) => setCustomAddress({ ...customAddress, landmark: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDD8CB] text-xs focus:outline-none focus:border-[#1C1B18]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 4: PICKUP TIME ================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1B18]">
                  Pickup Time
                </h3>
                <p className="text-xs sm:text-sm text-[#5A574E] mt-1">
                  Select your preferred collection date and arrival window.
                </p>
              </div>

              {/* Date Pills */}
              <div>
                <label className="text-xs font-semibold text-[#1C1B18] block mb-2 uppercase tracking-wider">
                  Pickup Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPickupDate(item.dateStr)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedPickupDate === item.dateStr
                          ? 'bg-[#1C1B18] text-white border-[#1C1B18] shadow-xs'
                          : 'bg-white border-[#E3DEC9] text-[#2E2C26] hover:border-[#1C1B18]'
                      }`}
                    >
                      <span className="text-[10px] block opacity-80">{item.label === 'Tomorrow' ? 'TMRW' : item.day.split(' ')[0]}</span>
                      <span className="text-xs font-semibold block">{item.day.split(' ')[1] || item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-semibold text-[#1C1B18] block mb-2 uppercase tracking-wider">
                  Arrival Window
                </label>
                <div className="space-y-2">
                  {PICKUP_TIME_SLOTS.map((slot) => (
                    <div
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        selectedTimeSlot === slot
                          ? 'bg-white border-[#1C1B18] shadow-xs font-medium'
                          : 'bg-white/60 border-[#E3DEC9] text-[#5A574E] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-[#8B5E3C]" />
                        <span>{slot}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedTimeSlot === slot ? 'bg-[#1C1B18] border-[#1C1B18]' : 'border-[#DDD8CB]'
                      }`}>
                        {selectedTimeSlot === slot && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnaround speed */}
              <div>
                <label className="text-xs font-semibold text-[#1C1B18] block mb-2 uppercase tracking-wider">
                  Return Turnaround
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliverySpeed('standard')}
                    className={`p-3.5 rounded-xl border cursor-pointer ${
                      deliverySpeed === 'standard' ? 'bg-white border-[#1C1B18]' : 'bg-white/60 border-[#E3DEC9]'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#1C1B18] block">Standard (48 Hours)</span>
                    <span className="text-[11px] text-[#78756C]">Included with regular care</span>
                  </div>
                  <div
                    onClick={() => setDeliverySpeed('express')}
                    className={`p-3.5 rounded-xl border cursor-pointer ${
                      deliverySpeed === 'express' ? 'bg-white border-[#1C1B18]' : 'bg-white/60 border-[#E3DEC9]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1C1B18]">Express (24 Hours)</span>
                      <span className="text-[10px] font-semibold text-[#8B5E3C]">+₦2,000</span>
                    </div>
                    <span className="text-[11px] text-[#78756C]">Next-day morning return</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 5: REVIEW SUMMARY ================= */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1B18]">
                  Review Order
                </h3>
                <p className="text-xs sm:text-sm text-[#5A574E] mt-1">
                  Verify your laundry details and transparent pricing breakdown.
                </p>
              </div>

              {/* Overview Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#E3DEC9] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] text-xs">
                  <span className="text-[#78756C]">Services:</span>
                  <span className="font-medium text-[#1C1B18]">
                    {selectedServices.map((s) => s.replace('_', ' ')).join(', ').toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] text-xs">
                  <span className="text-[#78756C]">Pickup Time:</span>
                  <span className="font-medium text-[#1C1B18]">
                    {selectedPickupDate} · {selectedTimeSlot}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] text-xs">
                  <span className="text-[#78756C]">Turnaround:</span>
                  <span className="font-medium text-[#1C1B18]">
                    {deliverySpeed === 'express' ? 'Express (24h)' : 'Standard (48h)'}
                  </span>
                </div>

                {/* Garment Breakdown */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-[#78756C] uppercase tracking-wider block mb-2">
                    Itemized Items
                  </span>
                  {Object.keys(selectedItems).length > 0 ? (
                    <div className="space-y-1.5 text-xs">
                      {Object.entries(selectedItems).map(([id, qty]) => {
                        const item = PAY_AS_YOU_GO_ITEMS.find((i) => i.id === id);
                        return (
                          <div key={id} className="flex items-center justify-between text-[#3A3832]">
                            <span>{qty}x {item?.name}</span>
                            <span className="font-mono">{formatNaira((item?.price || 0) * Number(qty))}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-xs text-[#8C887B] italic">
                      Bag items will be counted and tagged upon valet collection.
                    </span>
                  )}
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. WELCOME)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DDD8CB] text-xs bg-white focus:outline-none focus:border-[#1C1B18]"
                />
                <button
                  onClick={applyPromo}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#DDD8CB] text-xs font-semibold text-[#1C1B18] hover:bg-[#EFECE4]"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Final Math Summary */}
              <div className="p-5 rounded-2xl bg-[#F5F2EB] border border-[#E3DEC9] space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[#5A574E]">
                  <span>Items Subtotal</span>
                  <span className="font-mono">{formatNaira(itemsSubtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-[#5A574E]">
                  <span>Pickup / Delivery Fee</span>
                  <span className="font-mono">
                    {pickupDeliveryFee === 0 ? 'FREE (Plan Member)' : formatNaira(pickupDeliveryFee)}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-{formatNaira(appliedDiscount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#DDD7C7] flex items-center justify-between text-sm font-semibold text-[#1C1B18]">
                  <span>Total</span>
                  <span className="font-serif text-lg">{formatNaira(finalTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: PAYMENT ================= */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1C1B18]">
                  Payment Method
                </h3>
                <p className="text-xs sm:text-sm text-[#5A574E] mt-1">
                  Choose your preferred payment method.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2.5">
                {[
                  { id: 'card', label: 'Debit / Credit Card (Mastercard, Visa)', sub: 'Instant secure checkout' },
                  { id: 'transfer', label: 'Direct Bank Transfer', sub: 'Receive automated virtual account' },
                  { id: 'apple_pay', label: 'Apple Pay / Google Pay', sub: 'Fast biometric payment' },
                  { id: 'cash', label: 'Cash on Doorstep Pickup', sub: 'Pay directly to your laundry valet' }
                ].map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-white border-[#1C1B18] shadow-xs'
                        : 'bg-white/60 border-[#E3DEC9] hover:bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#1C1B18] block">{pm.label}</span>
                      <span className="text-[11px] text-[#78756C]">{pm.sub}</span>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === pm.id ? 'bg-[#1C1B18] border-[#1C1B18]' : 'border-[#DDD8CB]'
                    }`}>
                      {paymentMethod === pm.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Payable Box */}
              <div className="p-4 rounded-xl bg-white border border-[#E3DEC9] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#78756C] block">Total Amount to Pay</span>
                  <span className="font-serif text-xl font-semibold text-[#1C1B18]">
                    {formatNaira(finalTotal > 0 ? finalTotal : 1750)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#8B5E3C]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-medium">Encrypted & Safe</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          )}

          {currentStep < 6 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#003BEE] text-white text-xs font-extrabold tracking-wider uppercase hover:bg-blue-700 transition-all shadow-md"
              id="booking-next-step-btn"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold tracking-wider uppercase hover:bg-[#d6b15a] transition-all shadow-md disabled:opacity-50"
              id="place-order-final-btn"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#0A192F] border-t-transparent animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Book Pickup</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
