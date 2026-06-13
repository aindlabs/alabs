import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

interface FeatureCardProps {
  readonly icon: IconComponent;
  readonly title: string;
  readonly description: string;
  readonly className?: string;
  /** Optional extra content rendered in the card body (e.g. a highlights list). */
  readonly children?: ReactNode;
}

/**
 * FeatureCard — the shared icon + title + description card.
 * The single source for this layout; `ServiceCard` and the About "values" grid
 * both compose it, so the card's look/behavior changes in one place (DRY).
 */
export function FeatureCard({
  icon,
  title,
  description,
  className,
  children,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "group h-full transition-colors hover:border-brand/40",
        className,
      )}
    >
      <CardHeader>
        <IconBadge
          icon={icon}
          className="mb-2 transition-colors group-hover:bg-brand/15"
        />
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
