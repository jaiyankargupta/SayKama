"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Truck,
  Leaf,
  Shield,
  ArrowRight,
  Star,
  Heart,
  Award,
} from "lucide-react";

type HeroProps = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
};

export default function Hero({
  eyebrow = "Natural · Sustainable · Effective",
  title = "Elevate Your Skincare Routine with Nature's Best",
  subtitle = "Discover premium, ethically-sourced skincare and haircare products crafted with natural ingredients. Experience the perfect blend of science and nature.",
}: HeroProps): React.JSX.Element {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const features = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "100% Natural",
      description: "Pure botanical ingredients",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Dermatologist Tested",
      description: "Safe for all skin types",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Cruelty Free",
      description: "Never tested on animals",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Free Shipping",
      description: "On orders over ₹999",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/30 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-100/20 to-teal-100/20 rounded-full filter blur-3xl" />
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(16_185_129_/_0.05)_1px,_transparent_0)] bg-[length:32px_32px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-sm font-semibold text-emerald-800 mb-6"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {eyebrow}
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link
                href="/shop"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:scale-105 transform"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-full hover:border-emerald-600 hover:text-emerald-600 transition-all hover:scale-105 transform"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-md"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900">10,000+</div>
                  <div className="text-xs text-gray-600">Happy Customers</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gray-300" />

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900">4.9/5.0</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Product Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-emerald-100 to-teal-100">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80"
                  alt="Premium skincare products"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-6 right-6 bg-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Best Seller</div>
                    <div className="text-sm font-bold text-gray-900">
                      2024 Award
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Price Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-3 shadow-xl"
              >
                <div className="text-xs text-gray-600 mb-1">Starting from</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ₹349
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-20"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="group"
            >
              <div className="relative p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {feature.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <div className="font-bold text-gray-900 mb-1">
                      {feature.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {feature.description}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
