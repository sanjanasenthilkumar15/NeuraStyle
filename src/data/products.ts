import { Product } from "@/components/products/ProductCard";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Cotton Blazer - Slim Fit",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop",
    rating: 4.8,
    reviews: 234,
    tags: ["formal", "blazer", "premium"],
    isNew: true,
    aiRecommended: true,
  },
  {
    id: "2",
    name: "Athleisure Track Pants - Navy",
    price: 1499,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=600&fit=crop",
    rating: 4.6,
    reviews: 567,
    tags: ["athleisure", "comfort", "casual"],
    isTrending: true,
  },
  {
    id: "3",
    name: "Floral Print Summer Dress",
    price: 2299,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    rating: 4.9,
    reviews: 892,
    tags: ["summer", "floral", "dress"],
    isNew: true,
    isTrending: true,
  },
  {
    id: "4",
    name: "Classic White Sneakers",
    price: 3499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop",
    rating: 4.7,
    reviews: 1203,
    tags: ["sneakers", "classic", "white"],
    aiRecommended: true,
  },
  {
    id: "5",
    name: "Leather Crossbody Bag",
    price: 2799,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=600&fit=crop",
    rating: 4.5,
    reviews: 445,
    tags: ["bag", "leather", "accessory"],
  },
  {
    id: "6",
    name: "Oversized Knit Sweater",
    price: 1899,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=600&fit=crop",
    rating: 4.4,
    reviews: 678,
    tags: ["winter", "cozy", "sweater"],
    isTrending: true,
  },
  {
    id: "7",
    name: "Slim Fit Denim Jeans",
    price: 2199,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop",
    rating: 4.6,
    reviews: 1567,
    tags: ["denim", "jeans", "casual"],
    aiRecommended: true,
  },
  {
    id: "8",
    name: "Silk Scarf - Paisley Print",
    price: 999,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=600&fit=crop",
    rating: 4.3,
    reviews: 234,
    tags: ["scarf", "silk", "accessory"],
    isNew: true,
  },
];

export const getProductsByTag = (tag: string): Product[] => {
  return sampleProducts.filter((p) => p.tags.includes(tag));
};

export const getAIRecommendedProducts = (): Product[] => {
  return sampleProducts.filter((p) => p.aiRecommended);
};

export const getTrendingProducts = (): Product[] => {
  return sampleProducts.filter((p) => p.isTrending);
};

export const getNewProducts = (): Product[] => {
  return sampleProducts.filter((p) => p.isNew);
};
