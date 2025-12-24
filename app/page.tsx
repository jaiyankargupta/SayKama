import React from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "./components/hero/Hero";
import Footer from "./components/Footer";
import TestimonialsSlider from "./components/TestimonialsSlider";

export default function Home(): React.JSX.Element {
  const bestSellers = [
    {
      id: "1",
      title: "Herbal Shampoo",
      subtitle: "Gentle cleanse — for all hair types",
      price: "₹499",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80",
      href: "/shop/product/herbal-shampoo",
    },
    {
      id: "2",
      title: "Revive Face Scrub",
      subtitle: "Smooth texture, fresh glow",
      price: "₹349",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80",
      href: "/shop/product/revive-face-scrub",
    },
    {
      id: "3",
      title: "Daily Moisturiser",
      subtitle: "Lightweight hydration",
      price: "₹599",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
      href: "/shop/product/daily-moisturiser",
    },
  ];

  const categories = [
    {
      title: "Face Care",
      subtitle: "Cleansers, serums, and moisturizers",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
      href: "/shop/category/face-care",
    },
    {
      title: "Hair Care",
      subtitle: "Shampoos, conditioners, and treatments",
      image:
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80",
      href: "/shop/category/hair-care",
    },
    {
      title: "Body Care",
      subtitle: "Body washes, scrubs, and lotions",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80",
      href: "/shop/category/body-care",
    },
  ];

  const skinTypes = [
    {
      title: "Oily Skin",
      subtitle: "Lightweight, balancing formulations",
      icon: "💧",
      href: "/shop/skin-type/oily",
    },
    {
      title: "Dry Skin",
      subtitle: "Hydrating and nourishing",
      icon: "✨",
      href: "/shop/skin-type/dry",
    },
    {
      title: "Sensitive Skin",
      subtitle: "Gentle, fragrance-free options",
      icon: "🌸",
      href: "/shop/skin-type/sensitive",
    },
    {
      title: "Combination",
      subtitle: "Balanced care for mixed skin",
      icon: "🌿",
      href: "/shop/skin-type/combination",
    },
    {
      title: "Normal Skin",
      subtitle: "Maintain healthy, balanced skin",
      icon: "🌟",
      href: "/shop/skin-type/normal",
    },
    {
      title: "Mature Skin",
      subtitle: "Anti-aging and firming care",
      icon: "💎",
      href: "/shop/skin-type/mature",
    },
  ];

  const features = [
    {
      icon: "🌿",
      title: "Natural Ingredients",
      description:
        "100% plant-based formulations sourced ethically from trusted suppliers worldwide.",
    },
    {
      icon: "🧪",
      title: "Dermatologist Tested",
      description:
        "All products are clinically tested and approved by dermatologists for safety and efficacy.",
    },
    {
      icon: "♻️",
      title: "Eco-Friendly",
      description:
        "Sustainable packaging and carbon-neutral shipping to minimize environmental impact.",
    },
    {
      icon: "🐰",
      title: "Cruelty-Free",
      description:
        "Never tested on animals. Proud member of Leaping Bunny and PETA certifications.",
    },
    {
      icon: "🇮🇳",
      title: "Made in India",
      description:
        "Proudly crafted with care by local artisans using traditional wisdom and modern science.",
    },
    {
      icon: "⭐",
      title: "Award-Winning",
      description:
        "Recognized by beauty experts and featured in leading wellness magazines worldwide.",
    },
  ];

  const testimonials = [
    {
      quote:
        "SayKama&apos;s face scrub has completely transformed my skin. It&apos;s gentle yet effective, and I love knowing it&apos;s all natural!",
      author: "Priya Sharma",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "Finally found a shampoo that doesn't irritate my sensitive scalp. The herbal formula is amazing and smells divine.",
      author: "Rahul Verma",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "The daily moisturizer is lightweight and perfect for my oily skin. No breakouts, just healthy glowing skin!",
      author: "Ananya Iyer",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "I&apos;ve been using SayKama products for 6 months and my skin has never looked better. The natural ingredients really make a difference!",
      author: "Neha Kapoor",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "Excellent quality and eco-friendly packaging. SayKama truly cares about the environment and customer satisfaction.",
      author: "Arjun Patel",
      role: "Verified Customer",
      rating: 5,
    },
    {
      quote:
        "As someone with sensitive skin, finding the right products was always a challenge. SayKama&apos;s gentle formulas are perfect for me!",
      author: "Kavya Reddy",
      role: "Verified Customer",
      rating: 5,
    },
  ];

  return (
    <>
      <Hero />

      {/* BEST SELLERS SECTION */}
      <section className="section" aria-labelledby="best-sellers-heading">
        <div className="app-container">
          <div className="section-header">
            <h2 id="best-sellers-heading" className="section-title">
              Best Sellers
            </h2>
            <p className="section-subtitle">
              Discover our most-loved products trusted by thousands of customers
            </p>
          </div>

          <div className="grid-cards">
            {bestSellers.map((product) => (
              <div key={product.id} className="card">
                <div className="card-media">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="card-body">
                  <h3>{product.title}</h3>
                  <p>{product.subtitle}</p>
                  <div className="card-price">{product.price}</div>
                  <div className="card-actions">
                    <Link
                      href={product.href}
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/shop" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section
        className="section section-alt"
        aria-labelledby="categories-heading"
      >
        <div className="app-container">
          <div className="section-header">
            <h2 id="categories-heading" className="section-title">
              Shop by Category
            </h2>
            <p className="section-subtitle">
              Find the perfect products for your beauty routine
            </p>
          </div>

          <div className="grid-cards">
            {categories.map((category, idx) => (
              <Link
                key={idx}
                href={category.href}
                className="card"
                style={{ textDecoration: "none" }}
              >
                <div className="card-media">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="card-body">
                  <h3>{category.title}</h3>
                  <p>{category.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SKIN TYPE SECTION */}
      <section className="section" aria-labelledby="skin-type-heading">
        <div className="app-container">
          <div className="section-header">
            <h2 id="skin-type-heading" className="section-title">
              Shop by Skin Type
            </h2>
            <p className="section-subtitle">
              Personalized solutions for every skin type
            </p>
          </div>

          <div className="grid-cards">
            {skinTypes.map((type, idx) => (
              <Link
                key={idx}
                href={type.href}
                className="card feature-card"
                style={{ textDecoration: "none" }}
              >
                <div className="feature-icon">
                  <span style={{ fontSize: 32 }}>{type.icon}</span>
                </div>
                <h3>{type.title}</h3>
                <p>{type.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section
        className="section section-alt"
        aria-labelledby="features-heading"
      >
        <div className="app-container">
          <div className="section-header">
            <h2 id="features-heading" className="section-title">
              Why Choose SayKama?
            </h2>
            <p className="section-subtitle">
              Committed to quality, sustainability, and your wellbeing
            </p>
          </div>

          <div className="grid-cards">
            {features.map((feature, idx) => (
              <div key={idx} className="card feature-card">
                <div className="feature-icon">
                  <span style={{ fontSize: 32 }}>{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section" aria-labelledby="testimonials-heading">
        <div className="app-container">
          <div className="section-header">
            <h2 id="testimonials-heading" className="section-title">
              What Our Customers Say
            </h2>
            <p className="section-subtitle">
              Real reviews from real people who love our products
            </p>
          </div>

          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section section-alt" aria-labelledby="about-heading">
        <div className="app-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <h2
                id="about-heading"
                className="section-title"
                style={{ textAlign: "left", marginBottom: 24 }}
              >
                Our Story
              </h2>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "var(--muted)",
                  marginBottom: 24,
                }}
              >
                SayKama was born from a simple belief: skincare should be pure,
                effective, and kind to both your skin and the planet. We partner
                with ethical growers, prioritize sustainable packaging, and
                craft formulas using only the finest natural ingredients.
              </p>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "var(--muted)",
                  marginBottom: 32,
                }}
              >
                Every product is thoughtfully formulated, rigorously tested, and
                made with love. Join thousands of happy customers who trust
                SayKama for their daily skincare needs.
              </p>
              <Link href="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
                alt="SayKama products"
                width={600}
                height={500}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section" aria-labelledby="cta-heading">
        <div className="app-container">
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: 24,
              padding: "64px 48px",
              textAlign: "center",
              color: "white",
            }}
          >
            <h2
              id="cta-heading"
              className="section-title"
              style={{ color: "white", marginBottom: 16 }}
            >
              Ready to Transform Your Skin?
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.8)",
                maxWidth: 600,
                margin: "0 auto 32px",
              }}
            >
              Join thousands of satisfied customers and discover the SayKama
              difference today.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/shop"
                className="btn"
                style={{ background: "white", color: "#0f172a" }}
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="btn"
                style={{
                  background: "transparent",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
