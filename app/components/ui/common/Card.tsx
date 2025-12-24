import React from "react";
import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  id?: string | number;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * horizontal: image left, content right
   * vertical (default): image above content
   */
  horizontal?: boolean;
  /**
   * optional actions (buttons/links) rendered in the footer area
   */
  actions?: React.ReactNode;
};

export default function Card({
  id,
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  href,
  children,
  className = "",
  horizontal = false,
  actions,
}: CardProps): React.JSX.Element {
  const content = (
    <div
      className={`card ${horizontal ? "flex items-center gap-4" : ""} ${className}`}
      role="group"
      aria-labelledby={id ? `card-title-${id}` : undefined}
    >
      {imageSrc ? (
        <div
          className={`card-media ${horizontal ? "shrink-0" : ""}`}
          style={{
            width: horizontal ? 140 : "100%",
            minWidth: horizontal ? 140 : undefined,
            display: "block",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || title || "card image"}
            width={horizontal ? 140 : 520}
            height={horizontal ? 140 : 240}
            style={{ borderRadius: 8, objectFit: "cover" }}
            priority={false}
          />
        </div>
      ) : null}

      <div className="card-body" style={{ flex: 1 }}>
        {title ? (
          <h3 id={id ? `card-title-${id}` : undefined} style={{ margin: 0 }}>
            {title}
          </h3>
        ) : null}

        {subtitle ? (
          <p className="text-muted small" style={{ marginTop: 6 }}>
            {subtitle}
          </p>
        ) : null}

        {children ? (
          <div className="card-content" style={{ marginTop: 10 }}>
            {children}
          </div>
        ) : null}

        {actions ? (
          <div className="card-actions" style={{ marginTop: 12 }}>
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );

  // If href provided, wrap with a Link to make the whole card clickable (preserves a11y)
  if (href) {
    return (
      <Link
        href={href}
        aria-label={title ? `Open ${title}` : "Open item"}
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
}
