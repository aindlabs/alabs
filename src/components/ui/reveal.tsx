"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

import { fadeInUp, inViewport, staggerContainer } from "@/lib/animations";

/**
 * Reveal / RevealGroup — the single client island for scroll-triggered motion.
 * ----------------------------------------------------------------------------
 * Every section uses these instead of re-declaring Framer Motion props inline
 * (DRY). Keeping motion isolated here also keeps sections as server components.
 *
 * - `Reveal` animates a single element into view (defaults to `fadeInUp`).
 * - `RevealGroup` is a stagger orchestrator: its `Reveal asItem` children
 *   inherit the parent's animation state and fire in sequence.
 *
 * Accessibility: when the user prefers reduced motion, the initial hidden state
 * is skipped (`initial={false}`) so content appears immediately without movement.
 */

interface RevealProps extends HTMLMotionProps<"div"> {
  /** Override the entrance variants (default: fadeInUp). */
  readonly variants?: Variants;
  /**
   * Render as a stagger *item*: inherit animation state from a parent
   * `RevealGroup` instead of self-triggering on scroll.
   */
  readonly asItem?: boolean;
}

export function Reveal({
  variants = fadeInUp,
  asItem = false,
  children,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();

  // Items inherit control from the parent group; standalone reveals self-trigger.
  const control = asItem
    ? {}
    : {
        initial: reduce ? false : ("hidden" as const),
        whileInView: "visible" as const,
        viewport: inViewport,
      };

  return (
    <motion.div variants={variants} {...control} {...props}>
      {children}
    </motion.div>
  );
}

interface RevealGroupProps extends HTMLMotionProps<"div"> {
  /** Override the container variants (default: staggerContainer). */
  readonly variants?: Variants;
}

export function RevealGroup({
  variants = staggerContainer,
  children,
  ...props
}: RevealGroupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={variants}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={inViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
