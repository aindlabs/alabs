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

Barrel: `@/components/ui` (primitives only).

## shadcn/ui components — `src/components/ui/`

Added on demand via `npx shadcn add <name>`; imported by path (`@/components/ui/button`).

| Component | File | Notes |
| --- | --- | --- |
| `Button` | `button.tsx` | Variants: `default`/`outline`/`secondary`/`ghost`/`link`/`destructive`; sizes incl. `icon`. Supports `asChild`. |
| `Sheet` (+ parts) | `sheet.tsx` | Radix Dialog-based slide-over (focus trap, Escape). Parts: `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetClose`, … |

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

_None yet._ Marketing sections (Hero, Services, About, CTA, …) will live here,
composing the primitives above and reading from `data/`/`constants/`. Add rows
as they are built.
