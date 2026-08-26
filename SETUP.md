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
- GitHub → Settings → Developer settings → **classic PAT** with `repo` scope (lets agent
  pushes/PRs trigger workflows; the default GITHUB_TOKEN can't).

## 5. Wire it up

```bash
./scripts/bootstrap.sh   # sets all secrets/variables via gh, creates staging branch, sends a test message
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
`/changes <feedback>` or `/release`.
