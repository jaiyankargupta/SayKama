"use client";

import React from "react";
import Link from "next/link";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <div
          className="app-container"
          style={{
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {/* Large 404 Text with gradient */}
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            404
          </div>

          {/* Decorative icon */}
          <div
            style={{
              fontSize: 48,
              marginBottom: 24,
              opacity: 0.6,
            }}
          >
            🔍
          </div>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Oops! Page Not Found
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "var(--muted)",
              marginBottom: 40,
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            We couldn&apos;t find the page you&apos;re looking for. It might
            have been moved, deleted, or perhaps the URL was mistyped.
            Don&apos;t worry—let&apos;s get you back to exploring our natural
            skincare products!
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 60,
            }}
          >
            <Link href="/" className="btn btn-primary" style={{ fontSize: 16 }}>
              🏠 Back to Home
            </Link>
            <Link
              href="/shop"
              className="btn btn-secondary"
              style={{ fontSize: 16 }}
            >
              🛍️ Browse Products
            </Link>
            <Link
              href="/contact"
              className="btn"
              style={{
                fontSize: 16,
                background: "transparent",
                border: "2px solid #e2e8f0",
                color: "var(--foreground)",
              }}
            >
              📧 Contact Support
            </Link>
          </div>

          {/* Popular Links Section */}
          <div
            style={{
              marginTop: 48,
              padding: "32px",
              background: "white",
              borderRadius: 20,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.06)",
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 24,
                color: "var(--foreground)",
              }}
            >
              Quick Links
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
              }}
            >
              <Link
                href="/shop"
                className="quick-link-card"
                style={{
                  padding: "16px 20px",
                  background: "rgba(15, 23, 42, 0.03)",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "var(--foreground)",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  border: "2px solid transparent",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.06)";
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                🛒 All Products
              </Link>
              <Link
                href="/shop/category/face-care"
                className="quick-link-card"
                style={{
                  padding: "16px 20px",
                  background: "rgba(15, 23, 42, 0.03)",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "var(--foreground)",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  border: "2px solid transparent",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.06)";
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                ✨ Face Care
              </Link>
              <Link
                href="/about"
                className="quick-link-card"
                style={{
                  padding: "16px 20px",
                  background: "rgba(15, 23, 42, 0.03)",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "var(--foreground)",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  border: "2px solid transparent",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.06)";
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                ℹ️ About Us
              </Link>
              <Link
                href="/contact"
                className="quick-link-card"
                style={{
                  padding: "16px 20px",
                  background: "rgba(15, 23, 42, 0.03)",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "var(--foreground)",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  border: "2px solid transparent",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.06)";
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                💬 Contact Us
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              marginTop: 32,
            }}
          >
            Need assistance? Our support team is here to help.{" "}
            <Link
              href="/contact"
              style={{
                color: "#0f172a",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Get in touch
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
