"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { testimonials, type Testimonial } from "@/lib/content";

const accentBackgrounds: Record<Testimonial["accent"], string> = {
  amber: "bg-[color:var(--color-brand-400)]",
  peach: "bg-[#f9a07a]",
  rose: "bg-[#e2a4a0]",
  sage: "bg-[#9fc6a3]",
  sky: "bg-[#9bbad6]",
  lilac: "bg-[#b4a3d6]",
};

export function Testimonials() {
  const scrollerRef = useRef<HTMLOListElement>(null);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const gap = 24;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-20 sm:py-24"
    >
      <Container className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col gap-6 lg:max-w-sm">
          <h2
            id="testimonials-heading"
            className="font-display text-[28px] font-semibold leading-tight tracking-tight text-[color:var(--color-ink)] sm:text-4xl"
          >
            Testimonials from
            <br /> our members
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            Embrace life&apos;s vastness, venture forth, and discover the
            wonders waiting beyond. The world beckons; seize its grand offerings
            now!
          </p>

          <div
            className="mt-2 flex gap-3"
            role="group"
            aria-label="Testimonial navigation"
          >
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#e9fffa] text-[color:var(--color-brand-500)] transition-colors duration-150 hover:bg-[#d3f4ed]"
            >
              <Icon name="chevron-left" width={20} height={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-400)] text-white transition-colors duration-150 hover:bg-[color:var(--color-brand-500)]"
            >
              <Icon name="chevron-right" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="-mx-6 min-w-0 sm:-mx-8 lg:mx-0">
          <ol
            ref={scrollerRef}
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            tabIndex={0}
            className="testimonials-scroller flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 pt-1 sm:px-8 lg:pl-0 lg:pr-12"
          >
            {testimonials.map((item, index) => (
              <li
                key={item.name}
                data-testimonial-card
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
                className="snap-start shrink-0 basis-[min(78vw,328px)] sm:basis-[328px]"
              >
                <TestimonialCard item={item} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure
      className="flex h-full flex-col gap-5 rounded-lg bg-white p-9 shadow-[0_10px_30px_-12px_rgba(37,43,66,0.18)]"
      itemScope
      itemType="https://schema.org/Review"
    >
      <Icon
        name="quote"
        width={44}
        height={44}
        className="text-[#d4eaf6]"
      />

      <blockquote
        itemProp="reviewBody"
        className="text-sm leading-relaxed text-[color:var(--color-ink)]"
      >
        {item.quote}
      </blockquote>

      <div
        className="flex gap-[6px]"
        aria-label={`Rated ${item.rating} out of 5`}
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
      >
        <meta itemProp="ratingValue" content={String(item.rating)} />
        <meta itemProp="bestRating" content="5" />
        {[1, 2, 3, 4, 5].map((s) =>
          s <= item.rating ? (
            <Icon
              key={s}
              name="star"
              width={15}
              height={15}
              className="text-[#2dc071]"
            />
          ) : (
            <Icon
              key={s}
              name="star-outline"
              width={15}
              height={15}
              className="text-[color:var(--color-ink-soft)]"
            />
          ),
        )}
      </div>

      <hr className="border-t border-[color:var(--color-accent-500)]" />

      <figcaption
        className="flex items-center gap-4"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${
            accentBackgrounds[item.accent]
          }`}
        >
          {item.initials}
        </span>
        <div className="flex flex-col leading-tight">
          <span
            itemProp="name"
            className="font-display text-sm font-semibold text-[color:var(--color-ink)]"
          >
            {item.name}
          </span>
          <span
            itemProp="jobTitle"
            className="text-xs text-[color:var(--color-ink-soft)]"
          >
            {item.role}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
