/**
 * envOr — read an environment variable, falling back when it is missing OR blank.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * 8 Oct 2026, reported by the developer on a fresh clone:
 *
 *     Error: Configuration must contain `projectId`
 *       at sanity/lib/client.ts
 *
 * The code read `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "03uhyc94"`,
 * which looks safe and is not. `??` falls back only on null/undefined. An
 * environment variable that is PRESENT BUT EMPTY — a line like
 *
 *     NEXT_PUBLIC_SANITY_PROJECT_ID=
 *
 * in a .env.local — is the empty string, so `??` passes it straight through
 * and Sanity is handed "" instead of the fallback. The app dies on the first
 * render of every page, with an error that points at the Sanity client rather
 * than at the blank line that actually caused it.
 *
 * A half-filled .env.local is the NORMAL state of a fresh clone: you copy
 * .env.example, fill in the secrets you have, and leave the rest blank. The
 * defaults exist precisely so that the site still runs in that state, and `??`
 * defeated them.
 *
 * This also trims, so a trailing space (easy to paste in, invisible in an
 * editor) does not become part of a project ID or a URL.
 *
 * Use this for every env read that has a default. For env vars with NO sensible
 * default — tokens, API keys — do not use it: fail loudly instead, so a missing
 * secret is obvious rather than silently replaced.
 */
export function envOr(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}
