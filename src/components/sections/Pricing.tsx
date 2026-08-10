import { PricingPlans } from '@/components/sections/PricingPlans';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pricing } from '@/lib/content';

/**
 * Pricing section (`#pricing`).
 *
 * The heading is static and server-rendered; the cards below come from the
 * live catalogue, because admins edit plan prices and features at runtime and
 * a hardcoded table would drift on the next edit.
 *
 * `Reveal` wraps the heading ONLY. The plan grid is swapped in after a network
 * round-trip, and a `Reveal` mounting outside the viewport keeps
 * `opacity: 0` until it is scrolled into view — for content that appears late
 * that is a real risk of an invisible section, and the layout.tsx watchdog
 * only covers the page-load case. A plain container cannot fail that way.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-[color:var(--color-surface-soft)] py-20 sm:py-24"
    >
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader
            eyebrow={pricing.eyebrow}
            title={pricing.heading}
            description={pricing.description}
          />
        </Reveal>

        <PricingPlans />
      </Container>
    </section>
  );
}
