#!/usr/bin/env bash
# Send a Telegram message to the project owner.
# Usage: notify.sh "message"  (needs TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
set -euo pipefail

curl -fsS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=$1" \
  -o /dev/null
