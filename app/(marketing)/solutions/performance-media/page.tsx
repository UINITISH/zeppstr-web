import type { Metadata } from "next";
import SolutionPage, {
  generateMetadata as solutionMetadata,
} from "../[slug]/page";

/**
 * /solutions/performance-media
 *
 * ── WHY THIS FILE IS FOUR LINES OF DELEGATION ───────────────────────────────
 * It used to be a bespoke 355-line layout: its own hero, its own emerald proof
 * band, its own failures / practices / sequence sections, its own CTA. The
 * other four pillars — Growth Strategy & Advisory, Organic Growth, Experience &
 * Engineering, Brand Engagement & Lifecycle — have no page file at all. They
 * fall through to the shared [slug] template, which renders eleven sections:
 * hero with the lifecycle graphic, client logo strip, POV, deliverables, what
 * we make, services, process, practice numbers, case studies, industries, FAQ,
 * CTA.
 *
 * So one practice in five looked like a different website. Same brand, same
 * colours, completely different page architecture — no logo strip, no
 * deliverables grid, no process band, no numbers, no FAQ. Clicking between
 * Organic Growth and Performance Media felt like leaving the site.
 *
 * A static route in Next takes precedence over the dynamic [slug] one, so this
 * file was silently shadowing the template. Rather than delete it — the route
 * is linked from the nav, the footer, the sitemap and the solutions hub, and a
 * deleted file is a 404 waiting for someone's cached link — it now renders the
 * same template with the slug supplied.
 *
 * The content the bespoke page carried was not thrown away. It moved to
 * PRACTICE_CONTENT["performance-media"] in lib/practice-content.ts, where the
 * template renders it in the same system as everything else: the Aquapolis
 * figures became practice numbers, the failure analysis became FAQs, the
 * sequence became process steps, and the four channel disciplines became the
 * "what we make" block.
 *
 * DO NOT re-add bespoke sections here. If Performance Media needs something the
 * other four do not have, add it to the template behind a PRACTICE_CONTENT key
 * so every practice can use it.
 */

export async function generateMetadata(): Promise<Metadata> {
  return solutionMetadata({ params: { slug: "performance-media" } });
}

export const revalidate = 60;

export default async function PerformanceMediaPage() {
  return SolutionPage({ params: { slug: "performance-media" } });
}
