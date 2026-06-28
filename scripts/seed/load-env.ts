/**
 * Loads .env.local before any other module imports run.
 * MUST be imported FIRST in seed.ts and check.ts — before ./client (which reads env vars).
 *
 * This file exists because ES-module imports execute in source order: if dotenv
 * config is called inline in seed.ts AFTER `import { sanity } from "./client"`,
 * client.ts evaluates before env vars are loaded and throws.
 */

import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
