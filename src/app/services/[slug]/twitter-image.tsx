import { services } from "@/data/services";

// Twitter shares the same image as Open Graph (DRY) — only the rendered image,
// alt, size, and contentType are re-exported. `generateStaticParams` and
// `dynamicParams` must be declared locally (Next parses them statically and
// they cannot be re-exported).
export { default, alt, size, contentType } from "./opengraph-image";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;
