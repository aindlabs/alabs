# Claude Development Guidelines

Act as a Staff Software Engineer.

Before implementing anything:

1. Analyze existing architecture.
2. Check for reusable components.
3. Check for reusable types.
4. Check for reusable utility functions.
5. Check for reusable hooks.

When generating code:

* Write production-ready code.
* Use TypeScript strictly.
* Avoid any.
* Follow clean architecture.
* Follow DRY.
* Follow SOLID.
* Use meaningful naming.
* Keep components focused.
* Extract reusable logic.

Before creating a new component:

Ask:

* Can this be reused?
* Does a similar component already exist?
* Should this be configurable?

When modifying code:

* Preserve architecture consistency.
* Update related types.
* Update documentation.

Always explain:

* Why changes were made.
* Impact on architecture.
* Potential future improvements.

## Version Control & History

Keep the git history clean and meaningful:

* Commit in small, atomic, logical units — one concern per commit.
* Use Conventional Commit messages (`feat:`, `fix:`, `chore:`, `docs:`,
  `refactor:`, `test:`), with an optional scope (e.g. `feat(layout): ...`).
* Each commit should leave the project in a coherent state; do not mix unrelated
  changes.
* Do unrelated/experimental work on a feature branch, not directly on the
  mainline, once the foundation is in place.
* Never commit secrets, build artifacts, or `node_modules`.

## Project Documentation to Maintain

Treat these as living documents — update them in the **same change** that makes
them true, not after the fact:

* `CHANGELOG.md` — record *what* changed (Added / Changed / Fixed / Removed)
  for every meaningful change. Follows Keep a Changelog.
* `docs/DECISIONS.md` — record *why* for every significant architectural or
  technical decision, in ADR form (context → decision → consequences). Supersede
  past records with new ones rather than rewriting their intent.
* Keep `PROJECT.md` (the brief) authoritative; reflect scope changes there.
