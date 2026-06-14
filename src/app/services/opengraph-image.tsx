import { sectionContent } from "@/constants/sections";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "A Labs — Services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Services index social share image. */
export default function Image() {
  return renderOgImage({
    eyebrow: sectionContent.services.eyebrow,
    title: sectionContent.services.title,
  });
}
