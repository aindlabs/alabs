"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/constants/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

import { Logo } from "./logo";

/** Spreads target/rel for external links so the markup stays accessible + safe. */
const externalLinkProps = (item: NavItem) =>
  item.external
    ? { target: "_blank" as const, rel: "noreferrer noopener" as const }
    : {};

/**
 * In-page section ids that the nav links to (e.g. "/#services" -> "services").
 * Module-scoped so the reference is stable for `useActiveSection`.
 */
const SECTION_IDS = siteConfig.nav
  .filter((item) => item.href.startsWith("/#"))
  .map((item) => item.href.slice(2));

/**
 * Site header — client component.
 * - Sticky, with a transparent-to-blurred background that engages on scroll.
 * - Navigation and the CTA are driven entirely by `siteConfig` (config-driven),
 *   and the same nav data feeds both the desktop bar and the mobile sheet so
 *   the two never diverge.
 * - The active tab is highlighted: route links match the pathname; in-page
 *   section links use a scroll-spy (`useActiveSection`) on the home page.
 * - The mobile menu uses the Radix-backed Sheet for proper focus trapping and
 *   Escape handling (accessibility-first).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Whether a nav item represents the current location. */
  const isActive = (href: string): boolean => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") return activeSection === id;
      // On the dedicated services pages, keep the Services tab highlighted.
      if (id === "services" && pathname.startsWith("/services")) return true;
      return false;
    }
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  {...externalLinkProps(item)}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "text-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand"
                      : "text-muted-foreground hover:text-foreground focus-visible:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link href={siteConfig.primaryCta.href}>
                {siteConfig.primaryCta.label}
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                  {siteConfig.nav.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        {...externalLinkProps(item)}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                          active
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto p-4">
                  <Button asChild className="w-full">
                    <Link
                      href={siteConfig.primaryCta.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {siteConfig.primaryCta.label}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
