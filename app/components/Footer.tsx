"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
  Leaf,
  Shield,
  Truck,
  Award,
  ArrowRight,
} from "lucide-react";

export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const features = [
    { icon: <Leaf className="w-5 h-5" />, text: "100% Natural" },
    { icon: <Shield className="w-5 h-5" />, text: "Dermatologist Tested" },
    { icon: <Truck className="w-5 h-5" />, text: "Free Shipping" },
    { icon: <Award className="w-5 h-5" />, text: "Award Winning" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative">
        {/* Trust Badges */}
        <motion.div {...fadeInUp} className="border-b border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex items-center justify-center gap-3 text-white/80 hover:text-emerald-400 transition-colors"
                >
                  {feature.icon}
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Section */}
            <motion.div {...fadeInUp} className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <Image
                  src="/logo.png"
                  alt="SayKama"
                  width={56}
                  height={56}
                  className="transition-transform group-hover:scale-105"
                  style={{ objectFit: "contain", background: "transparent" }}
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
                    SayKama
                  </span>
                  <span className="text-[10px] font-medium text-emerald-400/70 tracking-wider">
                    PREMIUM SKINCARE
                  </span>
                </div>
              </Link>
              <p className="text-white/70 leading-relaxed mb-6">
                Discover the power of nature with our premium skincare and
                haircare products. Crafted with care, designed for you.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:hello@saykama.com"
                  className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm">hello@saykama.com</span>
                </a>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm">+91 123 456 7890</span>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm">
                    123 Beauty Street, Mumbai,
                    <br />
                    Maharashtra 400001, India
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Shop Links */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                Shop
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Best Sellers", href: "/best-sellers" },
                  { name: "All Products", href: "/shop" },
                  { name: "Face Care", href: "/shop/category/face-care" },
                  { name: "Hair Care", href: "/shop/category/hair-care" },
                  { name: "Body Care", href: "/shop/category/body-care" },
                  { name: "New Arrivals", href: "/shop/new" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                Company
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Story", href: "/our-story" },
                  { name: "Sustainability", href: "/sustainability" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                  { name: "Press", href: "/press" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                Support
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Shipping Info", href: "/shipping" },
                  { name: "Returns & Refunds", href: "/returns" },
                  { name: "Track Order", href: "/track-order" },
                  { name: "Size Guide", href: "/size-guide" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                Newsletter
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                {...fadeInUp}
                className="text-white/60 text-sm text-center md:text-left"
              >
                © {year} SayKama. All rights reserved. Made with{" "}
                <Heart className="w-4 h-4 inline text-red-500" /> in India.
              </motion.div>

              {/* Social Links */}
              <motion.div {...fadeInUp} className="flex items-center gap-4">
                {[
                  {
                    icon: <Instagram className="w-5 h-5" />,
                    href: "https://instagram.com",
                    label: "Instagram",
                  },
                  {
                    icon: <Facebook className="w-5 h-5" />,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: <Twitter className="w-5 h-5" />,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 hover:bg-emerald-500 hover:text-white transition-all hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </motion.div>

              {/* Legal Links */}
              <motion.div
                {...fadeInUp}
                className="flex items-center gap-6 text-sm"
              >
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
