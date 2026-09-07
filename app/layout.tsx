import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/lib/analytics/Analytics";
import { organizationLd, websiteLd } from "@/lib/seo/jsonld";
import "@/styles/globals.css";

/**
 * Plus Jakarta Sans for display.
 * Weight 200 (extra-light) is the brand-defining hero weight.
 * Inter for body. JetBrains Mono for data callouts.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeppstr.com"),
  title: {
    default: "Zeppstr — Your Growth Partner in Digital Marketing & SEO",
    template: "%s · Zeppstr",
  },
  description:
    "Zeppstr — Organic Growth, Performance Media & Brand Consulting. Your growth partner, embedded. We build structured revenue systems for businesses across Healthcare, SaaS, Real Estate, EdTech, Professional Services, and E-commerce.",
  keywords: [
    "digital marketing agency",
    "SEO services",
    "growth partner",
    "performance marketing",
    "brand consulting",
    "demand generation",
  ],
  authors: [{ name: "Zeppstr Growth Media" }],
  creator: "Zeppstr Growth Media",
  publisher: "Zeppstr Growth Media",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zeppstr.com",
    siteName: "Zeppstr",
    title: "Zeppstr — Your Growth Partner in Digital Marketing & SEO",
    description:
      "Organic Growth, Performance Media & Brand Consulting. Your growth partner, embedded.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Zeppstr — Your Growth Partner in Digital Marketing & SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeppstr — Your Growth Partner",
    description:
      "Organic Growth, Performance Media & Brand Consulting. Your growth partner, embedded.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
