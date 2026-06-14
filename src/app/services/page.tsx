import type { Metadata } from "next";

import { Cta, SectionHeader, ServiceGrid } from "@/components/sections";
import { Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore A Labs' engineering services — custom software, full-stack development, cloud solutions, legacy modernization, and ongoing support.",
  path: "/services",
});

/**
 * /services — index of all offerings.
 * Reuses the shared `ServiceGrid` (same cards as the landing section) and the
 * `Cta`. The section title is rendered as the page `<h1>`.
 */
export default function ServicesPage() {
  return (
    <>
      <Section aria-label="Services">
        <SectionHeader content={sectionContent.services} as="h1" size="h1" />
        <ServiceGrid className="mt-14" />
      </Section>
      <Cta />
    </>
  );
}
