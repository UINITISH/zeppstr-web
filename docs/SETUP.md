# Setup — Day 1 for the Zeppstr Web Team

Follow this once, end to end. By the time you finish, you'll have:
- The repo cloned and the dev server running on your machine
- Access to Sanity Studio (CMS) and Vercel (hosting)
- A test branch pushed to GitHub
- Your first PR open

Time required: 30–45 minutes.

If you get stuck at any step, ping **#zeppstr-web-dev** in Slack with the step number.

---

## Prerequisites — install once

You need these on your machine. Do them in order.

### 1. Node.js 20 LTS

Check what you have:
```bash
node --version
```

If you don't have it, or you have something older than 20, install via `nvm`:

```bash
# Install nvm (macOS / Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal, then:
nvm install 20
nvm use 20
nvm alias default 20
```

Verify:
```bash
node --version   # → v20.x.x
npm --version    # → 10.x.x
```

### 2. Git

```bash
git --version
```

If missing: `xcode-select --install` (macOS) or `apt install git` (Linux).

Configure your identity (use the email tied to your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
git config --global init.defaultBranch main
git config --global pull.rebase true
```

### 3. GitHub SSH key

Skip if you've already done this on this machine. Check with:
```bash
ls ~/.ssh/id_ed25519.pub
```

If that file doesn't exist:

```bash
ssh-keygen -t ed25519 -C "you@your-domain.com"
# Press enter for default location. Set a passphrase if you want.

# Start the agent and add the key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy your public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub
```

Add the key to GitHub:
1. Go to https://github.com/settings/keys
2. Click **New SSH key**
3. Title: your-machine-name (e.g. "Aman's MacBook")
4. Paste, save

Verify:
```bash
ssh -T git@github.com
# Expected: "Hi <your-username>! You've successfully authenticated..."
```

### 4. A code editor

Recommended: **VS Code** with these extensions:
- ESLint
- Prettier — Code formatter
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features (built in)

Open the project later via `code .` from inside the project folder.

### 5. Vercel CLI (optional, but recommended)

```bash
npm install -g vercel
```

You'll use this to pull production environment variables in a few minutes.

---

## Step 1 — Clone the repo

```bash
# Pick a sensible parent folder
mkdir -p ~/code
cd ~/code

# Clone (lead dev will share the exact URL — usually github.com/<org>/zeppstr-web)
git clone git@github.com:<org>/zeppstr-web.git
cd zeppstr-web
```

Verify you're on `main`:
```bash
git branch --show-current   # → main
```

---

## Step 2 — Install dependencies

```bash
npm install
```

This takes 1–3 minutes. You'll see `added <number> packages`.

If it fails on a native module (rare on M-series Macs), retry with:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Step 3 — Set environment variables

The project needs secrets to talk to Sanity, HubSpot, and Sentry. **Do not commit them.**

### Option A — pull from Vercel (easiest)

```bash
# Link to the Vercel project (you'll be asked to log in)
vercel link

# Pull the env vars from Vercel's preview environment
vercel env pull .env.local --environment=preview
```

This writes `.env.local` with the right values. Done.

### Option B — copy manually

If you don't have Vercel access yet, ask the lead dev to send the values, then:

```bash
cp .env.example .env.local
# Edit .env.local with the real values
```

Variables you need:

| Variable | What for | Get from |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity CMS connection | Lead dev |
| `NEXT_PUBLIC_SANITY_DATASET` | Always `production` | Hardcoded |
| `SANITY_API_READ_TOKEN` | Server-side reads | Lead dev / 1Password |
| `HUBSPOT_TOKEN` | Diagnostic form CRM sync | Lead dev / 1Password |
| `SENTRY_DSN` | Error tracking (optional in dev) | Lead dev |

**Never share `.env.local` over chat or email.** Use a password manager.

---

## Step 4 — Run the dev server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Environments: .env.local
✓ Ready in 2.4s
```

Open http://localhost:3000 in your browser. You should see the Zeppstr home page.

**Sanity check** — click through these pages to confirm everything works:

- http://localhost:3000 — home (hero loads, all sections render)
- http://localhost:3000/work — case study grid
- http://localhost:3000/solutions/brand-engagement-lifecycle — parent solution
- http://localhost:3000/solutions/brand-engagement-lifecycle/brand-identity — sub-service page
- http://localhost:3000/book-consultation — diagnostic form

If anything shows an error, check the terminal output and the troubleshooting section at the bottom.

**Keep that terminal tab open.** If you Ctrl+C or run another command in it, the server stops. Open a new tab (Cmd+T on macOS) for git, edits, anything else.

---

## Step 5 — Open Sanity Studio

The CMS runs in the same project on a different route.

```bash
# In a new terminal tab, from the project root
npm run sanity
```

Studio opens at http://localhost:3333. Log in with your Google account — your email needs to be added to the Sanity project first; ask the lead.

Inside Studio you'll see document types: **Case Study · Solution · Sub-service · Industry · Insight · Author**. This is where content lives. Editing a document and pressing Publish updates the live site within 60 seconds in production (ISR), and immediately in local dev.

---

## Step 6 — Make your first edit + open a PR

Don't ship a real change — this is just to verify the workflow.

### 6a. Branch off main

```bash
# In a new terminal tab (not the dev-server tab)
git checkout main
git pull origin main
git checkout -b chore/<your-name>-onboarding
```

### 6b. Make a tiny edit

Open `docs/SETUP.md` (this file) in VS Code and add your name + the date to the bottom of the file (after the last line). Save.

### 6c. Verify

```bash
# Lint should be clean
npm run lint

# TypeScript should be clean
npx tsc --noEmit
```

If either fails, fix before continuing.

### 6d. Commit + push

```bash
git add docs/SETUP.md
git commit -m "chore(docs): <your-name> onboarded"
git push -u origin chore/<your-name>-onboarding
```

### 6e. Open the PR

GitHub will print a URL in the push output — click it. Fill the PR template:
- **What's changing:** "Onboarding check — added my name to SETUP.md"
- **Why:** "First-PR test as part of onboarding"
- **Preview URL:** Vercel will post it as a comment within 60 seconds — paste it
- Skip Lighthouse for this one (no real change)
- Tag the lead dev for review

When the lead approves and squash-merges, you're set up.

---

## Day-2 onwards

You're now on the normal workflow. The full guide is in **`docs/TEAM-GUIDE.md`** — read sections 1–4 carefully:

- Daily workflow (branch → commit → push → PR)
- Branch strategy
- Commit conventions (Conventional Commits)
- PR process + reviewer checklists

For specific recurring tasks (add a new sub-service page, update copy, fix a Lighthouse regression), see section 6 of the TEAM-GUIDE.

---

## Troubleshooting

### `npm run dev` fails with a module not found error
```bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### Port 3000 is already in use
```bash
# Kill whatever's on it (macOS / Linux)
lsof -ti:3000 | xargs kill -9
npm run dev
```

Or just let Next.js auto-shift to 3001 — it'll print the new URL.

### Sanity Studio shows "Configuration error: project ID missing"
Your `.env.local` didn't load. Restart the dev server (Ctrl+C in the terminal where it's running, then `npm run sanity` again).

### `git push` says "Permission denied (publickey)"
Your SSH key isn't on GitHub. Re-do prerequisite 3.

### The site loads but images are broken
Likely a Sanity asset / CDN issue. Check the Network tab — if the image URLs go to `cdn.sanity.io/...`, your read token might be wrong. Re-pull env vars.

### Lighthouse score is below 95 on a page you didn't touch
That's a pre-existing regression — flag it in #zeppstr-web-dev, don't try to fix it in your PR.

### Hot reload isn't working
Restart the dev server. If that doesn't help, `rm -rf .next` then restart.

### Tailwind classes aren't applying
Make sure the file is included in `tailwind.config.ts` content paths. New routes under `app/` should be picked up automatically; new files outside `app/` and `components/` need to be added.

### TypeScript errors after `git pull`
```bash
npm install        # in case dependencies changed
npx tsc --noEmit   # see what's broken
```

If types changed in `sanity/lib/types.ts`, that's intentional — fix the call sites.

---

## Who to ask

| Question | Person | Where |
|---|---|---|
| Setup not working | Lead dev | #zeppstr-web-dev Slack |
| Need Sanity Studio access | Lead dev | DM |
| Need Vercel access | Lead dev | DM |
| Need GitHub repo access | Lead dev | DM |
| Need 1Password vault access | Nitish | DM |
| Design / content / voice question | Nitish | #zeppstr-design Slack |
| "What does this code do?" | Read first, then ask in the team channel | #zeppstr-web-dev |

---

## You're set up. Now read `TEAM-GUIDE.md`.

That doc covers daily workflow, branch strategy, commit conventions, PR process, common tasks, code style, and the pre-launch checklist.

Welcome to the team.

---

### Onboarded developers

<!-- Add your name + date here as part of step 6b -->
- Nitish — May 2026 (initial commit)
