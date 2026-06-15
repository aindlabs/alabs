# A Labs

Modern, dark-themed SaaS marketing site for a software engineering & IT
consulting studio. Built with **Next.js 16** (App Router) · React 19 ·
TypeScript · Tailwind v4 · shadcn/ui · Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Lint with ESLint. |
| `npm run typecheck` | Type-check without emitting. |

## Environment variables

The contact form delivers email via [Resend](https://resend.com). Set these on
the Cloudflare Worker (dashboard → **Settings → Variables & Secrets**, or
`npx wrangler secret put <NAME>`); for local dev, add them to a `.dev.vars` file
(git-ignored). All are optional — without them the form shows a direct-email
fallback.

| Variable | Purpose | Default |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API key (secret) — enables email delivery. | — |
| `CONTACT_TO_EMAIL` | Inbox that receives submissions. | `siteConfig.contact.email` |
| `CONTACT_FROM_EMAIL` | Sender address. | `A Labs <onboarding@resend.dev>` |

> Resend's `onboarding@resend.dev` sender works without a custom domain — set
> `CONTACT_TO_EMAIL` to your verified inbox to start receiving leads.

## Documentation

| Doc | What's in it |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | Engineering rules & workflow (the single source of process). |
| [`docs/PROJECT.md`](docs/PROJECT.md) | Product brief, stack, and principles. |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Architecture notes + folder structure. |
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Component inventory. |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Architecture decision records. |
| [`CHANGELOG.md`](CHANGELOG.md) | Change history. |

## Project structure

```
src/
├── app/          # routes, root layout (shell), global styles
├── components/   # ui/ (primitives + shadcn), layout/, icons/, sections/
├── constants/    # site config (brand, nav, footer, CTA)
├── data/         # content collections (e.g. services)
├── hooks/        # shared hooks
├── lib/          # helpers: cn, seo, animation variants
└── types/        # shared content models
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full layout and conventions.
