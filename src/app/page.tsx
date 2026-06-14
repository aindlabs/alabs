import { About, Cta, Hero, Process, Services } from "@/components/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

/**
 * Home page — composes the landing-page sections in nav order
 * (Hero → Services → About → Process → CTA). Each section is self-contained and
 * reads its content from the config/data layer. Emits Organization + WebSite
 * JSON-LD for rich search results.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <Services />
      <About />
      <Process />
      <Cta />
    </>
  );
}
