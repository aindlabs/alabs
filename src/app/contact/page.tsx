import { Mail } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm, SectionHeader } from "@/components/sections";
import { Reveal, Section } from "@/components/ui";
import { sectionContent } from "@/constants/sections";
import { siteConfig } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with A Labs about custom software, full-stack development, cloud solutions, or modernization.",
  path: "/contact",
});

/**
 * /contact — intro + contact details alongside the form.
 * The form posts to a server action (see app/contact/actions.ts).
 */
export default function ContactPage() {
  return (
    <Section aria-label="Contact" containerSize="md">
      <SectionHeader content={sectionContent.contact} as="h1" size="h1" />

      <div className="mx-auto mt-14 grid max-w-4xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <p className="leading-relaxed text-muted-foreground">
            Prefer email or have a quick question? Reach us directly — otherwise
            the form sends straight to our team.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
          >
            <Mail className="size-4 text-brand" aria-hidden />
            {siteConfig.contact.email}
          </a>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
