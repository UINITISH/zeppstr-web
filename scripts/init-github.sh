#!/usr/bin/env bash
#
# init-github.sh — one-time setup to push the Zeppstr web project to GitHub.
#
# Usage:
#   1. Create a private repo on github.com first: <org>/zeppstr-web
#   2. Run from the project root:
#        bash scripts/init-github.sh <org>
#      e.g.:
#        bash scripts/init-github.sh zeppstr
#
# This script will:
#   - Verify you're in the project root
#   - Initialize git (if not already)
#   - Add a sensible .gitignore (if missing)
#   - Make the initial commit
#   - Set main as the default branch
#   - Add the GitHub remote
#   - Push main with -u (so future pulls/pushes don't need the upstream flag)
#
# Run this ONCE per team. Then everyone else clones from the GitHub URL.

set -euo pipefail

# ─── 0. Sanity checks ──────────────────────────────────────────────────

if [[ $# -lt 1 ]]; then
  echo "Usage: bash scripts/init-github.sh <github-org-or-user>"
  echo ""
  echo "Example: bash scripts/init-github.sh zeppstr"
  exit 1
fi

ORG="$1"
REPO_NAME="zeppstr-web"
REMOTE_URL="git@github.com:${ORG}/${REPO_NAME}.git"

if [[ ! -f "package.json" ]] || [[ ! -d "app" ]]; then
  echo "✗ This script must be run from the project root (the folder with package.json + app/)."
  echo "  cd to that folder, then run: bash scripts/init-github.sh ${ORG}"
  exit 1
fi

echo "→ Setting up GitHub for ${REMOTE_URL}"
echo ""

# ─── 1. Ensure .gitignore exists ───────────────────────────────────────

if [[ ! -f ".gitignore" ]]; then
  echo "→ Writing .gitignore"
  cat > .gitignore <<'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/
build/
dist/

# Production
*.local
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Sanity
.sanity/
sanity/dist/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/
.idea/
.cursor/
.DS_Store
*.swp
*.swo

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Vercel
.vercel

# Sentry
.sentryclirc

# Misc
coverage/
EOF
fi

# Always make sure .env.example exists so newcomers know what variables are needed.
if [[ ! -f ".env.example" ]]; then
  echo "→ Writing .env.example"
  cat > .env.example <<'EOF'
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
# SANITY_API_WRITE_TOKEN=  # local only; for seed scripts

# HubSpot — diagnostic intake CRM sync
HUBSPOT_TOKEN=

# Sentry — optional but recommended
# SENTRY_DSN=
EOF
fi

# ─── 2. Initialize git if needed ───────────────────────────────────────

if [[ ! -d ".git" ]]; then
  echo "→ git init"
  git init >/dev/null
fi

# ─── 3. Configure main as default branch ───────────────────────────────

CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "")
if [[ "${CURRENT_BRANCH}" != "main" ]]; then
  echo "→ Renaming branch to main"
  git branch -M main
fi

# ─── 4. Initial commit ─────────────────────────────────────────────────

# Only commit if there are no commits yet (idempotent re-runs are safe)
if ! git rev-parse HEAD >/dev/null 2>&1; then
  echo "→ Staging all files"
  git add .

  # Verify nothing leaked
  if git ls-files --cached | grep -E "(\.env\.local|node_modules|\.next)" >/dev/null; then
    echo "✗ Detected sensitive files staged. Aborting before commit."
    echo "  Check your .gitignore."
    exit 1
  fi

  echo "→ Initial commit"
  git commit -m "chore: initial commit — Zeppstr web v1" >/dev/null
fi

# ─── 5. Add remote and push ────────────────────────────────────────────

if git remote get-url origin >/dev/null 2>&1; then
  echo "→ Remote 'origin' already exists. Skipping remote-add."
  echo "  Current origin: $(git remote get-url origin)"
else
  echo "→ Adding remote: ${REMOTE_URL}"
  git remote add origin "${REMOTE_URL}"
fi

echo ""
echo "→ Pushing main to GitHub"
echo "  (If this fails, make sure the repo exists at https://github.com/${ORG}/${REPO_NAME})"
echo ""

git push -u origin main

echo ""
echo "✓ Done. Next steps:"
echo ""
echo "  1. Set branch protection on main:"
echo "     https://github.com/${ORG}/${REPO_NAME}/settings/branches"
echo ""
echo "  2. Import the repo into Vercel:"
echo "     https://vercel.com/new"
echo ""
echo "  3. Add the team and share docs/TEAM-GUIDE.md with them."
echo ""
