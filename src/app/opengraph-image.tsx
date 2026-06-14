import { heroContent } from "@/constants/sections";
import { siteConfig } from "@/constants/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${siteConfig.name} — ${heroContent.title}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Home page social share image. */
export default function Image() {
  return renderOgImage({
    eyebrow: heroContent.eyebrow,
    title: heroContent.title,
  });
}
