"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Check,
  Sparkles,
  Heart,
  Shield,
  Leaf,
  Award,
  TrendingUp,
  Droplets,
  HeartHandshake,
  Sun,
  Gem,
} from "lucide-react";
import Hero from "./components/hero/Hero";
import Footer from "./components/Footer";
import TestimonialsSlider from "./components/TestimonialsSlider";

export default function Home(): React.JSX.Element {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    viewport: { once: true },
  };

  const bestSellers = [
    {
      id: "1",
      title: "Herbal Shampoo",
      subtitle: "Gentle cleanse for all hair types",
      price: "₹499",
      originalPrice: "₹799",
      rating: 4.8,
      reviews: 342,
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
      href: "/shop/product/herbal-shampoo",
      badge: "Best Seller",
    },
    {
      id: "2",
      title: "Revive Face Scrub",
      subtitle: "Smooth texture, fresh glow",
      price: "₹349",
      originalPrice: "₹549",
      rating: 4.9,
      reviews: 289,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
      href: "/shop/product/revive-face-scrub",
      badge: "Top Rated",
    },
    {
      id: "3",
      title: "Daily Moisturiser",
      subtitle: "Lightweight hydration",
      price: "₹599",
      originalPrice: "₹899",
      rating: 4.7,
      reviews: 412,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
      href: "/shop/product/daily-moisturiser",
      badge: "New",
    },
  ];

  const categories = [
    {
      title: "Face Care",
      subtitle: "Cleansers, serums & more",
      count: "45+ Products",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
      href: "/shop/category/face-care",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Hair Care",
      subtitle: "Natural hair solutions",
      count: "32+ Products",
      image:
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80",
      href: "/shop/category/hair-care",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Body Care",
      subtitle: "Nourish your skin",
      count: "38+ Products",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
      href: "/shop/category/body-care",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const skinTypes = [
    {
      title: "Oily Skin",
      subtitle: "Lightweight balancing care",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      href: "/shop/skin-type/oily",
    },
    {
      title: "Dry Skin",
      subtitle: "Deeply hydrating formulas",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-amber-500 to-yellow-500",
      href: "/shop/skin-type/dry",
    },
    {
      title: "Sensitive",
      subtitle: "Gentle, soothing products",
      icon: <HeartHandshake className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      href: "/shop/skin-type/sensitive",
    },
    {
      title: "Combination",
      subtitle: "Balanced care solutions",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500",
      href: "/shop/skin-type/combination",
    },
    {
      title: "Normal",
      subtitle: "Maintain healthy skin",
      icon: <Sun className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      href: "/shop/skin-type/normal",
    },
    {
      title: "Mature",
      subtitle: "Anti-aging formulas",
      icon: <Gem className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      href: "/shop/skin-type/mature",
    },
  ];

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Natural Ingredients",
      description:
        "100% plant-based formulations sourced ethically from trusted suppliers.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Dermatologist Tested",
      description:
        "Clinically tested and approved by dermatologists for safety.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cruelty-Free",
      description:
        "Never tested on animals. Certified by Leaping Bunny and PETA.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Made in India",
      description:
        "Crafted with traditional wisdom and modern science by local artisans.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Eco-Friendly",
      description:
        "Sustainable packaging and carbon-neutral shipping practices.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award-Winning",
      description:
        "Recognized by beauty experts and featured in leading magazines.",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const testimonials = [
    {
      quote:
        "SayKama's face scrub has completely transformed my skin. It's gentle yet effective, and I love knowing it's all natural!",
      author: "Priya Sharma",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "Finally found a shampoo that doesn't irritate my sensitive scalp. The herbal formula is amazing and smells divine.",
      author: "Rahul Verma",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "The daily moisturizer is lightweight and perfect for my oily skin. No breakouts, just healthy glowing skin!",
      author: "Ananya Iyer",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "I've been using SayKama products for 6 months and my skin has never looked better. The natural ingredients really make a difference!",
      author: "Neha Kapoor",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "Excellent quality and eco-friendly packaging. SayKama truly cares about the environment and customer satisfaction.",
      author: "Arjun Patel",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "As someone with sensitive skin, finding the right products was always a challenge. SayKama's gentle formulas are perfect for me!",
      author: "Kavya Reddy",
      role: "Verified Customer",
      rating: 5,
    },
  ];

  return (
    <>
      <Hero />

      {/* BEST SELLERS SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-current" />
              Popular Products
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most-loved products trusted by thousands of happy
              customers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-full">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={product.href}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                  >
                    View Product
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Shop by Category
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect products for your beauty routine
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {categories.map((category, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Link
                  href={category.href}
                  className="group block relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div
                      className={`inline-flex self-start px-3 py-1 bg-gradient-to-r ${category.color} text-white text-xs font-bold rounded-full mb-4`}
                    >
                      {category.count}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/90 mb-4">{category.subtitle}</p>
                    <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                      Shop Now
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SKIN TYPE SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4 fill-current" />
              Personalized Care
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shop by Skin Type
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Personalized solutions tailored for your unique skin needs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {skinTypes.map((type, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Link
                  href={type.href}
                  className="group block text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {type.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600">{type.subtitle}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Our Promise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose SayKama?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Committed to quality, sustainability, and your wellbeing
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 mb-6 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-emerald-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-current" />
              Customer Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from real people who love our products
            </p>
          </motion.div>

          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                <Leaf className="w-4 h-4" />
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Natural Beauty, Naturally Better
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                SayKama was born from a simple belief: skincare should be pure,
                effective, and kind to both your skin and the planet. We partner
                with ethical growers, prioritize sustainable packaging, and
                craft formulas using only the finest natural ingredients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Every product is thoughtfully formulated, rigorously tested, and
                made with love. Join thousands of happy customers who trust
                SayKama for their daily skincare needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all hover:scale-105"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
                  alt="SayKama products"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      10,000+
                    </div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
            </div>
            <div className="relative z-10 px-8 py-16 md:py-24 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Special Offer
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Skin?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
                Join thousands of satisfied customers and discover the SayKama
                difference today. Get 20% off your first order!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-all hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
