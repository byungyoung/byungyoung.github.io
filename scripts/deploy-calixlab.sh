#!/usr/bin/env bash
# One-step deploy of the static export to calixlab.dev (Cloudflare Worker `portfolio`).
# Needs a prior `wrangler login` (OAuth). No tokens are stored in this repo.
set -euo pipefail
cd "$(dirname "$0")/.."

# Since 2026-11-28 calixlab.dev is the landing (repo byungyoung/calixlab-home, Worker calixlab-landing) and this site lives at
# info.calixlab.dev. Running this script moves the apex custom domain back to this Worker: it is the ROLLBACK of the apex switch.
if [[ "${CONFIRM_APEX_ROLLBACK:-}" != 1 ]]; then
  echo "calixlab.dev now serves the landing. This script would take the apex back (rollback)." >&2
  echo "Re-run with CONFIRM_APEX_ROLLBACK=1 if that is what you want. Normal deploys: pnpm deploy:info" >&2
  exit 1
fi

pnpm build
test -f out/index.html || { echo "out/index.html missing" >&2; exit 1; }
pnpm dlx wrangler@4 deploy
