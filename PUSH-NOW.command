#!/bin/zsh
#
# Zeppstr — push what Claude already committed
#
# WHY THIS EXISTS, SEPARATELY FROM UPDATE-SITE.command
#
#   UPDATE-SITE.command does three things: publish text to Sanity, build the
#   site, then commit and push. That is the right tool when there are uncommitted
#   changes and new content to publish. It takes several minutes and it asks you
#   questions.
#
#   This file does ONE thing: push commits that already exist. No seed, no
#   build, no questions. It exists because Claude can write files into this
#   folder and make commits, but cannot push — see the note at the bottom.
#
# WHAT IT WILL DO
#   1. Check there is nothing uncommitted (if there is, it stops and tells you).
#   2. Show you exactly which commits are about to go to GitHub.
#   3. Push them.
#   4. Verify the remote actually moved, and print the Vercel preview URL.
#
# IT DOES NOT BUILD FIRST. Vercel runs its own build on every push and will
# email you if it fails; a failed PREVIEW build breaks nothing live. If you want
# the build checked locally before pushing, use UPDATE-SITE.command instead.
#
# Double-click this in Finder.

cd "$(dirname "$0")" || exit 1

BRANCH="add-brand-guidelines"
PREVIEW="https://zeppstr-web-git-add-brand-guidelines-uinitishs-projects.vercel.app/"

print -P "\n%F{yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "%F{yellow}  Zeppstr — push committed work%f"
print -P "%F{yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "Working in: $(pwd)\n"

# ── Stale lock ───────────────────────────────────────────────────────────────
if [[ -f .git/index.lock ]] && ! pgrep -x git > /dev/null; then
  print -P "%F{yellow}Clearing a stale git lock.%f"
  rm -f .git/index.lock
fi

# ── Must be on the right branch ──────────────────────────────────────────────
CURRENT=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT" != "$BRANCH" ]]; then
  print -P "%F{red}✗ You are on '$CURRENT', not '$BRANCH'.%f"
  print -P "Nothing pushed. Send this to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi

# ── Nothing uncommitted ──────────────────────────────────────────────────────
DIRTY=$(git status --porcelain | wc -l | tr -d ' ')
if [[ "$DIRTY" != "0" ]]; then
  print -P "%F{red}✗ There are $DIRTY uncommitted change(s).%f"
  print -P "This tool only pushes commits that already exist, so it will not"
  print -P "silently include them. Use UPDATE-SITE.command instead.\n"
  git status --short | head -20
  print -P "\nPress Return to close."; read; exit 1
fi

# ── What is about to go ──────────────────────────────────────────────────────
git fetch --quiet origin "$BRANCH" 2>/dev/null || true
COUNT=$(git rev-list --count "origin/$BRANCH..HEAD" 2>/dev/null || echo 0)

if [[ "$COUNT" == "0" ]]; then
  print -P "%F{green}✓ Already up to date — GitHub has everything.%f\n"
  git log --oneline -3
  print -P "\n$PREVIEW\n"
  print -P "Press Return to close."; read; exit 0
fi

print -P "%F{cyan}$COUNT commit(s) will be pushed to origin/$BRANCH:%f\n"
git log --oneline "origin/$BRANCH..HEAD"
print ""

BEFORE=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "none")

# ── Push ─────────────────────────────────────────────────────────────────────
print -P "%F{cyan}Pushing…%f\n"
if ! git push origin "$BRANCH"; then
  print -P "\n%F{red}✗ PUSH FAILED.%f"
  print -P "If it asked for a username or password, your Mac has no GitHub"
  print -P "credential saved for this repo. Fix it once with either:"
  print -P "  • GitHub Desktop — sign in, then push from there, or"
  print -P "  • gh auth login   (if you have the GitHub CLI)"
  print -P "After that this file will work every time.\n"
  print -P "Press Return to close."; read; exit 1
fi

# `git push` exits 0 for "Everything up-to-date", so confirm the remote moved
# rather than trusting the exit code.
git fetch --quiet origin "$BRANCH" 2>/dev/null || true
AFTER=$(git rev-parse "origin/$BRANCH" 2>/dev/null || echo "none")

if [[ "$BEFORE" == "$AFTER" ]]; then
  print -P "\n%F{red}✗ The remote did not move.%f Send this to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi

print -P "\n%F{green}✓ Pushed. GitHub is now at ${AFTER:0:7}.%f\n"
print -P "Vercel rebuilds this branch automatically. Give it 1–3 minutes, then:"
print -P "%F{cyan}$PREVIEW%f\n"
print -P "%F{yellow}Note:%f that is the PREVIEW for this branch, not your live site."
print -P "Production is the 'main' branch — merge pull request #1 to go live:"
print -P "https://github.com/UINITISH/zeppstr-web/pull/1\n"
print -P "Press Return to close."; read; exit 0

# ─────────────────────────────────────────────────────────────────────────────
# WHY CLAUDE CANNOT RUN THIS STEP ITSELF
#
# Claude's shell runs in a Linux sandbox, not on this Mac. The sandbox has the
# project folder mounted, which is why Claude can read, write and commit — but
# it has no git config, no credential helper, no GitHub CLI and no token. Your
# GitHub login lives in the macOS Keychain, which the sandbox cannot reach.
#
# So `git push` from Claude's side fails with:
#   fatal: could not read Username for 'https://github.com'
#
# Separately, Claude is not permitted to type credentials into any prompt under
# any circumstances, so supplying them is not an option either. Every previous
# push happened the same way this one will: Claude committed, you ran the push
# from your own machine.
# ─────────────────────────────────────────────────────────────────────────────
