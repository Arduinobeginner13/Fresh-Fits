import { ServiceItem, PayAsYouGoItem, SubscriptionPlan, Order, UserProfile } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'wash_fold',
    name: 'Campus Wash & Fold',
    tagline: 'Everyday hoodies, tees & gym fits',
    description: 'Separated by colors and fabric types, thoroughly cleansed using premium stain-lifting & fabric-safe detergents, tumble dried, and folded crisp ready for your wardrobe.',
    turnaround: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Gentle temperature-controlled wash',
      'Hypoallergenic fragrance boost',
      'Garment separation (lights, colors, darks)',
      'Sealed moisture-proof FreshFits bag packaging'
    ],
    careNotes: 'Essential for lecture wear, varsity hoodies, gym clothes, denim, and daily essentials.',
    popularItems: ['Graphic Tees', 'Jeans & Cargos', 'Sweatpants', 'Hoodies']
  },
  {
    id: 'wash_iron',
    name: 'Wash & Steam Iron',
    tagline: 'Sharp presentation & hanger ready',
    description: 'Thorough gentle wash followed by precision high-pressure steam pressing. Delivered on wooden/protective hangers or neatly boxed so you always look flawless for presentations and events.',
    turnaround: '24–48 Hours',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Steam-calibrated press for razor-sharp creases',
      'Collar & cuff structural treatment',
      'Starch level preference upon request',
      'Dust-free protective hanger covers'
    ],
    careNotes: 'Ideal for class presentations, formal dinners, internship wear, native attire, and church services.',
    popularItems: ['Button-down Shirts', 'Chinos & Slacks', 'Traditional Attire', 'Blouses']
  },
  {
    id: 'dry_cleaning',
    name: 'Blazer & Dry Cleaning',
    tagline: 'Premium care for delicate fibers & formals',
    description: 'Waterless eco-purification specifically calibrated for structured blazers, suits, woolens, silk dresses, and graduation/convocation regalia.',
    turnaround: '48–72 Hours',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Deep chemical-safe fiber treatment',
      'Pre-spot stain removal inspection',
      'Fiber rejuvenation & color preservation',
      'Heavy-duty dust & UV shield packaging'
    ],
    careNotes: 'Mandatory for student blazers, evening gowns, tailored suits, knitwear, and convocation gowns.',
    popularItems: ['Blazers & Suits', 'Convocation Gowns', 'Wool Sweaters', 'Formal Dresses']
  },
  {
    id: 'shoes_bags',
    name: 'Sneakers & Backpack Spa',
    tagline: 'Kicks restoration & campus bag care',
    description: 'Deep sole detailing, upper stain removal, odor neutralization, and waterproof conditioning for sneakers, canvas footwear, and daily lecture backpacks.',
    turnaround: '2–4 Days',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Hand-cleansed with specialized sneaker foam',
      'Deep insole sterilization & scent treatment',
      'Midsole scrub & un-yellowing treatment',
      'Waterproof repellant finish'
    ],
    careNotes: 'Perfect for campus sneakers, running kicks, leather boots, lecture totes, and heavy backpacks.',
    popularItems: ['Sneakers & Dunks', 'Canvas Shoes', 'Campus Backpacks', 'Gym Bags']
  },
  {
    id: 'bedding_linen',
    name: 'Hostel Bedding & Duvets',
    tagline: 'Hygiene-first sleep setup refresh',
    description: 'Heavy-capacity laundering with thermal sanitization for dorm bedsheets, thick duvets, fluffy blankets, pillowcases, and extra-absorbent bath towels.',
    turnaround: '48 Hours',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Thermal anti-allergen & anti-mite wash',
      'Even-down loft distribution during drying',
      'Crisp sheet smoothing & steam press',
      'Vacuum-sealed hygienic delivery packaging'
    ],
    careNotes: 'Ensures your hostel room smells crisp and your bedding stays 100% clean and allergy-free.',
    popularItems: ['Comforters & Duvets', 'Bedsheets', 'Bath Towels', 'Pillowcases']
  }
];

