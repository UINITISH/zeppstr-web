#!/bin/zsh
#
# Zeppstr — publish this round of changes
#
# WHAT THIS DOES, IN PLAIN TERMS
#   1. Sends the new and corrected text to your content store (Sanity).
#      This is needed because the testimonials and the Brand & Engagement
#      wording live there, not in the code. Without this step you will see the
#      new page sections but the old words inside them.
#   2. Builds the site, to prove nothing is broken.
#   3. Shows you what changed, asks, then commits and pushes.
#
# It only adds and updates. It does not delete anything.
#
# Double-click this in Finder. It opens its own window. Leave it open until it
# says Done. If any step fails it stops immediately and tells you what to send
# back to Claude — nothing further happens.

cd "$(dirname "$0")" || exit 1

BRANCH="add-brand-guidelines"

print -P "\n%F{yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "%F{yellow}  Zeppstr — publish changes%f"
print -P "%F{yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "Working in: $(pwd)\n"

# ── 0. Clear a stale git lock ────────────────────────────────────────────────
if [[ -f .git/index.lock ]]; then
  if pgrep -x git > /dev/null; then
    print -P "%F{red}✗ A git process is already running.%f"
    print -P "Close any editor doing git work, then run this again.\n"
    print -P "Press Return to close."; read; exit 1
  fi
  print -P "%F{yellow}Found a stale git lock — removing it.%f"
  rm -f .git/index.lock || {
    print -P "%F{red}✗ Could not remove the lock.%f Run this by hand:"
    print -P "  rm -f '$(pwd)/.git/index.lock'\n"
    print -P "Press Return to close."; read; exit 1
  }
  print -P "%F{green}✓ Cleared.%f\n"
fi

# ── 1. Publish content to Sanity ─────────────────────────────────────────────
print -P "%F{cyan}[1/4] Publishing text to your content store%f"
print -P "New this round: four real client testimonials (one had the wrong name"
print -P "attached to it — that is corrected), and rewritten copy for the"
print -P "Brand, Engagement & Lifecycle practice.\n"

if [[ ! -f .env.local ]] || ! grep -q "^SANITY_API_TOKEN=." .env.local; then
  print -P "%F{red}✗ The Sanity key is missing or blank in .env.local.%f"
  print -P "Nothing can be published without it. Send this to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi

if ! npm run seed; then
  print -P "\n%F{red}✗ PUBLISHING FAILED.%f"
  print -P "Nothing was changed. Copy everything above and send it to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi
print -P "\n%F{green}✓ Content published.%f\n"

# ── 2. Build ─────────────────────────────────────────────────────────────────
print -P "%F{cyan}[2/4] Building the site%f"
print -P "Five new or rebuilt pages this round, so this one is worth running."
print -P "Takes a few minutes. Ignore the scrolling output unless it stops.\n"

if ! npm run build; then
  print -P "\n%F{red}✗ BUILD FAILED.%f Nothing committed, nothing pushed."
  print -P "Send Claude everything above.\n"
  print -P "Press Return to close."; read; exit 1
fi
print -P "\n%F{green}✓ Build passed.%f\n"

# ── 3. Show and confirm ──────────────────────────────────────────────────────
print -P "%F{cyan}[3/4] What will be committed%f"
CHANGED=$(git status --porcelain | wc -l | tr -d ' ')

if [[ "$CHANGED" == "0" ]]; then
  print -P "%F{yellow}Nothing to commit — the working tree is clean.%f"
  print -P "An earlier run probably already pushed this.\n"
  git log --oneline -3
  print -P "\nPress Return to close."; read; exit 0
fi

git status --short | head -40
print -P "\n$CHANGED files changed.\n"
print -P "Commit and push to origin/$BRANCH? [y/N] "
read -r REPLY
[[ "$REPLY" =~ ^[Yy]$ ]] || { print -P "\n%F{yellow}Stopped. Nothing pushed.%f"; print "Press Return."; read; exit 0 }

if ! git add -A; then
  print -P "\n%F{red}✗ git add failed.%f Send Claude the output.\n"
  print -P "Press Return to close."; read; exit 1
fi

if ! git commit -m "Solutions + Industries hubs rebuilt, FAQ and Careers added, testimonials

- /solutions and /industries were a hero, a card grid and a CTA; both now
  carry a self-diagnostic, the working sequence, named proof and FAQs
- Removed the unsourced \"300+ businesses across 10+ countries\" claim from
  /industries (still present in 7 other places — decision pending)
- New /faq: engagement model, commercials, reporting, fit, data. No price
  figures, because none have been supplied
- New /careers: written to filter rather than attract. OPEN_ROLES is
  deliberately empty and the page reads correctly in that state
- Testimonials component + allQuotesQuery; rendered on the homepage and
  /about. No carousel, no invented avatars
- CORRECTION: the Mini Leaves testimonial was attributed to Pankaj Singhal.
  The source deck signs it \"Minileaves / Founder\" and Pankaj Singhal signs a
  different quote. Both now reproduced as written
- Brand, Engagement & Lifecycle: new 'What we make' section covering video,
  BTS capture, social and on-ground work, which the page never mentioned
- About: engagement phases and a 'what we turn down' section now rendered
- ISR (revalidate=60) on the four Sanity-driven pages that lacked it — Sanity
  edits previously did nothing until a redeploy
- .fuse_hidden* gitignored (20 stale editor copies of real source files)"; then
  print -P "\n%F{red}✗ COMMIT FAILED.%f Nothing pushed. Send Claude the output.\n"
  print -P "Press Return to close."; read; exit 1
fi
print -P "%F{green}✓ Committed.%f\n"

# ── 4. Push, and verify the remote actually moved ────────────────────────────
print -P "%F{cyan}[4/4] Pushing%f"
BEFORE=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "none")

if ! git push origin "$BRANCH"; then
  print -P "\n%F{red}✗ PUSH FAILED.%f Send Claude the output.\n"
  print -P "Press Return to close."; read; exit 1
fi

git fetch origin "$BRANCH" --quiet 2>/dev/null
AFTER=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "none")

# `git push` exits 0 for "Everything up-to-date", so success is checked by
# whether the remote commit actually changed — not by the exit code.
if [[ "$BEFORE" == "$AFTER" ]]; then
  print -P "\n%F{red}✗ Push reported success but the remote did not move.%f"
  print -P "Send Claude this output.\n"
  print -P "Press Return to close."; read; exit 1
fi

print -P "\n%F{green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "%F{green}  Done. Remote is at ${AFTER:0:7}.%f"
print -P "%F{green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f\n"
print -P "Open the pull request:"
print -P "  %U https://github.com/UINITISH/zeppstr-web/compare/main...$BRANCH %u\n"
print -P "Then check these five pages on the Vercel preview:"
print -P "  /solutions      — should have four sections between the cards and the CTA"
print -P "  /industries     — same, and no '300+ businesses' line"
print -P "  /faq            — new page"
print -P "  /careers        — new page"
print -P "  /solutions/brand-engagement-lifecycle — 'What we make' section\n"
print -P "And on the homepage and /about: a testimonials block with four quotes.\n"
print -P "Press Return to close."
read
