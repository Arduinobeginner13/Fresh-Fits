export type ServiceType = 
  | 'wash_fold' 
  | 'wash_iron' 
  | 'dry_cleaning' 
  | 'shoes_bags' 
  | 'bedding_linen';

export interface ServiceItem {
  id: ServiceType;
  name: string;
  tagline: string;
  description: string;
  turnaround: string;
  image: string;
  features: string[];
  careNotes: string;
  popularItems: string[];
}

export interface PayAsYouGoItem {
  id: string;
  name: string;
  price: number; // in NGN
  category: 'clothing' | 'household' | 'specialty';
  description: string;
  iconName?: string;
}

export interface SubscriptionPlan {
  id: 'lite' | 'silver' | 'gold';
  name: string;
  price: number; // in NGN
  period: string; // '/ semester'
  clothesPerWeek: number;
  washType: string;
  features: string[];
  isPopular?: boolean;
}

export type OrderStatus = 
  | 'Pickup'
  | 'Collected'
  | 'At Facility'
  | 'Washing'
  | 'Ready'
  | 'Out for Delivery'
  | 'Delivered';

export interface OrderItemEntry {
  item: PayAsYouGoItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  serviceTypes: ServiceType[];
  items: OrderItemEntry[];
  subtotal: number;
  pickupDeliveryFee: number;
  discount: number;
  total: number;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  pickupTimeSlot: string;
  estimatedDeliveryDate: string;
  estimatedDeliveryTimeSlot: string;
  paymentMethod: 'card' | 'transfer' | 'apple_pay' | 'cash';
  paymentStatus: 'paid' | 'pending';
  specialNotes?: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
  driverName?: string;
  driverPhone?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  activePlan?: {
    planId: 'lite' | 'silver' | 'gold';
    planName: string;
    validUntil: string;
    quotaUsed: number;
    quotaTotal: number;
  };
  savedAddresses: {
    id: string;
    label: string;
    address: string;
    isDefault: boolean;
  }[];
  savedCards: {
    id: string;
    brand: 'mastercard' | 'visa';
    last4: string;
    expiry: string;
  }[];
}

export interface BookingState {
  step: number; // 1 to 6
  selectedServices: ServiceType[];
  selectedItems: Record<string, number>; // itemId -> count
  itemNotes: Record<string, string>;
  addressType: 'saved' | 'new';
  selectedAddressId: string;
  customAddress: {
    street: string;
    city: string;
    state: string;
    landmark?: string;
    contactPhone: string;
  };
  pickupDate: string;
  pickupTimeSlot: string;
  deliverySpeed: 'standard' | 'express';
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialInstructions: string;
  promoCode: string;
  discountAmount: number;
  paymentMethod: 'card' | 'transfer' | 'apple_pay' | 'cash';
}
