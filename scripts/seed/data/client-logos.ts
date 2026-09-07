/**
 * Client logos.
 *
 * ── SOURCE OF TRUTH ─────────────────────────────────────────────────────────
 * Every entry below corresponds to a real logo asset in /public/client-logos/,
 * or to a client with a published case study. That is the evidence test: if
 * Zeppstr holds the client's logo file, the engagement happened.
 *
 * ── WHAT WAS REMOVED, AND WHY ───────────────────────────────────────────────
 * This file previously contained 14 invented company names seeded as live
 * client records:
 *
 *   GreenDot Health · Northstar Education · Bridge Learning · Axis Legal ·
 *   Meridian Advisory · CloudKey · Flowboard · Vector Tech · Sapphire Realty ·
 *   Bloomwell · Paragon Education · Keystone Legal · Veridia D2C ·
 *   Trinity Capital
 *
 * They were scaffolding — placeholder names used to populate the industry
 * filters during development — and they shipped to production in the 5 Aug
 * seed. None is a Zeppstr client. Publishing invented client names is the same
 * category of failure as the un-nameable real-estate case studies removed in
 * the same session.
 *
 * Also removed: Prestige Group (subcontracted, no naming rights), and four
 * entries with no supporting asset or document anywhere in the archive —
 * Crafthives, Truspace, Altius Realty, Himalayan Wellness. If any of those are
 * real, add them back with a logo file.
 *
 * DO NOT add a name here without a logo asset or a signed engagement.
 *
 * ── AFTER SEEDING ───────────────────────────────────────────────────────────
 * Records seed without image assets. Upload the PNGs from /public/client-logos/
 * to each record in Sanity Studio, or wire an asset-upload step into the seed.
 *
 * ── NEEDS CONFIRMATION ──────────────────────────────────────────────────────
 * Industry mapping for entries marked (?) is inferred from the company name or
 * from which solution page featured the logo. Correct in Studio if wrong — it
 * only affects filter grouping, not the claim itself.
 *
 * `status` is "active" for everything non-flagship because the archive does not
 * record which engagements have ended. Reclassify in Studio where known; do not
 * guess.
 */

interface SeedClientLogo {
  _id: string;
  clientName: string;
  industryId: string;
  status: "flagship" | "active" | "past";
  website?: string;
}

export const CLIENT_LOGOS: SeedClientLogo[] = [
  // ─── Flagship — published case studies ───
  {
    _id: "logo-wise-market",
    clientName: "Wise Market",
    industryId: "industry-ecommerce-dtc",
    status: "flagship",
    website: "https://wisemarket.com.au",
  },
  {
    _id: "logo-tru-aquapolis",
    clientName: "Tru Aquapolis",
    industryId: "industry-real-estate",
    status: "flagship",
  },
  {
    _id: "logo-mini-leaves",
    clientName: "Mini Leaves",
    industryId: "industry-ecommerce-dtc",
    status: "flagship",
    website: "https://minileaves.com",
  },
  {
    _id: "logo-invest-in-sharjah",
    clientName: "Invest in Sharjah",
    industryId: "industry-professional-services",
    status: "flagship",
    website: "https://investinsharjah.ae",
  },
  {
    _id: "logo-homatico",
    clientName: "Homatico",
    industryId: "industry-professional-services",
    status: "flagship",
  },
  {
    _id: "logo-vehiclemall",
    clientName: "VehicleMall",
    industryId: "industry-saas-tech",
    status: "flagship",
  },
  {
    _id: "logo-sky-phonez",
    clientName: "Sky Phonez",
    industryId: "industry-ecommerce-dtc",
    status: "flagship",
  },

  // ─── Active — logo asset on file, no published case study yet ───
  { _id: "logo-prohance", clientName: "Prohance", industryId: "industry-saas-tech", status: "active" },
  { _id: "logo-empuls", clientName: "Empuls", industryId: "industry-saas-tech", status: "active" },
  { _id: "logo-fixstars", clientName: "Fixstars", industryId: "industry-saas-tech", status: "active" },
  { _id: "logo-tristar-online", clientName: "Tristar Online", industryId: "industry-ecommerce-dtc", status: "active" },
  { _id: "logo-aishwarya-interiors", clientName: "Aishwarya Interiors", industryId: "industry-real-estate", status: "active" },
  { _id: "logo-twenty-one-finance", clientName: "21 Finance", industryId: "industry-professional-services", status: "active" }, // (?) fintech — no fintech industry defined
  { _id: "logo-learncab", clientName: "LearnCab", industryId: "industry-edtech-education", status: "active" },
  { _id: "logo-ivehiclevalue", clientName: "iVehicleValue", industryId: "industry-saas-tech", status: "active" },
  { _id: "logo-bsg", clientName: "BSG", industryId: "industry-professional-services", status: "active" }, // BizSetupGlobal — accounting & compliance
  { _id: "logo-my-keto-co", clientName: "My Keto Co", industryId: "industry-ecommerce-dtc", status: "active" },
  { _id: "logo-lucky-white-goods", clientName: "Lucky White Goods", industryId: "industry-ecommerce-dtc", status: "active" },
  { _id: "logo-nakshatech", clientName: "Nakshatech", industryId: "industry-saas-tech", status: "active" }, // (?)
  { _id: "logo-ace-online", clientName: "Ace Online", industryId: "industry-edtech-education", status: "active" }, // (?)
  { _id: "logo-eagledrift", clientName: "EagleDrift", industryId: "industry-saas-tech", status: "active" }, // (?)
  { _id: "logo-ignite", clientName: "Ignite", industryId: "industry-professional-services", status: "active" }, // (?)
  { _id: "logo-jp-parking-yard", clientName: "JP Parking Yard", industryId: "industry-professional-services", status: "active" }, // (?) featured on local-search
  { _id: "logo-tansi-fintech", clientName: "Tansi Fintech", industryId: "industry-professional-services", status: "active" }, // (?)
  { _id: "logo-pacer", clientName: "Pacer", industryId: "industry-ecommerce-dtc", status: "active" }, // (?) featured on influencer-partnerships
];
