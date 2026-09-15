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
  "seo-search": [
    {
      stockId: 413435393,
      title: "Employee looking at business analytics",
      remote:
        "https://img.magnific.com/free-photo/employee-looking-business-analytics_482257-115272.jpg",
    },
    {
      stockId: 24376213,
      title: "Startup employee reviewing analytics charts on a laptop",
      remote:
        "https://img.magnific.com/free-photo/shoulder-view-african-american-startup-employee-looking-laptop-screen-with-business-analytics-charts-sitting-desk-close-focus-portable-computer-display-with-sales-results_482257-38698.jpg",
    },
    {
      stockId: 32464790,
      title: "Analyst working through business charts and research notes",
      remote:
        "https://img.magnific.com/free-photo/office-worker-analyzing-business-charts-laptop-using-paperwork-research-information-make-data-report-working-from-home-startup-analysis-with-web-graphs-browsing-internet_482257-50961.jpg",
    },
    {
      stockId: 134363205,
      title: "Network analyst studying digital commerce progression reports",
      remote:
        "https://img.magnific.com/free-photo/network-analyst-studying-digital-commerce-progression-reports_482257-75371.jpg",
    },
  ],
  "performance-paid": [
    {
      stockId: 25858318,
      title: "Research analysis on screen \u2014 statistics, charts and graphs",
      remote:
        "https://img.magnific.com/free-photo/businessman-doing-research-analysis-computer-screen-plan-financial-statistics-with-charts-graphs-data-male-employee-working-with-diagram-report-find-sales-profit-e-commerce_482257-40940.jpg",
    },
    {
      stockId: 23408777,
      title: "Entrepreneur working through rate charts to plan a campaign",
      remote:
        "https://img.magnific.com/free-photo/entrepreneur-looking-papers-computer-with-rate-charts-plan-project-presentation-business-man-working-with-data-analysis-information-create-marketing-strategy_482257-36478.jpg",
    },
    {
      stockId: 25858333,
      title: "Consultant reviewing e-commerce performance statistics",
      remote:
        "https://img.magnific.com/free-photo/sales-consultant-using-e-commerce-statistics-computer-monitor-develop-financial-growth-business-development-manager-working-with-data-analysis-diagrams-research-tripod-shot_482257-40942.jpg",
    },
    {
      stockId: 18044703,
      title: "Performance reporting \u2014 charts and visual graphics",
      remote:
        "https://img.magnific.com/free-photo/business-chart-visual-graphics-report-concept_53876-132304.jpg",
    },
  ],
  "conversion-experience": [
    {
      stockId: 143489084,
      title: "Laptop showing company profit progress on screen",
      remote:
        "https://img.magnific.com/free-photo/laptop-computer-with-company-profit-progress-screen_482257-77678.jpg",
    },
    {
      stockId: 34219984,
      title: "Workplace arrangement with a laptop on a desk",
      remote:
        "https://img.magnific.com/free-photo/workplace-arrangement-with-laptop-desk_23-2149831290.jpg",
    },
    {
      stockId: 11428126,
      title: "Person using a laptop",
      remote:
        "https://img.magnific.com/free-photo/person-using-laptop_53876-95245.jpg",
    },
    {
      stockId: 1281794,
      title: "Hands working on a laptop showing a diagram",
      remote:
        "https://img.magnific.com/free-photo/hands-working-laptop-with-diagram-it_1163-2755.jpg",
    },
  ],
  "growth-strategy": [
    {
      stockId: 26390733,
      title: "Entrepreneur presenting a new business strategy on a whiteboard",
      remote:
        "https://img.magnific.com/free-photo/happy-entrepreneur-presenting-his-colleagues-new-business-strategy-whiteboard-meeting-office_637285-6984.jpg",
    },
    {
      stockId: 26390821,
      title: "Team developing a new business strategy in the office",
      remote:
        "https://img.magnific.com/free-photo/business-team-cooperating-while-developing-new-business-strategy-office-focus-is-young-man-presenting-ideas-whiteboard_637285-7044.jpg",
    },
    {
      stockId: 6627770,
      title: "Founder drawing a flowchart on a board while discussing a project",
      remote:
        "https://img.magnific.com/free-photo/startup-leader-drawing-flowchart-board-discussing-project_74855-3307.jpg",
    },
    {
      stockId: 25592185,
      title: "Leader explaining project plans on a whiteboard",
      remote:
        "https://img.magnific.com/free-photo/business-leader-giving-presentation-his-team-explaining-project-plans-whiteboard-office_637285-992.jpg",
    },
  ],
  "industry-insights": [
    {
      stockId: 17984025,
      title: "Analyst presenting growth analysis to a team",
      remote:
        "https://img.magnific.com/free-photo/chief-analyst-holding-meeting-presentation-team-economists-manager-showing-digital-interactive-whiteboard-with-growth-analysis-charts-statistics-data-diverse-people-working-broadroom_482257-13904.jpg",
    },
    {
      stockId: 414767022,
      title: "Business analyst presenting plans on an interactive board",
      remote:
        "https://img.magnific.com/free-photo/business-analyst-presenting-latest-budgeting-plans-interactive-board_482257-115918.jpg",
    },
    {
      stockId: 999396,
      title: "Speaker explaining a bar chart to an audience",
      remote:
        "https://img.magnific.com/free-photo/senior-speaker-explaining-bar-chart-audience_1262-1908.jpg",
    },
    {
      stockId: 7286239,
      title: "Team in a boardroom working through a problem",
      remote:
        "https://img.magnific.com/free-photo/creative-people-sitting-table-boardroom_171337-5926.jpg",
    },
  ],
  "email-lifecycle": [
    {
      stockId: 16437083,
      title: "Inbox and notification concept",
      remote:
        "https://img.magnific.com/free-photo/inbox-communication-notification-e-mail-mail-concept_53876-120056.jpg",
    },
    {
      stockId: 926672,
      title: "Hand on a laptop surrounded by envelopes",
      remote:
        "https://img.magnific.com/free-photo/hand-tounching-laptop-many-envelopes_1134-189.jpg",
    },
    {
      stockId: 17140276,
      title: "Newsletter subscribe and register concept",
      remote:
        "https://img.magnific.com/free-photo/subscribe-newsletter-advertising-register-member-concept_53876-125132.jpg",
    },
    {
      stockId: 2767120,
      title: "New incoming message notification",
      remote:
        "https://img.magnific.com/free-photo/new-incoming-message-email-icon_53876-14640.jpg",
    },
  ],
  "social-content": [
    {
      stockId: 69346961,
      title: "Social media communication concept",
      remote:
        "https://img.magnific.com/free-photo/social-media-communication-concept_23-2150822048.jpg",
    },
    {
      stockId: 64239593,
      title: "Communication and social media icons",
      remote:
        "https://img.magnific.com/free-photo/communication-social-media-icons_23-2150749328.jpg",
    },
    {
      stockId: 17096272,
      title: "Social networking and internet technology",
      remote:
        "https://img.magnific.com/free-photo/social-media-networking-internet-technology_53876-123954.jpg",
    },
    {
      stockId: 1208864,
      title: "Social apps on a phone beside a laptop",
      remote:
        "https://img.magnific.com/free-photo/twitter-phone-facebook-laptop_23-2147651286.jpg",
    },
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
const LOCAL_AVAILABLE: string[] = [];

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
