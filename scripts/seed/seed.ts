/**
 * Sanity content seed.
 *
 * Run from the project root:
 *   npm run seed
 *
 * Idempotent: each document uses a deterministic _id, so re-running this
 * UPSERTS rather than duplicates. Safe to run repeatedly while iterating.
 *
 * Dependency order:
 *   1. solutions
 *   2. industries
 *   3. client logos          (reference industries)
 *   4. sub-services          (reference solutions)
 *   5. case studies          (reference industries + solutions)
 *   6. quotes                (reference case studies)
 *   7. cross-links           (back-fill: industries.featuredCaseStudy, etc.)
 */

// MUST be the first import — loads .env.local before client.ts reads env vars
import "./load-env";
import { resolve } from "node:path";
import { sanity } from "./client";
import { reportFailure } from "./report-failure";
import { SOLUTIONS } from "./data/solutions";
import { SUB_SERVICES } from "./data/sub-services";
import { INDUSTRIES } from "./data/industries";
import { CLIENT_LOGOS } from "./data/client-logos";
import { QUOTES } from "./data/quotes";
import { loadCaseStudies } from "./data/case-studies";
import { loadArticles } from "./data/articles";

// scripts/seed/seed.ts → up 5 levels lands at zeppstr-new-web/ (the repo root that contains deliverables/)
// Was: resolve(__dirname, "..", "..", "..", "..", "..") — five levels up, which
// landed on ~/Documents and pointed loadCaseStudies() at a non-existent
// deliverables/ directory, so seeding threw before writing anything.
// Canonical case-study markdown now lives inside the repo.
const REPO_ROOT = resolve(__dirname, "..", "..");

// ─────────────────────────────────────────────
// Tiny logging helpers
// ─────────────────────────────────────────────

const log = {
  step: (msg: string) => console.log(`\n→ ${msg}`),
  ok: (msg: string) => console.log(`  ✓ ${msg}`),
  warn: (msg: string) => console.warn(`  ! ${msg}`),
  err: (msg: string) => console.error(`  ✗ ${msg}`),
};

const ref = (id: string) => ({ _type: "reference", _ref: id });

// ─────────────────────────────────────────────
// Per-type seeders
// ─────────────────────────────────────────────

async function seedSolutions() {
  log.step(`Solutions (${SOLUTIONS.length})`);
  for (const s of SOLUTIONS) {
    await sanity.createOrReplace({
      _id: s._id,
      _type: "solution",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      tagline: s.tagline,
      longDescription: s.longDescription,
      seoTitle: s.seoTitle,
      seoDescription: s.seoDescription,
    });
    log.ok(s.name);
  }
}

async function seedIndustries() {
  log.step(`Industries (${INDUSTRIES.length})`);
  for (const i of INDUSTRIES) {
    await sanity.createOrReplace({
      _id: i._id,
      _type: "industry",
      name: i.name,
      slug: { _type: "slug", current: i.slug },
      heroClaim: i.heroClaim,
      whatsBroken: i.whatsBroken,
      ourApproach: i.ourApproach,
      solutionsMostUsed: i.solutionsMostUsedIds.map(ref),
      industryFaqs: i.industryFaqs,
      seoTitle: i.seoTitle,
      seoDescription: i.seoDescription,
    });
    log.ok(i.name);
  }
}

async function seedClientLogos() {
  log.step(`Client logos (${CLIENT_LOGOS.length}) — without image assets`);
  log.warn(
    "Logos seeded as records only. Upload actual logo PNGs in Sanity Studio after seeding."
  );
  for (const c of CLIENT_LOGOS) {
    await sanity.createOrReplace({
      _id: c._id,
      _type: "clientLogo",
      clientName: c.clientName,
      industry: ref(c.industryId),
      status: c.status,
      website: c.website,
      // logo intentionally omitted — schema's required validation will warn in Studio
      // until images are uploaded. Pages render with text fallback in the meantime.
    });
    log.ok(c.clientName);
  }
}

async function seedSubServices() {
  log.step(`Sub-services (${SUB_SERVICES.length})`);
  for (const s of SUB_SERVICES) {
    await sanity.createOrReplace({
      _id: s._id,
      _type: "subService",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      parentSolution: ref(s.parentSolutionId),
      legacyName: s.legacyName,
      tagline: s.tagline,
      whatsIncluded: s.whatsIncluded,
      methodology: s.methodology,
      seoTitle: s.seoTitle,
      seoDescription: s.seoDescription,
    });
    log.ok(s.name);
  }
}

