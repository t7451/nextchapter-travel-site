#!/usr/bin/env bash
# Deploy helper script for Next Chapter Travel
# Usage: ./scripts/deploy.sh [--skip-build]

set -e

SKIP_BUILD=false
if [[ "$1" == "--skip-build" ]]; then
  SKIP_BUILD=true
fi

echo "=== Next Chapter Travel Deploy ==="

# 1. Type check
echo "→ Running type check..."
pnpm check

# 2. Build (unless skipped)
if [[ "$SKIP_BUILD" == "false" ]]; then
  echo "→ Building..."
  pnpm build
fi

# 3. Commit if there are changes
if [[ -n $(git status --porcelain) ]]; then
  echo "→ Staging changes..."
  git add -A
  read -p "Commit message (leave blank for 'Deploy update'): " MSG
  MSG=${MSG:-"Deploy update"}
  git commit -m "$MSG"
fi

# 4. Push to origin main
echo "→ Pushing to origin main..."
git push origin main

# 5. Trigger Netlify build hook (if set)
if [[ -n "$NETLIFY_BUILD_HOOK" ]]; then
  echo "→ Triggering Netlify deploy..."
  curl -s -X POST "$NETLIFY_BUILD_HOOK" >/dev/null
  echo "   Netlify build triggered."
else
  echo "   (Skipped Netlify trigger — NETLIFY_BUILD_HOOK not set)"
fi

echo "=== Done ==="
