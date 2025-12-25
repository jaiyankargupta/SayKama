import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOTP extends Document {
  email: string;
  phone?: string;
  otp: string;
  type: "login" | "register" | "reset_password" | "verify_email" | "verify_phone";
  verified: boolean;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OTPSchema: Schema<IOTP> = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["login", "register", "reset_password", "verify_email", "verify_phone"],
      default: "login",
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
OTPSchema.index({ email: 1, type: 1, verified: 1 });
OTPSchema.index({ phone: 1, type: 1, verified: 1 });
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired OTPs

// Method to verify OTP
OTPSchema.methods.verify = function (inputOtp: string): boolean {
  // Check if already verified
  if (this.verified) {
    return false;
  }

  // Check if expired
  if (new Date() > this.expiresAt) {
    return false;
  }

  // Check attempts
  if (this.attempts >= 5) {
    return false;
  }

  // Increment attempts
  this.attempts += 1;

  // Check if OTP matches
  if (this.otp === inputOtp) {
    this.verified = true;
    return true;
  }

  return false;
};

// Method to check if OTP is still valid
OTPSchema.methods.isValid = function (): boolean {
  return !this.verified && new Date() < this.expiresAt && this.attempts < 5;
};

// Static method to generate 6-digit OTP
OTPSchema.statics.generateOTP = function (): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Static method to clean up old OTPs
OTPSchema.statics.cleanupOldOTPs = async function (email: string, type: string) {
  await this.deleteMany({
    email,
    type,
    $or: [
      { verified: true },
      { expiresAt: { $lt: new Date() } },
      { attempts: { $gte: 5 } },
    ],
  });
};

const OTP: Model<IOTP> =
  (mongoose.models && (mongoose.models.OTP as Model<IOTP>)) ||
  mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;
