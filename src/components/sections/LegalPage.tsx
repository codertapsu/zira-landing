import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalDocument } from "@/lib/content";

/** Renders a legal document (privacy / terms) as a simple prose page. */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <Header />
      <main>
        <Container className="max-w-3xl py-16">
          <Reveal direction="up">
            <h1 className="text-3xl font-bold text-[color:var(--color-ink-strong)] sm:text-4xl">
              {doc.title}
            </h1>
            <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
              Cập nhật lần cuối: {doc.lastUpdated}
            </p>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink)]">
              {doc.intro}
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {doc.sections.map((section) => (
              <Reveal key={section.heading} direction="up">
                <section>
                  <h2 className="text-lg font-semibold text-[color:var(--color-ink-strong)]">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-base leading-relaxed text-[color:var(--color-ink-soft)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
