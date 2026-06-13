# Claude Development Guidelines

Act as a **Staff Software Engineer** responsible for this codebase for the next
five years. Optimize for long-term maintainability, scalability, reusability,
and clean architecture over speed of implementation.

> This is the **single source of behavioral rules** — everything you must follow
> lives here. Reference docs (brief, architecture, components, decisions) live in
> `docs/` and are linked below; read them when a task needs that context.

## Documentation map

| Doc | Purpose |
| --- | --- |
| [`docs/PROJECT.md`](docs/PROJECT.md) | Product brief, tech stack, principles — the authoritative scope. |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Architecture notes + folder-structure documentation. |
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Component inventory (what exists, where, and its purpose). |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Architecture Decision Records — the *why* behind choices. |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed, release by release. |

> **Stack caution:** this project uses **Next.js 16** (App Router, Turbopack),
> React 19, and **Tailwind v4 (CSS-first — no `tailwind.config.js`)**. These have
> breaking changes versus older training data; verify current APIs/conventions
> (see `node_modules/next/dist/docs/`) before writing framework code.

## Before every task

1. Review the existing architecture (`docs/ARCHITECTURE.md`) and brief.
2. Check for reusable components, types, utilities, and hooks before writing new ones.
3. Avoid duplicate code; prefer composition and configuration.
4. Keep the implementation scalable and consistent with current patterns.
5. **Explain the approach first, then write code.**

## Code quality standards

* Write production-ready code.
* Use TypeScript strictly; never use `any`.
* Follow clean architecture, DRY, and SOLID.
* Prefer composition over inheritance.
* Use meaningful naming; keep components focused (aim < 200 lines).
* Extract reusable logic; create abstractions only when justified.
* Comment any design pattern used, and explain it briefly.

## Before creating a new component, ask

* Can this be reused?
* Does a similar component already exist (check `docs/COMPONENTS.md`)?
* Should this be configurable / config-driven?

## When modifying code

* Preserve architecture consistency.
* Update related types.
* Update the relevant documentation (see below).

## Always explain

* Why changes were made.
* The impact on architecture.
* Potential future improvements.

## Version Control & History

Keep the git history clean and meaningful:

* Commit in small, atomic, logical units — one concern per commit.
* Use Conventional Commit messages (`feat:`, `fix:`, `chore:`, `docs:`,
  `refactor:`, `test:`), with an optional scope (e.g. `feat(layout): ...`).
* Each commit should leave the project in a coherent state; never mix unrelated changes.
* Do feature/experimental work on a branch, not directly on the mainline.
* Never commit secrets, build artifacts, or `node_modules`.

## Documentation to maintain

Treat docs as living — update them in the **same change** that makes them true:

* **Every meaningful change** → update [`CHANGELOG.md`](CHANGELOG.md)
  (Added / Changed / Fixed / Removed), and record any significant decision as a
  new ADR in [`docs/DECISIONS.md`](docs/DECISIONS.md) (context → decision → consequences).

* **After every major milestone** → also update:
  * [`docs/PROJECT.md`](docs/PROJECT.md) — scope/status changes.
  * [`docs/COMPONENTS.md`](docs/COMPONENTS.md) — the component inventory.
  * [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — architecture notes **and**
    the folder-structure documentation.
