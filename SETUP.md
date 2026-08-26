# SETUP — new project from this template (~15 min)

Everything here is free tier except your existing Claude subscription.

## 1. Create the repo

- GitHub → "Use this template" → new **public** repo (public = unlimited free Actions minutes;
  agent runs idle while waiting for your Telegram answers, so minutes matter).
- Clone it locally.

## 2. Telegram bot (once per account, reusable across projects)

- Talk to [@BotFather](https://t.me/BotFather) → `/newbot` → save the **bot token**.
- Get your **chat id**: message [@userinfobot](https://t.me/userinfobot), or start the relay and send `/start`.
- One bot serves all your auto-flow projects (the relay routes by project).

## 3. Render (two free services)

For **staging** and **production**, create a Web Service from the repo:

| Setting        | Value                          |
| -------------- | ------------------------------ |
| Root Directory | `app`                          |
| Build Command  | `npm ci`                       |
| Start Command  | `npm start`                    |
| Branch         | `staging` / `main`             |
| Auto-Deploy    | **Off** (CI deploys via hook after the test gate) |
| Env var        | `APP_ENV=staging` / `production` |

Copy each service's **Deploy Hook URL** (Settings → Deploy Hook) and its public URL.

Free-tier note: services sleep after 15 min idle; first request after that takes ~30–60 s.

## 4. Tokens

- `claude setup-token` on your machine → **Claude Code OAuth token** (subscription-billed).
- GitHub → Settings → **Developer settings → Personal access tokens → Tokens (classic)**
  → Generate new token → check only the **`repo`** scope → Generate. This is what lets
  the agent's pushes/PRs trigger workflows (the default GITHUB_TOKEN can't).

  *Tighter scoping:* a fine-grained token limited to just this repo (Contents/Issues/
  Pull requests/Actions Read & write, Metadata Read-only) is the better fit given the
  agent runs with `--dangerously-skip-permissions` — but GitHub's fine-grained
  permission UI has been unreliable in practice (permission edits not taking effect
  even after saving). If you hit repeated 403s on writes after setting one up, fall
  back to the classic token above rather than debugging it further.

## 5. Wire it up

```bash
./scripts/bootstrap.sh   # sets secrets/variables, creates the staging branch, protects main
                          # (requires the test check before any merge), sends a test message
```

## 6. Register in the relay

In your `auto-flow-relay` checkout, add the project to `config.json` and start it:

```json
{ "name": "myproject", "repo": "you/myproject", "chatId": "123456789" }
```

```bash
npm start   # long polling — no public URL needed; runs on your machine
```

## 7. First cycle

Send the bot: `/feature myproject add an endpoint that returns the server time`
— then answer its questions, test the staging URL when notified, and reply
`/changes <feedback>` or `/release`. You can send another `/feature` before
releasing too — it builds on top of the current one on staging instead of
replacing it (see the flow diagram in the main [README](README.md)).
