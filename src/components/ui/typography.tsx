import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

/**
 * Typography primitives — A Labs
 * ----------------------------------------------------------------------------
 * A fixed type scale so headings and lead copy are visually consistent across
 * the site. `Heading` decouples the *visual* size from the *semantic* level:
 * the `as` prop sets the rendered tag (h1–h4) for correct document outline and
 * accessibility, while `size` sets the appearance — so a visually-large heading
 * can still be an `<h2>` when the outline requires it.
 */

const headingVariants = cva("font-sans font-semibold tracking-tight text-balance", {
  variants: {
    size: {
      display: "text-4xl sm:text-5xl lg:text-6xl leading-[1.05]",
      h1: "text-3xl sm:text-4xl lg:text-5xl leading-tight",
      h2: "text-2xl sm:text-3xl lg:text-4xl leading-tight",
      h3: "text-xl sm:text-2xl leading-snug",
      h4: "text-lg sm:text-xl leading-snug",
    },
  },
  defaultVariants: {
    size: "h2",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

export interface HeadingProps
  extends ComponentPropsWithoutRef<"h2">,
    VariantProps<typeof headingVariants> {
  /** Semantic element to render (defaults to `h2`); independent of `size`. */
  readonly as?: HeadingTag;
}

export function Heading({
  as = "h2",
  size,
  className,
  ...props
}: HeadingProps) {
  const Tag = as as ElementType;
  return (
    <Tag className={cn(headingVariants({ size }), className)} {...props} />
  );
}

/** Small uppercase label that sits above a heading to frame a section. */
export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-widest text-brand",
        className,
      )}
      {...props}
    />
  );
}

/** Larger, muted intro paragraph used beneath headings. */
export function Lead({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl",
        className,
      )}
      {...props}
    />
  );
}
