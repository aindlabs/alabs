import { Reveal, RevealGroup, Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";
import { stats } from "@/data/stats";
import { values } from "@/data/values";

import { FeatureCard } from "./feature-card";
import { SectionHeader } from "./section-header";

/**
 * About — why A Labs: a left-aligned intro paired with a stats grid, followed
 * by the engineering values. Stats and values are config-driven (`data/`).
 */
export function About() {
  return (
    <Section id="about" aria-label="About A Labs">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeader content={sectionContent.about} align="left" />

        <RevealGroup className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <Reveal
              asItem
              key={stat.label}
              className="rounded-xl border border-border bg-card/40 p-6"
            >
              <p className="text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <Reveal asItem key={value.title} className="h-full">
            <FeatureCard
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
