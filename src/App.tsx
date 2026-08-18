import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { TrustSection } from './components/TrustSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AccountDashboardModal } from './components/AccountDashboardModal';
import { MobileFloatingCTA } from './components/MobileFloatingCTA';
import { ToastContainer, ToastMessage } from './components/Toast';

import { INITIAL_USER_PROFILE, INITIAL_ORDERS } from './data/laundryData';
import { Order, OrderStatus, SubscriptionPlan, UserProfile } from './types';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  
  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState<string | undefined>(undefined);
  const [bookingInitialItems, setBookingInitialItems] = useState<Record<string, number> | undefined>(undefined);

  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Find latest active order
  const activeOrder = orders.find((o) => o.status !== 'Delivered') || orders[0];
  const currentTrackingOrder = orders.find((o) => o.id === trackingOrderId) || activeOrder;

  const showToast = (title: string, message?: string, type: 'success' | 'info' = 'success') => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Launch booking
  const handleOpenBooking = (serviceId?: string, items?: Record<string, number>) => {
    setBookingInitialService(serviceId);
    setBookingInitialItems(items);
    setBookingModalOpen(true);
  };

  // Launch order tracking
  const handleOpenTracking = (orderId?: string) => {
    if (orderId) {
      setTrackingOrderId(orderId);
    } else if (activeOrder) {
      setTrackingOrderId(activeOrder.id);
    }
    setTrackingModalOpen(true);
  };

  // New order created
  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setTrackingOrderId(newOrder.id);
    setTrackingModalOpen(true);
    showToast(
      'Pickup Scheduled Successfully',
      `Order ${newOrder.orderNumber} is assigned. Our valet will arrive on ${newOrder.pickupDate}.`
    );
  };

  // Update order status (for simulation and live progress)
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const updatedHistory = ord.statusHistory.map((h) => ({
          ...h,
          completed: h.status === newStatus || ord.statusHistory.findIndex(x => x.status === x.status) <= ord.statusHistory.findIndex(x => x.status === newStatus)
        }));

        return {
          ...ord,
          status: newStatus,
          statusHistory: updatedHistory
        };
      })
    );
    showToast('Order Status Updated', `Order is now in stage: ${newStatus}`);
  };

  // Choose / change subscription plan
  const handleChoosePlan = (plan: SubscriptionPlan) => {
    setUserProfile((prev) => ({
      ...prev,
      activePlan: {
        planId: plan.id,
        planName: `${plan.name} Plan`,
        validUntil: 'Dec 31, 2026',
        quotaUsed: 0,
        quotaTotal: plan.clothesPerWeek
      }
    }));
    showToast(
      `${plan.name} Membership Activated`,
      `You are now enrolled in the ${plan.name} semester plan with ${plan.clothesPerWeek} clothes/week.`
    );
  };

  const handlePlaceOneTimeOrder = (preselectedItems?: Record<string, number>) => {
    handleOpenBooking(undefined, preselectedItems);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B18] flex flex-col selection:bg-[#E2DDD3] selection:text-[#1C1B18]">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAccount={() => setAccountModalOpen(true)}
        onOpenTracking={(orderId) => handleOpenTracking(orderId)}
        activeOrder={activeOrder}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          onSchedulePickup={() => handleOpenBooking()}
          onExploreServices={handleScrollToServices}
        />

        {/* 2. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 3. How It Works Section */}
        <HowItWorks
          onSchedulePickup={() => handleOpenBooking()}
        />

        {/* 4. Services Section with Detail Modals */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId) => handleOpenBooking(serviceId)}
        />

        {/* 5. Pricing Section (Subscriptions & Pay As You Go) */}
        <PricingSection
          onChoosePlan={handleChoosePlan}
          onPlaceOneTimeOrder={handlePlaceOneTimeOrder}
        />

        {/* 6. Trust & Garment Care Section */}
        <TrustSection />

        {/* 7. Contact & Support Section */}
        <ContactSection
          onSchedulePickup={() => handleOpenBooking()}
        />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />

      </main>

      {/* Footer */}
      <Footer
        onSchedulePickup={() => handleOpenBooking()}
        onOpenAccount={() => setAccountModalOpen(true)}
      />

      {/* Mobile Persistent Floating Quick Booking Bar */}
      <MobileFloatingCTA
        onSchedulePickup={() => handleOpenBooking()}
        onOpenTracking={(orderId) => handleOpenTracking(orderId)}
        activeOrder={activeOrder}
      />

      {/* Multi-Step Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialServiceId={bookingInitialService}
        initialItems={bookingInitialItems}
        userProfile={userProfile}
        onOrderCreated={handleOrderCreated}
      />

      {/* Dedicated Order Tracking Modal */}
      <OrderTrackerModal
        isOpen={trackingModalOpen}
        order={currentTrackingOrder}
        onClose={() => setTrackingModalOpen(false)}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Customer Account Dashboard Modal */}
      <AccountDashboardModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        userProfile={userProfile}
        onUpdateUserProfile={setUserProfile}
        orders={orders}
        onOpenOrderTracker={(orderId) => handleOpenTracking(orderId)}
        onBookPickup={() => handleOpenBooking()}
        onUpgradePlan={handleChoosePlan}
      />

    </div>
  );
}
