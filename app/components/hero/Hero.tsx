import React from "react";
import Link from "next/link";

type HeroProps = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
};

export default function Hero({
  eyebrow = "Natural · Clean · Conscious",
  title = "SayKama — skincare and haircare crafted for everyday wellness",
  subtitle = "Ethically-sourced ingredients, gentle formulations, and packaging that respects the planet. Explore curated collections for your skin and hair.",
}: HeroProps): React.JSX.Element {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <div className="eyebrow">{eyebrow}</div>

        <h1 id="hero-heading">{title}</h1>

        <p className="lead">{subtitle}</p>

        <div className="cta" role="group" aria-label="Primary actions">
          <Link href="/shop" className="btn btn-primary">
            Shop products
          </Link>
          <Link href="/about" className="btn btn-secondary">
            Learn more
          </Link>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--brand)", flexShrink: 0 }}
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div>
              <strong>Free shipping</strong>
              <span> on orders over ₹999</span>
            </div>
          </div>

          <div className="hero-feature">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--brand)", flexShrink: 0 }}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <div>
              <strong>100% natural</strong>
              <span> plant-forward formulations</span>
            </div>
          </div>

          <div className="hero-feature">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--brand)", flexShrink: 0 }}
            >
              <path d="M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0v-7"></path>
            </svg>
            <div>
              <strong>Sustainable</strong>
              <span> recyclable packaging</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
