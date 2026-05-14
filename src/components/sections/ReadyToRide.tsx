import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { readyToRideFeatures } from "@/lib/content";

export function ReadyToRide() {
  return (
    <section
      id="ready-to-ride"
      className="bg-white py-20 sm:py-24"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeader
          title="Ready to Ride?"
          description="Embrace life's vastness, venture forth, and discover the wonders waiting beyond. The world beckons; seize its grand offerings now!"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto flex h-[480px] w-full max-w-md items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute left-[10%] top-[15%] h-[320px] w-[320px] rounded-full bg-[color:var(--color-brand-400)]"
            />
            <div className="absolute left-0 bottom-4 -rotate-[8deg] scale-90">
              <PhoneMockup variant="rating" />
            </div>
            <div className="absolute right-0 top-0 rotate-[4deg]">
              <PhoneMockup variant="ride" />
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {readyToRideFeatures.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--color-brand-50)] text-[color:var(--color-brand-500)]"
                >
                  <Icon
                    name={feature.icon ?? "mail"}
                    width={22}
                    height={22}
                  />
                </span>
                <h3 className="font-display text-base font-bold text-[color:var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
