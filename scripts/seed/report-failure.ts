/**
 * Credential-safe error reporting for the seed scripts.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * 23 Sep: a seed run died on ECONNRESET and `console.error(err)` dumped the
 * whole Sanity ClientRequest object — including the raw `authorization: Bearer
 * sk...` header — into the terminal. That output was then pasted into chat to
 * get it debugged, which is the entirely reasonable thing to do with an error
 * message, and the production write token went with it. Token rotated.
 *
 * The lesson is not "be careful what you paste". Error output is MEANT to be
 * pasted — that is its whole job. The script must never put a secret in it.
 * Sanity's error objects carry the full request by design, so anything that
 * prints one has to strip it first.
 *
 * Every script in this directory that can throw a Sanity error must report
 * through here rather than through console.error(err).
 */

type SanityishError = {
  message?: string;
  code?: string;
  statusCode?: number;
  responseBody?: unknown;
};

const TRANSIENT = new Set(["ECONNRESET", "ETIMEDOUT", "ENOTFOUND", "EAI_AGAIN", "ECONNREFUSED"]);

export function reportFailure(err: unknown, label = "Seed failed"): never {
  const e = (err ?? {}) as SanityishError;

  console.error(`\n✗ ${label}.`);
  if (e.code) console.error(`  code:    ${e.code}`);
  if (e.statusCode) console.error(`  status:  ${e.statusCode}`);
  console.error(`  message: ${e.message ?? String(err)}`);

  if (e.responseBody) {
    // Sanity's validation messages live here and are safe to show — they
    // describe the document, not the credentials.
    const body =
      typeof e.responseBody === "string" ? e.responseBody : JSON.stringify(e.responseBody, null, 2);
    console.error(`  detail:  ${body.slice(0, 1200)}`);
  }

  if (e.code && TRANSIENT.has(e.code)) {
    console.error(
      "\n  This is a network drop between you and sanity.io, not a content error.\n" +
        "  These scripts are idempotent — every document uses a deterministic _id,\n" +
        "  so re-running upserts rather than duplicates. Run it again.",
    );
  }

  console.error(
    "\n  The output above is redacted and safe to share. Never paste a raw\n" +
      "  Sanity stack dump — it embeds the write token in the request headers.\n",
  );
  process.exit(1);
}
