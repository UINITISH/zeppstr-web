/**
 * Article thumbnail photography, one photo per category.
 *
 * ── WHY THIS REPLACED THE GENERATED COVERS ──────────────────────────────────
 * Articles without an uploaded heroImage fell back to /insights-cover/<slug>,
 * a Satori-generated PNG: the article title set in type on a navy gradient.
 * Thirty of those in one grid is thirty near-identical dark rectangles, and the
 * title is already printed underneath each card in real text — so the image
 * carried no information at all. It read as a placeholder because it was one.
 *
 * These are real photographs, licensed stock from Magnific (Freepik), chosen
 * per category rather than per article. Per-category is deliberate: it is
 * honest (a photo cannot illustrate a specific argument), it is consistent
 * (every SEO piece looks like an SEO piece), and it does not rot when an
 * article is retitled.
 *
 * ── HOW THE SOURCE IS RESOLVED ──────────────────────────────────────────────
 * Local file first, remote second:
 *
 *   /public/insights-cover/<category>.jpg   ← used if present
 *   the Magnific CDN URL below              ← used if not
 *
 * The local path wins, so dropping a file at that path silently takes over with
 * no code change. That is the intended end state, and the reason the remote URL
 * is a bridge rather than the design:
 *
 *   • hotlinking a stock CDN is fragile — if they move or expire a file, the
 *     thumbnail 404s and we find out from a user, not a build;
 *   • serving previews rather than licensed downloads is not what the licence
 *     is for.
 *
 * Claude could not download the files: its sandbox has no network route to the
 * CDN (HTTP 403 at the egress proxy). Running DOWNLOAD-ARTICLE-IMAGES.command
 * on a machine with normal network access fetches all seven into
 * /public/insights-cover/ and the remote URLs stop being used.
 *
 * Every entry records the Magnific item id so the licensed original is
 * traceable.
 */

export interface CategoryImage {
  /** Magnific (Freepik) stock item id — for re-downloading the licensed file. */
  stockId: number;
  /** Photographer-facing title, kept so the choice can be sanity-checked. */
  title: string;
  /** CDN preview. Bridge only — see the note above. */
  remote: string;
}

