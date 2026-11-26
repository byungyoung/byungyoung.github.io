#!/usr/bin/env bash
# One-step deploy of the static export to calixlab.dev (Cloudflare Worker `portfolio`).
# Needs a prior `wrangler login` (OAuth). No tokens are stored in this repo.
set -euo pipefail
cd "$(dirname "$0")/.."

pnpm build
test -f out/index.html || { echo "out/index.html missing" >&2; exit 1; }
pnpm dlx wrangler@4 deploy
