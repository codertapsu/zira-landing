export const navLinks = [
  { label: "Products", href: "#how-it-works" },
  { label: "Business Solutions", href: "#ready-to-ride" },
  { label: "Help Center", href: "#testimonials" },
  { label: "Pricing", href: "#download" },
] as const;

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  icon?: "mail" | "building" | "car";
}

export const howItWorksFeatures: FeatureItem[] = [
  {
    number: "1",
    title: "Real-time Tracking",
    description: "Track your ride's progress in real-time.",
  },
  {
    number: "2",
    title: "Secure Payments",
    description: "Safe and seamless payment options.",
  },
  {
    number: "3",
    title: "Ride Options",
    description: "Choose from various ride types for your convenience.",
  },
  {
    number: "4",
    title: "Driver Ratings",
    description: "Rate drivers to ensure quality service.",
  },
];

export const readyToRideFeatures: FeatureItem[] = [
  {
    number: "01",
    title: "Real-time Tracking",
    description: "Track your ride's progress in real-time.",
    icon: "mail",
  },
  {
    number: "02",
    title: "Secure Payments",
    description: "Safe and seamless payment options.",
    icon: "building",
  },
  {
    number: "03",
    title: "Ride Options",
    description: "Choose from various ride types for your convenience.",
    icon: "car",
  },
];

export type TestimonialAccent =
  | "amber"
  | "peach"
  | "rose"
  | "sage"
  | "sky"
  | "lilac";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: TestimonialAccent;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Fast and convenient. My go-to ride-hailing app!",
    name: "John D",
    role: "Director, Producer",
    initials: "JD",
    accent: "amber",
    rating: 4,
  },
  {
    quote: "Friendly drivers and easy booking process.",
    name: "Emily R",
    role: "Product Manager",
    initials: "ER",
    accent: "peach",
    rating: 4,
  },
  {
    quote:
      "The gradual accumulation of information about atomic and small-scale behaviour...",
    name: "Annette Black",
    role: "Senior Designer",
    initials: "AB",
    accent: "rose",
    rating: 5,
  },
  {
    quote:
      "Booking, tracking, and paying — all in one place. RideEasy makes commuting feel effortless.",
    name: "Marcus Lee",
    role: "Software Engineer",
    initials: "ML",
    accent: "sage",
    rating: 5,
  },
  {
    quote: "I love the live ETA updates. I always know exactly when my ride will arrive.",
    name: "Priya Shah",
    role: "Marketing Lead",
    initials: "PS",
    accent: "sky",
    rating: 5,
  },
  {
    quote: "Affordable pricing without the surge nonsense. RideEasy is fair and clear.",
    name: "Daniel Ortiz",
    role: "Photographer",
    initials: "DO",
    accent: "lilac",
    rating: 4,
  },
  {
    quote: "Drivers are always polite and professional. The cars are spotless every time.",
    name: "Sophie Tran",
    role: "Operations Lead",
    initials: "ST",
    accent: "amber",
    rating: 5,
  },
  {
    quote: "The in-app chat with the driver is so handy when I'm hard to spot at pickup.",
    name: "Kenji Watanabe",
    role: "Product Designer",
    initials: "KW",
    accent: "peach",
    rating: 4,
  },
  {
    quote: "Splitting fares with friends has never been this easy. RideEasy nailed it.",
    name: "Leila Hassan",
    role: "Student",
    initials: "LH",
    accent: "rose",
    rating: 5,
  },
  {
    quote: "I switched from another app and never looked back. The interface is so clean.",
    name: "Owen McGrath",
    role: "Consultant",
    initials: "OM",
    accent: "sage",
    rating: 5,
  },
  {
    quote: "Saved trips and favorite places save me 30 seconds every morning. Worth it.",
    name: "Rina Kapoor",
    role: "Daily Commuter",
    initials: "RK",
    accent: "sky",
    rating: 4,
  },
  {
    quote: "Customer support replied within minutes when I lost my phone in a car. Heroes.",
    name: "Tomás Rivera",
    role: "Writer",
    initials: "TR",
    accent: "lilac",
    rating: 5,
  },
];
