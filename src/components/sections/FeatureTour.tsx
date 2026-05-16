'use client';

import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';
import type { StaticImageData } from 'next/image';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { featureTour, type FeatureTourSlide } from '@/lib/content';

// Import images from 001 to 015
import oneImage from '@/assets/images/001.png';
import twoImage from '@/assets/images/002.png';
import threeImage from '@/assets/images/003.png';
import fourImage from '@/assets/images/004.png';
import fiveImage from '@/assets/images/005.png';
import sixImage from '@/assets/images/006.png';
import sevenImage from '@/assets/images/007.png';
import eightImage from '@/assets/images/008.png';
import nineImage from '@/assets/images/009.png';
import tenImage from '@/assets/images/010.png';
import elevenImage from '@/assets/images/011.png';
import twelveImage from '@/assets/images/012.png';
import thirteenImage from '@/assets/images/013.png';
import fourteenImage from '@/assets/images/014.png';
import fifteenImage from '@/assets/images/015.png';

const imageByKey: Record<FeatureTourSlide['imageKey'], StaticImageData> = {
  '001': oneImage,
  '002': twoImage,
  '003': threeImage,
  '004': fourImage,
  '005': fiveImage,
  '006': sixImage,
  '007': sevenImage,
  '008': eightImage,
  '009': nineImage,
  '010': tenImage,
  '011': elevenImage,
  '012': twelveImage,
  '013': thirteenImage,
  '014': fourteenImage,
  '015': fifteenImage,
};

export function FeatureTour() {
  const [active, setActive] = useState(0);
  const total = featureTour.length;

  const goTo = useCallback((next: number) => setActive(((next % total) + total) % total), [total]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'setInterval' in window) {
      const timer = window.setInterval(() => setActive((i) => (i + 1) % total), 6000);
      return () => window.clearInterval(timer);
    }
  }, [total]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(active - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(active + 1);
    }
  };

  const current = featureTour[active];
  const stepLabel = `${String(active + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <section id="feature-tour" aria-labelledby="feature-tour-heading" className="bg-white py-20 sm:py-24">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeader
            title={<span id="feature-tour-heading">Khám phá Zira qua từng màn hình</span>}
            description="Lướt qua các tính năng quan trọng nhất — từ tổng quan công việc trong ngày đến báo cáo dự án và bản vẽ cộng tác."
          />
        </Reveal>

        <Reveal
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Hướng dẫn nhanh các tính năng Zira"
          onKeyDown={onKeyDown}
          delay={0.1}
          className="grid items-center gap-12 rounded-3xl outline-none lg:grid-cols-[1fr_1fr]"
        >
          <div className="relative mx-auto flex h-[560px] w-full max-w-md items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute h-[340px] w-[340px] rounded-full bg-[color:var(--color-brand-400)]"
            />

            {featureTour.map((slide, index) => {
              const isActive = index === active;
              return (
                <div
                  key={slide.imageKey}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <PhoneMockup src={imageByKey[slide.imageKey]} alt={slide.alt} className="relative" />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-6 lg:max-w-md" aria-live="polite" aria-atomic="true">
            {/* <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-brand-500)]">
              Step {stepLabel}
            </span> */}

            <h3
              key={`title-${active}`}
              className="font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-4xl"
            >
              {current.title}
            </h3>

            <p key={`desc-${active}`} className="text-base leading-relaxed text-[color:var(--color-ink-soft)]">
              {current.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-6">
              <div className="flex gap-3" role="group" aria-label="Điều hướng slide">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Tính năng trước"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#e9fffa] text-[color:var(--color-brand-500)] transition-colors duration-150 hover:bg-[#d3f4ed]"
                >
                  <Icon name="chevron-left" width={20} height={20} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Tính năng kế tiếp"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-400)] text-white transition-colors duration-150 hover:bg-[color:var(--color-brand-500)]"
                >
                  <Icon name="chevron-right" width={20} height={20} />
                </button>
              </div>

              <div className="flex items-center gap-2" role="tablist" aria-label="Chọn tính năng">
                {featureTour.map((slide, index) => (
                  <button
                    key={slide.imageKey}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Xem ${slide.title}`}
                    onClick={() => goTo(index)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      index === active
                        ? 'w-8 bg-[color:var(--color-brand-400)]'
                        : 'w-2 bg-[color:var(--color-line)] hover:bg-[color:var(--color-ink-soft)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
