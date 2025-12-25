"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  Users,
  Heart,
  Award,
  Target,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Recycle,
  MessageCircle,
} from "lucide-react";
import Footer from "../components/Footer";

export default function About(): React.JSX.Element {
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

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Clean Ingredients",
      description:
        "We choose plant-forward, proven actives and avoid unnecessary fillers or harsh additives. Every formula is tested for safety and performance.",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Sustainable Practices",
      description:
        "From recyclable packaging options to partnering with responsible growers, we aim to reduce our environmental footprint while supporting local suppliers.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparency",
      description:
        "Ingredient lists are plainly labeled with clear usage instructions — no hidden claims or confusing jargon.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community First",
      description:
        "We listen to feedback, support skincare education, and give back through community-focused programs.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const team = [
    {
      name: "Asha Verma",
      role: "Founder & Formulation Lead",
      description:
        "With a background in natural product R&D, Asha leads our formulation and sourcing to create gentle, effective products.",
      image: "/logo.png",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Rohit Patel",
      role: "Operations & Sustainability",
      description:
        "Rohit oversees supply chain and packaging initiatives to minimize waste and improve transparency.",
      image: "/file.svg",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Maya Singh",
      role: "Customer Experience",
      description:
        "Maya helps customers find the right routine and gathers feedback to guide future product development.",
      image: "/window.svg",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const stats = [
    {
      value: "10,000+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
    },
    { value: "50+", label: "Products", icon: <Sparkles className="w-6 h-6" /> },
    {
      value: "4.9/5",
      label: "Average Rating",
      icon: <Award className="w-6 h-6" />,
    },
    { value: "100%", label: "Natural", icon: <Leaf className="w-6 h-6" /> },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-60" />
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/30 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-200/30 rounded-full filter blur-3xl animate-pulse" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Thoughtful Skincare —{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Crafted with Care
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                SayKama was founded to bring gentle, effective and responsibly
                sourced skincare and haircare to everyday routines. We believe
                great products come from thoughtful formulations, transparent
                ingredient sourcing, and listening to real customer needs.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
                >
                  Shop Our Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                <Globe className="w-4 h-4" />
                Our Values
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Mission & Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our commitment to quality, sustainability, and transparency
                guides everything we do
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet the Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate experts dedicated to creating the best natural
                skincare products
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="relative z-10 rounded-full border-4 border-white shadow-xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold mb-6">
                <CheckCircle className="w-4 h-4" />
                Get Started
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Want to Learn More?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Explore ingredient guides, how-to routines, and frequently asked
                questions. If you have a specific concern, our team is ready to
                help.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get in Touch
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all hover:scale-105"
                >
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
