import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language — A Labs
 * ----------------------------------------------------------------------------
 * One source of truth for Framer Motion so animations stay consistent across
 * every section (DRY). Components import these `Variants`/`Transition` objects
 * instead of re-declaring inline motion props, which keeps timing, easing, and
 * stagger rhythm uniform site-wide.
 *
 * Pattern: "Open/Closed" via configuration — tune motion here once and every
 * consumer inherits it; no component edits required.
 *
 * Accessibility: a global `prefers-reduced-motion` rule in globals.css collapses
 * transition/animation durations, so these variants degrade gracefully.
 */

/** Premium, slightly-eased curve used as the default for entrance animations. */
export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: easeOutExpo,
};

/** Fade + rise. The workhorse entrance for headings, copy, and cards. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

/** Fade + descend — mirror of fadeInUp for elements anchored to the top. */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

/** Plain opacity fade for backgrounds and decorative layers. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
};

/** Subtle scale-in for media, badges, and emphasis elements. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: defaultTransition },
};

/**
 * Parent orchestrator that staggers its children's entrances.
 * Pair with `fadeInUp` (or any item variant) on each child and drive both from
 * the same `initial="hidden"` / `whileInView="visible"` controller.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/**
 * Standard viewport config for scroll-triggered reveals.
 * `once: true` avoids re-animating on every scroll pass; `amount` waits until a
 * portion of the element is visible before firing.
 */
export const inViewport = { once: true, amount: 0.3 } as const;
