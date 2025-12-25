"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  MessageCircle,
  Sparkles,
  AlertCircle,
  Loader,
} from "lucide-react";
import Footer from "../components/Footer";

export default function ContactPage(): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please provide a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          (data && (data.error || data.message)) || "Failed to send message";
        throw new Error(msg);
      }

      setSuccess("Thanks! Your message was sent. We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Contact form error:", err);
      setError(
        error?.message ||
          "Unable to submit the form right now. You can also email us directly at hello@saykama.com",
      );
    } finally {
      setLoading(false);
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Email Us",
      content: "hello@saykama.com",
      link: "mailto:hello@saykama.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Call Us",
      content: "+91 123 456 7890",
      link: "tel:+911234567890",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Visit Us",
      content: "Mumbai, Maharashtra, India",
      link: "#",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      text: "Response within 24 hours",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      text: "Friendly support team",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "100% satisfaction guaranteed",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question about a product, an order, or need help choosing a
              routine? Send us a message and we'll respond within 1-2 business
              days.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            {...fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16"
          >
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${info.color} rounded-xl md:rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform`}
                >
                  {info.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {info.content}
                </p>
              </motion.a>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="block w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm md:text-base"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="block w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm md:text-base"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    required
                    className="block w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-sm md:text-base"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-600">{success}</p>
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all hover:scale-105 text-sm md:text-base"
                  >
                    Continue Shopping
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </div>

                {/* Help Text */}
                <p className="text-xs md:text-sm text-gray-500 pt-2">
                  Prefer email?{" "}
                  <a
                    href="mailto:hello@saykama.com"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold underline"
                  >
                    hello@saykama.com
                  </a>
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> • </span>
                  For urgent order issues, please include your order number.
                </p>
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Why Contact Us?
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-600">
                        {feature.icon}
                      </div>
                      <span className="text-sm md:text-base text-gray-700 font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold text-gray-900">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold text-gray-900">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold text-gray-900">Closed</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 pt-2 border-t border-gray-100">
                    All times are in IST (Indian Standard Time)
                  </p>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Quick Answers
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  Check our FAQ section for instant answers to common questions
                  about shipping, returns, and products.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-sm md:text-base text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Visit FAQ
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Back Link */}
          <motion.div {...fadeInUp} className="text-center mt-12 md:mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-emerald-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
