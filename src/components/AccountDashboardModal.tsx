import React, { useState, useEffect } from 'react';
import { 
  X, User, MapPin, CreditCard, Sparkles, Clock, Check, 
  ArrowRight, ShieldCheck, Plus, Trash2, Edit2, LogOut, ChevronRight
} from 'lucide-react';
import { UserProfile, Order, SubscriptionPlan } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/laundryData';

interface AccountDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateUserProfile: (profile: UserProfile) => void;
  orders: Order[];
  onOpenOrderTracker: (orderId: string) => void;
  onBookPickup: () => void;
  onUpgradePlan: (plan: SubscriptionPlan) => void;
}

export const AccountDashboardModal: React.FC<AccountDashboardModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateUserProfile,
  orders,
  onOpenOrderTracker,
  onBookPickup,
  onUpgradePlan
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'subscription' | 'addresses'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editPhone, setEditPhone] = useState(userProfile.phone);

  // New address form state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrText, setNewAddrText] = useState('');

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

  if (!isOpen) return null;

  const activeOrder = orders.find((o) => o.status !== 'Delivered');
  const pastOrders = orders.filter((o) => o.status === 'Delivered');

  const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleSaveProfile = () => {
    onUpdateUserProfile({
      ...userProfile,
      name: editName,
      email: editEmail,
      phone: editPhone
    });
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    if (!newAddrLabel || !newAddrText) return;
    const newEntry = {
      id: `addr_${Date.now()}`,
      label: newAddrLabel,
      address: newAddrText,
      isDefault: userProfile.savedAddresses.length === 0
    };
    onUpdateUserProfile({
      ...userProfile,
      savedAddresses: [...userProfile.savedAddresses, newEntry]
    });
    setNewAddrLabel('');
    setNewAddrText('');
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    onUpdateUserProfile({
      ...userProfile,
      savedAddresses: userProfile.savedAddresses.filter((a) => a.id !== id)
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    onUpdateUserProfile({
      ...userProfile,
      savedAddresses: userProfile.savedAddresses.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-[#E3DEC9] overflow-hidden max-h-[92vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-6 bg-[#003BEE] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8A24C] text-[#0A192F] font-extrabold text-sm flex items-center justify-center shadow-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {userProfile.name}
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                {userProfile.email} · {userProfile.phone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            id="close-account-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-white border-b border-slate-200 flex space-x-6 text-xs font-bold overflow-x-auto">
          {[
            { id: 'orders', label: 'My Orders' },
            { id: 'subscription', label: 'Semester Plan' },
            { id: 'addresses', label: 'Hostel & Lodge Addresses' },
            { id: 'profile', label: 'Student Profile' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 border-b-2 tracking-wider uppercase whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-[#003BEE] text-[#003BEE]'
                  : 'border-transparent text-slate-500 hover:text-[#003BEE]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-slate-50">
          
          {/* ================= TAB 1: ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Active Order Card */}
              {activeOrder ? (
                <div className="p-6 rounded-3xl bg-white border-2 border-[#003BEE] shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-[#003BEE] uppercase block">
                        Live Campus Order
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <h3 className="font-mono text-base font-bold text-[#0A192F]">
                          {activeOrder.orderNumber}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4EC6C1]/20 text-[#003BEE] text-xs font-bold border border-[#4EC6C1]/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#003BEE] animate-pulse" />
                          {activeOrder.status}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenOrderTracker(activeOrder.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#003BEE] text-white text-xs font-bold tracking-wider uppercase hover:bg-blue-700 transition-all shadow-xs"
                      id="account-track-live-btn"
                    >
                      <span>Track Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-[#0A192F] block">Hostel Pickup Window:</span>
                      <span>{activeOrder.pickupDate} ({activeOrder.pickupTimeSlot})</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#0A192F] block">Doorstep Return:</span>
                      <span>{activeOrder.estimatedDeliveryDate} ({activeOrder.estimatedDeliveryTimeSlot})</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    <span>Hostel Address: {activeOrder.pickupAddress}</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white border border-blue-100 text-center space-y-3 shadow-xs">
                  <p className="text-sm text-slate-500 font-medium">No laundry orders currently in progress.</p>
                  <button
                    onClick={() => {
                      onClose();
                      onBookPickup();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C8A24C] text-[#0A192F] text-xs font-extrabold tracking-wider uppercase hover:bg-[#d6b15a] shadow-xs"
                  >
                    <span>Schedule Hostel Pickup</span>
                  </button>
                </div>
              )}

              {/* Past Orders History */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0A192F]">
                  Recent Completed Orders
                </h3>

                <div className="divide-y divide-slate-100 border border-blue-100 rounded-3xl bg-white overflow-hidden shadow-xs">
                  {pastOrders.map((ord) => (
                    <div key={ord.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-blue-50/30 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm font-bold text-[#0A192F]">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-slate-500">· {ord.date}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[11px] font-bold text-[#003BEE]">
                            Delivered
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                          {ord.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <span className="text-base font-extrabold text-[#003BEE]">
                          {formatNaira(ord.total)}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenOrderTracker(ord.id);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-[#003BEE] hover:bg-blue-50"
                        >
                          View Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 2: SUBSCRIPTION PLAN ================= */}
          {activeTab === 'subscription' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {userProfile.activePlan ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-100 space-y-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#003BEE] uppercase tracking-wider block">
                        Current FreshFits Plan
                      </span>
                      <h3 className="text-3xl font-extrabold text-[#0A192F] mt-1">
                        {userProfile.activePlan.planName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Valid until {userProfile.activePlan.validUntil} · Free weekly hostel pickup & return
                      </p>
                    </div>

                    <span className="px-4 py-1.5 rounded-full bg-[#4EC6C1] text-[#003BEE] text-xs font-black tracking-wider uppercase self-start sm:self-auto shadow-xs">
                      Active Member
                    </span>
                  </div>

                  {/* Quota Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0A192F]">
                      <span>Weekly Garment Allowance</span>
                      <span className="font-mono text-[#003BEE]">{userProfile.activePlan.quotaUsed} / {userProfile.activePlan.quotaTotal} Used</span>
                    </div>
                    <div className="w-full bg-blue-50 h-2.5 rounded-full overflow-hidden border border-blue-100">
                      <div 
                        className="bg-[#003BEE] h-2.5 rounded-full transition-all"
                        style={{ width: `${(userProfile.activePlan.quotaUsed / userProfile.activePlan.quotaTotal) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Resets every Monday morning. Includes wash, steam press, and FreshFits breathable packaging.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white border border-blue-100 text-center space-y-4 shadow-xs">
                  <h3 className="text-2xl font-bold text-[#0A192F]">
                    No Active Semester Plan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Save time and stay sharp all semester with plans starting from ₦100,000.
                  </p>
                </div>
              )}

              {/* Upgrade / Change Plan cards */}
              <div>
                <h4 className="text-lg font-bold text-[#0A192F] mb-4">
                  Available FreshFits Semester Plans
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <div key={plan.id} className="p-5 rounded-2xl bg-white border border-blue-100 space-y-3 flex flex-col justify-between shadow-xs hover:border-[#003BEE] transition-all">
                      <div>
                        <span className="text-xs font-bold text-[#003BEE] block uppercase">{plan.name}</span>
                        <span className="text-xl font-extrabold text-[#0A192F]">{formatNaira(plan.price)}</span>
                        <span className="text-[11px] text-slate-500 block font-medium">{plan.period}</span>
                        <p className="text-xs text-slate-600 mt-2 font-medium">{plan.clothesPerWeek} clothes / week · {plan.washType}</p>
                      </div>
                      <button
                        onClick={() => {
                          onUpgradePlan(plan);
                          onClose();
                        }}
                        className="w-full py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-[#003BEE] hover:bg-[#003BEE] hover:text-white transition-all shadow-xs"
                      >
                        Switch to {plan.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: SAVED ADDRESSES ================= */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0A192F]">
                  Hostel & Room Locations
                </h3>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#003BEE] text-white text-xs font-bold shadow-xs hover:bg-blue-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Location</span>
                </button>
              </div>

              {showAddAddress && (
                <div className="p-5 rounded-2xl bg-white border border-[#003BEE] space-y-3 shadow-md">
                  <span className="text-xs font-bold text-[#003BEE] block">Add New Campus Location</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Label (e.g. Hall 4 Room B204, Off-Campus Lodge)"
                      value={newAddrLabel}
                      onChange={(e) => setNewAddrLabel(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-blue-200 text-xs focus:outline-none focus:border-[#003BEE]"
                    />
                    <input
                      type="text"
                      placeholder="Full Address & Landmark"
                      value={newAddrText}
                      onChange={(e) => setNewAddrText(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-blue-200 text-xs focus:outline-none focus:border-[#003BEE]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddAddress}
                      className="px-4 py-1.5 rounded-xl bg-[#003BEE] text-white text-xs font-bold hover:bg-blue-700"
                    >
                      Save Location
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {userProfile.savedAddresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-2xl bg-white border border-blue-100 flex items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#003BEE] mt-0.5 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0A192F]">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003BEE] font-bold border border-blue-200">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 font-medium">{addr.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="px-2.5 py-1 text-[11px] font-bold text-[#003BEE] hover:underline"
                        >
                          Make Default
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: PERSONAL INFO ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-white border border-blue-100 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-[#0A192F]">
                    Student Profile Details
                  </h3>
                  {!isEditingProfile ? (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-[#003BEE] hover:bg-blue-50"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Info</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-1.5 rounded-xl bg-[#003BEE] text-white text-xs font-bold hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  )}
                </div>

                {!isEditingProfile ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-1 font-medium">Full Name</span>
                      <span className="font-bold text-[#0A192F] text-sm">{userProfile.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1 font-medium">Email Address</span>
                      <span className="font-bold text-[#0A192F] text-sm">{userProfile.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1 font-medium">Phone Number</span>
                      <span className="font-bold text-[#0A192F] text-sm">{userProfile.phone}</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs focus:outline-none focus:border-[#003BEE]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs focus:outline-none focus:border-[#003BEE]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-blue-200 text-xs focus:outline-none focus:border-[#003BEE]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-5 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">FreshFits Wash & Fold Campus Account</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#003BEE] text-white text-xs font-bold tracking-wider uppercase hover:bg-blue-700 transition-all shadow-md"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
