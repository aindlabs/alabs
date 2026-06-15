import type { CallToAction, SectionContent } from "@/types";

import { siteConfig } from "./site";

/**
 * Editorial copy for landing-page sections — config-driven.
 * Section components render these via `SectionHeader`, so headline/intro edits
 * happen here rather than in component JSX.
 */

interface HeroContent extends SectionContent {
  readonly primaryCta: CallToAction;
  readonly secondaryCta: CallToAction;
}

export const heroContent: HeroContent = {
  eyebrow: "Software Engineering & IT Consulting",
  title: "Engineering that scales with your ambition",
  description:
    "A Labs partners with teams to design, build, and modernize software — from custom products to cloud platforms — with production-grade quality that lasts.",
  primaryCta: siteConfig.primaryCta,
  secondaryCta: { label: "Explore services", href: "/#services", variant: "secondary" },
};

export const sectionContent = {
  services: {
    eyebrow: "What we do",
    title: "Services built around your outcomes",
    description:
      "End-to-end engineering capabilities, delivered by a team that owns quality from first commit to ongoing support.",
  },
  about: {
    eyebrow: "Why A Labs",
    title: "A long-term engineering partner, not just a vendor",
    description:
      "We optimize for maintainability and scale, so the software we build keeps paying off years after launch.",
  },
  process: {
    eyebrow: "How we work",
    title: "A clear path from idea to impact",
    description:
      "A proven, transparent process that de-risks delivery and keeps you in control at every stage.",
  },
  cta: {
    title: "Have a project in mind?",
    description:
      "Tell us what you're building. We'll help you scope it, design the architecture, and ship it.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something",
    description:
      "Tell us about your project and we'll get back to you within one business day.",
  },
} satisfies Record<string, SectionContent>;
