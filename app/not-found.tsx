"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Mail,
  Search,
  ArrowRight,
  Sparkles,
  Info,
  MessageCircle,
} from "lucide-react";
import Footer from "./components/Footer";

export default function NotFound() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const quickLinks = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      text: "All Products",
      href: "/shop",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Face Care",
      href: "/shop/category/face-care",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Info className="w-5 h-5" />,
      text: "About Us",
      href: "/about",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      text: "Contact Us",
      href: "/contact",
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-32">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-200/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              404
            </div>
          </motion.div>

          {/* Search Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-8 shadow-lg shadow-emerald-500/50"
          >
            <Search className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Oops! Page Not Found
          </motion.h1>

          {/* Description */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We couldn&apos;t find the page you&apos;re looking for. It might
            have been moved, deleted, or perhaps the URL was mistyped.
            Don&apos;t worry—let&apos;s get you back on track!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group block p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${link.color} rounded-xl text-white mb-3 group-hover:scale-110 transition-transform`}
                    >
                      {link.icon}
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {link.text}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-600 mt-8"
          >
            Need assistance? Our support team is here to help.{" "}
            <Link
              href="/contact"
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors underline"
            >
              Get in touch
            </Link>
          </motion.p>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}
