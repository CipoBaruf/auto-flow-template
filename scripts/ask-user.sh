#!/usr/bin/env bash
# Ask the user a question via Telegram and wait for their answer.
#
# Usage: ask-user.sh <issue-number> "question"
# Prints the answer to stdout; exits non-zero on timeout.
#
# How it works: the question is sent to the user's Telegram chat. The user
# replies in Telegram; the local relay posts that reply as a comment starting
# with "[answer]" on the tracking issue. This script polls the issue comments
# until such a comment appears (only comments newer than the question count).
#
# Needs: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GH_TOKEN (gh CLI auth),
# GITHUB_REPOSITORY. Optional: ASK_TIMEOUT_MINUTES (default 240).
set -euo pipefail

ISSUE="$1"
QUESTION="$2"
TIMEOUT_MINUTES="${ASK_TIMEOUT_MINUTES:-240}"
POLL_SECONDS=20
ASKED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)

curl -fsS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=❓ [#${ISSUE}] ${QUESTION}" \
  -o /dev/null

DEADLINE=$(( $(date +%s) + TIMEOUT_MINUTES * 60 ))
while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  ANSWER=$(gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE}/comments?since=${ASKED_AT}&per_page=100" \
    --jq '[.[] | select(.body | startswith("[answer]"))] | last | .body // empty' 2>/dev/null || true)
  if [ -n "$ANSWER" ]; then
    printf '%s\n' "${ANSWER#\[answer\]}" | sed 's/^[[:space:]]*//'
    exit 0
  fi
  sleep "$POLL_SECONDS"
done

echo "ask-user.sh: no answer within ${TIMEOUT_MINUTES} minutes" >&2
exit 1
