import { Container } from "@/components/ui/Container";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { StoreBadge } from "@/components/ui/StoreBadge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <Container className="relative grid gap-14 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:py-24">
        <div className="flex flex-col gap-7 text-center lg:text-left">
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[color:var(--color-ink)] sm:text-5xl lg:text-[48px]">
            Your Smooth Ride,
            <br className="hidden sm:inline" /> Just a Tap Away
          </h1>

          <p className="mx-auto max-w-md text-sm leading-relaxed text-[color:var(--color-ink-soft)] lg:mx-0">
            Experience hassle-free transportation with RideEasy. Reliable rides,
            anytime, anywhere.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-4 lg:justify-start">
            <StoreBadge store="google" href="#download" variant="dark" />
            <StoreBadge store="apple" href="#download" variant="dark" />
          </div>
        </div>

        <div className="relative mx-auto flex h-[520px] w-full max-w-md items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute right-6 top-8 h-[340px] w-[340px] rounded-full bg-[color:var(--color-brand-400)]"
          />
          <PhoneMockup variant="ride" className="relative" />

          <div className="absolute bottom-12 right-0 flex w-[220px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] sm:right-2">
            <span className="font-display text-base font-bold text-[color:var(--color-ink)]">
              Creatives Team
            </span>
            <span className="text-[11px] font-semibold text-[color:var(--color-ink-soft)]">
              Simple Web Design Team
            </span>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[
                  "bg-[#e2a4a0]",
                  "bg-[#9bbad6]",
                  "bg-[#d4b78a]",
                ].map((bg, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`h-7 w-7 rounded-full border-2 border-white ${bg}`}
                  />
                ))}
              </div>
              <span className="ml-2 grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-brand-400)] text-[11px] font-bold text-white">
                3+
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
