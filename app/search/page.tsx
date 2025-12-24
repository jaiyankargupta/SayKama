import React from "react";
import Link from "next/link";
import Card from "../components/ui/common/Card";
import products, { Product } from "../../data/products";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function SearchPage({ searchParams }: Props): React.JSX.Element {
  const rawQ =
    typeof searchParams?.q === "string"
      ? searchParams.q.trim()
      : Array.isArray(searchParams?.q)
        ? (searchParams?.q[0] ?? "")
        : "";

  const q = rawQ.toLowerCase();

  const results: Product[] = q
    ? products.filter((p) => {
        const hay = [
          p.name,
          p.shortDescription,
          p.description,
          ...(p.tags || []),
          p.category,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
    : [];

  return (
    <main
      className="app-container"
      style={{ paddingTop: 28, paddingBottom: 48 }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto 28px" }}>
        <h1 className="section-title">Search</h1>

        <form
          method="get"
          role="search"
          style={{ marginTop: 12, display: "flex", gap: 12 }}
        >
          <input
            name="q"
            defaultValue={rawQ}
            aria-label="Search products"
            placeholder="Search products, ingredients, categories..."
            className="input"
            style={{
              flex: 1,
              minWidth: 220,
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ alignSelf: "stretch" }}
          >
            Search
          </button>
          <Link
            href="/shop"
            className="btn btn-secondary"
            style={{ alignSelf: "stretch" }}
          >
            Browse shop
          </Link>
        </form>

        <div style={{ marginTop: 14, color: "var(--muted)" }}>
          {q ? (
            <span>
              Showing results for{" "}
              <strong style={{ color: "var(--accent)" }}>{q}</strong>
            </span>
          ) : (
            <span>Enter a query to search products.</span>
          )}
        </div>
      </div>

      <section style={{ marginTop: 24 }}>
        {q && results.length === 0 ? (
          <div className="text-muted" style={{ maxWidth: 820 }}>
            No products found for your search. Try different keywords or browse
            the shop.
          </div>
        ) : null}

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {results.map((p) => (
            <Card
              key={p.id}
              title={p.name}
              subtitle={p.shortDescription}
              imageSrc={p.images?.[0] ?? "/file.svg"}
              imageAlt={p.name}
              href={`/shop/product/${p.slug}`}
            />
          ))}
        </div>
      </section>

      {!q && (
        <section style={{ marginTop: 44 }}>
          <h2 className="section-title">Featured products</h2>
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {products
              .filter((p) => p.featured)
              .slice(0, 6)
              .map((p) => (
                <Card
                  key={p.id}
                  title={p.name}
                  subtitle={p.shortDescription}
                  imageSrc={p.images?.[0] ?? "/file.svg"}
                  imageAlt={p.name}
                  href={`/shop/product/${p.slug}`}
                />
              ))}
          </div>
        </section>
      )}

      <div
        style={{ marginTop: 48, textAlign: "center", color: "var(--muted)" }}
      >
        <Link
          href="/contact"
          className="small"
          style={{ color: "var(--muted)" }}
        >
          Need help finding something? Contact us.
        </Link>
      </div>
    </main>
  );
}
