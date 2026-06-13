import { cn } from "@/lib/utils";
import type { IconComponent } from "@/types";

interface IconBadgeProps {
  readonly icon: IconComponent;
  readonly className?: string;
}

/**
 * IconBadge — the rounded brand-tinted icon tile.
 * Single source for this motif (FeatureCard, Process steps, future sections),
 * so its size/color/shape changes in one place. Decorative by default
 * (`aria-hidden`); the adjacent title carries the meaning.
 */
export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 place-items-center rounded-lg bg-brand/10 text-brand",
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}
