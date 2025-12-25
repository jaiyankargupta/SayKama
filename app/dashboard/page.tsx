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
  phone?: string;
  avatar?: string;
};

type Stats = {
  orders: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    recent: any[];
  };
  payments: {
    totalSpent: number;
    averageOrderValue: number;
    recent: any[];
  };
};

async function fetchCurrentUser(): Promise<User | null> {
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
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json().catch(() => null);
    if (!json) return null;

    if (json.user) {
      const u = json.user as {
        _id?: string;
        id?: string;
        name?: string;
        email?: string;
        role?: string;
        phone?: string;
        avatar?: string;
      };
      return {
        id: u._id || u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone,
        avatar: u.avatar,
      };
    }

    return null;
  } catch (err) {
    console.error("fetchCurrentUser error:", err);
    return null;
  }
}

async function fetchUserStats(cookieHeader: string): Promise<Stats | null> {
  try {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      `http://localhost:3000`;

    const res = await fetch(`${base}/api/user/stats`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json().catch(() => null);
    return json || null;
  } catch (err) {
    console.error("fetchUserStats error:", err);
    return null;
  }
}

export default async function DashboardPage(): Promise<React.JSX.Element> {
  const user = await fetchCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const hdrs = await headers();
  const cookieHeader = hdrs.get("cookie") ?? "";
  const stats = await fetchUserStats(cookieHeader);

  return (
    <>
      <div
        className="app-container"
        style={{ paddingTop: 28, paddingBottom: 48 }}
      >
        {/* Header Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: 24,
            padding: "48px 40px",
            color: "white",
            marginBottom: 32,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name || "User"}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 32, color: "#0f172a" }}>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  margin: "0 0 8px 0",
                }}
              >
                Welcome back, {user.name || "User"}!
              </h1>
              <p
                style={{
                  fontSize: 16,
                  opacity: 0.9,
                  margin: "0 0 4px 0",
                }}
              >
                {user.email}
              </p>
              {user.phone && (
                <p style={{ fontSize: 14, opacity: 0.7, margin: 0 }}>
                  📱 {user.phone}
                </p>
              )}
            </div>
            <div>
              <Link
                href="/dashboard/profile"
                className="btn"
                style={{
                  background: "white",
                  color: "#0f172a",
                  padding: "12px 24px",
                }}
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div className="card" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                {stats.orders.total}
              </div>
              <div style={{ fontSize: 16, color: "var(--muted)" }}>
                Total Orders
              </div>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                ₹{stats.payments.totalSpent.toLocaleString()}
              </div>
              <div style={{ fontSize: 16, color: "var(--muted)" }}>
                Total Spent
              </div>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                {stats.orders.delivered}
              </div>
              <div style={{ fontSize: 16, color: "var(--muted)" }}>
                Delivered
              </div>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                ₹{Math.round(stats.payments.averageOrderValue)}
              </div>
              <div style={{ fontSize: 16, color: "var(--muted)" }}>
                Avg. Order Value
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 32,
            marginBottom: 32,
          }}
          className="dashboard-grid"
        >
          {/* Recent Orders */}
          <div className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                Recent Orders
              </h2>
              <Link
                href="/dashboard/orders"
                className="btn btn-secondary"
                style={{ fontSize: 14 }}
              >
                View All
              </Link>
            </div>

            {stats?.orders.recent && stats.orders.recent.length > 0 ? (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {stats.orders.recent.map((order: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      padding: 16,
                      background: "rgba(15, 23, 42, 0.02)",
                      borderRadius: 12,
                      border: "1px solid rgba(15, 23, 42, 0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>
                        #{order.orderNumber}
                      </div>
                      <div
                        style={{
                          padding: "4px 12px",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600,
                          background:
                            order.status === "delivered"
                              ? "#d1fae5"
                              : order.status === "shipped"
                                ? "#dbeafe"
                                : order.status === "cancelled"
                                  ? "#fee2e2"
                                  : "#fef3c7",
                          color:
                            order.status === "delivered"
                              ? "#065f46"
                              : order.status === "shipped"
                                ? "#1e40af"
                                : order.status === "cancelled"
                                  ? "#991b1b"
                                  : "#92400e",
                        }}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 14,
                        color: "var(--muted)",
                      }}
                    >
                      <div>{order.items?.length || 0} items</div>
                      <div
                        style={{ fontWeight: 600, color: "var(--foreground)" }}
                      >
                        ₹{order.total?.toLocaleString() || 0}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                <p style={{ color: "var(--muted)", marginBottom: 16 }}>
                  No orders yet
                </p>
                <Link href="/shop" className="btn btn-primary">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
              Quick Actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link
                href="/dashboard/orders"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                📦 View All Orders
              </Link>
              <Link
                href="/dashboard/payments"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                💳 Payment History
              </Link>
              <Link
                href="/dashboard/profile"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                👤 Edit Profile
              </Link>
              <Link
                href="/shop"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                🛍️ Continue Shopping
              </Link>
              <a
                href="/api/auth/logout"
                className="btn"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  background: "transparent",
                  border: "2px solid #fee2e2",
                  color: "#dc2626",
                }}
              >
                🚪 Logout
              </a>
            </div>
          </div>
        </div>

        {/* Order Status Overview */}
        {stats && stats.orders.total > 0 && (
          <div className="card">
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
              Order Status Overview
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
              }}
            >
              <div style={{ textAlign: "center", padding: 16 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#f59e0b",
                    marginBottom: 4,
                  }}
                >
                  {stats.orders.pending}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Pending
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 16 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#3b82f6",
                    marginBottom: 4,
                  }}
                >
                  {stats.orders.processing}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Processing
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 16 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#8b5cf6",
                    marginBottom: 4,
                  }}
                >
                  {stats.orders.shipped}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Shipped
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 16 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#10b981",
                    marginBottom: 4,
                  }}
                >
                  {stats.orders.delivered}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Delivered
                </div>
              </div>
              <div style={{ textAlign: "center", padding: 16 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#ef4444",
                    marginBottom: 4,
                  }}
                >
                  {stats.orders.cancelled}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Cancelled
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Section */}
        {user?.role === "admin" && (
          <div
            className="card"
            style={{
              marginTop: 32,
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
              border: "2px solid #f59e0b",
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
                color: "#92400e",
              }}
            >
              👑 Admin Dashboard
            </h2>
            <p style={{ marginBottom: 24, color: "#78350f" }}>
              You have admin privileges. Access advanced features and manage the
              platform.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/admin/products"
                className="btn"
                style={{ background: "#0f172a", color: "white" }}
              >
                Manage Products
              </Link>
              <Link
                href="/admin/users"
                className="btn"
                style={{ background: "#0f172a", color: "white" }}
              >
                Manage Users
              </Link>
              <Link
                href="/admin/orders"
                className="btn"
                style={{ background: "#0f172a", color: "white" }}
              >
                All Orders
              </Link>
              <Link
                href="/admin/payments"
                className="btn"
                style={{ background: "#0f172a", color: "white" }}
              >
                All Payments
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
