import { sanity } from "./client";

/**
 * Batched, retrying writes for the seed scripts.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The seed used to issue one HTTP POST per document — roughly 350 sequential
 * requests on a single keep-alive connection. On 23 Sep it died with
 * ECONNRESET twice: once at request 4, once at request 23. Nothing was wrong
 * with the content. The connection was being torn down mid-run, and with 350
 * chances to hit that, hitting it was close to inevitable.
 *
 * Setting `maxRetries` on the Sanity client did NOT fix it, which is worth
 * recording because it looks like it should. get-it's retry middleware only
 * replays idempotent HTTP methods — GET and HEAD. Every write here is a POST,
 * so the client declines to retry exactly the calls that keep failing. The
 * default is right in general (replaying an arbitrary POST can double-charge a
 * customer); it is just inapplicable to us.
 *
 * Two changes, and the second depends on the first being safe:
 *
 *   1. BATCH. A Sanity transaction commits many documents in one request, so
 *      ~350 requests become ~20. Fewer round trips is fewer opportunities for
 *      the connection to drop, and it is also far faster.
 *
 *   2. RETRY EXPLICITLY. We replay a failed transaction ourselves rather than
 *      relying on the client. This is only sound because every document in
 *      this seed carries a deterministic _id and we use createOrReplace, so a
 *      transaction applied twice produces exactly the same dataset as applying
 *      it once. That property is what makes replay safe — it is not a general
 *      licence to retry POSTs.
 *
 * If you ever add a seeder that creates documents WITHOUT a fixed _id, do not
 * route it through here.
 */

const TRANSIENT = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ECONNREFUSED",
  "EPIPE",
  "ERR_STREAM_PREMATURE_CLOSE",
]);

function isTransient(err: unknown): boolean {
  const e = err as { code?: string; statusCode?: number; message?: string };
  if (e?.code && TRANSIENT.has(e.code)) return true;
  // 429 and 5xx are worth another go; 4xx (bad document, bad token) are not.
  if (e?.statusCode === 429) return true;
  if (typeof e?.statusCode === "number" && e.statusCode >= 500) return true;
  return false;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Run `fn`, replaying it on transient network/server failures.
 * Only use for operations that are safe to apply more than once.
 */
export async function withRetry<T>(fn: () => Promise<T>, what: string, attempts = 5): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isTransient(err)) throw err;
      if (i === attempts - 1) break;
      const wait = Math.min(1000 * 2 ** i, 15000);
      const code = (err as { code?: string }).code ?? (err as { statusCode?: number }).statusCode;
      console.warn(`  … ${what}: ${code}, retrying in ${Math.round(wait / 1000)}s (${i + 1}/${attempts - 1})`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

export type SeedDoc = { _id: string; _type: string; [k: string]: unknown };

/**
 * createOrReplace every doc, in chunks, one transaction per chunk.
 * `label` is used only for the per-document tick in the console.
 */
export async function commitDocs(
  docs: SeedDoc[],
  label: (d: SeedDoc) => string,
  chunkSize = 25,
): Promise<void> {
  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
    await withRetry(() => {
      const tx = sanity.transaction();
      for (const d of chunk) tx.createOrReplace(d);
      return tx.commit({ visibility: "async" });
    }, `batch ${i / chunkSize + 1}`);

    for (const d of chunk) console.log(`  ✓ ${label(d)}`);
  }
}

/** Apply a set of patches in one transaction per chunk, with the same retry. */
export async function commitPatches(
  patches: Array<{ id: string; set: Record<string, unknown>; label: string }>,
  chunkSize = 25,
): Promise<void> {
  for (let i = 0; i < patches.length; i += chunkSize) {
    const chunk = patches.slice(i, i + chunkSize);
    await withRetry(() => {
      const tx = sanity.transaction();
      for (const p of chunk) tx.patch(p.id, (patch) => patch.set(p.set));
      return tx.commit({ visibility: "async" });
    }, `patch batch ${i / chunkSize + 1}`);

    for (const p of chunk) console.log(`  ✓ ${p.label}`);
  }
}
