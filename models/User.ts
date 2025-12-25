import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin" | string;
  phone?: string;
  avatar?: string;
  address?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  preferences?: {
    skinType?: string;
    newsletter?: boolean;
    smsNotifications?: boolean;
  };
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    phone: { type: String, trim: true },
    avatar: { type: String },
    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: "India" },
    },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    preferences: {
      skinType: String,
      newsletter: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
    },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

// Note: unique: true on the email field already creates an index, no need to duplicate

/**
 * When using Next.js with hot-reloading (development), mongoose models can be
 * re-registered which causes OverwriteModelError. Check mongoose.models first
 * and reuse the model if present.
 */
const User: Model<IUser> =
  (mongoose.models && (mongoose.models.User as Model<IUser>)) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
