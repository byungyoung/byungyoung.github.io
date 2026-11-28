#!/usr/bin/env bash
# Build the static export and rsync it to calixlab-arm, where Caddy serves it at https://info.calixlab.dev (no sign-in).
# Needs the SSH key for the server. Override the host with DEPLOY_HOST.
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${DEPLOY_HOST:-ubuntu@170.9.8.137}"
DEST=/srv/info

pnpm build
test -f out/index.html || { echo "out/index.html missing" >&2; exit 1; }
test -f out/resume/cv-en.pdf && test -f out/resume/cv-ko.pdf || { echo "CV PDFs missing from out/" >&2; exit 1; }

ssh "$HOST" "sudo install -d -o \$(id -un) -g \$(id -gn) -m 755 $DEST"
rsync -az --delete out/ "$HOST:$DEST/"
echo "deployed $(git rev-parse --short HEAD) -> $HOST:$DEST (https://info.calixlab.dev)"
