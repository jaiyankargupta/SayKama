"use client";

import React from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating: number;
};

type TestimonialsSliderProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSlider({
  testimonials,
}: TestimonialsSliderProps): React.JSX.Element {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "20px 0",
      }}
    >
      <style jsx>{`
        @keyframes slideTestimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .testimonial-slider {
          display: flex;
          gap: 24px;
          animation: slideTestimonials 60s linear infinite;
        }
        .testimonial-slider:hover {
          animation-play-state: paused;
        }
        .testimonial-card {
          min-width: 350px;
          flex-shrink: 0;
        }
      `}</style>

      <div className="testimonial-slider">
        {[...testimonials, ...testimonials].map((testimonial, idx) => (
          <div key={idx} className="testimonial testimonial-card">
            <div style={{ marginBottom: 16, color: "#FFD700", fontSize: 20 }}>
              {"★".repeat(testimonial.rating)}
            </div>
            <p className="testimonial-quote">&quot;{testimonial.quote}&quot;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" />
              <div>
                <div className="testimonial-name">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
