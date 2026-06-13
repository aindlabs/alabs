import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container, type ContainerProps } from "./container";

/**
 * Section — vertical layout primitive.
 * Renders a semantic, full-bleed `<section>` (so backgrounds/decorations can
 * span the viewport) and wraps its content in a `Container` for consistent
 * width and gutters. The `spacing` variant owns vertical rhythm via the shared
 * `--spacing-section` token, keeping the gap between sections uniform.
 *
 * Composition over duplication: every page section builds on this rather than
 * re-declaring `<section className="py-... ">` + container markup.
 */
const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      default: "py-section",
      compact: "py-16",
      none: "py-0",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
});

export interface SectionProps
  extends ComponentPropsWithoutRef<"section">,
    VariantProps<typeof sectionVariants> {
  /** Width of the inner content container. */
  readonly containerSize?: ContainerProps["size"];
  /** Set to render children edge-to-edge without the inner Container. */
  readonly bleed?: boolean;
  readonly children: ReactNode;
}

export function Section({
  className,
  spacing,
  containerSize,
  bleed = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing }), className)} {...props}>
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
