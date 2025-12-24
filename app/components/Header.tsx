"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchBox from "./search/SearchBox";

export default function Header(): React.JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 0.2 second delay
    setDropdownTimeout(timeout);
  };

  return (
    <header className="site-header">
      <div className="app-container nav" style={{ alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" className="site-brand" aria-label="SayKama home">
            <Image
              src="/logo.png"
              alt="SayKama logo"
              width={96}
              height={96}
              className="rounded"
              style={{ objectFit: "contain" }}
            />
            <span className="title">SayKama</span>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>

            <Link href="/about">About us</Link>

            <div
              className="dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="dropdown-button"
                aria-haspopup="true"
                aria-expanded={showDropdown}
                type="button"
              >
                Shop by Skin Type
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  style={{
                    transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link href="/shop/skin-type/oily">Oily Skin</Link>
                  <Link href="/shop/skin-type/dry">Dry Skin</Link>
                  <Link href="/shop/skin-type/sensitive">Sensitive Skin</Link>
                  <Link href="/shop/skin-type/combination">
                    Combination Skin
                  </Link>
                  <Link href="/shop/skin-type/normal">Normal Skin</Link>
                  <Link href="/shop/skin-type/acne-prone">Acne-Prone Skin</Link>
                </div>
              )}
            </div>

            <Link href="/best-sellers">Best sellers</Link>

            <Link href="/contact">Contact us</Link>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Desktop: show full search box */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SearchBox />
              <Link href="/login" className="header-login-btn">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile: show compact actions */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                aria-label="Open search"
                onClick={() => setShowMobileSearch(true)}
                style={{
                  border: "none",
                  background: "transparent",
                  padding: 8,
                  borderRadius: 8,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <Link
                href="/login"
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  color: "white",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 88,
          }}
          onClick={() => setShowMobileSearch(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(920px, 94%)",
              background: "#fff",
              borderRadius: 12,
              padding: 12,
              boxShadow: "0 10px 40px rgba(2,6,23,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowMobileSearch(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <SearchBox />
          </div>
        </div>
      )}
    </header>
  );
}
