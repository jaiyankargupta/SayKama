"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "../components/Footer";
import products, { Product } from "../../data/products";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function SearchPage({ searchParams }: Props): React.JSX.Element {
  const rawQ =
    typeof searchParams?.q === "string"
      ? searchParams.q.trim()
      : Array.isArray(searchParams?.q)
        ? (searchParams?.q[0] ?? "")
        : "";

  const [searchQuery, setSearchQuery] = useState(rawQ);
  const [isSearching, setIsSearching] = useState(false);

  const q = rawQ.toLowerCase();

  const results: Product[] = q
    ? products.filter((p) => {
        const hay = [
          p.name,
          p.shortDescription,
          p.description,
          ...(p.tags || []),
          p.category,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
    : [];

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
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

  useEffect(() => {
    setSearchQuery(rawQ);
  }, [rawQ]);

  const handleSearch = (e: React.FormEvent) => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-6 shadow-lg shadow-emerald-500/50">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Search Products
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your perfect skincare and haircare products
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <form method="get" onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  name="q"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, ingredients, categories..."
                  className="block w-full pl-14 pr-24 py-5 text-lg border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-lg"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-24 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-6 m-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Browse All
                </Link>
                <Link
                  href="/best-sellers"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <TrendingUp className="w-4 h-4" />
                  Best Sellers
                </Link>
              </div>
            </form>

            {/* Search Info */}
            <div className="text-center mt-6">
              {q ? (
                <p className="text-gray-600">
                  Showing {results.length} result
                  {results.length !== 1 ? "s" : ""} for{" "}
                  <span className="font-semibold text-emerald-600">
                    &quot;{rawQ}&quot;
                  </span>
                </p>
              ) : (
                <p className="text-gray-500">
                  Enter a search term to find products
                </p>
              )}
            </div>
          </motion.div>

          {/* Search Results */}
          {q && (
            <div className="mb-16">
              {results.length === 0 ? (
                /* No Results */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white rounded-3xl shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn&apos;t find any products matching &quot;{rawQ}
                    &quot;. Try different keywords or browse our shop.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                    >
                      Browse All Products
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        window.location.href = "/search";
                      }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all hover:scale-105"
                    >
                      Clear Search
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Results Grid */
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Search Results
                    </h2>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </button>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    <AnimatePresence>
                      {results.map((product) => (
                        <motion.div
                          key={product.id}
                          variants={fadeInUp}
                          exit={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ y: -8 }}
                          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                          <Link href={`/shop/product/${product.slug}`}>
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                              {product.images?.[0] ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ShoppingBag className="w-16 h-16 text-gray-300" />
                                </div>
                              )}
                              {product.featured && (
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                  Featured
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product.shortDescription}
                              </p>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-2xl font-bold text-gray-900">
                                    ₹{product.price}
                                  </span>
                                  {product.comparePrice && (
                                    <span className="text-sm text-gray-400 line-through ml-2">
                                      ₹{product.comparePrice}
                                    </span>
                                  )}
                                </div>
                                <div className="inline-flex items-center gap-1 text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                  View
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </>
              )}
            </div>
          )}

          {/* Featured Products */}
          {!q && featuredProducts.length > 0 && (
            <motion.div {...fadeInUp} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                    <Sparkles className="w-4 h-4" />
                    Featured Products
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Popular Picks
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="hidden md:inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  View All
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {featuredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <Link href={`/shop/product/${product.slug}`}>
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-16 h-16 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                          Featured
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{product.price}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1 text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            View
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center mt-8 md:hidden">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                >
                  View All Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Help Section */}
          <motion.div
            {...fadeInUp}
            className="text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Finding Something?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is here to help you find the perfect products for your
              skincare routine.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
