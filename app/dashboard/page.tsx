import React from "react";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Footer from "../components/Footer";

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

async function fetchCurrentUser(): Promise<User | null> {
  // Read incoming cookies from the request and forward them to the API route.
  const hdrs = await headers();
  const cookieHeader = hdrs.get("cookie") ?? "";

  try {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      `http://localhost:3000`;

    const res = await fetch(`${base}/api/auth/me`, {
      method: "GET",
      headers: {
        // forward cookie header so the API can read the httpOnly token cookie
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // API returns 401 / 404 when not authenticated or user not found
      return null;
    }

    const json = await res.json().catch(() => null);
    if (!json) return null;

    // The API returns { user: {...} } on success
    if (json.user) {
      const u = json.user as {
        _id?: string;
        id?: string;
        name?: string;
        email?: string;
        role?: string;
      };
      return {
        id: u._id || u.id,
        name: u.name,
        email: u.email,
        role: u.role,
      };
    }

    return null;
  } catch (err) {
    // On any network or parsing error, treat as unauthenticated
    console.error("fetchCurrentUser error:", err);
    return null;
  }
}

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const user = await fetchCurrentUser();

  if (!user) {
    // If not authenticated, redirect to login (server-side)
    redirect("/login");
  }

  return (
    <>
      <div
        className="app-container"
        style={{ paddingTop: 28, paddingBottom: 48 }}
      >
        <div className="bg-white rounded shadow p-8">
          <div className="flex items-center gap-6">
            <Image src="/logo.png" alt="SayKama" width={72} height={72} />
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome back{user?.name ? `, ${user.name}` : ""}!
              </h1>
              <p className="text-sm text-zinc-600">{user?.email}</p>
              <p className="text-xs text-zinc-500 mt-1">
                Role:{" "}
                <span className="font-medium">{user?.role ?? "user"}</span>
              </p>
            </div>
          </div>

          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 bg-zinc-50 rounded p-4">
              <h2 className="font-semibold mb-2">Account</h2>
              <div className="text-sm text-zinc-700">
                <p>Manage your account details and view order history.</p>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  <li>
                    <Link
                      href="/dashboard/orders"
                      className="text-blue-600 hover:underline"
                    >
                      View orders / order history
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/payments"
                      className="text-blue-600 hover:underline"
                    >
                      Payment history
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/details"
                      className="text-blue-600 hover:underline"
                    >
                      Edit profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <aside className="bg-zinc-50 rounded p-4">
              <h2 className="font-semibold mb-2">Quick Actions</h2>
              <div className="flex flex-col gap-2">
                <Link
                  href="/shop"
                  className="text-sm px-3 py-2 border rounded text-center"
                >
                  Continue shopping
                </Link>
                <Link
                  href="/cart"
                  className="text-sm px-3 py-2 border rounded text-center"
                >
                  View cart
                </Link>
                <a
                  href="/api/auth/logout"
                  className="text-sm px-3 py-2 border rounded text-center"
                >
                  Logout
                </a>
              </div>
            </aside>
          </section>

          {user?.role === "admin" && (
            <section className="mt-8 bg-white border rounded p-4">
              <h2 className="font-semibold mb-3">Admin Dashboard</h2>
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                <Link
                  href="/admin/products"
                  className="px-4 py-2 border rounded bg-white hover:bg-zinc-50"
                >
                  Manage products (add / edit / delete)
                </Link>
                <Link
                  href="/admin/users"
                  className="px-4 py-2 border rounded bg-white hover:bg-zinc-50"
                >
                  Users & order history
                </Link>
                <Link
                  href="/admin/payments"
                  className="px-4 py-2 border rounded bg-white hover:bg-zinc-50"
                >
                  Payment history
                </Link>
              </div>
            </section>
          )}

          <footer className="mt-8 text-sm text-zinc-500">
            This is your dashboard. Use the links above to access orders,
            payments, and account settings. Admin users will see product & user
            management links.
          </footer>
        </div>
      </div>

      <Footer />
    </>
  );
}
