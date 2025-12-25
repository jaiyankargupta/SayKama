"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Package,
  ArrowLeft,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
} from "lucide-react";
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
  const router = useRouter();
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

      const res = await fetch(`/api/user/orders?${params.toString()}`, {
        credentials: "include",
      });

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

  function getStatusBadge(status: string) {
    const configs: Record<
      string,
      { bg: string; text: string; icon: React.ReactNode }
    > = {
      delivered: {
        bg: "bg-emerald-100 text-emerald-700 border-emerald-200",
        text: "Delivered",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      shipped: {
        bg: "bg-blue-100 text-blue-700 border-blue-200",
        text: "Shipped",
        icon: <Truck className="w-4 h-4" />,
      },
      processing: {
        bg: "bg-purple-100 text-purple-700 border-purple-200",
        text: "Processing",
        icon: <Clock className="w-4 h-4" />,
      },
      cancelled: {
        bg: "bg-red-100 text-red-700 border-red-200",
        text: "Cancelled",
        icon: <XCircle className="w-4 h-4" />,
      },
      pending: {
        bg: "bg-amber-100 text-amber-700 border-amber-200",
        text: "Pending",
        icon: <AlertCircle className="w-4 h-4" />,
      },
    };

    const config = configs[status] || configs.pending;

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg}`}
      >
        {config.icon}
        {config.text}
      </div>
    );
  }

  const filterButtons = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  My Orders
                </h1>
                <p className="text-gray-600">
                  View and manage your order history
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all hover:scale-105 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">
                Filter by status:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setStatusFilter(filter.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    statusFilter === filter.value
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Loading orders...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-700 mb-4 font-medium">{error}</p>
              <button
                onClick={fetchOrders}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && orders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {statusFilter === "all"
                  ? "You haven't placed any orders yet."
                  : `No ${statusFilter} orders found.`}
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                <Package className="w-5 h-5" />
                Start Shopping
              </Link>
            </motion.div>
          )}

          {/* Orders List */}
          {!loading && !error && orders.length > 0 && (
            <>
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-600">
                          Placed on{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/orders/${order._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-gray-700 mb-3">
                        Items ({order.items.length}):
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="flex-1">
                              <span className="font-semibold text-gray-900">
                                {item.productName}
                              </span>
                              <span className="text-gray-600 ml-2">
                                × {item.quantity}
                              </span>
                            </div>
                            <div className="font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
                      <div>
                        {order.trackingNumber && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Truck className="w-4 h-4" />
                            <span>
                              Tracking:{" "}
                              <strong className="text-gray-900">
                                {order.trackingNumber}
                              </strong>
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        Total: ₹{order.total.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.hasPrevPage}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      pagination.hasPrevPage
                        ? "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:scale-105"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-lg">
                    <span className="text-sm font-medium text-gray-600">
                      Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({pagination.total} total)
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={!pagination.hasNextPage}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                      pagination.hasNextPage
                        ? "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:scale-105"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
