"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  TrendingUp,
  ShoppingBag,
  Filter,
  SlidersHorizontal,
  X,
  Award,
  Heart,
  Eye,
} from "lucide-react";
import Footer from "../components/Footer";

type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating?: number;
  reviews?: number;
  stock: number;
  sales?: number;
};

export default function BestSellersPage(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("sales");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/products?bestSellers=true&sort=${sortBy}&limit=20`,
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header */}
          <motion.div {...fadeInUp} className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
              Top Selling Products
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Best Sellers
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover our most-loved products trusted by thousands of customers
            </p>
          </motion.div>

          {/* Filters & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Filter Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors font-medium"
              >
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Filters
              </button>

              {/* Category Filters (Desktop) */}
              <div className="hidden sm:flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat === "all" ? "All Products" : cat}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sales">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="sm:hidden mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilters(false);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat === "all" ? "All Products" : cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Products Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 sm:mb-6 px-1"
          >
            <p className="text-sm sm:text-base text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200"></div>
                  <div className="p-3 sm:p-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 mb-3 sm:mb-4"></div>
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
                >
                  <Link href={`/shop/product/${product.slug}`}>
                    <div className="relative overflow-hidden bg-gray-100">
                      {/* Best Seller Badge */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden xs:inline">Best Seller</span>
                        <span className="xs:hidden">Best</span>
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100,
                          )}
                          % OFF
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="relative h-48 sm:h-56 md:h-64 w-full">
                        <Image
                          src={product.images[0] || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-3">
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3 sm:p-4">
                      {/* Category */}
                      <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold mb-1.5 sm:mb-2 uppercase truncate">
                        {product.category}
                      </p>

                      {/* Name */}
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                                  i < Math.floor(product.rating!)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] sm:text-xs text-gray-500">
                            ({product.reviews || 0})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Stock Status */}
                      {product.stock > 0 ? (
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 mb-2 sm:mb-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-600 rounded-full"></div>
                          <span className="hidden sm:inline">
                            In Stock ({product.stock})
                          </span>
                          <span className="sm:hidden">In Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-red-600 mb-2 sm:mb-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full"></div>
                          <span>Out of Stock</span>
                        </div>
                      )}

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic
                        }}
                        className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.stock === 0}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Add to Cart</span>
                        <span className="xs:hidden">Add</span>
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4">
                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 px-4">
                No products found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">
                Try adjusting your filters or check back later
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Browse All Products
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
