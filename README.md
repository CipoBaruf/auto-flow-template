# auto-flow-template

Baseline for an **automatic flow development cycle**: you request features from a
Telegram bot, a Claude Code agent develops them autonomously (asking you questions
in Telegram when needed), CI/CD deploys every change to staging, you test it from
your phone, and a single `release` reply promotes it to production.

This repo is a **GitHub template** — create one copy per project. All project-specific
wiring lives in GitHub secrets/variables and the `app/` directory; the flow itself
(workflows, scripts, agent contract) is identical across projects.

```
you (Telegram) ──/feature──▶ relay (your machine) ──dispatch──▶ GitHub Actions: agent
     ▲                            │ answers as issue comments        │ implements + tests + docs
     │◀── questions / notify ─────┴─────────────────────────────────┘ pushes → PR → staging branch
     │                                                                    │
     │◀── "🟡 staging deployed, test it" ◀── deploy-staging (test gate → Render staging)
     ├── /changes <feedback> ──▶ agent runs again on the same branch
     └── /release ──▶ PR merges to main ──▶ deploy-prod (test gate → Render production)
```

## Components

| Piece | Where it runs | Cost |
| ----- | ------------- | ---- |
| Telegram relay ([auto-flow-relay](../auto-flow-relay)) | your machine (long polling) | free |
| Developer agent (Claude Code headless) | GitHub Actions | your Claude subscription |
| CI/CD (`.github/workflows/`) | GitHub Actions (public repo) | free, unlimited |
| Staging + production | Render free tier | free (sleeps when idle) |

## The app (`app/`)

Baseline placeholder the agent grows feature by feature: Node 24 + TypeScript + Express,
Vitest tests. Endpoints: `GET /` (info), `GET /health` (status + environment).

```bash
cd app && npm install && npm run dev     # local dev on :3000
npm run check                            # typecheck + tests (the CI gate)
```

## Guarantees baked into the flow

- **Auto-tested**: the agent must make `npm run check` pass, and CI re-runs it
  independently before any deploy. Broken code never reaches staging or prod.
- **Auto-documented**: the agent's definition of done (see [AGENTS.md](AGENTS.md))
  requires updating `README.md` and `AGENTS.md` with every behavior/convention change —
  the docs are the agent's memory between cycles. A CI check warns on PRs that
  change `app/src` without touching docs.
- **Human gate**: nothing reaches production without your explicit `release` in Telegram.
- **One cycle at a time**: agent runs and deploys are serialized via Actions concurrency groups.

## Get started

Follow [SETUP.md](SETUP.md) (~15 min per new project).