export const CATEGORY_IMAGES: Record<string, CategoryImage[]> = {
  /**
   * ── REPLACED 23 SEP 2026 ──────────────────────────────────────────────────
   * Vikas: "the thumbnail images are all looking similar and generic."
   *
   * He was right, and the audit made it obvious. All 28 previous images came
   * from one genre — people at laptops, people at boardroom tables, people
   * pointing at charts. Filenames read: "employee-looking-business-analytics",
   * "business-leader-giving-presentation-his-team", "chief-analyst-holding-
   * meeting-presentation", "creative-people-sitting-table-boardroom". Seven
   * categories, one look. A reader scrolling the index saw the same photograph
   * seven times with different crops.
   *
   * These are architecture, shadow, texture and light instead. Three reasons:
   *   1. They are visually distinct FROM EACH OTHER, which is the actual
   *      complaint.
   *   2. They carry no stock-photo cliché. Nobody has ever pointed at a chart.
   *   3. They sit with the site's drafting language — hairlines, geometry,
   *      hard light — rather than fighting it.
   *
   * Each category has a visual theme so the set reads as deliberate:
   *   seo-search           structure and facade — what holds a site up
   *   performance-paid     hard light and precise shadow — targeting
   *   conversion-experience paths, openings, thresholds
   *   growth-strategy      construction and scaffolding — building upward
   *   industry-insights    massing and silhouette — categories at a distance
   *   email-lifecycle      repetition and sequence — rhythm over time
   *   social-content       colour and energy, the one bright set
   *
   * All are free-licence and none are AI-generated (filtered at search).
   * No image is reused across categories — checked.
   */

  // ── Structure and facade ──────────────────────────────────────────────────
  "seo-search": [
    { stockId: 10291719, title: "Curved facade of a building in Berlin",
      remote: "https://img.magnific.com/free-photo/closeup-greyscale-shot-building-with-curvy-twists-berlin-germany_181624-14427.jpg" },
    { stockId: 8408883, title: "Metallic ribs and glass on a building facade",
      remote: "https://img.magnific.com/free-photo/horizontal-shot-abstract-buildings-with-white-metallic-ribs-glass-windows_181624-4968.jpg" },
    { stockId: 4591305, title: "White architectural detail against sky",
      remote: "https://img.magnific.com/free-photo/white-abstract-architectural-detail-against-blue-sky_23-2148139871.jpg" },
    { stockId: 13308236, title: "Mirror glass building from below",
      remote: "https://img.magnific.com/free-photo/low-angle-view-mirror-glass-building_410324-123.jpg" },
  ],

  // ── Hard light, precise shadow ────────────────────────────────────────────
  "performance-paid": [
    { stockId: 5792349, title: "Perpendicular shadow lines on concrete",
      remote: "https://img.magnific.com/free-photo/perpendicular-shadow-lines-concrete-wall_122409-34.jpg" },
    { stockId: 426436300, title: "Light and shadow stripes from blinds",
      remote: "https://img.magnific.com/free-photo/monochromatic-light-shadow-stripes-from-blinds_84443-73787.jpg" },
    { stockId: 11328325, title: "Light split through a prism",
      remote: "https://img.magnific.com/free-photo/light-rays-prism-shadows_23-2148771775.jpg" },
    { stockId: 17809172, title: "Abstract outdoor shadow in daylight",
      remote: "https://img.magnific.com/free-photo/outdoors-abstract-shadow-daytime_23-2149080285.jpg" },
  ],

  // ── Paths, openings, thresholds ───────────────────────────────────────────
  "conversion-experience": [
    { stockId: 10980107, title: "Perforated wall and gangway",
      remote: "https://img.magnific.com/free-photo/wall-with-holes-gangway_23-2148742463.jpg" },
    { stockId: 27830368, title: "Architecture and shadows in the city",
      remote: "https://img.magnific.com/free-photo/architecture-shadows-city-day_23-2149451223.jpg" },
    { stockId: 17809084, title: "Abstract daylight shadows outdoors",
      remote: "https://img.magnific.com/free-photo/view-abstract-outdoors-daylight-shadows_23-2149080264.jpg" },
    { stockId: 1737765, title: "Shadow of a runner",
      remote: "https://img.magnific.com/free-photo/shadow-running-sportsman_23-2147755456.jpg" },
  ],

  // ── Construction, building upward ─────────────────────────────────────────
  "growth-strategy": [
    { stockId: 27040105, title: "Geometric wavy folds",
      remote: "https://img.magnific.com/free-photo/abstract-geometric-wavy-folds-background_1048-15906.jpg" },
    { stockId: 4605136, title: "Architectural construction against sky",
      remote: "https://img.magnific.com/free-photo/architectural-construction-against-blue-sky_23-2148139889.jpg" },
    { stockId: 7901216, title: "Modern architecture from a low angle",
      remote: "https://img.magnific.com/free-photo/low-angle-shot-high-modern-architecture-with-beautiful-sky_181624-2992.jpg" },
    { stockId: 16496434, title: "Minimal architecture against open sky",
      remote: "https://img.magnific.com/free-photo/minimal-architect-background-blue-skye_53876-123078.jpg" },
  ],

  // ── Massing and silhouette ────────────────────────────────────────────────
  "industry-insights": [
    { stockId: 22894320, title: "City building shadows",
      remote: "https://img.magnific.com/free-photo/abstract-city-building-shadows_23-2149283228.jpg" },
    { stockId: 932066, title: "Dark structure",
      remote: "https://img.magnific.com/free-photo/dark-structure_1127-2117.jpg" },
    { stockId: 9991204, title: "Facade of a modern building, dark grey",
      remote: "https://img.magnific.com/free-photo/greyscale-shot-facade-modern-building-with-dark-grey-walls_181624-11927.jpg" },
    { stockId: 4153296, title: "Building from below with a plane overhead",
      remote: "https://img.magnific.com/free-photo/building-bottom-view-with-plane_23-2148107063.jpg" },
  ],

  // ── Repetition and sequence ───────────────────────────────────────────────
  "email-lifecycle": [
    { stockId: 426436353, title: "Sunlight through window blinds",
      remote: "https://img.magnific.com/free-photo/sunlight-shadows-through-window-blinds_84443-73840.jpg" },
    { stockId: 5792407, title: "Roll of paper under artificial light",
      remote: "https://img.magnific.com/free-photo/roll-wallpaper-illuminated-by-artificial-light_122409-89.jpg" },
    { stockId: 11628139, title: "Twisted grey paper",
      remote: "https://img.magnific.com/free-photo/twisted-grey-paper-copy-space_23-2148792955.jpg" },
    { stockId: 114671255, title: "Stacked papers and documents",
      remote: "https://img.magnific.com/free-photo/still-life-stacks-papers-documents_23-2151118338.jpg" },
  ],

  // ── Colour and energy — the one bright set ────────────────────────────────
  "social-content": [
    { stockId: 10974421, title: "Corner of an orange wall",
      remote: "https://img.magnific.com/free-photo/corner-orange-wall-copy-space_23-2148742542.jpg" },
    { stockId: 8858101, title: "Red metal structure against blue sky",
      remote: "https://img.magnific.com/free-photo/low-angle-metal-red-structure-clear-blue-sky_181624-6529.jpg" },
    { stockId: 13704820, title: "Red balloon against a door",
      remote: "https://img.magnific.com/free-photo/red-balloon-door-background_23-2148935853.jpg" },
    { stockId: 5282712, title: "Ferromagnetic liquid metal bloom",
      remote: "https://img.magnific.com/free-photo/abstract-flower-ferromagnetic-liquid-metal-with-copy-space_23-2148253529.jpg" },
  ],
};

