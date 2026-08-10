'use client';

import { useEffect, useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { TrackedButton } from '@/components/ui/TrackedButton';
import { pricing, pricingFeatureLabels } from '@/lib/content';
import {
  PUBLIC_PLANS_TIMEOUT_MS,
  fetchPublicPlans,
  formatPlanPrice,
  type PublicPlan,
  type PublicPlanCatalogue,
} from '@/lib/pricing';

/**
 * The live plan grid, with the fallback prose it degrades to.
 *
 * DEGRADATION IS THE DEFAULT STATE, NOT AN ERROR BRANCH.
 * `catalogue` starts `null` and only ever becomes non-null on a successful
 * response carrying at least one plan, so:
 *
 *   - the static export server-renders the FALLBACK CARD into `index.html`,
 *     which is what a crawler, a no-JS visitor, and everyone during the
 *     round-trip actually sees;
 *   - a failed, timed-out, rate-limited, malformed or empty response simply
 *     never replaces it — there is no state in which this component renders an
 *     empty table, a stuck spinner, or a broken row.
 *
 * Because the fallback is also the client's first render, hydration matches
 * the emitted HTML exactly.
 */
export function PricingPlans() {
  const [catalogue, setCatalogue] = useState<PublicPlanCatalogue | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
    }, PUBLIC_PLANS_TIMEOUT_MS);

    void fetchPublicPlans(controller.signal).then((result) => {
      clearTimeout(timer);
      // `fetchPublicPlans` already collapses every failure to `null`, and
      // `parsePlanCatalogue` rejects an empty list, so a truthy result is
      // always a renderable catalogue.
      if (result) {
        setCatalogue(result);
      }
    });

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (!catalogue) {
    return <PricingFallback />;
  }

  return (
    <div className="flex flex-col gap-8">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {catalogue.items.map((plan) => (
          <PlanCard key={plan.planCode} plan={plan} />
        ))}
      </ul>

      <div className="flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          {catalogue.visible ? pricing.purchaseOnNote : pricing.purchaseOffNote}
        </p>
        <PricingCta location="pricing_plans" />
      </div>
    </div>
  );
}

function PlanCard({ plan }: { plan: PublicPlan }) {
  // Render in the order `pricingFeatureLabels` declares, not the order the API
  // returns, so every card lists its features in the same sequence and the
  // cards can be compared by scanning across. Keys with no label are skipped
  // on purpose — see the map's docblock.
  const features = Object.entries(pricingFeatureLabels).filter(([key]) =>
    plan.featureKeys.includes(key),
  );

  return (
    <li className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-bold text-[color:var(--color-ink)]">
          {plan.displayName}
        </h3>
        <PlanPrice plan={plan} />
        {plan.description ? (
          <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {plan.description}
          </p>
        ) : null}
      </div>

      {features.length > 0 ? (
        <div className="flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--color-ink-soft)]">
            {pricing.featuresHeading}
          </p>
          <ul className="flex flex-col gap-2">
            {features.map(([key, label]) => (
              <li key={key} className="flex items-start gap-2">
                <Icon
                  name="check"
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-brand-500)]"
                />
                <span className="text-sm leading-relaxed text-[color:var(--color-ink)]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function PlanPrice({ plan }: { plan: PublicPlan }) {
  if (plan.priceAmount <= 0) {
    return (
      <p className="font-display text-2xl font-semibold text-[color:var(--color-ink)]">
        {pricing.freePrice}
      </p>
    );
  }

  const months = plan.defaultDurationMonths;
  const suffix =
    months === null || months <= 0
      ? null
      : months === 1
        ? pricing.perMonth
        : pricing.perMonthsTemplate.replace('{months}', String(months));

  return (
    <p className="font-display text-2xl font-semibold text-[color:var(--color-ink)]">
      {/* `priceAmount` is already in the smallest currency unit and VND has
          none, so `formatPlanPrice` never divides for VND. */}
      {formatPlanPrice(plan.priceAmount, plan.priceCurrency)}
      {suffix ? (
        <span className="font-sans text-sm font-medium text-[color:var(--color-ink-soft)]">
          {suffix}
        </span>
      ) : null}
    </p>
  );
}

/**
 * What the section shows when there is no catalogue to show. Deliberately
 * prose plus the same download CTA the rest of the page uses: a visitor still
 * learns that Zira is free to start and still has somewhere to go, which an
 * empty or skeleton table would not give them.
 */
function PricingFallback() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-8 text-center shadow-[var(--shadow-soft)]">
      <h3 className="font-display text-xl font-bold text-[color:var(--color-ink)]">
        {pricing.fallbackTitle}
      </h3>
      <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
        {pricing.fallbackDescription}
      </p>
      <PricingCta location="pricing_fallback" />
    </div>
  );
}

function PricingCta({ location }: { location: string }) {
  return (
    <TrackedButton
      href={pricing.ctaHref}
      variant="primary"
      size="md"
      event="cta_click"
      eventParams={{ cta_channel: 'pricing', cta_location: location }}
    >
      {pricing.ctaLabel}
      <Icon name="arrow-right" width={16} height={16} />
    </TrackedButton>
  );
}
