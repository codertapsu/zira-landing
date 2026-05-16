'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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

const EASE = [0.22, 1, 0.36, 1] as const;

// Direction-aware enter/exit for the phone mockup. `direction` is +1 for
// forward (next), -1 for backward (prev). The incoming slide enters from
// the side the user is "moving toward"; the outgoing slide exits the
// opposite way — mirroring the user's mental model of a carousel.
const phoneVariants = {
  enter: (direction: number) => ({
    x: direction * 64,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction * -64,
    opacity: 0,
    scale: 0.94,
  }),
};

const textVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function FeatureTour() {
  const [active, setActive] = useState(0);
  // +1 for forward (auto-advance or next), -1 for backward (prev).
  // The phone slide direction follows this value.
  const [direction, setDirection] = useState(1);
  const total = featureTour.length;
  const shouldReduce = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      const normalizedNext = ((next % total) + total) % total;
      setActive((cur) => {
        if (normalizedNext === cur) return cur;
        // Match adjacency including the wrap (last → first counts as
        // forward, first → prev counts as backward) so arrow buttons
        // feel right at the ends.
        const forward = (cur + 1) % total;
        const backward = (cur - 1 + total) % total;
        if (normalizedNext === forward) setDirection(1);
        else if (normalizedNext === backward) setDirection(-1);
        else setDirection(normalizedNext > cur ? 1 : -1);
        return normalizedNext;
      });
    },
    [total],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % total);
    }, 6000);
    return () => window.clearInterval(timer);
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

  // Respect prefers-reduced-motion: collapse all distance-based animations
  // to simple fades. Durations stay the same so timing feels consistent
  // with the rest of the page.
  const phoneTransition = shouldReduce
    ? { duration: 0.25, ease: EASE }
    : { duration: 0.55, ease: EASE };
  const textTransition = shouldReduce
    ? { duration: 0.2, ease: EASE }
    : { duration: 0.35, ease: EASE };

  return (
    <section
      id="feature-tour"
      aria-labelledby="feature-tour-heading"
      className="bg-white py-20 sm:py-24"
    >
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
          <div className="relative mx-auto flex h-[560px] w-full max-w-md items-center justify-center overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute h-[340px] w-[340px] rounded-full bg-[color:var(--color-brand-400)]"
            />

            <AnimatePresence custom={direction} initial={false} mode="popLayout">
              <motion.div
                key={current.imageKey}
                custom={direction}
                variants={shouldReduce ? undefined : phoneVariants}
                initial={shouldReduce ? { opacity: 0 } : 'enter'}
                animate={shouldReduce ? { opacity: 1 } : 'center'}
                exit={shouldReduce ? { opacity: 0 } : 'exit'}
                transition={phoneTransition}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PhoneMockup
                  src={imageByKey[current.imageKey]}
                  alt={current.alt}
                  className="relative"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-6 lg:max-w-md" aria-live="polite" aria-atomic="true">
            {/* Fixed-height stacks keep the layout still while the text
                swaps in/out. Children are absolutely positioned so old
                and new content can crossfade without pushing the dots
                and arrows down a row. */}
            <div className="relative min-h-[5rem] sm:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${active}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={textTransition}
                  className="absolute inset-0 font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-4xl"
                >
                  {current.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="relative min-h-[5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${active}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ ...textTransition, delay: shouldReduce ? 0 : 0.06 }}
                  className="absolute inset-0 text-base leading-relaxed text-[color:var(--color-ink-soft)]"
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-6">
              <div className="flex gap-3" role="group" aria-label="Điều hướng slide">
                <motion.button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Tính năng trước"
                  whileHover={shouldReduce ? undefined : { scale: 1.08 }}
                  whileTap={shouldReduce ? undefined : { scale: 0.92 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#e9fffa] text-[color:var(--color-brand-500)] transition-colors duration-150 hover:bg-[#d3f4ed]"
                >
                  <Icon name="chevron-left" width={20} height={20} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Tính năng kế tiếp"
                  whileHover={shouldReduce ? undefined : { scale: 1.08 }}
                  whileTap={shouldReduce ? undefined : { scale: 0.92 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-400)] text-white transition-colors duration-150 hover:bg-[color:var(--color-brand-500)]"
                >
                  <Icon name="chevron-right" width={20} height={20} />
                </motion.button>
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
