# Component Inventory

A catalogue of reusable components — **check here before creating anything new**
(per [`../CLAUDE.md`](../CLAUDE.md)). Update it after every major milestone.

Legend: **RSC** = React Server Component (default) · **Client** = `"use client"`.

## UI primitives — `src/components/ui/`

| Component | File | Type | Purpose | Key API |
| --- | --- | --- | --- | --- |
| `Container` | `container.tsx` | RSC | Horizontal layout: centered max-width + responsive gutters. | `size`: `sm` \| `md` \| `lg` \| `full` |
| `Section` | `section.tsx` | RSC | Full-bleed `<section>` with vertical rhythm; composes `Container`. | `spacing`: `default` \| `compact` \| `none`; `containerSize`; `bleed` |
| `Heading` | `typography.tsx` | RSC | Type-scale heading; visual `size` decoupled from semantic tag. | `as`: `h1`–`h4`/`p`/`span`; `size`: `display` \| `h1`–`h4` |
| `Eyebrow` | `typography.tsx` | RSC | Small uppercase brand-colored label above a heading. | standard `<p>` props |
| `Lead` | `typography.tsx` | RSC | Large muted intro paragraph. | standard `<p>` props |
| `IconBadge` | `icon-badge.tsx` | RSC | Rounded brand-tinted icon tile (decorative). | `icon`, `className` |
| `Reveal` | `reveal.tsx` | Client | Scroll-triggered entrance for one element; reduced-motion aware. | `variants`, `asItem` + motion props |
| `RevealGroup` | `reveal.tsx` | Client | Stagger orchestrator for `Reveal asItem` children. | `variants` + motion props |
| `Input` | `input.tsx` | RSC | Token-styled text input; `aria-invalid` styling. | native `<input>` props |
| `Textarea` | `textarea.tsx` | RSC | Token-styled multiline input. | native `<textarea>` props |
| `Label` | `label.tsx` | RSC | Form label (associate via `htmlFor`). | native `<label>` props |

Barrel: `@/components/ui` (primitives only).

## shadcn/ui components — `src/components/ui/`

Added on demand via `npx shadcn add <name>`; imported by path (`@/components/ui/button`).

| Component | File | Notes |
| --- | --- | --- |
| `Button` | `button.tsx` | Variants: `default`/`outline`/`secondary`/`ghost`/`link`/`destructive`; sizes incl. `icon`. Supports `asChild`. |
| `Sheet` (+ parts) | `sheet.tsx` | Radix Dialog-based slide-over (focus trap, Escape). Parts: `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetClose`, … |
| `Card` (+ parts) | `card.tsx` | Surface primitive. Parts: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`. |

## Icons — `src/components/icons/`

| Component | File | Notes |
| --- | --- | --- |
| `GitHubIcon`, `LinkedInIcon`, `XIcon` | `brand-icons.tsx` | Inline brand SVGs (lucide v1 dropped brand marks). Satisfy `IconComponent`; color via `currentColor`. |

> Product/UI icons come from `lucide-react`. Any icon used in config must satisfy
> the `IconComponent` type (`@/types`).

## Layout shell — `src/components/layout/`

| Component | File | Type | Purpose |
| --- | --- | --- | --- |
| `Header` | `header.tsx` | Client | Sticky, scroll-aware top bar; desktop nav + accessible mobile `Sheet`. Config-driven from `siteConfig`. |
| `Footer` | `footer.tsx` | RSC | Brand, contact, link columns, socials, copyright — all from `siteConfig`. |
| `Logo` | `logo.tsx` | RSC | Brand mark + wordmark linking home; reads name from `siteConfig`. |

Barrel: `@/components/layout`.

## Page sections — `src/components/sections/`

All sections are RSC (server-rendered for SEO); motion comes from the `Reveal`
client islands. Copy is config-driven via `constants/sections.ts`; list content
from `data/`.

| Component | File | Purpose |
| --- | --- | --- |
| `Hero` | `hero.tsx` | Top section; the page's single `<h1>` + primary/secondary CTAs. |
| `Services` | `services.tsx` | `#services` — staggered grid of `ServiceCard` from the catalog. |
| `About` | `about.tsx` | `#about` — intro + stats grid + engineering values (`FeatureCard`). |
| `Process` | `process.tsx` | `#work` — numbered delivery steps (numbers derived from order). |
| `Cta` | `cta.tsx` | `#contact` — closing call to action; routes to `/contact`. |
| `ContactForm` | `contact-form.tsx` | **Client** — the contact form; `useActionState` + the contact server action, with inline validation and pending/success/error states. |

### Section building blocks

| Component | File | Type | Purpose |
| --- | --- | --- | --- |
| `SectionHeader` | `section-header.tsx` | RSC | Eyebrow + heading + lead block from `SectionContent`; revealed on scroll. Use `as`/`size` for page `<h1>`s. |
| `FeatureCard` | `feature-card.tsx` | RSC | Shared icon + title + description card (composes `Card` + `IconBadge`); accepts extra body content. Optional `href` makes it a stretched link. |
| `ServiceCard` | `service-card.tsx` | RSC | `Service` as a `FeatureCard` (linked to its detail page) plus its highlights list. |
| `ServiceGrid` | `service-grid.tsx` | RSC | Staggered responsive grid of `ServiceCard`s; defaults to the full catalog, accepts a subset. |

Barrel: `@/components/sections`.

## SEO — `src/components/seo/`

| Component | File | Purpose |
| --- | --- | --- |
| `JsonLd` | `json-ld.tsx` | Renders schema.org JSON-LD from the `lib/structured-data` builders as a `<script type="application/ld+json">`. |
