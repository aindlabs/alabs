import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow, Heading, Lead, Section } from "@/components/ui";
import { siteConfig } from "@/constants/site";

/**
 * Home page — foundation placeholder.
 * Demonstrates the design-system primitives (Section/typography/Button) and the
 * shell. Marketing sections (Hero, Services, About, CTA) will compose these same
 * primitives in a later pass.
 */
export default function HomePage() {
  return (
    <Section className="overflow-hidden" containerSize="md">
      {/* Decorative brand glow (full-bleed, non-interactive). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-brand/20 blur-[120px]"
      />
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <Eyebrow>Software Engineering &amp; IT Consulting</Eyebrow>
        <Heading as="h1" size="display" className="max-w-3xl">
          Engineering that scales with your ambition
        </Heading>
        <Lead className="max-w-2xl">{siteConfig.description}</Lead>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={siteConfig.primaryCta.href}>
              {siteConfig.primaryCta.label}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#services">Explore services</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
