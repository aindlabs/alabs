import { About, Cta, Hero, Process, Services } from "@/components/sections";

/**
 * Home page — composes the landing-page sections in nav order
 * (Hero → Services → About → Process → CTA). Each section is self-contained and
 * reads its content from the config/data layer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Process />
      <Cta />
    </>
  );
}
