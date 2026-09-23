import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { NavShell } from "./NavShell";
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
    <NavShell>
      <div className="container-layout flex items-center justify-between py-5">
        {/* Logo */}
        {/* Real horizontal wordmark, replacing the placeholder that was an
            emerald square with a "↗" character next to the word "Zeppstr" set
            in the display font. Source: Brand Assets/Zeppstr Logo Flat.jpg,
            background removed and trimmed — see public/brand/. */}
        <Link href="/" className="flex items-center" aria-label="Zeppstr — home">
          <Image
            src="/brand/zeppstr-logo-horizontal.png"
            alt="Zeppstr"
            width={1999}
            height={548}
            priority
            className="h-[30px] w-auto"
          />
        </Link>

        {/* Desktop nav.
            gap-9 (36px) between the menu and the CTA left the button floating
            away from the links it belongs with. gap-8 groups them without
            crowding the button. */}
        <div className="flex items-center gap-8">
          <MegaMenu solutions={solutions} industries={industries} />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/book-consultation">Book a Call</Link>
          </Button>
        </div>

        {/* Mobile drawer trigger */}
        <MobileDrawer solutions={solutions} industries={industries} />
      </div>
    </NavShell>
  );
}
