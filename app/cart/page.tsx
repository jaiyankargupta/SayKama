"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader,
  X,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Footer";

type CartItem = {
  productId: string;
  productName: string;
  productImage?: string;
  productSlug?: string;
  quantity: number;
  price: number;
  comparePrice?: number;
  subtotal: number;
};

type Cart = {
  _id?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  couponCode?: string;
};

export default function CartPage(): React.JSX.Element {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      setLoading(true);
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    try {
      setUpdating(true);
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update cart");
      }

      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  }

  async function removeItem(productId: string) {
    try {
      setUpdating(true);
      const res = await fetch(`/api/cart?productId=${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove item");

      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setUpdating(false);
    }
  }

  async function clearCart() {
    if (!confirm("Are you sure you want to clear your cart?")) return;

    try {
      setUpdating(true);
      const res = await fetch("/api/cart?clear=true", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      setError("Failed to clear cart");
    } finally {
      setUpdating(false);
    }
  }

  function handleCheckout() {
    router.push("/checkout");
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const isEmpty = !cart || cart.items.length === 0;

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center pt-32">
          <div className="text-center">
            <Loader className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/50">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  Shopping Cart
                </h1>
                <p className="text-gray-600 mt-2">
                  {isEmpty
                    ? "Your cart is empty"
                    : `${cart.items.length} ${cart.items.length === 1 ? "item" : "items"} in your cart`}
                </p>
              </div>

              {!isEmpty && (
                <button
                  onClick={clearCart}
                  disabled={updating}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              )}
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                {...fadeInUp}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-600">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {isEmpty ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any products yet. Explore our
                collection and find something you love!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                >
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Cart Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cart.items.map((item, index) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                          {item.productImage ? (
                            <Image
                              src={item.productImage}
                              alt={item.productName}
                              fill
                              className="object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                              <ShoppingBag className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <Link
                                href={`/shop/product/${item.productSlug || item.productId}`}
                                className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2"
                              >
                                {item.productName}
                              </Link>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-2xl font-bold text-gray-900">
                                  ₹{item.price.toFixed(2)}
                                </span>
                                {item.comparePrice &&
                                  item.comparePrice > item.price && (
                                    <span className="text-sm text-gray-400 line-through">
                                      ₹{item.comparePrice.toFixed(2)}
                                    </span>
                                  )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.productId)}
                              disabled={updating}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600">
                                Quantity:
                              </span>
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity - 1,
                                    )
                                  }
                                  disabled={updating || item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-semibold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity + 1,
                                    )
                                  }
                                  disabled={updating}
                                  className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Subtotal</p>
                              <p className="text-xl font-bold text-gray-900">
                                ₹{item.subtotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Continue Shopping */}
                <motion.div {...fadeInUp} className="pt-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky top-24"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Order Summary
                    </h2>

                    {/* Coupon Code */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-900">
                        Coupon Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => {
                            setCouponLoading(true);
                            setTimeout(() => setCouponLoading(false), 1000);
                          }}
                          disabled={couponLoading || !couponCode}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {couponLoading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                          ₹{cart.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span className="font-semibold">
                          ₹{cart.tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold">
                          {cart.shippingCost === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${cart.shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      {cart.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span className="font-semibold">
                            -₹{cart.discount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-gray-900">
                          Total
                        </span>
                        <span className="text-3xl font-bold text-emerald-600">
                          ₹{cart.total.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={handleCheckout}
                        disabled={updating}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-6 border-t border-gray-200 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Truck className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span>Free shipping on orders over ₹999</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <span>Secure checkout with encryption</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
