/**
 * Seeds the 5 ongoing client projects as placeholder documents.
 *
 * Run from the project root:
 *   npm run seed:projects
 *
 * Idempotent (deterministic _id) — safe to re-run. Fields are neutral
 * defaults; fill in real phase/health/KPIs/dates in Sanity Studio after.
 */

// MUST be the first import — loads .env.local before client.ts reads env vars
import "./load-env";
import { sanity } from "./client";
import { CLIENT_PROJECTS } from "./data/client-projects";
import { reportFailure } from "./report-failure";

const log = {
  step: (msg: string) => console.log(`\n→ ${msg}`),
  ok: (msg: string) => console.log(`  ✓ ${msg}`),
};

async function seedClientProjects() {
  log.step(`Client Projects (${CLIENT_PROJECTS.length})`);
  for (const p of CLIENT_PROJECTS) {
    await sanity.createOrReplace({
      _id: p._id,
      _type: "clientProject",
      name: p.name,
      phase: "Diagnose",
      health: "On Track",
      percentComplete: 10,
      owner: "TBD",
      notes: "Seeded placeholder — update phase, health, KPIs, and notes in Sanity Studio.",
    });
    log.ok(p.name);
  }
}

seedClientProjects()
  .then(() => console.log("\nDone.\n"))
  .catch((err) => {
    reportFailure(err, "Client project seed failed");
    process.exit(1);
  });
