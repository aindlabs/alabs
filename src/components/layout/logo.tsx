import Link from "next/link";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  readonly className?: string;
  /** Hide the wordmark and show only the mark (e.g. tight mobile headers). */
  readonly markOnly?: boolean;
}

/**
 * Brand logo — a gradient mark plus the site wordmark, linking home.
 * Reads the brand name from `siteConfig` so a rename happens in one place.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-accent font-semibold text-primary-foreground shadow-sm transition-transform group-hover:scale-105"
      >
        {siteConfig.name.charAt(0)}
      </span>
      {!markOnly && (
        <span className="text-base font-semibold tracking-tight">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
