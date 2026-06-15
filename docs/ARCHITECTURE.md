# Architecture

Architecture notes and folder-structure documentation for A Labs. Keep this file
current with the codebase — update it after every major milestone (see
[`../CLAUDE.md`](../CLAUDE.md)). The *why* behind specific choices lives in
[`DECISIONS.md`](DECISIONS.md).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict+)
- **Tailwind v4** — CSS-first, tokens in `globals.css` (no `tailwind.config.js`)
- **shadcn/ui** (Radix primitives) · **class-variance-authority** for variants
- **Framer Motion** for animation · **lucide-react** + custom brand SVGs for icons

## Layered architecture

Content flows in one direction, presentation is decoupled from data:

```
types/        →  contracts (no JSX)        ── the shapes
   ↑
data/         →  content collections       ── e.g. service catalog
constants/    →  app/site configuration    ── nav, footer, brand, CTA
   ↑
lib/          →  pure helpers (cn, seo, animation variants)
   ↑
components/   →  presentational UI          ── render config, hold no content
   ↑
app/          →  routes compose the above
```

**Rule of thumb:** content lives in `data/` + `constants/`, typed by `types/`,
and is *rendered* by `components/`. Components stay presentational and reusable;
adding/editing content never requires touching a component.

## Folder structure

```
e:/Code/AI/ALabs
├── CLAUDE.md               # single source of behavioral rules (auto-loaded)
├── CHANGELOG.md            # what changed
├── README.md               # entry point → links into docs/
├── components.json         # shadcn/ui config (on-demand component installs)
├── docs/
│   ├── PROJECT.md          # product brief / scope (authoritative)
│   ├── ARCHITECTURE.md     # this file
│   ├── COMPONENTS.md       # component inventory
│   └── DECISIONS.md        # architecture decision records
├── public/                 # static assets
└── src/
    ├── app/                # App Router
    │   ├── layout.tsx      # shell (header/footer, fonts, metadata)
    │   ├── page.tsx        # home
    │   ├── services/       # /services index + [slug] detail (SSG)
    │   ├── contact/        # /contact page + server action (actions.ts)
    │   ├── opengraph-image.tsx / twitter-image.tsx  # social images (per segment)
    │   ├── sitemap.ts      # sitemap.xml
    │   ├── robots.ts       # robots.txt
    │   └── globals.css     # design tokens
    ├── components/
    │   ├── ui/             # reusable primitives + shadcn components
    │   ├── layout/         # header, footer, logo (the app shell)
    │   ├── icons/          # custom brand SVGs (IconComponent-compatible)
    │   ├── seo/            # JsonLd structured-data renderer
    │   └── sections/       # config-driven page sections (Hero, Services, About, Process, Cta) + building blocks
    ├── constants/          # site config (brand, nav, footer, CTA) + section copy
    ├── data/               # content collections (services, stats, process, values)
    ├── hooks/              # shared React hooks (added when needed)
    ├── lib/                # framework-agnostic helpers (cn, seo, animations, structured-data, og)
    │   └── contact/        # contact validation + Resend email sender
    └── types/              # shared TypeScript content models
```

> Folders are created when first needed (`hooks/`, `sections/` will appear with
> the relevant milestone). Keep this tree updated as they land.

## Conventions

- **Imports** use the `@/*` alias (→ `src/`). Prefer barrels (`@/types`,
  `@/components/ui`); shadcn components are imported by their own path.
- **Server vs. client** — components are server components by default; add
  `"use client"` only when interactivity/browser APIs are required. Sections
  stay server-rendered (SEO); animation is isolated to the `Reveal`/`RevealGroup`
  client islands, which a server section can render as children. The header's
  scroll state + mobile sheet are the other client boundary.
- **Styling** uses design tokens via Tailwind utilities (`bg-background`,
  `text-primary`, …). Compose classes with `cn()`; never hardcode hex colors.
- **Variants** are expressed with `class-variance-authority`, not ad-hoc
  conditional class strings.
- **Animation** uses the shared variants in `lib/animations.ts`; do not
  re-declare motion timing inline.
- **SEO** — pages build metadata via `lib/seo.ts` (`buildMetadata`); structured
  data comes from `lib/structured-data.ts` builders rendered by `<JsonLd>`;
  `sitemap.ts`/`robots.ts` are generated from the route map + catalog. Social
  images use the `opengraph-image`/`twitter-image` file convention, all rendered
  by one branded helper (`lib/og.tsx`); `twitter-image` re-exports its
  `opengraph-image`.
- **Dynamic routes** — content-driven routes (e.g. `/services/[slug]`) use
  `generateStaticParams` for SSG, `generateMetadata` for per-route tags, and
  `dynamicParams = false` so only known slugs render (others 404).
- **Forms & server actions** — forms post to a `"use server"` action (runs on
  the Worker). Validation is centralized and typed (`lib/contact/validation.ts`);
  secrets (e.g. the email API key) stay server-side. Client form state uses
  React 19 `useActionState`. Spam is filtered with a honeypot field.

## Environment variables

Set these on the Cloudflare Worker (dashboard → Settings → Variables, or
`wrangler secret put`). All are optional for build; the contact form needs them
to actually deliver mail.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email (footer/contact/mailto). Build-time; exposed to the browser. | `hello@alabs.example.com` |
| `RESEND_API_KEY` | Resend API key — enables contact email delivery (secret). | — (form shows email fallback if unset) |
| `CONTACT_TO_EMAIL` | Inbox that receives submissions. | `NEXT_PUBLIC_CONTACT_EMAIL` |
| `CONTACT_FROM_EMAIL` | Sender address. | `A Labs <onboarding@resend.dev>` (works without a custom domain) |

For local dev, put the same keys in a `.dev.vars` file (git-ignored).

## Data flow example (footer "Services" column)

`data/services.ts` (catalog) → `constants/site.ts` derives the footer column from
it → `components/layout/footer.tsx` renders `siteConfig.footerColumns`. Adding a
service in one place propagates to the grid, the footer, and future service
routes — no duplication.
