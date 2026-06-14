import { siteConfig } from "@/constants/site";
import type { Service } from "@/types";

/**
 * Structured data (JSON-LD) builders — SEO.
 * ----------------------------------------------------------------------------
 * Produce schema.org objects for rich results, derived from the same config as
 * the rest of the site so they never drift. Rendered by the `JsonLd` component.
 *
 * Typed as plain serializable records (no `any`); the `@`-prefixed schema.org
 * keys aren't expressible as a clean TS interface, so a record is the pragmatic
 * choice while keeping `JSON.stringify` output well-formed.
 */
export type JsonLdSchema = Record<string, unknown>;

const absoluteUrl = (path = "/"): string =>
  new URL(path, siteConfig.url).toString();

/** schema.org Organization — the company identity. */
export function organizationSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    sameAs: siteConfig.socials.map((social) => social.href),
  };
}

/** schema.org WebSite — enables sitelinks/search semantics. */
export function websiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/** schema.org Service — for a dedicated service page. */
export function serviceSchema(service: Service): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview ?? service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
