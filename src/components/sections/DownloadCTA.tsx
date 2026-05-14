import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

export function DownloadCTA() {
  return (
    <section id="download" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-[color:var(--color-brand-400)] px-8 py-12 sm:px-14 sm:py-14 lg:px-20">
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Download RideEasy
              </h2>

              <p className="mx-auto max-w-md text-sm leading-relaxed text-white/85 lg:mx-0">
                Experience hassle-free transportation with RideEasy. Reliable
                rides, anytime, anywhere.
              </p>

              <div className="flex justify-center lg:justify-start">
                <Button href="#get-started" variant="dark" size="md">
                  Get Started
                </Button>
              </div>
            </div>

            <div className="relative mx-auto flex h-[360px] w-full max-w-sm items-center justify-center">
              <div className="absolute right-4 top-0 -rotate-3">
                <PhoneMockup variant="ride" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
