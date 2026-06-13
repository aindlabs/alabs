import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading, Lead, Reveal, Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";
import { siteConfig } from "@/constants/site";

/**
 * CTA — closing call to action (anchored at #contact).
 * Until a contact page/form exists, the primary action opens the user's mail
 * client to the configured contact address.
 */
export function Cta() {
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <Section id="contact" aria-label="Get in touch">
      <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-linear-to-br from-brand/15 via-card to-card px-6 py-16 text-center sm:px-12">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/25 blur-[100px]"
        />
        <Heading as="h2" size="h1" className="mx-auto max-w-2xl">
          {sectionContent.cta.title}
        </Heading>
        {sectionContent.cta.description && (
          <Lead className="mx-auto mt-4 max-w-xl">
            {sectionContent.cta.description}
          </Lead>
        )}
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href={mailto}>
              {siteConfig.primaryCta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Prefer email?{" "}
          <a
            href={mailto}
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
