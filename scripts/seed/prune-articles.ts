/**
 * Deletes article documents in Sanity that are no longer defined in
 * data/articles.ts — e.g. after an article is renamed or retired.
 *
 * The seed is upsert-only, so a renamed slug leaves the old document behind and
 * it keeps rendering on /insights. This is the counterpart that removes it.
 *
 * Dry run (default):  npx tsx scripts/seed/prune-articles.ts
 * Actually delete:    npx tsx scripts/seed/prune-articles.ts --apply
 */

// MUST be first — loads .env.local before client.ts reads env vars
import "./load-env";
import { sanity, sanityConfig } from "./client";
import { loadArticles } from "./data/articles";

async function main() {
  const apply = process.argv.includes("--apply");
  const expected = loadArticles(process.cwd());
  const expectedSlugs = new Set(expected.map((e) => e.slug));

  console.log(`project ${sanityConfig.projectId} · dataset ${sanityConfig.dataset}`);

  const live = await sanity.fetch<{ _id: string; slug: string; title: string }[]>(
    `*[_type == "article"]{ _id, "slug": slug.current, title }`
  );

  const orphans = live.filter((a) => !expectedSlugs.has(a.slug));

  if (orphans.length === 0) {
    console.log("\n✓ No orphaned articles. Sanity matches articles.ts.");
    return;
  }

  console.log(`\n${orphans.length} orphaned article(s):`);
  for (const o of orphans) console.log(`  ${o.slug}  —  ${o.title}`);

  if (!apply) {
    console.log("\nDry run. Re-run with --apply to delete these.");
    return;
  }

  for (const o of orphans) {
    // Comments reference the article; drop them first so the delete isn't
    // blocked by a strong reference.
    await sanity.delete({ query: `*[_type == "comment" && article._ref == $id]`, params: { id: o._id } });
    await sanity.delete(o._id);
    console.log(`  deleted ${o.slug}`);
  }
  console.log("\n✓ Done.");
}

main().catch((err) => {
  console.error("\nFAILED:", err?.message ?? err);
  process.exit(1);
});
