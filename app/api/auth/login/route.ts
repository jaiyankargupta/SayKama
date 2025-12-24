import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TOKEN_NAME = "token";
const TOKEN_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const emailNormalized = String(email).trim().toLowerCase();

    // Find user
    const user = await User.findOne({ email: emailNormalized }).lean();
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Compare password
    const passwordMatches = await bcrypt.compare(password, String(user.password));
    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT
    const jwtSecret = process.env.JWT_SECRET || "";
    if (!jwtSecret) {
      console.error("JWT_SECRET not set");
      return NextResponse.json(
        { error: "Authentication configuration error" },
        { status: 500 }
      );
    }

    const payload = {
      id: String(user._id),
      email: user.email,
      role: user.role || "user",
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

    // Set cookie
    const res = NextResponse.json(
      {
        message: "Logged in",
        user: {
          id: payload.id,
          name: user.name,
          email: user.email,
          role: payload.role,
        },
      },
      { status: 200 }
    );

    res.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_EXPIRES_IN_SECONDS,
    });

    return res;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Server error during login" },
      { status: 500 }
    );
  }
}
