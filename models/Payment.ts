import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  orderNumber: string;
  amount: number;
  currency: string;
  paymentMethod: "card" | "upi" | "netbanking" | "cod" | "wallet";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
  paymentGateway?: string;
  paymentDetails?: {
    cardLast4?: string;
    cardBrand?: string;
    upiId?: string;
    bankName?: string;
    walletName?: string;
  };
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;
  failureReason?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    orderNumber: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "cod", "wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    transactionId: {
      type: String,
      index: true,
    },
    paymentGateway: {
      type: String,
    },
    paymentDetails: {
      cardLast4: String,
      cardBrand: String,
      upiId: String,
      bankName: String,
      walletName: String,
    },
    refundAmount: {
      type: Number,
      min: 0,
    },
    refundReason: String,
    refundedAt: Date,
    failureReason: String,
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for efficient queries
PaymentSchema.index({ userId: 1, createdAt: -1 });
// orderId and transactionId indexes already declared inline with "index: true"
PaymentSchema.index({ status: 1, createdAt: -1 });

const Payment: Model<IPayment> =
  (mongoose.models && (mongoose.models.Payment as Model<IPayment>)) ||
  mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
