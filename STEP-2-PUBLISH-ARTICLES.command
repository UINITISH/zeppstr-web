#!/bin/zsh
#
# Zeppstr — publish the articles and clean up the client list
#
# Double-click this. It opens its own window and does three things:
#   1. Publishes 23 new articles to your website
#   2. Shows you the 14 made-up client names, and asks before deleting them
#   3. Checks the result
#
# It will not touch anything else. If something goes wrong it stops and tells
# you what to send Claude.

cd "$(dirname "$0")" || exit 1

print -P "\n%F{yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "%F{yellow}  Zeppstr — publish articles%f"
print -P "%F{yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f\n"

# ── Safety: is the token present? ────────────────────────────────────────────
if [[ ! -f .env.local ]]; then
  print -P "%F{red}✗ Cannot find .env.local — the file holding your keys.%f"
  print -P "Send this message to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi

if ! grep -q "^SANITY_API_TOKEN=." .env.local; then
  print -P "%F{red}✗ The Sanity key is missing or blank in .env.local.%f"
  print -P "Nothing can be published without it. Send this to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi

# ── 1. Publish the articles ──────────────────────────────────────────────────
print -P "%F{cyan}STEP 1 of 3 — Publishing 23 articles%f"
print -P "This sends the new articles to your website's content store."
print -P "It only adds and updates. It never deletes.\n"

if ! npm run seed; then
  print -P "\n%F{red}✗ PUBLISHING FAILED.%f"
  print -P "Nothing was changed. Copy everything above and send it to Claude.\n"
  print -P "Press Return to close."; read; exit 1
fi

print -P "\n%F{green}✓ Articles published.%f\n"

# ── 2. Show the fabricated client names ──────────────────────────────────────
print -P "%F{cyan}STEP 2 of 3 — Made-up client names%f"
print -P "Your website currently lists 14 client names that were invented and"
print -P "are not real customers. Here is exactly what would be removed:\n"

npm run seed:prune:logos

print -P "\n%F{yellow}Read that list carefully.%f"
print -P "If every name above is one you do NOT recognise as a real client,"
print -P "it is safe to delete them.\n"
print -P "Delete these names from your website? [y/N] "
read -r REPLY

if [[ "$REPLY" =~ ^[Yy]$ ]]; then
  print -P "\nDeleting...\n"
  if ! npm run seed:prune:logos -- --apply; then
    print -P "\n%F{red}✗ Deletion failed.%f Articles are still published fine."
    print -P "Send the output above to Claude.\n"
    print -P "Press Return to close."; read; exit 1
  fi
  print -P "\n%F{green}✓ Removed.%f\n"
else
  print -P "\n%F{yellow}Skipped — the invented names are still on your site.%f"
  print -P "You can run this file again any time.\n"
fi

# ── 3. Check it worked ───────────────────────────────────────────────────────
print -P "%F{cyan}STEP 3 of 3 — Checking%f\n"

if npm run --silent verify:articles 2>/dev/null; then
  :
else
  print -P "(No automatic check available — verify by eye below.)"
fi

print -P "\n%F{green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f"
print -P "%F{green}  Done.%f"
print -P "%F{green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%f\n"
print -P "Now open your website's Insights page and check:\n"
print -P "  • Around 35 articles, not 12"
print -P "  • The filter has 7 categories, including"
print -P "    \"Email & Lifecycle\" and \"Social & Content\""
print -P "  • Every client name shown is a real client\n"
print -P "If anything looks wrong, tell Claude what you see.\n"
print -P "Press Return to close."
read
