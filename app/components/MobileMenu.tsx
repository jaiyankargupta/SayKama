"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps): React.JSX.Element {
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    {
      label: "Shop by Skin Type",
      submenu: [
        { label: "Oily Skin", href: "/shop/skin-type/oily" },
        { label: "Dry Skin", href: "/shop/skin-type/dry" },
        { label: "Sensitive Skin", href: "/shop/skin-type/sensitive" },
        { label: "Combination", href: "/shop/skin-type/combination" },
        { label: "Normal Skin", href: "/shop/skin-type/normal" },
        { label: "Mature Skin", href: "/shop/skin-type/mature" },
      ],
    },
    {
      label: "Categories",
      submenu: [
        { label: "Face Care", href: "/shop/category/face-care" },
        { label: "Hair Care", href: "/shop/category/hair-care" },
        { label: "Body Care", href: "/shop/category/body-care" },
      ],
    },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            animation: "fadeIn 0.3s ease",
          }}
        />
      )}

      {/* Menu Drawer */}
      <div
        className="mobile-menu-drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "85%",
          maxWidth: 360,
          background: "white",
          zIndex: 999,
          overflowY: "auto",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          boxShadow: isOpen ? "4px 0 24px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            borderBottom: "1px solid #e2e8f0",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "white",
          }}
        >
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
              SayKama
            </h2>
            <p style={{ fontSize: 12, margin: "4px 0 0 0", opacity: 0.9 }}>
              Natural Skincare
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              borderRadius: 8,
              fontSize: 24,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* User Section */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            background: "#f8fafc",
          }}
        >
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: "white",
              borderRadius: 12,
              textDecoration: "none",
              color: "#0f172a",
              border: "2px solid #e2e8f0",
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 20 }}>👤</span>
            <span>Login / Register</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: "12px 0" }}>
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 20px",
                      border: "none",
                      background: "transparent",
                      color: "#0f172a",
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{item.label}</span>
                    <span
                      style={{
                        fontSize: 20,
                        transition: "transform 0.2s ease",
                        transform:
                          expandedMenu === item.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {expandedMenu === item.label && (
                    <div
                      style={{
                        background: "#f8fafc",
                        paddingLeft: 20,
                      }}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          style={{
                            display: "block",
                            padding: "12px 20px",
                            color: "#64748b",
                            fontSize: 15,
                            textDecoration: "none",
                            borderLeft:
                              pathname === subItem.href
                                ? "3px solid #0f172a"
                                : "3px solid transparent",
                            background:
                              pathname === subItem.href
                                ? "rgba(15, 23, 42, 0.05)"
                                : "transparent",
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    color: "#0f172a",
                    fontSize: 16,
                    fontWeight: 600,
                    textDecoration: "none",
                    borderLeft:
                      pathname === item.href
                        ? "4px solid #0f172a"
                        : "4px solid transparent",
                    background:
                      pathname === item.href
                        ? "rgba(15, 23, 42, 0.05)"
                        : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Quick Actions */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #e2e8f0",
            marginTop: "auto",
          }}
        >
          <Link
            href="/cart"
            className="btn btn-primary"
            style={{
              width: "100%",
              marginBottom: 12,
              justifyContent: "center",
            }}
          >
            🛒 View Cart
          </Link>
          <Link
            href="/dashboard"
            className="btn btn-secondary"
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            📊 My Dashboard
          </Link>
        </div>

        {/* Footer Info */}
        <div
          style={{
            padding: "20px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8fafc",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              margin: "0 0 8px 0",
            }}
          >
            Need help?
          </p>
          <a
            href="mailto:support@saykama.com"
            style={{
              fontSize: 14,
              color: "#0f172a",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            📧 support@saykama.com
          </a>
          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              margin: "12px 0 0 0",
            }}
          >
            🔒 Secure Shopping
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .mobile-menu-drawer::-webkit-scrollbar {
          width: 6px;
        }

        .mobile-menu-drawer::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .mobile-menu-drawer::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
      `}</style>
    </>
  );
}
