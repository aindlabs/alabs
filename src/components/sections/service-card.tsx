import { Check } from "lucide-react";

import type { Service } from "@/types";

import { FeatureCard } from "./feature-card";

interface ServiceCardProps {
  readonly service: Service;
}

/**
 * ServiceCard — a `Service` rendered as a `FeatureCard` plus its highlights.
 * Reuses FeatureCard for the icon/title/description shell; only the
 * service-specific highlights list is added here.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { icon, title, description, highlights } = service;

  return (
    <FeatureCard
      icon={icon}
      title={title}
      description={description}
      href={`/services/${service.slug}`}
    >
      {highlights && highlights.length > 0 && (
        <ul className="flex flex-col gap-2">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Check className="size-4 shrink-0 text-brand" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </FeatureCard>
  );
}
