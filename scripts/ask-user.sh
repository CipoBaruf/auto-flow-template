#!/usr/bin/env bash
# Ask the user a question via Telegram and wait for their answer.
#
# Usage: ask-user.sh <issue-number> "question"
# Prints the answer to stdout; exits non-zero on timeout.
#
# How it works: the question is sent to the user's Telegram chat, and the tracking
# issue is labeled "awaiting-answer" — this is the signal the relay uses to know a
# plain-text reply should be treated as an answer rather than as unrelated chatter
# (see auto-flow-relay's isAwaitingAnswer). The user replies in Telegram; the relay
# posts that reply as a comment starting with "[answer]" on the tracking issue. This
# script polls for such a comment and clears the label once it finds one (or on
# timeout), so the window where plain text = answer is exactly this call's lifetime.
#
# Needs: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GH_TOKEN (gh CLI auth),
# GITHUB_REPOSITORY. Optional: ASK_TIMEOUT_MINUTES (default 240).
set -euo pipefail

ISSUE="$1"
QUESTION="$2"
TIMEOUT_MINUTES="${ASK_TIMEOUT_MINUTES:-240}"
POLL_SECONDS=20
ASKED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)

clear_label() {
  gh issue edit "$ISSUE" --repo "$GITHUB_REPOSITORY" --remove-label "awaiting-answer" >/dev/null 2>&1 || true
}

gh label create "awaiting-answer" --repo "$GITHUB_REPOSITORY" --color FBCA04 --force >/dev/null 2>&1 || true
gh issue edit "$ISSUE" --repo "$GITHUB_REPOSITORY" --add-label "awaiting-answer" >/dev/null

curl -fsS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=❓ [#${ISSUE}] ${QUESTION}" \
  -o /dev/null

DEADLINE=$(( $(date +%s) + TIMEOUT_MINUTES * 60 ))
while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  ANSWER=$(gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE}/comments?since=${ASKED_AT}&per_page=100" \
    --jq '[.[] | select(.body | startswith("[answer]"))] | last | .body // empty' 2>/dev/null || true)
  if [ -n "$ANSWER" ]; then
    clear_label
    printf '%s\n' "${ANSWER#\[answer\]}" | sed 's/^[[:space:]]*//'
    exit 0
  fi
  sleep "$POLL_SECONDS"
done

clear_label
echo "ask-user.sh: no answer within ${TIMEOUT_MINUTES} minutes" >&2
exit 1
