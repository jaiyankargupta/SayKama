import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  productName: string;
  productImage?: string;
  productSlug?: string;
  quantity: number;
  price: number;
  comparePrice?: number;
  subtotal: number;
}

export interface ICart extends Document {
  userId?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Methods
  calculateTotals(): void;
  addItem(
    productId: mongoose.Types.ObjectId,
    productName: string,
    price: number,
    quantity?: number,
    productImage?: string,
    productSlug?: string,
    comparePrice?: number,
  ): Promise<ICart>;
  updateItemQuantity(
    productId: mongoose.Types.ObjectId,
    quantity: number,
  ): Promise<ICart>;
  removeItem(productId: mongoose.Types.ObjectId): Promise<ICart>;
  clearCart(): Promise<ICart>;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
    },
    productSlug: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    comparePrice: {
      type: Number,
      min: [0, "Compare price cannot be negative"],
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "Subtotal cannot be negative"],
    },
  },
  { _id: false },
);

const CartSchema: Schema<ICart> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      sparse: true,
    },
    sessionId: {
      type: String,
      index: true,
      sparse: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
    subtotal: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    couponCode: {
      type: String,
      uppercase: true,
      trim: true,
    },
    couponDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for efficient queries
CartSchema.index({ userId: 1 });
CartSchema.index({ sessionId: 1 });
CartSchema.index({ expiresAt: 1 });

// Method to calculate cart totals
CartSchema.methods.calculateTotals = function () {
  // Calculate subtotal from items
  this.subtotal = this.items.reduce(
    (sum: number, item: ICartItem) => sum + item.subtotal,
    0,
  );

  // Calculate tax (18% GST in India)
  this.tax = Math.round(this.subtotal * 0.18 * 100) / 100;

  // Calculate shipping (free above ₹999)
  this.shippingCost = this.subtotal >= 999 ? 0 : 50;

  // Apply discount
  this.discount = this.couponDiscount || 0;

  // Calculate total
  this.total = this.subtotal + this.tax + this.shippingCost - this.discount;
  this.total = Math.round(this.total * 100) / 100;
};

// Method to add item to cart
CartSchema.methods.addItem = async function (
  productId: mongoose.Types.ObjectId,
  productName: string,
  price: number,
  quantity: number = 1,
  productImage?: string,
  productSlug?: string,
  comparePrice?: number,
) {
  const existingItemIndex = this.items.findIndex(
    (item: ICartItem) => item.productId.toString() === productId.toString(),
  );

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    this.items[existingItemIndex].quantity += quantity;
    this.items[existingItemIndex].subtotal =
      this.items[existingItemIndex].quantity *
      this.items[existingItemIndex].price;
  } else {
    // Add new item
    this.items.push({
      productId,
      productName,
      productImage,
      productSlug,
      quantity,
      price,
      comparePrice,
      subtotal: price * quantity,
    });
  }

  this.calculateTotals();
  return this.save();
};

// Method to update item quantity
CartSchema.methods.updateItemQuantity = async function (
  productId: mongoose.Types.ObjectId,
  quantity: number,
) {
  const itemIndex = this.items.findIndex(
    (item: ICartItem) => item.productId.toString() === productId.toString(),
  );

  if (itemIndex === -1) {
    throw new Error("Item not found in cart");
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    this.items.splice(itemIndex, 1);
  } else {
    this.items[itemIndex].quantity = quantity;
    this.items[itemIndex].subtotal = this.items[itemIndex].price * quantity;
  }

  this.calculateTotals();
  return this.save();
};

// Method to remove item from cart
CartSchema.methods.removeItem = async function (
  productId: mongoose.Types.ObjectId,
) {
  this.items = this.items.filter(
    (item: ICartItem) => item.productId.toString() !== productId.toString(),
  );

  this.calculateTotals();
  return this.save();
};

// Method to clear cart
CartSchema.methods.clearCart = async function () {
  this.items = [];
  this.couponCode = undefined;
  this.couponDiscount = 0;
  this.calculateTotals();
  return this.save();
};

// Pre-save middleware to calculate totals
CartSchema.pre("save", function (next) {
  if (this.isModified("items") || this.isModified("couponDiscount")) {
    this.calculateTotals();
  }
  next();
});

// Automatically delete expired carts (optional - requires setup of a job scheduler)
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Cart: Model<ICart> =
  (mongoose.models && (mongoose.models.Cart as Model<ICart>)) ||
  mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
