import { GitBranch, Gauge, Layers, ShieldCheck } from "lucide-react";

import type { Value } from "@/types";

/** Engineering principles shown in the About section. */
export const values: readonly Value[] = [
  {
    title: "Clean architecture",
    description:
      "Composable, well-named modules with clear boundaries — code your team can reason about for years.",
    icon: Layers,
  },
  {
    title: "Type-safe by default",
    description:
      "Strict TypeScript end to end, so whole classes of bugs are caught at compile time, not in production.",
    icon: ShieldCheck,
  },
  {
    title: "Built to scale",
    description:
      "Performance, observability, and cost-awareness are designed in from day one, not bolted on later.",
    icon: Gauge,
  },
  {
    title: "Shipping discipline",
    description:
      "Small, reviewable changes, automated checks, and clean history keep delivery fast and safe.",
    icon: GitBranch,
  },
];
