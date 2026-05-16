"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes, ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "fade" | "scale";

// Pre-built motion components keyed by HTML tag. We use these instead of
// `motion.create(tag)` because the latter must be called outside the
// render path — Motion explicitly warns ("Cannot create components during
// render") and using `useMemo` does not silence the warning, since the
// inner call still happens during render on first mount or whenever `as`
// changes. Add tags here as needed.
const motionTags = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  aside: motion.aside,
  nav: motion.nav,
  figure: motion.figure,
  figcaption: motion.figcaption,
  blockquote: motion.blockquote,
  a: motion.a,
  button: motion.button,
} as const;

type RevealTag = keyof typeof motionTags;

type RevealProps = {
  children: ReactNode;
  /** Visual direction the element travels from. `fade` skips translation. */
  direction?: RevealDirection;
  /** Travel distance in pixels. Defaults to 24. */
  distance?: number;
  /** Animation delay in seconds. Stagger children by passing increasing values. */
  delay?: number;
  /** Animation duration in seconds. Default 0.55. */
  duration?: number;
  /** Fraction of element that must be in view before triggering (0–1). */
  amount?: number;
  /** Replay the animation every time the element re-enters the viewport. */
  replay?: boolean;
  /** HTML tag to render. Must be one of the pre-built tags in `motionTags`. */
  as?: RevealTag;
  className?: string;
} & Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | keyof MotionConflictingProps
>;

/** Motion uses these prop names for its own animation API; forwarding the
 *  same names from raw HTML attributes would collide, so we strip them. */
type MotionConflictingProps = {
  onAnimationStart: never;
  onDragStart: never;
  onDragEnd: never;
  onDrag: never;
  style: never;
};

/**
 * Scroll-triggered reveal wrapper.
 *
 * SEO/SSG-safe by design:
 *   - Content is always present in the static HTML.
 *   - `prefers-reduced-motion` users skip the animation entirely.
 *   - A global `<noscript>` rule in `layout.tsx` forces full visibility
 *     when JS is disabled, so the `initial={{ opacity: 0 }}` style does
 *     not strand the content in an invisible state.
 */
export function Reveal({
  children,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.55,
  amount = 0.2,
  replay = false,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const offsets: Record<RevealDirection, { x: number; y: number; scale: number }> = {
    up: { x: 0, y: distance, scale: 1 },
    down: { x: 0, y: -distance, scale: 1 },
    left: { x: distance, y: 0, scale: 1 },
    right: { x: -distance, y: 0, scale: 1 },
    fade: { x: 0, y: 0, scale: 1 },
    scale: { x: 0, y: 0, scale: 0.92 },
  };
  const from = offsets[direction];

  const MotionTag = motionTags[as];

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, x: from.x, y: from.y, scale: from.scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: !replay, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  /** Seconds between each child's animation start. */
  stagger?: number;
  /** Delay before the first child animates. */
  startDelay?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  amount?: number;
  as?: RevealTag;
  className?: string;
}

/**
 * Reveals direct children one after another. Useful for lists,
 * button rows, feature grids, etc. Each child receives a delay of
 * `startDelay + index * stagger`.
 */
export function RevealGroup({
  children,
  stagger = 0.08,
  startDelay = 0,
  direction = "up",
  distance,
  duration,
  amount,
  as = "div",
  className,
}: RevealGroupProps) {
  const Tag = as;
  // We deliberately render the container as a plain element and animate
  // each child individually so that the container's layout (grid / flex)
  // is preserved without `display: contents` hacks.
  return (
    <Tag className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal
              key={i}
              direction={direction}
              distance={distance}
              duration={duration}
              amount={amount}
              delay={startDelay + i * stagger}
            >
              {child}
            </Reveal>
          ))
        : (
          <Reveal
            direction={direction}
            distance={distance}
            duration={duration}
            amount={amount}
            delay={startDelay}
          >
            {children}
          </Reveal>
        )}
    </Tag>
  );
}
