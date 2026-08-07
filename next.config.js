/** @type {import('next').NextConfig} */

// Legacy URL → new elevated URL redirect map
// Locked from /reference/elevated-naming.md
const LEGACY_REDIRECTS = [
  { source: "/seo-services", destination: "/solutions/organic-growth/organic-search-strategy", permanent: true },
  { source: "/on-page-seo-services", destination: "/solutions/organic-growth/content-on-page-authority", permanent: true },
  { source: "/off-page-seo-services", destination: "/solutions/organic-growth/authority-link-architecture", permanent: true },
  { source: "/local-seo-services", destination: "/solutions/organic-growth/local-discovery-reputation", permanent: true },
  { source: "/technical-seo-services", destination: "/solutions/organic-growth/technical-search-engineering", permanent: true },
  { source: "/page-speed-optimization-services", destination: "/solutions/organic-growth/site-performance-engineering", permanent: true },
  { source: "/e-commerce-seo-services", destination: "/solutions/organic-growth/commerce-search-discovery", permanent: true },
  { source: "/d2c-seo-services", destination: "/solutions/organic-growth/d2c-discovery", permanent: true },
  { source: "/ppc-services", destination: "/solutions/performance-media/paid-search-acquisition", permanent: true },
  { source: "/lead-generation", destination: "/solutions/performance-media/demand-generation-programs", permanent: true },
  { source: "/social-media-marketing-services", destination: "/solutions/brand-engagement-lifecycle/brand-social-engagement", permanent: true },
  { source: "/email-marketing-services", destination: "/solutions/brand-engagement-lifecycle/lifecycle-marketing-automation", permanent: true },
  { source: "/ui-ux-design-services", destination: "/solutions/experience-engineering/experience-design", permanent: true },
  { source: "/web-development-services", destination: "/solutions/experience-engineering/digital-engineering", permanent: true },
  { source: "/digital-marketing-services", destination: "/solutions/growth-strategy-advisory/growth-strategy-operating-model", permanent: true },
  { source: "/app-store-optimization", destination: "/solutions/organic-growth/site-performance-engineering", permanent: true },
  // Legacy About / Contact paths
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contact", destination: "/book-consultation", permanent: false },
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
