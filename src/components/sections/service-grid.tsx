import { Reveal, RevealGroup } from "@/components/ui";
import { services as allServices } from "@/data/services";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

import { ServiceCard } from "./service-card";

interface ServiceGridProps {
  /** Defaults to the full catalog; pass a subset (e.g. "other services"). */
  readonly services?: readonly Service[];
  readonly className?: string;
}

/**
 * ServiceGrid — the staggered responsive grid of ServiceCards.
 * Shared by the landing Services section and the /services index/detail pages
 * so the grid layout and reveal behavior live in one place (DRY).
 */
export function ServiceGrid({
  services = allServices,
  className,
}: ServiceGridProps) {
  return (
    <RevealGroup
      className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {services.map((service) => (
        <Reveal asItem key={service.slug} className="h-full">
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </RevealGroup>
  );
}
