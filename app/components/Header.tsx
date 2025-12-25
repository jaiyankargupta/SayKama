"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  User,
  ChevronDown,
  Sparkles,
  Droplets,
  Heart,
  Leaf,
  Star,
  Shield,
} from "lucide-react";
import SearchBox from "./search/SearchBox";

export default function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skinTypes = [
    {
      name: "Oily Skin",
      href: "/shop/skin-type/oily",
      icon: <Droplets className="w-4 h-4 md:w-5 md:h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Dry Skin",
      href: "/shop/skin-type/dry",
      icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5" />,
      color: "from-amber-500 to-yellow-500",
    },
    {
      name: "Sensitive Skin",
      href: "/shop/skin-type/sensitive",
      icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Combination",
      href: "/shop/skin-type/combination",
      icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" />,
      color: "from-emerald-500 to-green-500",
    },
    {
      name: "Normal Skin",
      href: "/shop/skin-type/normal",
      icon: <Star className="w-4 h-4 md:w-5 md:h-5" />,
      color: "from-orange-500 to-amber-500",
    },
    {
      name: "Acne-Prone",
      href: "/shop/skin-type/acne-prone",
      icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-slate-900 to-slate-800"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Promo Banner */}
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 px-2 md:px-4 text-xs md:text-sm"
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">
                <span className="hidden sm:inline">
                  Free Shipping on Orders Over ₹999 | 30-Day Money Back
                  Guarantee
                </span>
                <span className="sm:hidden">Free Shipping Over ₹999</span>
              </span>
            </div>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu
                className={`w-5 h-5 md:w-6 md:h-6 ${isScrolled ? "text-gray-900" : "text-white"}`}
              />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="SayKama logo"
                  width={40}
                  height={40}
                  className="rounded-lg transition-transform group-hover:scale-105 md:w-[50px] md:h-[50px]"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <motion.span
                className={`text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ${
                  !isScrolled ? "text-white" : ""
                }`}
                whileHover={{ scale: 1.05 }}
              >
                SayKama
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              <Link
                href="/"
                className={`font-medium transition-colors hover:text-emerald-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`font-medium transition-colors hover:text-emerald-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                About
              </Link>

              {/* Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button
                  className={`flex items-center gap-1 font-medium transition-colors hover:text-emerald-600 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  Shop by Skin Type
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
                    >
                      <div className="p-2">
                        {skinTypes.map((type) => (
                          <Link
                            key={type.href}
                            href={type.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                          >
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                            >
                              {type.icon}
                            </div>
                            <span className="font-medium text-gray-900 group-hover:text-emerald-600">
                              {type.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/best-sellers"
                className={`font-medium transition-colors hover:text-emerald-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Best Sellers
              </Link>

              <Link
                href="/contact"
                className={`font-medium transition-colors hover:text-emerald-600 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Search */}
              {!isMobile && (
                <div className="hidden lg:block">
                  <SearchBox />
                </div>
              )}

              {/* Mobile Search Button */}
              {isMobile && (
                <button
                  onClick={() => setShowMobileSearch(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Open search"
                >
                  <Search
                    className={`w-5 h-5 ${isScrolled ? "text-gray-900" : "text-white"}`}
                  />
                </button>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag
                  className={`w-5 h-5 ${isScrolled ? "text-gray-900" : "text-white"}`}
                />
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                  0
                </span>
              </Link>

              {/* Get Started Button */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105 text-sm md:text-base"
              >
                <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden md:inline">Get Started</span>
                <span className="md:hidden">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[70] shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                      src="/logo.png"
                      alt="SayKama"
                      width={36}
                      height={36}
                      className="rounded-lg sm:w-[40px] sm:h-[40px]"
                    />
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      SayKama
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <nav className="space-y-1 sm:space-y-2">
                  <Link
                    href="/"
                    className="block px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>

                  <div className="py-1 sm:py-2">
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Shop by Skin Type
                    </div>
                    {skinTypes.map((type) => (
                      <Link
                        key={type.href}
                        href={type.href}
                        className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                        >
                          {type.icon}
                        </div>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {type.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/best-sellers"
                    className="block px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Best Sellers
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>

                  <div className="pt-3 sm:pt-4">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      Get Started
                    </Link>
                  </div>

                  <Link
                    href="/best-sellers"
                    className="block px-4 py-3 rounded-lg font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Best Sellers
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-3 rounded-lg font-medium text-gray-900 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>

                  <div className="pt-4">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Get Started
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {showMobileSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setShowMobileSearch(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl z-[70] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Search Products
                </h3>
                <button
                  onClick={() => setShowMobileSearch(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SearchBox />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
