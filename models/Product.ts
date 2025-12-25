import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  sku?: string;
  barcode?: string;
  quantity: number;
  lowStockThreshold?: number;
  images: string[];
  category: string;
  subcategory?: string;
  tags?: string[];
  skinType?: string[];
  ingredients?: string[];
  howToUse?: string;
  benefits?: string[];
  weight?: string;
  volume?: string;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  };
  isFeatured?: boolean;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  relatedProducts?: mongoose.Types.ObjectId[];
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [500, "Short description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    comparePrice: {
      type: Number,
      min: [0, "Compare price cannot be negative"],
    },
    costPrice: {
      type: Number,
      min: [0, "Cost price cannot be negative"],
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },
    barcode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: 0,
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
      validate: {
        validator: (images: string[]) => images.length > 0,
        message: "Product must have at least one image",
      },
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    skinType: {
      type: [String],
      enum: [
        "oily",
        "dry",
        "combination",
        "sensitive",
        "normal",
        "mature",
        "acne-prone",
        "all",
      ],
      default: ["all"],
    },
    ingredients: {
      type: [String],
      default: [],
    },
    howToUse: {
      type: String,
    },
    benefits: {
      type: [String],
      default: [],
    },
    weight: {
      type: String,
    },
    volume: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ["cm", "inch", "mm"],
        default: "cm",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    seoTitle: {
      type: String,
      maxlength: 200,
    },
    seoDescription: {
      type: String,
      maxlength: 500,
    },
    seoKeywords: {
      type: [String],
      default: [],
    },
    relatedProducts: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
ProductSchema.index({ name: "text", description: "text", tags: "text" });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ isFeatured: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ soldCount: -1 });
ProductSchema.index({ rating: -1 });

// Virtual for discount percentage
ProductSchema.virtual("discountPercentage").get(function () {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  return 0;
});

// Virtual for in stock status
ProductSchema.virtual("inStock").get(function () {
  return this.quantity > 0;
});

// Virtual for low stock status
ProductSchema.virtual("isLowStock").get(function () {
  return this.quantity > 0 && this.quantity <= (this.lowStockThreshold || 10);
});

// Auto-generate slug from name if not provided
ProductSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Ensure virtuals are included in JSON
ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

const Product: Model<IProduct> =
  (mongoose.models && (mongoose.models.Product as Model<IProduct>)) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
