"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductSuggestion = {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
};

type SearchBoxProps = {
  placeholder?: string;
  className?: string;
};

export default function SearchBox({
  placeholder = "Search products...",
  className = "",
}: SearchBoxProps): React.JSX.Element {
  const router = useRouter();
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Fetch suggestions (attempts `/api/search` then `/api/products` as fallback)
  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    if (!q || q.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    // debounce 240ms
    debounceRef.current = window.setTimeout(async () => {
      try {
        // Try a dedicated search API first (common pattern). If not available,
        // a products list API may be implemented.
        const endpoints = [
          `/api/search?q=${encodeURIComponent(q)}`,
          `/api/products?search=${encodeURIComponent(q)}`,
        ];

        let data: any = null;
        for (const ep of endpoints) {
          try {
            const res = await fetch(ep);
            if (!res.ok) continue;
            data = await res.json();
            if (data) break;
          } catch {
            // ignore and try next endpoint
          }
        }

        if (Array.isArray(data)) {
          // normalize suggestions (handle both product and simple shapes)
          const normalized = data.slice(0, 6).map((it: any) => ({
            id: it.id || it._id,
            slug: it.slug,
            name: it.name || it.title || it.name,
            title: it.title || it.name,
          }));
          setSuggestions(normalized);
          setShowDropdown(normalized.length > 0);
          setActiveIndex(-1);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } catch (err) {
        console.error("Search error:", err);
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 240);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [q]);

  function clear() {
    setQ("");
    setSuggestions([]);
    setShowDropdown(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function onSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const query = q.trim();
    if (!query) return;
    // Navigate to a search results page
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowDropdown(false);
    setActiveIndex(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === "Enter") {
        onSubmit();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((ai) => Math.min(ai + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((ai) => Math.max(ai - 1, 0));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        const s = suggestions[activeIndex];
        const route = s.slug
          ? `/shop/product/${s.slug}`
          : s.id
            ? `/shop/product/${s.id}`
            : `/search?q=${encodeURIComponent(q)}`;
        router.push(route);
        setShowDropdown(false);
        setActiveIndex(-1);
      } else {
        onSubmit();
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`search-box ${className}`}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <form
        onSubmit={(e) => onSubmit(e)}
        role="search"
        aria-label="Site search"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(ev) => {
            setQ(ev.target.value);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls="search-suggestions"
          className="input"
          style={{
            width: 220,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.08)",
            background: "white",
          }}
        />
        {q ? (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--muted)",
            }}
          >
            ×
          </button>
        ) : null}
      </form>

      {/* Suggestions dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          style={{
            position: "absolute",
            left: 0,
            top: "calc(100% + 8px)",
            width: 320,
            maxHeight: 320,
            overflow: "auto",
            background: "#fff",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
            borderRadius: 10,
            zIndex: 60,
            padding: 8,
          }}
        >
          {suggestions.map((s, idx) => {
            const title = s.title || s.name || "Item";
            const dest = s.slug
              ? `/shop/product/${s.slug}`
              : s.id
                ? `/shop/product/${s.id}`
                : `/search?q=${encodeURIComponent(title)}`;
            const isActive = idx === activeIndex;
            return (
              <div
                key={s.id || s.slug || idx}
                role="option"
                aria-selected={isActive}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(ev) => {
                  // onMouseDown used to prevent losing focus before navigation
                  ev.preventDefault();
                }}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: isActive ? "rgba(16,24,40,0.04)" : "transparent",
                  cursor: "pointer",
                  marginBottom: 6,
                }}
              >
                <Link
                  href={dest}
                  onClick={() => setShowDropdown(false)}
                  style={{
                    color: "var(--accent)",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
                  {/* optional subtitle placeholder */}
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* small loading indicator */}
      {loading && (
        <div aria-hidden style={{ marginLeft: 6 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <g
                transform="translate(1 1)"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
