export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  tags: string[];
  inStock: boolean;
  stockQuantity?: number;
  rating?: number; // average rating 0-5
  reviewsCount?: number;
  featured?: boolean;
  createdAt: string; // ISO date
};

export const products: Product[] = [
  {
    id: "prod_001",
    slug: "herbal-shampoo",
    name: "Herbal Shampoo",
    shortDescription: "Gentle cleanse — for all hair types",
    description:
      "A gentle, sulfate-free herbal shampoo formulated with plant extracts to cleanse and nourish hair without stripping natural oils. Suitable for daily use and all hair types. Free from parabens and synthetic fragrances.",
    price: 499,
    currency: "INR",
    images: ["/file.svg"],
    category: "Haircare",
    tags: ["shampoo", "herbal", "sulfate-free", "all-hair-types"],
    inStock: true,
    stockQuantity: 120,
    rating: 4.6,
    reviewsCount: 84,
    featured: true,
    createdAt: "2024-06-01T08:30:00.000Z",
  },
  {
    id: "prod_002",
    slug: "revive-face-scrub",
    name: "Revive Face Scrub",
    shortDescription: "Smooth texture, fresh glow",
    description:
      "A gentle exfoliating scrub with fine natural granules and calming botanical extracts. Helps to remove dead skin, refine texture, and reveal brighter, smoother skin. Use 2-3 times a week depending on skin sensitivity.",
    price: 349,
    currency: "INR",
    images: ["/window.svg"],
    category: "Skincare",
    tags: ["scrub", "exfoliant", "face", "natural"],
    inStock: true,
    stockQuantity: 65,
    rating: 4.4,
    reviewsCount: 46,
    featured: true,
    createdAt: "2024-05-20T11:15:00.000Z",
  },
  {
    id: "prod_003",
    slug: "daily-moisturiser",
    name: "Daily Moisturiser",
    shortDescription: "Lightweight hydration",
    description:
      "A lightweight, non-greasy moisturizer that sinks in quickly to provide long-lasting hydration and a healthy-looking glow. Formulated with hyaluronic acid and natural oils for balanced nourishment.",
    price: 599,
    currency: "INR",
    images: ["/globe.svg"],
    category: "Skincare",
    tags: ["moisturiser", "hydration", "daily"],
    inStock: true,
    stockQuantity: 200,
    rating: 4.7,
    reviewsCount: 112,
    featured: true,
    createdAt: "2024-04-02T09:00:00.000Z",
  },
  {
    id: "prod_004",
    slug: "calming-rose-toner",
    name: "Calming Rose Toner",
    shortDescription: "Hydrate & soothe sensitive skin",
    description:
      "A soothing rose-based toner that calms irritation and restores pH balance. Ideal for sensitive and redness-prone skin types. Use after cleansing to prep skin for serums and moisturizers.",
    price: 299,
    currency: "INR",
    images: ["/file.svg"],
    category: "Skincare",
    tags: ["toner", "rose", "sensitive", "hydrating"],
    inStock: true,
    stockQuantity: 90,
    rating: 4.3,
    reviewsCount: 34,
    createdAt: "2024-07-05T07:45:00.000Z",
  },
  {
    id: "prod_005",
    slug: "detox-clay-mask",
    name: "Detox Clay Mask",
    shortDescription: "Purifying clay mask for deep cleansing",
    description:
      "A purifying clay mask that absorbs impurities and excess oil while delivering gentle minerals to the skin. Ideal for occasional use on oily and combination skin types to refine pores and improve clarity.",
    price: 429,
    currency: "INR",
    images: ["/window.svg"],
    category: "Skincare",
    tags: ["mask", "clay", "detox", "oil-control"],
    inStock: false,
    stockQuantity: 0,
    rating: 4.2,
    reviewsCount: 21,
    createdAt: "2024-03-18T12:30:00.000Z",
  },
  {
    id: "prod_006",
    slug: "nourish-night-oil",
    name: "Nourish Night Oil",
    shortDescription: "Overnight nourishment for glowing skin",
    description:
      "A luxurious nighttime facial oil blend of nourishing botanical oils, designed to replenish skin while you sleep. Targets dryness and supports skin recovery for a refreshed morning complexion.",
    price: 799,
    currency: "INR",
    images: ["/globe.svg"],
    category: "Skincare",
    tags: ["oil", "night", "nourishing", "dry-skin"],
    inStock: true,
    stockQuantity: 48,
    rating: 4.8,
    reviewsCount: 64,
    createdAt: "2024-02-10T21:00:00.000Z",
  },
];

export default products;
