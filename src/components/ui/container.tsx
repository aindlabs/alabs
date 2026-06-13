import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Container — horizontal layout primitive.
 * Centers content and applies consistent gutters + a capped max-width. Every
 * section composes this so page width and side padding stay uniform site-wide
 * (change the scale here, not in each section).
 */
const containerVariants = cva("mx-auto w-full px-6 sm:px-8 lg:px-10", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface ContainerProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  );
}
