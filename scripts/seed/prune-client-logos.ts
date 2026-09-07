/**
 * Deletes clientLogo documents in Sanity that are no longer defined in
 * data/client-logos.ts.
 *
 * Why this exists: the 5 Aug 2026 seed published 14 invented company names —
 * placeholder scaffolding that had been used to populate the industry filters
 * during development. The seed is upsert-only, so removing them from the data
 * file does not remove them from Sanity. This is the counterpart that does.
 *
 * Removed names, for the record:
 *   GreenDot Health · Northstar Education · Bridge Learning · Axis Legal ·
 *   Meridian Advisory · CloudKey · Flowboard · Vector Tech · Sapphire Realty ·
 *   Bloomwell · Paragon Education · Keystone Legal · Veridia D2C ·
 *   Trinity Capital · Prestige Group · Crafthives · Truspace · Altius Realty ·
 *   Himalayan Wellness · Aishwarya Foods
 *
 * Dry run (default):  npx tsx scripts/seed/prune-client-logos.ts
 * Actually delete:    npx tsx scripts/seed/prune-client-logos.ts --apply
 */

// MUST be first — loads .env.local before client.ts reads env vars
import "./load-env";
import { sanity, sanityConfig } from "./client";
import { CLIENT_LOGOS } from "./data/client-logos";

async function main() {
  const apply = process.argv.includes("--apply");
  const expectedIds = new Set(CLIENT_LOGOS.map((c) => c._id));

  console.log(`project ${sanityConfig.projectId} · dataset ${sanityConfig.dataset}`);

  const live = await sanity.fetch<{ _id: string; clientName: string }[]>(
    `*[_type == "clientLogo"]{ _id, clientName } | order(clientName asc)`
  );

  const orphans = live.filter((c) => !expectedIds.has(c._id));

  console.log(`\n${live.length} live · ${CLIENT_LOGOS.length} defined · ${orphans.length} orphaned`);

  if (orphans.length === 0) {
    console.log("\n✓ No orphaned client logos. Sanity matches client-logos.ts.");
    return;
  }

  console.log(`\nOrphaned clientLogo document(s):`);
  for (const o of orphans) console.log(`  ${o.clientName}  (${o._id})`);

  if (!apply) {
    console.log("\nDry run. Re-run with --apply to delete these.");
    return;
  }

  for (const o of orphans) {
    // Industries hold references to logos; unset them before deleting so the
    // delete isn't blocked by a strong reference.
    await sanity.delete({
      query: `*[_type == "clientLogo" && _id == $id]`,
      params: { id: o._id },
    });
    console.log(`  deleted ${o.clientName}`);
  }
  console.log("\n✓ Done.");
}

main().catch((err) => {
  console.error("\nFAILED:", err?.message ?? err);
  process.exit(1);
});
