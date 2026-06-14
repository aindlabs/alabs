import { ImageResponse } from "next/og";

import { siteConfig } from "@/constants/site";

/**
 * Open Graph image renderer — A Labs
 * ----------------------------------------------------------------------------
 * Single source for social share images, rendered with `next/og` (Satori).
 * Every `opengraph-image`/`twitter-image` route delegates here, so the branded
 * layout is defined once (DRY) and stays consistent across pages.
 *
 * Satori notes (it is not a full browser):
 * - every element with multiple children needs an explicit `display: "flex"`;
 * - colors are plain hex (Satori doesn't parse our OKLCH tokens), chosen to
 *   approximate the design-system brand palette.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const COLOR = {
  bg: "#0B0B11",
  fg: "#FAFAFA",
  muted: "#ABABBA",
  brand: "#6E56F0",
  brandAccent: "#3FC5DD",
} as const;

interface OgImageOptions {
  readonly title: string;
  readonly eyebrow?: string;
}

export function renderOgImage({ title, eyebrow }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: COLOR.bg,
          padding: 80,
        }}
      >
        {/* Brand glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -120,
            width: 640,
            height: 640,
            display: "flex",
            background: `radial-gradient(circle, ${COLOR.brand}40, transparent 70%)`,
          }}
        />

        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${COLOR.brand}, ${COLOR.brandAccent})`,
              color: COLOR.fg,
              fontSize: 46,
              fontWeight: 700,
            }}
          >
            {siteConfig.name.charAt(0)}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: COLOR.fg }}>
            {siteConfig.name}
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: COLOR.brand,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 70,
              fontWeight: 700,
              lineHeight: 1.1,
              color: COLOR.fg,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", fontSize: 26, color: COLOR.muted }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
