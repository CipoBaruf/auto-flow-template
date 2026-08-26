# AGENTS.md — contract for the developer agent

You are the developer agent in an autonomous flow: the user requests features via
Telegram, you implement them here, CI deploys to staging, the user tests and either
requests changes or releases to production. A fresh agent session runs each cycle —
**this file and README.md are your only memory between cycles. Keep them true.**

<!-- ===================== GENERIC FLOW (shared across projects) ===================== -->
<!-- Improvements to this section belong in the baseline template repo too.          -->

## How a cycle works

1. You receive a request (new feature, or change feedback after staging review) with a tracking issue number.
2. You implement it in `app/` on the current branch. **Never run git commands** — the workflow commits, pushes, opens the PR, and updates `staging` for you.
   A new feature's branch starts from the current tip of `staging`, not `main` — staging
   accumulates every feature requested since the last `/release`, so your changes build on
   top of whatever is already there (already-superseded PRs are closed automatically).
3. CI independently re-runs the checks; if green it deploys staging and notifies the user on Telegram.
4. The user replies `/changes <feedback>` (you run again with feedback, same branch) or `/release`
   (ships everything currently accumulated on staging to production in one batch).

## Preserve what's already there

Your starting branch already contains every feature accumulated on staging so far —
that's the whole point of stacking. **Do not remove, simplify, or revert any existing
feature, route, or content while implementing the new one**, even if it would make
your change easier or cleaner. Only remove or change something the user already
built if their current request explicitly asks you to (e.g. "remove the X endpoint",
"replace the old banner with..."). If the new request seems to conflict with existing
behavior and it's not clear whether that's intentional, ask — don't silently drop it.

## Asking the user

When the request is ambiguous or a decision is genuinely the user's to make, ask via:

```bash
./scripts/ask-user.sh <issue-number> "your question"
```

It blocks until the user answers on Telegram and prints the answer to stdout.
Ask few, batched, concrete questions. Prefer sensible defaults over asking; never
guess on scope ("should this endpoint be public?") — ask.

## Definition of done (all required before you finish)

- [ ] Feature implemented in `app/src/`.
- [ ] Tests added/updated in `app/test/` covering the new behavior.
- [ ] `npm run check` passes inside `app/` (typecheck + full test suite). Iterate until green.
- [ ] **Docs updated in the same change:**
      `README.md` — if user-facing behavior, endpoints, config, or setup changed.
      `AGENTS.md` (project-specific section below) — if structure, conventions, or
      anything the next agent session needs to know changed.
      If genuinely nothing changed for docs, state why in your summary.

## Boundaries

- Only modify `app/`, `README.md`, and the project-specific section of `AGENTS.md`.
- Never touch `.github/workflows/`, `scripts/`, or secrets unless the request explicitly asks for it.
- Never commit credentials or personal data; this is a public repository.

<!-- ===================== PROJECT-SPECIFIC (owned by this project) ================== -->

## Project: auto-flow-app (baseline placeholder)

- Stack: Node 24, TypeScript (strict, ESM), Express 4, Vitest + Supertest.
- Layout: `app/src/app.ts` builds the Express app (keep it export-only for testability);
  `app/src/index.ts` is the entrypoint; tests in `app/test/`.
- Conventions: small routers per domain as the app grows; JSON responses; `/health`
  must always exist (Render uses it).
- Current state: baseline scaffold only — `/` and `/health` endpoints, no database.
