import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root metadata. `metadataBase` resolves relative OG/canonical URLs; the title
 * template appends the brand name to every child page's title. Per-page tags
 * come from `buildMetadata` so SEO stays consistent across routes.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software Engineering & IT Consulting`,
    template: `%s | ${siteConfig.name}`,
  },
  ...buildMetadata(),
  applicationName: siteConfig.name,
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `dark` is applied explicitly: the app is dark-first, and the class keeps
    // shadcn `dark:` variants and a future theme toggle working.
    <html
      lang={siteConfig.locale}
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
