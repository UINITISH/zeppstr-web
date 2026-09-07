#!/bin/zsh
#
# Zeppstr — commit and push
#
# Double-click in Finder. Opens a new Terminal window, so it cannot land in
# the tab running `next dev`.
#
# The production build already passed, so this script no longer re-runs it by
# default. Pass --build as an argument if you want to build again first.

cd "$(dirname "$0")" || exit 1

print -P "\n%F{yellow}━━━ Zeppstr commit + push ━━━%f"
print -P "Working in: $(pwd)\n"

# ── 0. Clear a stale git lock ────────────────────────────────────────────────
# A sandboxed `git status` left a zero-byte .git/index.lock behind and could not
# remove it. Git refuses to stage anything while it exists. It is safe to delete
# when no git process is running.
if [[ -f .git/index.lock ]]; then
  if pgrep -x git > /dev/null; then
    print -P "%F{red}✗ A git process is currently running.%f"
    print -P "Close any editor doing git work, then run this again.\n"
    print -P "Press Return to close."; read; exit 1
  fi
  print -P "%F{yellow}Found stale .git/index.lock — removing it.%f"
  if ! rm -f .git/index.lock; then
    print -P "%F{red}✗ Could not remove the lock.%f Run this by hand:"
    print -P "  rm -f '$(pwd)/.git/index.lock'\n"
    print -P "Press Return to close."; read; exit 1
  fi
  print -P "%F{green}✓ Lock cleared.%f\n"
fi

# ── 1. Optional rebuild ──────────────────────────────────────────────────────
if [[ "$1" == "--build" ]]; then
  print -P "%F{cyan}[1/4] npm run build%f\n"
  if ! npm run build; then
    print -P "\n%F{red}✗ BUILD FAILED.%f Nothing committed. Send Claude the output.\n"
    print -P "Press Return to close."; read; exit 1
  fi
  print -P "\n%F{green}✓ Build passed.%f\n"
else
  print -P "%F{cyan}[1/4] Skipping build%f (it passed already — pass --build to redo)\n"
fi

# ── 2. Show what will be committed ───────────────────────────────────────────
print -P "%F{cyan}[2/4] Changes to commit%f"
CHANGED=$(git status --porcelain | wc -l | tr -d ' ')

if [[ "$CHANGED" == "0" ]]; then
  print -P "%F{yellow}Nothing to commit — working tree is clean.%f"
  print -P "If you expected changes, the earlier run may have succeeded.\n"
  git log --oneline -3
  print -P "\nPress Return to close."; read; exit 0
fi

git status --short | head -40
print -P "\n$CHANGED files changed.\n"
print -P "Commit and push to origin/add-brand-guidelines? [y/N] "
read -r REPLY
[[ "$REPLY" =~ ^[Yy]$ ]] || { print -P "\n%F{yellow}Stopped.%f"; print "Press Return."; read; exit 0 }

# ── 3. Commit — and stop if it fails ─────────────────────────────────────────
print -P "\n%F{cyan}[3/4] Committing%f"

if ! git add -A; then
  print -P "\n%F{red}✗ git add failed.%f Send Claude the output.\n"
  print -P "Press Return to close."; read; exit 1
fi

if ! git commit -m "Content library, brand assets, legal pages, redirect fixes

- 23 articles imported from Drive across 7 categories, fabricated
  quotes and statistics removed on import (see IMPORT-MANIFEST.md)
- Two new categories: Email & Lifecycle, Social & Content
- Withheld articles filtered at query level (sanity/lib/queries.ts)
- Real horizontal + round logo across nav, footer, mobile drawer
- New pages: /about, /privacy, /terms
- 12 legacy redirects corrected (were 301-ing into 404s)
- Rupee glyph fixed in all generated social images"; then
  print -P "\n%F{red}✗ COMMIT FAILED.%f Nothing pushed. Send Claude the output.\n"
  print -P "Press Return to close."; read; exit 1
fi

print -P "%F{green}✓ Committed.%f\n"

# ── 4. Push — and verify it actually moved ───────────────────────────────────
print -P "%F{cyan}[4/4] Pushing%f"
BEFORE=$(git rev-parse origin/add-brand-guidelines 2>/dev/null || echo "none")

if ! git push origin add-brand-guidelines; then
  print -P "\n%F{red}✗ PUSH FAILED.%f Send Claude the output.\n"
  print -P "Press Return to close."; read; exit 1
fi

git fetch origin add-brand-guidelines --quiet 2>/dev/null
AFTER=$(git rev-parse origin/add-brand-guidelines 2>/dev/null || echo "none")

if [[ "$BEFORE" == "$AFTER" ]]; then
  print -P "\n%F{red}✗ Push reported success but the remote did not move.%f"
  print -P "Send Claude this output.\n"
  print -P "Press Return to close."; read; exit 1
fi

print -P "\n%F{green}✓ Pushed. Remote is now at ${AFTER:0:7}.%f\n"
print -P "Open the pull request into main:"
print -P "  %U https://github.com/UINITISH/zeppstr-web/compare/main...add-brand-guidelines %u"
print -P "\nThen watch whether Vercel's preview deployment goes green."
print -P "Both deployments on the repo currently show failed, so that preview"
print -P "is the first real evidence this project can deploy.\n"
print -P "Press Return to close."
read
