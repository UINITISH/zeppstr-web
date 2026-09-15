"use client";

import * as React from "react";
import { whatsappHref } from "@/lib/contact-channels";

/**
 * Floating WhatsApp button — bottom-left.
 *
 * ── WHY BOTTOM-LEFT ─────────────────────────────────────────────────────────
 * Tawk.to and Crisp both render their own launcher in the bottom-RIGHT and do
 * not reliably let you move it on free tiers. Putting this on the left is not
 * a stylistic choice — it is the only way the two do not overlap.
 *
 * ── THE NUMBER — READ THIS BEFORE CHANGING IT ───────────────────────────────
 * WhatsApp goes to +91 72909 27926, specified by Vikas on 15 Sep 2026.
 *
 * NOTE THAT THIS IS NOT THE NUMBER /contact PUBLISHES. Four numbers exist
 * across Zeppstr's assets:
 *
 *   +91 72909 27926  ← THIS BUTTON. Also the number on live zeppstr.com
 *                       and docs/ACCESS-REQUEST-UINITISH.md
 *   +91 72592 93335  ← what /contact publishes for calls and what its own
 *                       comment records the founder as having confirmed
 *   +91 79799 05852  ← Brand Assets/Letterhead/
 *   +91 90488 26468  ← was hard-coded on /contact, origin unknown
 *
 * So the site now shows a visitor one number to call and routes them to a
 * different one on WhatsApp. That is a legitimate setup — a lot of firms keep
 * a separate WhatsApp Business line — but it is a deliberate split, not an
 * oversight, and it is recorded here so nobody "fixes" it later by making them
 * match without asking.
 *
 * If both should be the same number, change it here AND in CONTACT in
 * app/(marketing)/contact/page.tsx. Changing one alone reintroduces the exact
 * inconsistency that note was written to clean up.
 *
 * ── THE PREFILLED MESSAGE ───────────────────────────────────────────────────
 * Deliberately vague about what the visitor wants, and specific about where
 * they came from. A prefilled message that puts words in the visitor's mouth
 * ("I'd like to book a diagnostic!") gets deleted before sending, which wastes
 * the prefill entirely. Naming the page they were on is genuinely useful to
 * whoever picks up, and nobody bothers deleting it.
 */

export function WhatsAppButton() {
  /**
   * Deferred mount. Two reasons:
   *  1. The href depends on window.location, which does not exist on the
   *     server — rendering it during SSR would hydrate with the wrong path.
   *  2. A floating action button competing for attention during first paint
   *     is worse than one that appears a beat later, once the page has
   *     settled and the visitor has started reading.
   */
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Zeppstr on WhatsApp"
      className={[
        "fixed left-5 bottom-5 z-[60] group",
        "flex items-center gap-0 hover:gap-3",
        "h-14 rounded-full pl-4 pr-4 hover:pr-5",
        "bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]",
        "hover:shadow-[0_6px_20px_rgba(0,0,0,0.26)] hover:-translate-y-0.5",
        "transition-all duration-300 ease-smooth",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
        "motion-safe:animate-rise-in",
      ].join(" ")}
    >
      {/* Official WhatsApp glyph. Drawn rather than imported so there is no
          extra network request and no icon-library dependency for one mark. */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
      </svg>

      {/* Label expands on hover. Collapsed by default so the resting state is a
          plain circle — a permanently-wide pill covers real content on mobile
          and reads like an ad. */}
      <span className="max-w-0 group-hover:max-w-[180px] overflow-hidden whitespace-nowrap font-body text-body-sm font-medium transition-all duration-300 ease-smooth">
        Chat on WhatsApp
      </span>
    </a>
  );
}
