import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 *
 * Clears the httpOnly authentication cookie set at login.
 */
export async function POST(_req: Request) {
  try {
    const res = NextResponse.json({ message: "Logged out" }, { status: 200 });

    // Overwrite the cookie with an immediate expiry / maxAge 0 to remove it from the browser.
    // Use same options as when setting the cookie to ensure the browser recognizes the same cookie.
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
