"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Settings,
  Save,
  Bell,
  Mail,
  Shield,
  Globe,
  DollarSign,
  Truck,
  Package,
  Image as ImageIcon,
  Info,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Footer from "../../components/Footer";

type SettingsData = {
  siteName: string;
  siteDescription: string;
  siteEmail: string;
  sitePhone: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderNotifications: boolean;
  lowStockThreshold: number;
  maintenanceMode: boolean;
};

export default function AdminSettingsPage(): React.JSX.Element {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showSuccess, setShowSuccess] = useState(false);

  const [settings, setSettings] = useState<SettingsData>({
    siteName: "SayKama",
    siteDescription: "Premium Ayurvedic Skincare & Wellness",
    siteEmail: "contact@saykama.com",
    sitePhone: "+91 1234567890",
    currency: "INR",
    taxRate: 18,
    shippingFee: 50,
    freeShippingThreshold: 999,
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockThreshold: 10,
    maintenanceMode: false,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchSettings();
    }
  }, [user]);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) {
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.user.role !== "admin") {
        router.push("/");
        return;
      }
      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSettings() {
    try {
      const response = await fetch("/api/admin/settings", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          setSettings({ ...settings, ...data.settings });
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }

  async function handleSaveSettings() {
    try {
      setSaving(true);
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: "general", label: "General", icon: <Globe className="w-5 h-5" /> },
    { id: "payment", label: "Payment & Shipping", icon: <DollarSign className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { id: "inventory", label: "Inventory", icon: <Package className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Settings
                </h1>
                <p className="text-gray-600">
                  Manage your application settings and configurations
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Settings saved successfully!</span>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tabs Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Settings Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* General Settings */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        General Settings
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Configure basic site information and branding
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Site Name *
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) =>
                          setSettings({ ...settings, siteName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter site name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Site Description *
                      </label>
                      <textarea
                        value={settings.siteDescription}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            siteDescription: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter site description"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Email *
                        </label>
                        <input
                          type="email"
                          value={settings.siteEmail}
                          onChange={(e) =>
                            setSettings({ ...settings, siteEmail: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="contact@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          value={settings.sitePhone}
                          onChange={(e) =>
                            setSettings({ ...settings, sitePhone: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="+91 1234567890"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          setSettings({ ...settings, currency: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        id="maintenance"
                        checked={settings.maintenanceMode}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            maintenanceMode: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="maintenance" className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Maintenance Mode
                        </div>
                        <div className="text-sm text-gray-600">
                          Enable this to show a maintenance page to visitors
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Payment & Shipping Settings */}
                {activeTab === "payment" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Payment & Shipping
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Configure payment and shipping options
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            taxRate: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="18"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shipping Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={settings.shippingFee}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            shippingFee: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Free Shipping Threshold (₹)
                      </label>
                      <input
                        type="number"
                        value={settings.freeShippingThreshold}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            freeShippingThreshold: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="999"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Orders above this amount will have free shipping
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <div className="font-semibold mb-1">Payment Gateway</div>
                        <div>
                          Configure your payment gateway settings (Razorpay, Stripe,
                          etc.) in the environment variables.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Notifications
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Configure notification preferences
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <input
                          type="checkbox"
                          id="emailNotif"
                          checked={settings.emailNotifications}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              emailNotifications: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="emailNotif" className="flex-1">
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Notifications
                          </div>
                          <div className="text-sm text-gray-600">
                            Receive email notifications for important events
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <input
                          type="checkbox"
                          id="smsNotif"
                          checked={settings.smsNotifications}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              smsNotifications: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="smsNotif" className="flex-1">
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            SMS Notifications
                          </div>
                          <div className="text-sm text-gray-600">
                            Receive SMS notifications for critical alerts
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <input
                          type="checkbox"
                          id="orderNotif"
                          checked={settings.orderNotifications}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              orderNotifications: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="orderNotif" className="flex-1">
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Order Notifications
                          </div>
                          <div className="text-sm text-gray-600">
                            Get notified when new orders are placed
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inventory Settings */}
                {activeTab === "inventory" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Inventory Management
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Configure inventory and stock settings
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Low Stock Threshold
                      </label>
                      <input
                        type="number"
                        value={settings.lowStockThreshold}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            lowStockThreshold: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="10"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        You'll be notified when product stock falls below this number
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        <div className="font-semibold mb-1">Stock Management</div>
                        <div>
                          Keep track of your inventory to ensure popular products are
                          always in stock. Low stock alerts help you reorder in time.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Security Settings
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Manage security and privacy settings
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3">
                      <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900">
                        <div className="font-semibold mb-1">Security Status</div>
                        <div>Your site is secure with HTTPS enabled</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Admin Account Security
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              Two-Factor Authentication
                            </div>
                            <div className="text-sm text-gray-600">
                              Add an extra layer of security
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Session Management
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              Active Sessions
                            </div>
                            <div className="text-sm text-gray-600">
                              Manage your active login sessions
                            </div>
                          </div>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                            View Sessions
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
                      <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-900">
                        <div className="font-semibold mb-1">Important</div>
                        <div>
                          Never share your admin credentials with anyone. Use strong,
                          unique passwords for maximum security.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
