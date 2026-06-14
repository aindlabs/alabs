import { notFound } from "next/navigation";

import { getServiceBySlug, services } from "@/data/services";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "A Labs service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Pre-render one image per known service (mirrors the page route). */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

interface ImageProps {
  readonly params: Promise<{ slug: string }>;
}

/** Per-service social share image. */
export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return renderOgImage({ eyebrow: "Service", title: service.title });
}
