"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Package,
  CreditCard,
  ShoppingBag,
  TrendingUp,
  LogOut,
  Edit,
  Settings,
  Bell,
  Heart,
  Star,
  Shield,
  Menu,
  X,
} from "lucide-react";
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
    delivered: number;
  };
  payments: {
    totalSpent: number;
    averageOrderValue: number;
  };
};

export default function DashboardPage(): React.JSX.Element {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch current user
        const userRes = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!userRes.ok) {
          router.push("/login");
          return;
        }

        const userData = await userRes.json();
        setUser(userData.user);

        // Fetch user stats
        const statsRes = await fetch("/api/user/stats", {
          credentials: "include",
        });

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div></div>;
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const quickActions = [
    {
      icon: <Package className="w-5 h-5" />,
      label: "View All Orders",
      href: "/dashboard/orders",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payment History",
      href: "/dashboard/payments",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Continue Shopping",
      href: "/shop",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const adminActions = [
    {
      icon: <Package className="w-5 h-5" />,
      label: "Manage Products",
      href: "/admin/products",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "All Orders",
      href: "/admin/orders",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: <UserIcon className="w-5 h-5" />,
      label: "Users",
      href: "/admin/users",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      href: "/admin/settings",
      color: "from-orange-500 to-red-500",
    },
  ];

  const actions = user.role === "admin" ? adminActions : quickActions;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-8 pb-20">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Card */}
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-r from-slate-900 to-emerald-900 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 mb-8 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg flex-shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  user.name?.charAt(0).toUpperCase() || "U"
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white truncate">
                    Welcome back, {user.name || "User"}!
                  </h1>
                  {user.role === "admin" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full flex-shrink-0">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-emerald-100 text-sm sm:text-base mb-1">
                  {user.email}
                </p>
                {user.phone && (
                  <p className="text-emerald-200/70 text-xs sm:text-sm">
                    📱 {user.phone}
                  </p>
                )}
              </div>

              {/* Edit Button */}
              <Link
                href="/dashboard/profile"
                className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 flex-shrink-0"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
            >
              {/* Total Orders */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {stats.orders.total}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Total Orders
                </div>
              </div>

              {/* Total Spent */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1">
                  ₹{stats.payments.totalSpent.toLocaleString()}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Total Spent
                </div>
              </div>

              {/* Delivered */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {stats.orders.delivered}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Delivered
                </div>
              </div>

              {/* Avg Order Value */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1">
                  ₹
                  {Math.round(
                    stats.payments.averageOrderValue || 0,
                  ).toLocaleString()}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Avg. Order Value
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Quick Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                    >
                      {action.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {action.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity / Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Recent Orders
              </h2>
              <Link
                href="/dashboard/orders"
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm sm:text-base"
              >
                View All
              </Link>
            </div>

            {/* Empty State */}
            {(!stats || stats.orders.total === 0) && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-4">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start shopping to see your orders here
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            )}

            {/* Orders will be loaded here in future */}
          </motion.div>

          {/* Mobile Edit Profile Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="sm:hidden mt-6"
          >
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Edit className="w-5 h-5" />
              Edit Profile
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
