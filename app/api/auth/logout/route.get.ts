import { NextResponse } from "next/server";

/**
 * GET /api/auth/logout
 *
 * Convenience GET handler that clears the httpOnly authentication cookie
 * and redirects the user to the home page.
 *
 * Use this for simple logout links (e.g. <a href="/api/auth/logout">Logout</a>).
 */
export async function GET(req: Request) {
  try {
    // Redirect to home after clearing the cookie.
    const redirectUrl = new URL("/", req.url);
    const res = NextResponse.redirect(redirectUrl);

    // Overwrite the cookie with an immediate expiry to remove it from the browser.
    res.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (err) {
    console.error("Logout (GET) error:", err);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
