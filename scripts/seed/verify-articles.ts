/**
 * Compares the 16 articles defined in data/articles.ts against what is
 * actually in Sanity. Answers "did the seed write them?" unambiguously.
 *
 * Run with: npx tsx scripts/seed/verify-articles.ts
 */

// MUST be first — loads .env.local before client.ts reads env vars
import "./load-env";
import { sanity, sanityConfig } from "./client";
import { loadArticles } from "./data/articles";

async function main() {
  const expected = loadArticles(process.cwd());
  console.log(`project ${sanityConfig.projectId} · dataset ${sanityConfig.dataset}`);
  console.log(`defined in articles.ts : ${expected.length}`);

  const live = await sanity.fetch<{ slug: string; publishedAt: string }[]>(
    `*[_type == "article"]{ "slug": slug.current, publishedAt } | order(publishedAt desc)`
  );
  console.log(`present in Sanity      : ${live.length}\n`);

  const liveSlugs = new Set(live.map((a) => a.slug));
  const missing = expected.filter((e) => !liveSlugs.has(e.slug));
  const extra = live.filter((a) => !expected.some((e) => e.slug === a.slug));

  for (const a of live) console.log(`  ok      ${a.publishedAt.slice(0, 10)}  ${a.slug}`);
  for (const e of missing) console.log(`  MISSING ${e.publishedAt.slice(0, 10)}  ${e.slug}`);
  for (const a of extra) console.log(`  ORPHAN  ${a.publishedAt.slice(0, 10)}  ${a.slug}`);

  console.log(
    missing.length === 0
      ? "\n✓ All defined articles are in Sanity. If the page still shows 4, the problem is the front end, not the data."
      : `\n✗ ${missing.length} article(s) defined but not in Sanity — run: npm run seed`
  );
}

main().catch((err) => {
  console.error("\nFAILED:", err?.message ?? err);
  process.exit(1);
});
