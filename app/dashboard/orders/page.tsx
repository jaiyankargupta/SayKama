"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../../components/Footer";

type Order = {
  _id: string;
  orderNumber: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  trackingNumber?: string;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function OrdersPage(): React.JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  async function fetchOrders() {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const res = await fetch(`/api/user/orders?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data.orders || []);
      setPagination(data.pagination || null);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "delivered":
        return { bg: "#d1fae5", color: "#065f46" };
      case "shipped":
        return { bg: "#dbeafe", color: "#1e40af" };
      case "processing":
        return { bg: "#e0e7ff", color: "#3730a3" };
      case "cancelled":
        return { bg: "#fee2e2", color: "#991b1b" };
      case "refunded":
        return { bg: "#fce7f3", color: "#9f1239" };
      default:
        return { bg: "#fef3c7", color: "#92400e" };
    }
  }

  return (
    <>
      <div
        className="app-container"
        style={{ paddingTop: 28, paddingBottom: 48 }}
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
              My Orders
            </h1>
            <Link href="/dashboard" className="btn btn-secondary">
              ← Back to Dashboard
            </Link>
          </div>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            View and manage your order history
          </p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 600 }}>Filter by status:</span>
            {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                  className="btn"
                  style={{
                    padding: "8px 16px",
                    fontSize: 14,
                    background:
                      statusFilter === status
                        ? "#0f172a"
                        : "transparent",
                    color: statusFilter === status ? "white" : "#0f172a",
                    border: "2px solid #0f172a",
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <p style={{ color: "var(--muted)" }}>Loading orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: 40,
              background: "#fee2e2",
              border: "2px solid #fecaca",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <p style={{ color: "#dc2626", marginBottom: 16 }}>{error}</p>
            <button onClick={fetchOrders} className="btn btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length === 0 && (
          <div
            className="card"
            style={{ textAlign: "center", padding: "60px 40px" }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              No orders found
            </h2>
            <p style={{ color: "var(--muted)", marginBottom: 24 }}>
              {statusFilter === "all"
                ? "You haven't placed any orders yet."
                : `No ${statusFilter} orders found.`}
            </p>
            <Link href="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {orders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <div key={order._id} className="card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 16,
                        flexWrap: "wrap",
                        gap: 16,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          Order #{order.orderNumber}
                        </h3>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--muted)",
                            margin: 0,
                          }}
                        >
                          Placed on{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <div
                          style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            background: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        >
                          {order.status.toUpperCase()}
                        </div>
                        <Link
                          href={`/dashboard/orders/${order._id}`}
                          className="btn btn-secondary"
                          style={{ padding: "8px 16px", fontSize: 14 }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--muted)",
                          marginBottom: 8,
                        }}
                      >
                        Items:
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: 8,
                              background: "rgba(15, 23, 42, 0.02)",
                              borderRadius: 8,
                            }}
                          >
                            <div>
                              <span style={{ fontWeight: 600 }}>
                                {item.productName}
                              </span>
                              <span style={{ color: "var(--muted)" }}>
                                {" "}
                                × {item.quantity}
                              </span>
                            </div>
                            <div style={{ fontWeight: 600 }}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 16,
                        borderTop: "1px solid rgba(15, 23, 42, 0.1)",
                      }}
                    >
                      <div>
                        {order.trackingNumber && (
                          <div style={{ fontSize: 14, color: "var(--muted)" }}>
                            Tracking: <strong>{order.trackingNumber}</strong>
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700 }}>
                        Total: ₹{order.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                  marginTop: 32,
                }}
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrevPage}
                  className="btn btn-secondary"
                  style={{
                    opacity: pagination.hasPrevPage ? 1 : 0.5,
                    cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
                  }}
                >
                  ← Previous
                </button>

                <div style={{ fontSize: 14, color: "var(--muted)" }}>
                  Page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total orders)
                </div>

                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={!pagination.hasNextPage}
                  className="btn btn-secondary"
                  style={{
                    opacity: pagination.hasNextPage ? 1 : 0.5,
                    cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
