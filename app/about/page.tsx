import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export default function About(): React.JSX.Element {
  return (
    <>
      <main
        className="app-container"
        style={{ paddingTop: 28, paddingBottom: 48 }}
      >
        <section
          className="section"
          style={{ paddingTop: 12, paddingBottom: 12 }}
        >
          <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
            <div className="eyebrow">Our story</div>
            <h1 style={{ fontSize: 34, marginTop: 6 }}>
              Thoughtful skincare — crafted with care
            </h1>
            <p className="lead" style={{ marginTop: 12 }}>
              SayKama was founded to bring gentle, effective and responsibly
              sourced skincare and haircare to everyday routines. We believe
              great products come from thoughtful formulations, transparent
              ingredient sourcing, and listening to real customer needs.
            </p>

            <div style={{ marginTop: 20 }}>
              <Link
                href="/shop"
                className="btn btn-primary"
                aria-label="Shop SayKama products"
              >
                Shop our products
              </Link>
              <Link
                href="/contact"
                className="btn btn-secondary"
                style={{ marginLeft: 12 }}
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="mission-heading">
          <div className="app-container" style={{ maxWidth: 1100 }}>
            <h2 id="mission-heading" className="section-title">
              Mission & values
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              <div className="card">
                <h3>Clean ingredients</h3>
                <p className="text-muted">
                  We choose plant-forward, proven actives and avoid unnecessary
                  fillers or harsh additives. Every formula is tested for safety
                  and performance.
                </p>
              </div>

              <div className="card">
                <h3>Sustainable practices</h3>
                <p className="text-muted">
                  From recyclable packaging options to partnering with
                  responsible growers, we aim to reduce our environmental
                  footprint while supporting local suppliers.
                </p>
              </div>

              <div className="card">
                <h3>Transparency</h3>
                <p className="text-muted">
                  Ingredient lists are plainly labeled with clear usage
                  instructions — no hidden claims or confusing jargon.
                </p>
              </div>

              <div className="card">
                <h3>Community first</h3>
                <p className="text-muted">
                  We listen to feedback, support skincare education, and give
                  back through community-focused programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="team-heading">
          <div className="app-container" style={{ maxWidth: 1100 }}>
            <h2 id="team-heading" className="section-title">
              Meet the team
            </h2>

            <div className="grid-cards" style={{ marginTop: 8 }}>
              <article className="card" role="listitem">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Image src="/logo.png" alt="Founder" width={96} height={96} />
                  <div>
                    <h3 style={{ margin: 0 }}>Asha Verma</h3>
                    <div className="small text-muted">
                      Founder & Formulation Lead
                    </div>
                    <p className="text-muted" style={{ marginTop: 8 }}>
                      With a background in natural product R&D, Asha leads our
                      formulation and sourcing to create gentle, effective
                      products.
                    </p>
                  </div>
                </div>
              </article>

              <article className="card" role="listitem">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Image
                    src="/file.svg"
                    alt="Operations"
                    width={96}
                    height={96}
                  />
                  <div>
                    <h3 style={{ margin: 0 }}>Rohit Patel</h3>
                    <div className="small text-muted">
                      Operations & Sustainability
                    </div>
                    <p className="text-muted" style={{ marginTop: 8 }}>
                      Rohit oversees supply chain and packaging initiatives to
                      minimize waste and improve transparency.
                    </p>
                  </div>
                </div>
              </article>

              <article className="card" role="listitem">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Image
                    src="/window.svg"
                    alt="Customer"
                    width={96}
                    height={96}
                  />
                  <div>
                    <h3 style={{ margin: 0 }}>Maya Singh</h3>
                    <div className="small text-muted">Customer Experience</div>
                    <p className="text-muted" style={{ marginTop: 8 }}>
                      Maya helps customers find the right routine and gathers
                      feedback to guide future product development.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="cta-heading">
          <div
            className="app-container"
            style={{ textAlign: "center", maxWidth: 820 }}
          >
            <h2 id="cta-heading" className="section-title">
              Want to learn more?
            </h2>
            <p className="text-muted">
              Explore ingredient guides, how-to routines, and frequently asked
              questions. If you have a specific concern, our team is ready to
              help.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link href="/contact" className="btn btn-primary">
                Get in touch
              </Link>
              <Link
                href="/shop"
                className="btn btn-secondary"
                style={{ marginLeft: 12 }}
              >
                Browse products
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
