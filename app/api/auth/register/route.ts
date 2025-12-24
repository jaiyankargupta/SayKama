import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 *
 * Creates a new user with a hashed password.
 * Returns 201 on success, appropriate error codes otherwise.
 */
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, password" },
        { status: 400 }
      );
    }

    // Basic server-side validation (email shape)
    const emailNormalized = String(email).trim().toLowerCase();
    const nameNormalized = String(name).trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalized)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Check existing user
    const existing = await User.findOne({ email: emailNormalized }).lean();
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name: nameNormalized,
      email: emailNormalized,
      password: hashed,
    });

    await user.save();

    // Return minimal user info
    return NextResponse.json(
      {
        message: "User created",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || "user",
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    // Handle duplicate key error from MongoDB (unique email)
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Server error during registration" },
      { status: 500 }
    );
  }
}
