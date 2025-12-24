import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

/**
 * GET /api/auth/me
 * Reads the auth token from the httpOnly cookie named "token", verifies it,
 * and returns the current user's minimal profile.
 */

const TOKEN_NAME = "token";

function parseCookies(cookieHeader: string | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx < 0) continue;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    result[key] = decodeURIComponent(val);
  }
  return result;
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const cookies = parseCookies(cookieHeader);
    const token = cookies[TOKEN_NAME];

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET || "";
    if (!jwtSecret) {
      console.error("JWT_SECRET not set");
      return NextResponse.json(
        { error: "Authentication configuration error" },
        { status: 500 }
      );
    }

    let payload: any;
    try {
      payload = jwt.verify(token, jwtSecret);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // payload should contain id (created at login)
    const userId = payload?.id || payload?._id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(userId).select("-password").lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/auth/me:", err);
    return NextResponse.json(
      { error: "Server error while fetching user" },
      { status: 500 }
    );
  }
}
