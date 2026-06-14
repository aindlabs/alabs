import { Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";

import { SectionHeader } from "./section-header";
import { ServiceGrid } from "./service-grid";

/**
 * Services — the landing-page services section.
 * Delegates the grid to the shared `ServiceGrid` (reused by the /services pages).
 */
export function Services() {
  return (
    <Section id="services" aria-label="Services">
      <SectionHeader content={sectionContent.services} />
      <ServiceGrid className="mt-14" />
    </Section>
  );
}
