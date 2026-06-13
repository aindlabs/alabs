import { Reveal, RevealGroup, Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";
import { services } from "@/data/services";

import { SectionHeader } from "./section-header";
import { ServiceCard } from "./service-card";

/**
 * Services — a config-driven grid rendered from the `services` catalog.
 * Cards stagger into view via RevealGroup; each is a `ServiceCard`.
 */
export function Services() {
  return (
    <Section id="services" aria-label="Services">
      <SectionHeader content={sectionContent.services} />
      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Reveal asItem key={service.slug} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
