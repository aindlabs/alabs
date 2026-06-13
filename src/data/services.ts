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
    icon: Code2,
    highlights: ["Domain-driven design", "API-first", "Test coverage"],
  },
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    description:
      "End-to-end product teams delivering polished frontends and resilient backends on a unified stack.",
    icon: Layers,
    highlights: ["React & Next.js", "Type-safe APIs", "CI/CD"],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Architecture, migration, and optimization across major clouds — secure, observable, and cost-aware.",
    icon: Cloud,
    highlights: ["Infra as code", "Observability", "Cost optimization"],
  },
  {
    slug: "legacy-modernization",
    title: "Legacy Modernization",
    description:
      "Incrementally replatform aging systems into maintainable, well-tested architectures with zero big-bang risk.",
    icon: RefreshCcw,
    highlights: ["Strangler-fig migration", "Refactoring", "Risk reduction"],
  },
  {
    slug: "project-support-maintenance",
    title: "Project Support & Maintenance",
    description:
      "Reliable ongoing support, monitoring, and iterative improvements that keep your software healthy.",
    icon: LifeBuoy,
    highlights: ["SLAs", "Monitoring", "Continuous improvement"],
  },
];

/** Fast lookup by slug for dedicated service routes (future `/services/[slug]`). */
export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
