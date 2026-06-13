import { Code2, Rocket, Ruler, Search } from "lucide-react";

import type { ProcessStep } from "@/types";

/**
 * Delivery process steps, rendered in order by the Process section.
 * The step number is derived from array order (no manual numbering to drift).
 */
export const processSteps: readonly ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We dig into your goals, users, and constraints to define the right problem before any code is written.",
    icon: Search,
  },
  {
    title: "Design",
    description:
      "Architecture, UX, and a delivery plan that balances shipping speed today with maintainability tomorrow.",
    icon: Ruler,
  },
  {
    title: "Build",
    description:
      "Iterative, test-backed delivery with tight feedback loops and production-grade quality at every step.",
    icon: Code2,
  },
  {
    title: "Scale",
    description:
      "We harden, observe, and optimize — then support the product as it grows with your business.",
    icon: Rocket,
  },
];
