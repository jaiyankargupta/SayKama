"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/Footer";

export default function RegisterPage(): React.JSX.Element {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          (data && (data.error || data.message)) || "Registration failed";
        throw new Error(msg);
      }

      // On success, show message and redirect to login
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1300);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error?.message || "An unexpected error occurred.");
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
              Create Account
            </h1>
            <p style={{ fontSize: 16, color: "var(--muted)" }}>
              Join SayKama and discover natural skincare
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                htmlFor="name"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Your full name"
              />
            </div>

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
                minLength={6}
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
                placeholder="Choose a strong password"
              />
              <small style={{ fontSize: 12, color: "var(--muted)" }}>
                Minimum 6 characters
              </small>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                htmlFor="confirmPassword"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
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
                placeholder="Repeat your password"
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

            {success && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#d1fae5",
                  border: "1px solid #a7f3d0",
                  borderRadius: 12,
                  color: "#065f46",
                  fontSize: 14,
                }}
              >
                {success}
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
              {loading ? "Creating account..." : "Create Account"}
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
              Already have an account?{" "}
              <Link
                href="/login"
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
                Login here
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
