import type { Metadata } from "next";

import { siteConfig } from "@/constants/site";

interface BuildMetadataOptions {
  /** Page-specific title; composed as "<title> | <site name>". Omit for home. */
  readonly title?: string;
  readonly description?: string;
  /** Path relative to the site root, e.g. "/services/cloud-solutions". */
  readonly path?: string;
}

/**
 * Centralized metadata factory (SEO-optimized).
 * Pages call this instead of hand-writing Open Graph/Twitter tags, so every
 * route gets consistent, canonical, share-ready metadata from one place.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
}: BuildMetadataOptions = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: title ?? siteConfig.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: title ?? siteConfig.name,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
    },
  };
}
