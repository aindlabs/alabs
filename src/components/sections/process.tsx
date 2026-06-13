import { IconBadge, Reveal, RevealGroup, Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";
import { processSteps } from "@/data/process";

import { SectionHeader } from "./section-header";

/**
 * Process — the delivery approach as ordered steps (anchored at #work).
 * Step numbers are derived from array order, so reordering `processSteps`
 * renumbers automatically — no manual indices to drift.
 */
export function Process() {
  return (
    <Section id="work" aria-label="How we work" className="bg-card/20">
      <SectionHeader content={sectionContent.process} />
      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");

          return (
            <Reveal
              asItem
              key={step.title}
              className="relative h-full rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <IconBadge icon={step.icon} />
                <span
                  aria-hidden
                  className="font-mono text-sm font-medium text-muted-foreground"
                >
                  {stepNumber}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
