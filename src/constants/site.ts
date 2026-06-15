import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/brand-icons";
import { services } from "@/data/services";
import type { FooterColumn, SiteConfig } from "@/types";

/**
 * Site configuration — A Labs
 * ----------------------------------------------------------------------------
 * The single source of truth for brand identity, navigation, footer, and
 * contact details. The shell (header/footer) and metadata are driven entirely
 * by this object, so site-wide content changes live in one typed config.
 */

/** Primary navigation, reused by the header and the footer "Company" column. */
const primaryNav = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Footer "Services" column is derived from the service catalog so the two never
 * drift — add a service once and it appears here automatically (DRY).
 */
const servicesFooterColumn: FooterColumn = {
  title: "Services",
  links: services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  })),
};

export const siteConfig: SiteConfig = {
  name: "A Labs",
  shortName: "ALabs",
  description:
    "A Labs is a software engineering and IT consulting studio delivering custom software, full-stack products, cloud solutions, and legacy modernization.",
  url: "https://alabs.ceo-alabs.workers.dev",
  locale: "en",
  contact: {
    email: "hello@alabs.example.com",
  },
  nav: primaryNav,
  footerColumns: [
    servicesFooterColumn,
    {
      title: "Company",
      links: [...primaryNav],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com", icon: GitHubIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
    { label: "X", href: "https://x.com", icon: XIcon },
  ],
  primaryCta: {
    label: "Start a project",
    href: "/contact",
    variant: "primary",
  },
};
