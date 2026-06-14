import Link from "next/link";
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
  /**
   * When set, the whole card becomes a link to this href via the "stretched
   * link" pattern — the title is the accessible name and an overlay makes the
   * entire surface clickable.
   */
  readonly href?: string;
  readonly className?: string;
  /** Optional extra content rendered in the card body (e.g. a highlights list). */
  readonly children?: ReactNode;
}

/**
 * FeatureCard — the shared icon + title + description card.
 * The single source for this layout; `ServiceCard` and the About "values" grid
 * both compose it, so the card's look/behavior changes in one place (DRY).
 *
 * Stretched-link pattern: an optional `href` turns the card into a single link
 * (the `after:absolute after:inset-0` overlay covers the surface) while keeping
 * one accessible name — the title — rather than nesting interactive elements.
 */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
  children,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "group h-full transition-colors hover:border-brand/40",
        href && "relative",
        className,
      )}
    >
      <CardHeader>
        <IconBadge
          icon={icon}
          className="mb-2 transition-colors group-hover:bg-brand/15"
        />
        <CardTitle className="text-lg">
          {href ? (
            <Link
              href={href}
              className="outline-none transition-colors after:absolute after:inset-0 after:rounded-xl group-hover:text-brand focus-visible:after:ring-2 focus-visible:after:ring-ring"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