async function seedCaseStudies() {
  const studies = loadCaseStudies(REPO_ROOT);
  log.step(`Case studies (${studies.length})`);
  for (const cs of studies) {
    await sanity.createOrReplace({
      _id: cs._id,
      _type: "caseStudy",
      clientName: cs.clientName,
      slug: { _type: "slug", current: cs.slug },
      industry: ref(cs.industryId),
      solutionsUsed: cs.solutionsUsedIds.map(ref),
      headlineMetric: cs.headlineMetric,
      headlineTimeframe: cs.headlineTimeframe,
      situation: cs.situation,
      diagnosis: cs.diagnosis,
      whatWeDid: cs.whatWeDid,
      results: cs.results,
      whatThisProves: cs.whatThisProves,
      publishedAt: cs.publishedAt,
      seoTitle: cs.seoTitle,
      seoDescription: cs.seoDescription,
    });
    log.ok(cs.clientName);
  }
}

async function seedArticles() {
  const articles = loadArticles(REPO_ROOT);
  log.step(`Articles / Insights (${articles.length})`);
  for (const a of articles) {
    await sanity.createOrReplace({
      _id: a._id,
      _type: "article",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      excerpt: a.excerpt,
      author: a.author,
      category: a.category,
      body: a.body,
      publishedAt: a.publishedAt,
      relatedSolution: a.relatedSolutionId ? ref(a.relatedSolutionId) : undefined,
      seoTitle: a.seoTitle,
      seoDescription: a.seoDescription,
    });
    log.ok(`${a.category} · ${a.title.slice(0, 52)}…`);
  }
}

async function seedQuotes() {
  log.step(`Quotes (${QUOTES.length})`);
  for (const q of QUOTES) {
    await sanity.createOrReplace({
      _id: q._id,
      _type: "quote",
      quoteText: q.quoteText,
      attributionName: q.attributionName,
      attributionTitle: q.attributionTitle,
      attributionCompany: q.attributionCompany,
      relatedCaseStudy: q.relatedCaseStudyId ? ref(q.relatedCaseStudyId) : undefined,
    });
    log.ok(`${q.attributionName} — ${q.attributionCompany ?? ""}`);
  }
}

async function backfillCrossLinks() {
  log.step("Cross-links (case study → quote, industry → featured case study)");

  // Case study → founder quote (case studies were created without a quote ref;
  // patch them now that quotes exist)
  for (const q of QUOTES) {
    if (q.relatedCaseStudyId) {
      await sanity
        .patch(q.relatedCaseStudyId)
        .set({ founderQuote: ref(q._id) })
        .commit();
      log.ok(`${q.relatedCaseStudyId} ← ${q._id}`);
    }
  }

  // Industry → featuredCaseStudy (Wise Market → ecommerce, Tru Aquapolis → real-estate, Mini Leaves → ecommerce flagship pick)
  const featuredMap: Record<string, string> = {
    "industry-real-estate": "case-study-tru-aquapolis",
    "industry-ecommerce-dtc": "case-study-wise-market",
  };
  for (const [industryId, caseStudyId] of Object.entries(featuredMap)) {
    await sanity.patch(industryId).set({ featuredCaseStudy: ref(caseStudyId) }).commit();
    log.ok(`${industryId} featuredCaseStudy → ${caseStudyId}`);
  }

  // Industry → allClientLogos (group logos by industry)
  const logosByIndustry = CLIENT_LOGOS.reduce<Record<string, string[]>>((acc, l) => {
    (acc[l.industryId] ??= []).push(l._id);
    return acc;
  }, {});
  for (const [industryId, logoIds] of Object.entries(logosByIndustry)) {
    await sanity
      .patch(industryId)
      .set({ allClientLogos: logoIds.map(ref) })
      .commit();
    log.ok(`${industryId} ← ${logoIds.length} logos`);
  }

  // Solution → services (sub-services list per solution)
  const subsBySolution = SUB_SERVICES.reduce<Record<string, string[]>>((acc, s) => {
    (acc[s.parentSolutionId] ??= []).push(s._id);
    return acc;
  }, {});
  for (const [solutionId, subIds] of Object.entries(subsBySolution)) {
    await sanity.patch(solutionId).set({ services: subIds.map(ref) }).commit();
    log.ok(`${solutionId} ← ${subIds.length} sub-services`);
  }
}

// ─────────────────────────────────────────────
// Entry point
// ─────────────────────────────────────────────

async function main() {
  console.log("Zeppstr · Sanity content seed");
  console.log(`  project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`  dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);

  await seedSolutions();
  await seedIndustries();
  await seedClientLogos();
  await seedSubServices();
  await seedCaseStudies();
  await seedArticles();
  await seedQuotes();
  await backfillCrossLinks();

  console.log("\n✓ Seed complete.");
  console.log("  Next: open Sanity Studio → upload logo PNGs + hero images per record.");
}

main().catch((err) => reportFailure(err, "Seed failed"));
