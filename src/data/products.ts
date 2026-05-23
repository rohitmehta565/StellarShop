
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  rating: number;
  stock: number;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation and 30 hours of battery life.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
    category: 'electronics',
    featured: true,
    rating: 4.8,
    stock: 15
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitor, GPS, and water resistance up to 50 meters.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a',
    category: 'electronics',
    featured: true,
    rating: 4.5,
    stock: 20
  },
  {
    id: '3',
    name: 'Ultra HD 4K Monitor',
    description: 'Immerse yourself in stunning visuals with this 32-inch 4K monitor, perfect for gaming and professional content creation.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
    category: 'electronics',
    featured: false,
    rating: 4.6,
    stock: 8
  },
  {
    id: '4',
    name: 'Designer Leather Backpack',
    description: 'A stylish and durable leather backpack with multiple compartments, perfect for work or travel.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887',
    category: 'fashion',
    featured: true,
    rating: 4.3,
    stock: 25
  },
  {
    id: '5',
    name: 'Aromatherapy Essential Oil Diffuser',
    description: 'Create a calming atmosphere with this ultrasonic diffuser featuring 7 LED light colors and multiple mist settings.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
    category: 'home',
    featured: false,
    rating: 4.2,
    stock: 30
  },
  {
    id: '6',
    name: 'Organic Cotton Yoga Mat',
    description: 'Eco-friendly yoga mat made from 100% organic cotton, providing excellent grip and comfort for your yoga practice.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
    category: 'fitness',
    featured: false,
    rating: 4.7,
    stock: 12
  },
  {
    id: '7',
    name: 'Gourmet Coffee Gift Set',
    description: 'A collection of premium single-origin coffees from around the world, beautifully packaged in a gift box.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
    category: 'food',
    featured: true,
    rating: 4.9,
    stock: 18
  },
  {
    id: '8',
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and BPA-free.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    category: 'lifestyle',
    featured: false,
    rating: 4.4,
    stock: 40
  },
  {
    id: '9',
    name: 'Wireless Charging Pad',
    description: 'Fast-charging wireless pad compatible with all Qi-enabled devices. Sleek, minimalist design with LED indicators.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1586816879360-902f5a4a92e1',
    category: 'electronics',
    featured: false,
    rating: 4.0,
    stock: 22
  },
  {
    id: '10',
    name: 'Artisanal Ceramic Plant Pot',
    description: 'Handcrafted ceramic plant pot with a unique glazed finish. Perfect for indoor plants and home decor.',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
    category: 'home',
    featured: false,
    rating: 4.1,
    stock: 15
  },
  {
    id: '11',
    name: 'Smart LED Desk Lamp',
    description: 'Adjustable desk lamp with touch controls, multiple brightness levels, and color temperature settings.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548',
    category: 'home',
    featured: false,
    rating: 4.5,
    stock: 10
  },
  {
    id: '12',
    name: 'Luxury Scented Candle Set',
    description: 'Set of 3 hand-poured soy wax candles with premium essential oil fragrances. Up to 45 hours of burn time each.',
    price: 64.99,
    image: 'https://goodmelts.co/cdn/shop/files/black_60-07.jpg?v=1725216712&width=990',
    category: 'home',
    featured: true,
    rating: 4.8,
    stock: 7
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  products.forEach(product => categories.add(product.category));
  return Array.from(categories);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products.filter(product => product.featured).slice(0, limit);
};
