#!/usr/bin/env bash
# One-time wiring for a new project created from this template.
# Run from the repo root after `gh repo create` (or "Use this template" on GitHub).
#
# Prerequisites: gh CLI authenticated (`gh auth login`), and the values below at hand.
set -euo pipefail

echo "== auto-flow bootstrap =="
echo "This sets the GitHub secrets/variables the workflows need."
echo

read -rp "Telegram bot token (from @BotFather): " TELEGRAM_BOT_TOKEN
read -rp "Your Telegram chat id (send /start to the bot, relay prints it; or use @userinfobot): " TELEGRAM_CHAT_ID
read -rp "Claude Code OAuth token (run: claude setup-token): " CLAUDE_CODE_OAUTH_TOKEN
read -rp "GitHub classic PAT with 'repo' scope (for agent pushes/PRs): " GH_PAT
read -rp "Render STAGING deploy hook URL: " RENDER_STAGING_DEPLOY_HOOK
read -rp "Render PROD deploy hook URL: " RENDER_PROD_DEPLOY_HOOK
read -rp "Staging public URL (e.g. https://myapp-staging.onrender.com): " STAGING_URL
read -rp "Prod public URL: " PROD_URL

gh secret set TELEGRAM_BOT_TOKEN --body "$TELEGRAM_BOT_TOKEN"
gh secret set TELEGRAM_CHAT_ID --body "$TELEGRAM_CHAT_ID"
gh secret set CLAUDE_CODE_OAUTH_TOKEN --body "$CLAUDE_CODE_OAUTH_TOKEN"
gh secret set GH_PAT --body "$GH_PAT"
gh secret set RENDER_STAGING_DEPLOY_HOOK --body "$RENDER_STAGING_DEPLOY_HOOK"
gh secret set RENDER_PROD_DEPLOY_HOOK --body "$RENDER_PROD_DEPLOY_HOOK"
gh variable set STAGING_URL --body "$STAGING_URL"
gh variable set PROD_URL --body "$PROD_URL"

echo
echo "Creating the staging branch (tracks whatever feature is under review)..."
git push origin HEAD:staging 2>/dev/null || echo "  (staging already exists or push it manually)"

echo
echo "Verifying: sending a test Telegram message..."
TELEGRAM_BOT_TOKEN="$TELEGRAM_BOT_TOKEN" TELEGRAM_CHAT_ID="$TELEGRAM_CHAT_ID" \
  ./scripts/notify.sh "✅ auto-flow bootstrap complete for $(gh repo view --json nameWithOwner --jq .nameWithOwner)"

echo
echo "Done. Next: add this repo to the relay's config.json and start the relay."
echo "Reminder (Render, per service): Root Directory=app, Build=npm ci, Start=npm start,"
echo "  env APP_ENV=staging|production, branch staging|main, and Auto-Deploy=OFF"
echo "  (CI triggers deploys via the hook only after the test gate passes)."
