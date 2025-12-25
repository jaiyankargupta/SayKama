"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Heart,
  Eye,
  ChevronDown,
  Grid3x3,
  List,
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
  skinType?: string;
  images: string[];
  rating?: number;
  reviews?: number;
  stock: number;
  featured?: boolean;
};

export default function ShopPage(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkinType, setSelectedSkinType] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?sort=${sortBy}&limit=100`);
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

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSkinType =
      selectedSkinType === "all" || product.skinType === selectedSkinType;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSkinType && matchesPrice && matchesSearch;
  });

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const skinTypes = [
    "all",
    "Oily",
    "Dry",
    "Sensitive",
    "Combination",
    "Normal",
    "Acne-Prone",
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              <ShoppingBag className="w-4 h-4" />
              Premium Ayurvedic Products
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Shop All Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our complete collection of natural, Ayurvedic skincare
              and wellness products
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-lg"
              />
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedSkinType("all");
                      setPriceRange([0, 10000]);
                      setSearchQuery("");
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat
                            ? "bg-emerald-100 text-emerald-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {cat === "all" ? "All Categories" : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Type Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Skin Type</h4>
                  <div className="space-y-2">
                    {skinTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSkinType(type)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedSkinType === type
                            ? "bg-emerald-100 text-emerald-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {type === "all" ? "All Skin Types" : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Filters & Sort Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-4 mb-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Filter Button (Mobile) */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Results Count */}
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    products found
                  </p>

                  <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded transition-colors ${
                          viewMode === "grid"
                            ? "bg-white shadow-sm text-emerald-600"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded transition-colors ${
                          viewMode === "list"
                            ? "bg-white shadow-sm text-emerald-600"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-4"
                  >
                    {/* Category */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Category
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              selectedCategory === cat
                                ? "bg-emerald-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {cat === "all" ? "All" : cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Skin Type */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Skin Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skinTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => setSelectedSkinType(type)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              selectedSkinType === type
                                ? "bg-emerald-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {type === "all" ? "All" : type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Loading State */}
              {loading && (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                    >
                      <div className="w-full h-64 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
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
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                        viewMode === "grid"
                          ? "hover:-translate-y-2"
                          : "flex flex-col sm:flex-row"
                      }`}
                    >
                      <Link
                        href={`/shop/product/${product.slug}`}
                        className={viewMode === "list" ? "flex w-full" : "block"}
                      >
                        <div
                          className={`relative overflow-hidden bg-gray-100 ${
                            viewMode === "grid"
                              ? "h-64 w-full"
                              : "h-48 sm:h-auto sm:w-64 flex-shrink-0"
                          }`}
                        >
                          {/* Discount Badge */}
                          {product.originalPrice && (
                            <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              % OFF
                            </div>
                          )}

                          {/* Product Image */}
                          <div className="relative h-full w-full">
                            <Image
                              src={product.images[0] || "/placeholder.jpg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                              <Eye className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                              <Heart className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex-1">
                          {/* Category & Skin Type */}
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs text-emerald-600 font-semibold uppercase">
                              {product.category}
                            </p>
                            {product.skinType && (
                              <>
                                <span className="text-gray-300">•</span>
                                <p className="text-xs text-gray-500">
                                  {product.skinType}
                                </p>
                              </>
                            )}
                          </div>

                          {/* Name */}
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {product.name}
                          </h3>

                          {/* Description (List view only) */}
                          {viewMode === "list" && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          )}

                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(product.rating!)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                ({product.reviews || 0})
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Stock Status */}
                          {product.stock > 0 ? (
                            <div className="flex items-center gap-1 text-xs text-emerald-600 mb-3">
                              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                              <span>In Stock ({product.stock})</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs text-red-600 mb-3">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              <span>Out of Stock</span>
                            </div>
                          )}

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // Add to cart logic
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={product.stock === 0}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
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
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedSkinType("all");
                      setPriceRange([0, 10000]);
                      setSearchQuery("");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
