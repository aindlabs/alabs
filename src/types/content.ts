import type { ComponentType, SVGProps } from "react";

/**
 * Content models — A Labs
 * ----------------------------------------------------------------------------
 * Shared, framework-agnostic shapes for the config-driven content layer. Data
 * in `constants/` is typed against these models and rendered by presentational
 * components, so content and presentation evolve independently (the core
 * "config-driven sections" requirement).
 *
 * Keep these models free of JSX so they can be reused by data files, tests, and
 * any future content source (CMS, API) without coupling.
 */

/**
 * Any SVG-based icon component. Decoupled from lucide-react specifically so
 * both Lucide icons and custom brand SVGs satisfy the same contract — a Lucide
 * icon is assignable to this type, and so is a plain `(props) => <svg/>`.
 */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** A single navigation entry. `external` links open in a new tab. */
export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

/** A titled group of footer links. */
export interface FooterColumn {
  readonly title: string;
  readonly links: readonly NavItem[];
}

/**
 * A social profile. `icon` is a component reference (not a string) so usage is
 * type-checked and tree-shaken — no icon-name-to-component lookup.
 */
export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: IconComponent;
}

/** A service offering — the central content type for this consulting site. */
export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
  readonly highlights?: readonly string[];
}

/** Calls to action reused by hero, header, and CTA sections. */
export interface CallToAction {
  readonly label: string;
  readonly href: string;
  readonly variant?: "primary" | "secondary" | "ghost";
}

/** A headline metric (e.g. "120+" / "Projects delivered"). */
export interface Stat {
  readonly value: string;
  readonly label: string;
}

/** A step in the delivery process. */
export interface ProcessStep {
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
}

/** A guiding engineering value/principle shown in the About section. */
export interface Value {
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
}

/**
 * Editorial copy for a section header. Keeps section titles/intros config-driven
 * (rendered by `SectionHeader`) rather than hardcoded in components.
 */
export interface SectionContent {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
}

/** Brand/company identity used across the shell and metadata. */
export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  /** Absolute production URL, used for metadata, canonical links, and OG tags. */
  readonly url: string;
  readonly locale: string;
  readonly contact: {
    readonly email: string;
    readonly phone?: string;
  };
  readonly nav: readonly NavItem[];
  readonly footerColumns: readonly FooterColumn[];
  readonly socials: readonly SocialLink[];
  readonly primaryCta: CallToAction;
}
