"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/Footer";

export default function LoginPage(): React.JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = (data && (data.error || data.message)) || "Login failed";
        throw new Error(msg);
      }

      // On success the API sets a httpOnly cookie; just redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            background: "white",
            borderRadius: 24,
            padding: "48px 40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "var(--foreground)",
                marginBottom: 8,
              }}
            >
              Welcome Back
            </h1>
            <p style={{ fontSize: 16, color: "var(--muted)" }}>
              Login to access your SayKama account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "14px 16px",
                  fontSize: 16,
                  border: "2px solid #e2e8f0",
                  borderRadius: 12,
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(15, 23, 42, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="you@example.com"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: "14px 16px",
                  fontSize: 16,
                  border: "2px solid #e2e8f0",
                  borderRadius: 12,
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(15, 23, 42, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#fee2e2",
                  border: "1px solid #fecaca",
                  borderRadius: 12,
                  color: "#dc2626",
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: 16,
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div
            style={{
              marginTop: 24,
              paddingTop: 24,
              borderTop: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 14, color: "var(--muted)" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                style={{
                  color: "#0f172a",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Create an account
              </Link>
            </p>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 12 }}>
              <Link
                href="/"
                style={{
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0f172a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                ← Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
