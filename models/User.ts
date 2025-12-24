import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin" | string;
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
