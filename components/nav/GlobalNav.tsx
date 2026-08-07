import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { sanity } from "@/sanity/lib/client";
import { allSolutionsQuery, allIndustriesQuery } from "@/sanity/lib/queries";
import type { Solution, Industry, SubService } from "@/sanity/lib/types";

interface SolutionWithServices extends Solution {
  subServices?: SubService[];
}

/**
 * Server component. Fetches Solutions + Industries from Sanity once at build time
 * (with ISR via Sanity webhook revalidation), passes them to MegaMenu (desktop)
 * and MobileDrawer (mobile).
 */
export async function GlobalNav() {
  // Fetch in parallel — both data shapes are minimal projections
  const [solutions, industries] = await Promise.all([
    sanity.fetch<SolutionWithServices[]>(allSolutionsQuery),
    sanity.fetch<Industry[]>(allIndustriesQuery),
  ]);

  return (
    <nav className="sticky top-0 z-40 bg-bg-primary border-b border-rule">
      <div className="container-layout flex items-center justify-between py-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-[22px] text-ink-headline tracking-tight"
        >
          <span className="inline-flex items-center justify-center w-[26px] h-[26px] bg-emerald-900 text-white rounded-md text-sm">
            ↗
          </span>
          Zeppstr
        </Link>

        {/* Desktop nav */}
        <div className="flex items-center gap-9">
          <MegaMenu solutions={solutions} industries={industries} />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/book-consultation">Book Consultation</Link>
          </Button>
        </div>

        {/* Mobile drawer trigger */}
        <MobileDrawer solutions={solutions} industries={industries} />
      </div>
    </nav>
  );
}
