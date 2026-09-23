/** @type {import('next').NextConfig} */

// Legacy URL → new elevated URL redirect map.
//
// ⚠️ 19 Aug 2026: 12 of these 301s pointed at slugs that do not exist, so the
// old ranking URLs (/seo-services, /ppc-services, /lead-generation …) redirected
// straight into 404s — discarding their link equity permanently. Destinations
// were corrected against the real sub-service slugs in
// scripts/seed/data/sub-services.ts.
//
// If you rename a sub-service slug, update this map in the same commit and
// re-run the destination check.
const LEGACY_REDIRECTS = [
  { source: "/seo-services", destination: "/solutions/organic-growth/organic-search-strategy", permanent: true },
  { source: "/on-page-seo-services", destination: "/solutions/organic-growth/content-architecture", permanent: true },
  { source: "/off-page-seo-services", destination: "/solutions/organic-growth/authority-building", permanent: true },
  { source: "/local-seo-services", destination: "/solutions/organic-growth/local-search", permanent: true },
  { source: "/technical-seo-services", destination: "/solutions/organic-growth/technical-seo", permanent: true },
  { source: "/page-speed-optimization-services", destination: "/solutions/experience-engineering/web-development", permanent: true },
  { source: "/e-commerce-seo-services", destination: "/solutions/organic-growth/organic-search-strategy", permanent: true },
  { source: "/d2c-seo-services", destination: "/solutions/organic-growth/organic-search-strategy", permanent: true },
  { source: "/ppc-services", destination: "/solutions/performance-media/paid-search", permanent: true },
  { source: "/lead-generation", destination: "/solutions/performance-media/demand-generation", permanent: true },
  { source: "/social-media-marketing-services", destination: "/solutions/brand-engagement-lifecycle/organic-social", permanent: true },
  { source: "/email-marketing-services", destination: "/solutions/brand-engagement-lifecycle/lifecycle-email", permanent: true },
  { source: "/ui-ux-design-services", destination: "/solutions/experience-engineering/experience-design", permanent: true },
  { source: "/web-development-services", destination: "/solutions/experience-engineering/web-development", permanent: true },
  { source: "/digital-marketing-services", destination: "/solutions/growth-strategy-advisory/growth-strategy-operating-model", permanent: true },
  { source: "/app-store-optimization", destination: "/solutions/experience-engineering/web-development", permanent: true },
  // Legacy About / Contact paths
  { source: "/about-us", destination: "/about", permanent: true },
  // REMOVED 19 Aug 2026: { source: "/contact", destination: "/book-consultation" }
  //
  // This redirect made app/(marketing)/contact/page.tsx unreachable. That page
  // routes press enquiries, partnership enquiries, general questions and the
  // office address — none of which belong in a diagnostic application form.
  // Every "Contact" link in GlobalNav, MobileDrawer and Footer was landing on
  // a multi-step qualification form, so journalists and prospective partners
  // had nowhere to go. /contact is also listed in sitemap.ts, so the redirect
  // meant advertising a URL that immediately bounced.
  //
  // The contact page links to /book-consultation prominently for people who do
  // want an engagement, which is the correct order.
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Royalty-free placeholder case-study images (replaceable with real photos)
      { protocol: "https", hostname: "images.unsplash.com" },
      // Article category photography (Magnific / Freepik). This is a bridge:
      // see the note in lib/insights/category-image.ts. Once the files are
      // downloaded into /public/insights-cover/ this entry can go.
      { protocol: "https", hostname: "img.magnific.com" },
    ],
  },
  async redirects() {
    return LEGACY_REDIRECTS;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
