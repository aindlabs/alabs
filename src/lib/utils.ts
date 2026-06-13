import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names while resolving Tailwind conflicts.
 *
 * `clsx` flattens conditional/array/object class inputs into a single string;
 * `tailwind-merge` then dedupes conflicting Tailwind utilities so the last one
 * wins (e.g. `cn("px-2", "px-4")` -> `"px-4"`).
 *
 * This is the canonical class-composition helper used by every UI primitive and
 * by shadcn/ui components, so all variant/override logic flows through one place.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
