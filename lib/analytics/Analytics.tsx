import Script from "next/script";

/**
 * Single component that wires Plausible (primary), GA4 (secondary), and
 * Microsoft Clarity (heatmaps + session replay). Each is opt-in via env var,
 * so dev environments stay clean.
 *
 * Required env vars (production):
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  = "zeppstr.com"
 *   NEXT_PUBLIC_GA4_ID            = "G-XXXXXXXXXX"   (optional)
 *   NEXT_PUBLIC_CLARITY_ID        = "xxxxxxxxxx"     (optional)
 *
 * Drop <Analytics /> once in app/layout.tsx, just inside <body>.
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {plausibleDomain && (
        <Script
          src="https://plausible.io/js/script.outbound-links.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
          defer
        />
      )}

      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}

/**
 * Track a custom event in Plausible. Safe no-op if Plausible isn't loaded.
 * Usage:
 *   import { trackEvent } from "@/lib/analytics/Analytics";
 *   trackEvent("Apply Submitted", { props: { industry: "real-estate" } });
 */
export function trackEvent(
  name: string,
  options?: { props?: Record<string, string | number | boolean>; callback?: () => void }
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    plausible?: (
      name: string,
      opts?: { props?: Record<string, string | number | boolean>; callback?: () => void }
    ) => void;
  };
  if (typeof w.plausible === "function") {
    w.plausible(name, options);
  }
}