export const PAY_AS_YOU_GO_ITEMS: PayAsYouGoItem[] = [
  {
    id: 'general_clothing',
    name: 'General Clothing',
    price: 350,
    category: 'clothing',
    description: 'Tees, polos, shirts, shorts, skirts, casual trousers & everyday campus fits.'
  },
  {
    id: 'bedsheet',
    name: 'Bedsheet',
    price: 700,
    category: 'household',
    description: 'Single/Double hostel bedsheets, fitted sheets & pillow slip pairs.'
  },
  {
    id: 'towel',
    name: 'Bath Towel',
    price: 700,
    category: 'household',
    description: 'Thick bath towels, gym towels & plush body wraps.'
  },
  {
    id: 'suit',
    name: 'Suit / Blazer',
    price: 3000,
    category: 'specialty',
    description: '2-piece or 3-piece tailored suit, campus blazers & formal jackets.'
  },
  {
    id: 'hoodie',
    name: 'Hoodie / Sweatshirt',
    price: 500,
    category: 'clothing',
    description: 'Heavy fleece hoodies, oversized crewnecks, varsity jumpers & sweaters.'
  },
  {
    id: 'duvet',
    name: 'Duvet / Comforter',
    price: 2500,
    category: 'household',
    description: 'Thick fiber duvets, weighted blankets, comforters & quilts.'
  },
  {
    id: 'shoes_bag',
    name: 'Sneakers / Backpack',
    price: 1200,
    category: 'specialty',
    description: 'Sneakers detailing, canvas trainers, campus daypacks & gym bags.'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'lite',
    name: 'LITE',
    price: 100000,
    period: '/ semester',
    clothesPerWeek: 20,
    washType: 'Wash & Fold',
    features: [
      '20 clothes per week',
      'Wash & Fold included',
      'Free hostel / doorstep pickup',
      'Express 24–48hr turnaround',
      'Complimentary garment bag'
    ]
  },
  {
    id: 'silver',
    name: 'SILVER',
    price: 150000,
    period: '/ semester',
    clothesPerWeek: 20,
    washType: 'Wash & Iron',
    isPopular: true,
    features: [
      '20 clothes per week',
      'Wash & Precision Steam Iron',
      'Free hostel / doorstep pickup',
      'Priority express processing',
      'Complimentary wooden hangers & bags',
      '1 Free sneaker spa per month'
    ]
  },
  {
    id: 'gold',
    name: 'GOLD',
    price: 185000,
    period: '/ semester',
    clothesPerWeek: 25,
    washType: 'Wash & Iron + Specialty',
    features: [
      '25 clothes per week',
      'Wash & Precision Steam Iron',
      'Includes 2 Blazer/Dry Clean per semester',
      'Free priority rush turnaround',
      'VIP hostel room pickup & return',
      '2 Free sneaker spats per month'
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Adeyemi Akinoluwa',
  email: 'adeyemidoroakinoluwa@gmail.com',
  phone: '+234 803 456 7890',
  activePlan: {
    planId: 'silver',
    planName: 'SILVER Campus Plan',
    validUntil: 'Dec 15, 2026',
    quotaUsed: 14,
    quotaTotal: 20
  },
  savedAddresses: [
    {
      id: 'addr_1',
      label: 'Campus Hall of Residence',
      address: 'Block B, Room 214, New Hall, Main Campus',
      isDefault: true
    },
    {
      id: 'addr_2',
      label: 'Off-Campus Student Lodge',
      address: 'Apt 4B, Harmony Heights, University Road, Lagos',
      isDefault: false
    }
  ],
  savedCards: [
    {
      id: 'card_1',
      brand: 'mastercard',
      last4: '4829',
      expiry: '08/28'
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_active_01',
    orderNumber: 'FF-94820',
    date: 'Aug 17, 2026',
    status: 'Washing',
    serviceTypes: ['wash_iron', 'wash_fold'],
    items: [
      { item: PAY_AS_YOU_GO_ITEMS[0], quantity: 8 },
      { item: PAY_AS_YOU_GO_ITEMS[4], quantity: 2 },
      { item: PAY_AS_YOU_GO_ITEMS[6], quantity: 1 }
    ],
    subtotal: 5000,
    pickupDeliveryFee: 0,
    discount: 0,
    total: 5000,
    pickupAddress: 'Block B, Room 214, New Hall, Main Campus',
    deliveryAddress: 'Block B, Room 214, New Hall, Main Campus',
    pickupDate: 'Aug 17, 2026',
    pickupTimeSlot: '09:00 AM – 11:00 AM',
    estimatedDeliveryDate: 'Aug 19, 2026',
    estimatedDeliveryTimeSlot: '03:00 PM – 05:00 PM',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    specialNotes: 'Steam iron the presentation polo shirts and hoodie gently.',
    driverName: 'Chidi Okonkwo (Campus Valet)',
    driverPhone: '+234 802 987 6543',
    statusHistory: [
      {
        status: 'Pickup',
        timestamp: 'Aug 17, 08:30 AM',
        description: 'Pickup scheduled with FreshFits campus valet Chidi.',
        completed: true
      },
      {
        status: 'Collected',
        timestamp: 'Aug 17, 09:40 AM',
        description: 'Laundry bag collected from hostel room and sealed in bag #FF-820.',
        completed: true
      },
      {
        status: 'At Facility',
        timestamp: 'Aug 17, 11:15 AM',
        description: 'Arrived at FreshFits Wash & Fold Hub. Barcode scanned & garments sorted.',
        completed: true
      },
      {
        status: 'Washing',
        timestamp: 'Aug 18, 08:00 AM',
        description: 'Active cycle running with anti-stain & color lock fabric detergents.',
        completed: true
      },
      {
        status: 'Ready',
        timestamp: 'Expected Aug 18, 04:30 PM',
        description: 'Steam pressing, crisp folding, and signature FreshFits packaging.',
        completed: false
      },
      {
        status: 'Out for Delivery',
        timestamp: 'Expected Aug 19, 01:30 PM',
        description: 'FreshFits campus courier dispatched to your hostel/residence.',
        completed: false
      },
      {
        status: 'Delivered',
        timestamp: 'Expected Aug 19, 03:30 PM',
        description: 'Delivered fresh and ready to wear for class and events.',
        completed: false
      }
    ]
  },
  {
    id: 'ord_past_02',
    orderNumber: 'FF-91045',
    date: 'Aug 04, 2026',
    status: 'Delivered',
    serviceTypes: ['wash_fold', 'bedding_linen'],
    items: [
      { item: PAY_AS_YOU_GO_ITEMS[0], quantity: 15 },
      { item: PAY_AS_YOU_GO_ITEMS[5], quantity: 1 },
      { item: PAY_AS_YOU_GO_ITEMS[2], quantity: 2 }
    ],
    subtotal: 9150,
    pickupDeliveryFee: 0,
    discount: 500,
    total: 8650,
    pickupAddress: 'Block B, Room 214, New Hall, Main Campus',
    deliveryAddress: 'Block B, Room 214, New Hall, Main Campus',
    pickupDate: 'Aug 04, 2026',
    pickupTimeSlot: '10:00 AM – 12:00 PM',
    estimatedDeliveryDate: 'Aug 06, 2026',
    estimatedDeliveryTimeSlot: '03:00 PM – 05:00 PM',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    statusHistory: [
      {
        status: 'Delivered',
        timestamp: 'Aug 06, 03:40 PM',
        description: 'Delivered directly to room door in signature FreshFits bag.',
        completed: true
      }
    ]
  },
  {
    id: 'ord_past_03',
    orderNumber: 'FF-86912',
    date: 'Jul 22, 2026',
    status: 'Delivered',
    serviceTypes: ['shoes_bags', 'wash_iron'],
    items: [
      { item: PAY_AS_YOU_GO_ITEMS[6], quantity: 2 },
      { item: PAY_AS_YOU_GO_ITEMS[3], quantity: 1 }
    ],
    subtotal: 5400,
    pickupDeliveryFee: 0,
    discount: 0,
    total: 5400,
    pickupAddress: 'Apt 4B, Harmony Heights, University Road, Lagos',
    deliveryAddress: 'Apt 4B, Harmony Heights, University Road, Lagos',
    pickupDate: 'Jul 22, 2026',
    pickupTimeSlot: '02:00 PM – 04:00 PM',
    estimatedDeliveryDate: 'Jul 25, 2026',
    estimatedDeliveryTimeSlot: '11:00 AM – 01:00 PM',
    paymentMethod: 'transfer',
    paymentStatus: 'paid',
    statusHistory: [
      {
        status: 'Delivered',
        timestamp: 'Jul 25, 11:45 AM',
        description: 'Sneakers restored and blazer hung with protective cover.',
        completed: true
      }
    ]
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How do hostel & campus pickups work?',
    answer: 'Select your hall of residence, room number, or off-campus lodge when booking. Our FreshFits student valets come right to your door with a personalized FreshFits laundry bag, scan your order barcode, and safely transport it to our wash hub.'
  },
  {
    question: 'How fast will my clothes be returned?',
    answer: 'Standard Wash & Fold is delivered back within 24 to 48 hours. If you need it urgently for an upcoming presentation or weekend event, express turnaround options deliver back next-day.'
  },
  {
    question: 'How do the Semester Subscription Plans work?',
    answer: 'Our semester plans (Lite at ₦100k, Silver at ₦150k, Gold at ₦185k) give you 20 to 25 garments washed and steam pressed every single week throughout the academic semester. Free doorstep pickup, priority processing, and zero laundry stress.'
  },
  {
    question: 'Can I just pay per item if I do not want a subscription?',
    answer: 'Yes! Our Pay-As-You-Go campus rate card starts at just ₦350 per general clothing item (t-shirts, shorts, trousers), ₦500 for heavy hoodies, and ₦1,200 for sneakers/backpacks. Book anytime without recurring commitment.'
  },
  {
    question: 'Do you separate whites, darks, and delicate items?',
    answer: 'Always. Every student order is individually barcoded, sorted by color temperature and fabric weight, and washed separately from other students clothes in state-of-the-art sanitizing machines.'
  },
  {
    question: 'How do I track my active laundry order?',
    answer: 'Click "Track Order" on the top bar or inside your account. You can watch live updates across all 7 steps: Pickup → Collected → At Hub → Washing → Ready → Out for Delivery → Delivered with courier contact details.'
  },
  {
    question: 'How do I contact the FreshFits campus team?',
    answer: 'Tap the WhatsApp button for instant support from our campus concierge, email support@freshfitslaundry.com, or talk to our registered student campus ambassadors at your hostel.'
  }
];
