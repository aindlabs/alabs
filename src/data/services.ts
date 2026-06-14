import {
  Cloud,
  Code2,
  LifeBuoy,
  Layers,
  RefreshCcw,
} from "lucide-react";

import type { Service } from "@/types";

/**
 * Service catalog — the single source of truth for what A Labs offers.
 * Sections (services grid, footer links, dedicated service pages) all read from
 * this array, so adding/renaming an offering happens in exactly one place.
 */
export const services: readonly Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Bespoke applications engineered around your domain, built to scale and maintained for the long run.",
    overview:
      "We design and build software tailored to your business — not forced into an off-the-shelf template. Starting from your domain and users, we model the problem, choose a pragmatic architecture, and deliver production-grade applications that are a pleasure to maintain and extend.",
    icon: Code2,
    highlights: ["Domain-driven design", "API-first", "Test coverage"],
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    description:
      "End-to-end product teams delivering polished frontends and resilient backends on a unified stack.",
    overview:
      "One team, owning the whole stack. We build accessible, performant interfaces and the resilient, type-safe services behind them — wired together with automated testing and CI/CD so you ship confidently and often.",
    icon: Layers,
    highlights: ["React & Next.js", "Type-safe APIs", "CI/CD"],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Architecture, migration, and optimization across major clouds — secure, observable, and cost-aware.",
    overview:
      "From greenfield architecture to migrating workloads, we make the cloud work for you: infrastructure as code, secure-by-default networking, deep observability, and continuous cost optimization so you only pay for what you need.",
    icon: Cloud,
    highlights: ["Infra as code", "Observability", "Cost optimization"],
  },
  {
    slug: "legacy-modernization",
    title: "Legacy Modernization",
    description:
      "Incrementally replatform aging systems into maintainable, well-tested architectures with zero big-bang risk.",
    overview:
      "We modernize critical systems without the big-bang rewrite. Using the strangler-fig pattern, we incrementally carve out and replace aging components behind tests and feature flags — reducing risk while the system keeps running.",
    icon: RefreshCcw,
    highlights: ["Strangler-fig migration", "Refactoring", "Risk reduction"],
  },
  {
    slug: "project-support-maintenance",
    title: "Project Support & Maintenance",
    description:
      "Reliable ongoing support, monitoring, and iterative improvements that keep your software healthy.",
    overview:
      "Software needs care after launch. We provide dependable support backed by SLAs, proactive monitoring and alerting, and a steady cadence of iterative improvements that keep your product secure, fast, and evolving.",
    icon: LifeBuoy,
    highlights: ["SLAs", "Monitoring", "Continuous improvement"],
  },
];

/** Fast lookup by slug for dedicated service routes (future `/services/[slug]`). */
export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
