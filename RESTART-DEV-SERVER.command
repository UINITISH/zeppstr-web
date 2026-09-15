#!/bin/zsh
#
# Zeppstr — clean restart of the local dev server
#
# WHY THIS EXISTS
# `next build` and `next dev` both write to the same .next directory. Running a
# production build while the dev server was live left mixed build artifacts
# behind, and the dev server has been serving a client bundle that never
# hydrates. Symptoms: dropdown menus do not open, the sticky nav never turns
# opaque on scroll, anything interactive is dead — with no console errors,
# because the JavaScript simply never runs.
#
# This stops the dev server, deletes the stale build cache, and starts it fresh.
#
# Double-click in Finder. Leave the window open — the dev server runs in it.

cd "$(dirname "$0")" || exit 1

print -P "\n%F{yellow}━━━ Zeppstr — clean dev restart ━━━%f\n"

# ── 1. Stop anything already serving this project ────────────────────────────
print -P "%F{cyan}[1/3] Stopping any running dev server%f"

PIDS=$(lsof -ti tcp:3100 2>/dev/null)
if [[ -n "$PIDS" ]]; then
  print "Found process(es) on port 3100: $PIDS"
  echo "$PIDS" | xargs kill -9 2>/dev/null
  sleep 1
  print -P "%F{green}✓ Stopped.%f"
else
  print "Nothing running on port 3100."
fi

# Catch a dev server started on another port from this directory.
pkill -f "next dev" 2>/dev/null && print -P "%F{green}✓ Stopped a stray 'next dev'.%f"
sleep 1

# ── 2. Delete the corrupted build cache ──────────────────────────────────────
print -P "\n%F{cyan}[2/3] Clearing the stale build cache%f"
print "Removing .next/ — this is generated, nothing of yours is in it."

rm -rf .next
rm -rf node_modules/.cache 2>/dev/null

print -P "%F{green}✓ Cleared.%f"

# ── 3. Start fresh ───────────────────────────────────────────────────────────
print -P "\n%F{cyan}[3/3] Starting the dev server%f"
print -P "First compile takes longer than usual — the cache is empty.\n"
print -P "When you see %F{green}'Ready'%f, open %U http://localhost:3100 %u"
print -P "and hard-refresh with Cmd+Shift+R.\n"
print -P "%F{yellow}Leave this window open.%f Closing it stops the server."
print -P "Press Ctrl+C in here when you want to stop it.\n"
print -P "── server output ──────────────────────────────────────\n"

npm run dev
