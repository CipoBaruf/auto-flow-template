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
3. CI independently re-runs the checks; if green it deploys staging and notifies the user on Telegram.
4. The user replies `/changes <feedback>` (you run again with feedback, same branch) or `/release` (PR merges to main → production).

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
  `app/src/homePage.ts` renders the `GET /` landing page HTML (self-contained, inline
  `<style>`); `app/src/index.ts` is the entrypoint; tests in `app/test/`.
- Conventions: small routers per domain as the app grows; `/health` stays JSON and
  must always exist (Render uses it); `/` is the one HTML page — keep its styling
  self-contained in `homePage.ts` rather than pulling in a templating engine or
  static assets pipeline.
- Current state: `GET /` renders an HTML landing page with a large multi-line figlet-style
  ASCII wordmark spelling "AUTO" / "FLOW" (block-letter art in a `<pre class="banner">`,
  gradient-colored via CSS `background-clip: text`), a decorative ASCII divider, an
  oh-my-zsh-style prompt line (`➜ auto-flow-app git:(main) ✗`), project overview cards
  with HUD-style corner accents, a terminal-styled "about.json" card (fake `$ cat
  about.json` prompt line + `PROJECT_INFO` rendered as JSON in `homePage.ts` — name,
  tagline, stack, author, repo), and a footer crediting Ezequiel with a link to
  `https://github.com/cipoBaruf` plus a link to this repo,
  `https://github.com/CipoBaruf/auto-flow-template/`); `GET /health` returns JSON status +
  environment. No database. Per issue #19 staging feedback ("keep the ascii logo as
  before and all the old page style"), this full ASCII/terminal layout was restored
  after briefly being stripped down to a single hero line (#17, #19) — do not remove
  the banner/prompt/terminal/footer again without an explicit request.
- Styling: dark, clean theme (near-black background, violet `--accent` + teal
  `--accent-2`, no orange) in the spirit of render.com/oh-my-zsh terminal splash
  screens — big gradient ASCII wordmarks, terminal/HUD framing, monospace accents —
  keep it that way for any future `/` changes. The banner text is built letter-by-letter
  from fixed-width ASCII-art glyphs; verify line lengths stay aligned if you change it.
