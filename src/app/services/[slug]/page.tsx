import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Cta, SectionHeader, ServiceGrid } from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Heading, IconBadge, Reveal, Section } from "@/components/ui";
import { siteConfig } from "@/constants/site";
import { getServiceBySlug, services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structured-data";

interface ServicePageProps {
  /** Route params are async in Next.js 16 — must be awaited. */
  readonly params: Promise<{ slug: string }>;
}

/** Pre-render a static page for every known service; 404 anything else. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const otherServices = services.filter((item) => item.slug !== service.slug);
  const mailto = `mailto:${siteConfig.contact.email}`;

  return (
    <>
      <JsonLd schema={serviceSchema(service)} />

      {/* Hero */}
      <Section aria-label={service.title} containerSize="md">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/services"
                className="transition-colors hover:text-foreground"
              >
                Services
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <IconBadge icon={service.icon} className="size-14" />
          </Reveal>
          <SectionHeader
            as="h1"
            size="h1"
            content={{
              eyebrow: "Service",
              title: service.title,
              description: service.overview ?? service.description,
            }}
          />
          <Reveal className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={mailto}>
                {siteConfig.primaryCta.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">
                <ArrowLeft aria-hidden />
                All services
              </Link>
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* What's included */}
      {service.highlights && service.highlights.length > 0 && (
        <Section aria-label="What's included" spacing="compact" containerSize="md">
          <Heading as="h2" size="h3" className="text-center">
            What&apos;s included
          </Heading>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-3 rounded-lg border border-border bg-card/40 px-4 py-3"
              >
                <Check className="size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Other services */}
      <Section aria-label="Other services">
        <SectionHeader content={{ title: "Explore other services" }} />
        <ServiceGrid services={otherServices} className="mt-14" />
      </Section>

      <Cta />
    </>
  );
}