/** Categories that exist but have no photo yet fall back to growth-strategy. */
const FALLBACK = "growth-strategy";

/**
 * Local files that have actually been downloaded.
 *
 * This is a list rather than a filesystem check because the resolver runs in
 * both server and client components, and a client component cannot stat a file.
 * DOWNLOAD-ARTICLE-IMAGES.command appends to it after a successful fetch —
 * until then, leave it empty.
 */
const LOCAL_AVAILABLE: string[] = [
  // Emptied 23 Sep 2026 with the image set replacement. These ids referenced
  // files in /public/insights-cover/ for the PREVIOUS photographs; leaving
  // them would have every new lookup resolve to a local path that does not
  // exist. Re-populate only after the new images are actually downloaded and
  // committed to /public/insights-cover/<category>-<stockId>.jpg.
];

/**
 * Stable per-article pick from the category's pool.
 *
 * A single photo per category meant three SEO articles sitting side by side in
 * the grid showed the identical picture three times — which looks more broken
 * than the placeholder it replaced. Each category now has four, and the article
 * slug selects one.
 *
 * The hash is deterministic, so an article keeps the same photo across reloads,
 * rebuilds and machines. It must stay deterministic: anything random would make
 * the image change under the reader on every navigation.
 */
function pick<T>(pool: T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return pool[Math.abs(h) % pool.length];
}

function resolve(category?: string | null, slug?: string | null): CategoryImage {
  const key = category && CATEGORY_IMAGES[category] ? category : FALLBACK;
  return pick(CATEGORY_IMAGES[key], slug ?? key);
}

export function getCategoryImage(
  category?: string | null,
  slug?: string | null,
): string {
  const key = category && CATEGORY_IMAGES[category] ? category : FALLBACK;
  const chosen = resolve(category, slug);
  if (LOCAL_AVAILABLE.includes(String(chosen.stockId))) {
    return `/insights-cover/${key}-${chosen.stockId}.jpg`;
  }
  return chosen.remote;
}

export function getCategoryImageMeta(
  category?: string | null,
  slug?: string | null,
): CategoryImage {
  return resolve(category, slug);
}
