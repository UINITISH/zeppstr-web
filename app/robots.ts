import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeppstr.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/preview/", "/_next/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
