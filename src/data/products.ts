export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  tagline: string;

  // NEW (required for product detail page)
  images: string[]; // gallery
  specs: {
    weight?: string;
    dimensions?: string;
    power?: string;
    connectivity?: string;
    material?: string;
  };
  features: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
}

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Aura Smart Coffee Machine",
    price: 299.99,
    description:
      "Automated bean-to-cup coffee machine with app control and precision brewing.",
    image:
      "https://images.pexels.com/photos/34836209/pexels-photo-34836209.jpeg",
    images: [
    
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    ],
    category: "Appliances",
    tagline: "Your perfect cup, seamlessly.",
    specs: {
      weight: "4.2 kg",
      dimensions: "32 x 24 x 38 cm",
      power: "1450W",
      connectivity: "WiFi + Bluetooth",
      material: "Stainless Steel",
    },
    features: [
      "Bean-to-cup grinding",
      "App control",
      "Auto milk frothing",
      "Self-cleaning",
    ],
    stock: 12,
    rating: 4.6,
    reviewsCount: 128,
  },

  {
    id: "prod-2",
    name: "EcoGrow Greenhouse System",
    price: 849.5,
    description:
      "Fully automated indoor greenhouse system with real-time monitoring.",
    image:
      "https://images.pexels.com/photos/29659163/pexels-photo-29659163.jpeg",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4ce11",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    ],
    category: "Garden",
    tagline: "Nature, elevated.",
    specs: {
      weight: "18 kg",
      dimensions: "120 x 60 x 180 cm",
      power: "220W",
      connectivity: "WiFi",
      material: "Aluminum + Glass",
    },
    features: [
      "Climate automation",
      "Humidity control",
      "AI plant monitoring",
      "Remote access",
    ],
    stock: 5,
    rating: 4.8,
    reviewsCount: 64,
  },

  {
    id: "prod-3",
    name: "Nexus Home Automation Hub",
    price: 149.0,
    description:
      "Central hub connecting all smart devices with seamless automation.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.pexels.com/photos/27443421/pexels-photo-27443421.jpeg",
      "https://images.unsplash.com/photo-1518449037947-93d1c8c3c54c",
    ],
    category: "Hubs",
    tagline: "Command your domain.",
    specs: {
      weight: "0.8 kg",
      dimensions: "15 x 15 x 5 cm",
      power: "25W",
      connectivity: "Zigbee, Z-Wave, WiFi",
      material: "Polycarbonate",
    },
    features: [
      "1000+ device support",
      "Voice assistant integration",
      "Automation routines",
      "Secure cloud sync",
    ],
    stock: 20,
    rating: 4.5,
    reviewsCount: 210,
  },

  {
    id: "prod-4",
    name: "AquaFlow Smart Irrigation",
    price: 129.99,
    description: "Weather-aware irrigation system that optimizes water usage.",
    image:
      "https://images.pexels.com/photos/27443421/pexels-photo-27443421.jpeg",
    images: [
      "https://images.pexels.com/photos/27443421/pexels-photo-27443421.jpeg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    ],
    category: "Garden",
    tagline: "Smarter watering.",
    specs: {
      weight: "2 kg",
      dimensions: "25 x 20 x 10 cm",
      power: "50W",
      connectivity: "WiFi",
      material: "ABS Plastic",
    },
    features: [
      "Weather-based scheduling",
      "Remote control",
      "Water-saving AI",
      "Easy installation",
    ],
    stock: 15,
    rating: 4.4,
    reviewsCount: 89,
  },

  {
    id: "prod-5",
    name: "Lumina Smart Light Panels",
    price: 199.99,
    description:
      "Customizable LED panels reacting to sound, mood, and environment.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    ],
    category: "Lighting",
    tagline: "Paint with light.",
    specs: {
      weight: "1.5 kg",
      dimensions: "30 x 30 cm per panel",
      power: "60W",
      connectivity: "WiFi + App",
      material: "Acrylic",
    },
    features: [
      "Music sync",
      "Custom patterns",
      "App control",
      "Modular design",
    ],
    stock: 10,
    rating: 4.7,
    reviewsCount: 156,
  },

  {
    id: "prod-6",
    name: "RoboVac Pro Max",
    price: 499.0,
    description: "Smart vacuum with LiDAR mapping and sonic mopping.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
      "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    ],
    category: "Cleaning",
    tagline: "Effortless clean.",
    specs: {
      weight: "3.6 kg",
      dimensions: "35 x 35 x 10 cm",
      power: "75W",
      connectivity: "WiFi",
      material: "ABS Plastic",
    },
    features: [
      "LiDAR navigation",
      "Auto charging",
      "Mop + vacuum",
      "Room mapping",
    ],
    stock: 7,
    rating: 4.6,
    reviewsCount: 190,
  },

  {
    id: "prod-7",
    name: "Pawsitive Smart Pet Feeder",
    price: 89.99,
    description: "Automated feeder with camera and remote feeding control.",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    ],
    category: "Pets",
    tagline: "Care from anywhere.",
    specs: {
      weight: "2.3 kg",
      dimensions: "30 x 20 x 25 cm",
      power: "30W",
      connectivity: "WiFi",
      material: "Food-grade plastic",
    },
    features: [
      "Scheduled feeding",
      "HD camera",
      "2-way audio",
      "Mobile alerts",
    ],
    stock: 25,
    rating: 4.3,
    reviewsCount: 73,
  },

  {
    id: "prod-8",
    name: "Zenith Smart Thermostat",
    price: 249.99,
    description: "AI-powered thermostat that adapts to your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
    ],
    category: "Climate",
    tagline: "Perfect temperature always.",
    specs: {
      weight: "0.5 kg",
      dimensions: "10 x 10 x 3 cm",
      power: "10W",
      connectivity: "WiFi",
      material: "Glass + Plastic",
    },
    features: [
      "AI learning",
      "Energy saving mode",
      "Remote control",
      "Voice integration",
    ],
    stock: 18,
    rating: 4.7,
    reviewsCount: 142,
  },
];