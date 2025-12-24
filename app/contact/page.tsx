"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export default function ContactPage(): React.JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    // basic email validation
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

      setSuccess("Thanks — your message was sent. We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Contact form error:", err);
      // Provide a fallback suggestion to use mailto in case the API is not available
      setError(
        error?.message ||
          "Unable to submit the form right now. You can also email us directly at hello@saykama.example",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main
        className="app-container"
        style={{ paddingTop: 28, paddingBottom: 48 }}
      >
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-semibold">Contact us</h1>
          <p className="text-muted mt-2">
            Have a question about a product, an order, or need help choosing a
            routine? Send us a message and we&apos;ll respond within 1-2
            business days.
          </p>

          <form
            className="form mt-6"
            onSubmit={handleSubmit}
            aria-label="Contact form"
          >
            <label className="flex flex-col">
              <span className="small">Full name</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="small">Email</span>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="small">Message</span>
              <textarea
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Tell us how we can help..."
                required
              />
            </label>

            {error && <div className="text-red-600 small">{error}</div>}
            {success && <div className="text-green-600 small">{success}</div>}

            <div
              style={{
                marginTop: 8,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send message"}
              </button>

              <Link
                href="/shop"
                className="btn btn-secondary"
                aria-label="Browse shop"
              >
                Continue shopping
              </Link>
            </div>
          </form>

          <hr
            style={{
              marginTop: 22,
              marginBottom: 18,
              border: "none",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          />

          <div className="text-muted small">
            Prefer email?{" "}
            <a
              href="mailto:hello@saykama.example"
              className="text-blue-600 hover:underline"
            >
              hello@saykama.example
            </a>
            . For urgent order issues, please include your order number.
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
