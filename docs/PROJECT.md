# Project Overview

Project Name: A Labs

Purpose:
Modern SaaS-style website for a software engineering and IT consulting company.

Services:

* Custom Software Development
* Full Stack Development
* Cloud Solutions
* Legacy Modernization
* Project Support & Maintenance

Tech Stack:

* Next.js
* React
* TypeScript
* TailwindCSS
* Framer Motion
* Shadcn/UI

Architecture Principles:

* Component-driven architecture
* Reusable UI components
* Mobile-first design
* Accessibility-first
* SEO optimized
* Type-safe
* No duplicated code
* Config-driven sections whenever possible

Code Quality Rules:

* Follow SOLID principles
* Follow DRY principles
* Prefer composition over inheritance
* Avoid premature optimization
* Create reusable abstractions only when justified
* Keep components under 200 lines where possible
* comment any design pattern implemented, and explain the same
* comment interview related topics if used in the development

Folder Structure:

src/
├── app/
├── components/
│   ├── ui/
│   ├── sections/
│   ├── layout/
├── data/
├── lib/
├── hooks/
├── types/
├── constants/

Design System:

* Dark theme
* Premium SaaS look
* Consistent spacing scale
* Consistent typography scale
* Shared animations

Development Rules:

* Never introduce duplicate components.
* Always search existing components before creating new ones.
* Prefer configuration objects over hardcoded content.
* Document major architectural decisions.
* Keep the codebase maintainable for a team of engineers.
* Make Content Config-Driven

## Status

* **Foundation** — complete: design system, content/config layer, layout shell, SEO metadata.
* **Landing page** — complete: Hero, Services, About, Process, CTA (config-driven, animated, accessible).
* **Service routes & SEO** — complete: `/services` index + statically-generated `/services/[slug]` detail pages, sitemap/robots, and JSON-LD structured data.
* **Social images** — complete: dynamic Open Graph + Twitter images for home, services index, and per-service pages.
* **Deploy & CI** — complete: GitHub Actions CI + Cloudflare Workers (OpenNext), live at `alabs.ceo-alabs.workers.dev`.
* **Contact** — complete: `/contact` page with a server-action form (typed validation, honeypot, Resend email). Set `RESEND_API_KEY` + `CONTACT_TO_EMAIL` to enable delivery.
* **Next** — case studies/blog, analytics, a custom domain, and Cloudflare Turnstile on the form.