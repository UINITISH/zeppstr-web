/**
 * Single source of truth for the contact channels used by the floating
 * widgets (WhatsApp button, chat panel).
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
 * Zeppstr has had four different phone numbers in circulation across its
 * assets, and cleaning that up was a whole task of its own. The fastest way to
 * end up back there is to hard-code a number in each new component. So the
 * floating widgets read from here, and here only.
 *
 * ── THE TWO-NUMBER SPLIT — DELIBERATE, NOT A BUG ────────────────────────────
 * The WhatsApp number is NOT the number /contact publishes for calls:
 *
 *   WhatsApp   +91 72909 27926   ← specified by Vikas, 15 Sep 2026.
 *                                  Also the number on live zeppstr.com.
 *   Telephone  +91 72592 93335   ← what /contact publishes, and what its own
 *                                  header records the founder as confirming.
 *
 * A separate WhatsApp Business line is a normal setup, so this is recorded
 * rather than "corrected". If they should in fact be the same number, change
 * it HERE and in CONTACT in app/(marketing)/contact/page.tsx — changing one
 * alone puts the site back to publishing conflicting numbers.
 *
 * Everything else below is copied from that same CONTACT object. If you edit
 * the contact page, edit this too.
 */

export const CHANNELS = {
  /** wa.me format: country code, no plus, no spaces. */
  whatsappNumber: "917290927926",
  whatsappDisplay: "+91 72909 27926",

  phoneDisplay: "+91 72592 93335",
  phoneHref: "tel:+917259293335",

  email: "nitish@zeppstr.com",
  emailGeneral: "digital@zeppstr.com",

  /** Stated in IST. The old site said EST, which is wrong for a Bengaluru office. */
  hours: "Monday to Friday, 10am – 7pm IST",
} as const;

/**
 * WhatsApp deep link, with the current page named in the prefilled message.
 *
 * Deliberately vague about what the visitor wants and specific about where
 * they came from. A prefill that puts words in their mouth ("I'd like to book
 * a diagnostic!") gets deleted before sending, which wastes it entirely.
 * Naming the page is genuinely useful to whoever picks up, and nobody bothers
 * deleting it.
 */
export function whatsappHref(pathname?: string): string {
  const page =
    pathname ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const msg = `Hi Zeppstr — I was reading ${page} on your site and had a question.`;
  return `https://wa.me/${CHANNELS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
