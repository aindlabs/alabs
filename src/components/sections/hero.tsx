import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow, Heading, Lead, Reveal, RevealGroup, Section } from "@/components/ui";
import { heroContent } from "@/constants/sections";

/**
 * Hero — the top section and the page's single `<h1>`.
 * Server-rendered for SEO; entrance motion is delegated to the Reveal islands.
 * Copy and CTAs come from `heroContent` (config-driven).
 */
export function Hero() {
  return (
    <Section aria-label="Introduction" className="overflow-hidden" containerSize="md">
      {/* Decorative brand glow (full-bleed, non-interactive). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-brand/20 blur-[120px]"
      />
      <RevealGroup className="flex flex-col items-center gap-6 py-12 text-center sm:py-16">
        <Reveal asItem>
          <Eyebrow>{heroContent.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal asItem>
          <Heading as="h1" size="display" className="max-w-3xl">
            {heroContent.title}
          </Heading>
        </Reveal>
        <Reveal asItem>
          <Lead className="max-w-2xl">{heroContent.description}</Lead>
        </Reveal>
        <Reveal asItem className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Link>
          </Button>
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
