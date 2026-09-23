"use client";

import Script from "next/script";
import { ChatLauncher } from "@/components/utility/ChatLauncher";

/**
 * Live chat widget loader — bottom-right.
 *
 * Supports Tawk.to and Crisp. Whichever env var is set wins. If NEITHER is
 * set, this falls back to ChatLauncher — an in-house routed contact panel
 * that needs no account, sets no cookies and involves no third party. The
 * corner is therefore never empty, and adding a vendor ID later swaps the
 * real widget in automatically with no code change.
 *
 * ── HOW TO SWITCH IT ON ─────────────────────────────────────────────────────
 *
 * TAWK.TO (free, unlimited agents)
 *   1. Sign up at tawk.to, add a property for zeppstr.com
 *   2. Administration → Channels → Chat Widget → copy the embed snippet.
 *      It looks like:  https://embed.tawk.to/AAAAAAAA/BBBBBBBB
 *      The first id is the PROPERTY id, the second is the WIDGET id.
 *   3. In Vercel → Settings → Environment Variables, add:
 *        NEXT_PUBLIC_TAWK_PROPERTY_ID=AAAAAAAA
 *        NEXT_PUBLIC_TAWK_WIDGET_ID=BBBBBBBB
 *   4. Redeploy. That is the whole job — no code change.
 *
 * CRISP (free tier, 2 seats)
 *   1. Sign up at crisp.chat, create a website
 *   2. Settings → Setup instructions → copy the CRISP_WEBSITE_ID (a UUID)
 *   3. In Vercel add:  NEXT_PUBLIC_CRISP_WEBSITE_ID=<uuid>
 *   4. Redeploy.
 *
 * These are NEXT_PUBLIC_ on purpose. Both IDs are visible in the page source
 * of any site running these widgets — they identify a property, they do not
 * authenticate anything. They are not secrets and must not be treated as
 * though a leak matters; the actual secret is your login to the vendor.
 *
 * ── WHY strategy="lazyOnload" ───────────────────────────────────────────────
 * Third-party chat scripts are heavy — Tawk's bundle is several hundred KB and
 * it opens a websocket. Loading it during hydration measurably hurts LCP and
 * INP on a content site, and nobody opens a chat widget in the first second.
 * lazyOnload defers it until the browser is idle after load.
 *
 * ── BEFORE YOU SHIP THIS, TWO THINGS ────────────────────────────────────────
 *
 * 1. SOMEONE HAS TO ANSWER IT. An unattended live chat is worse than no chat:
 *    it invites a question, shows "typically replies in minutes", and then does
 *    not. For a firm whose positioning is that it does what it says, a silent
 *    chat bubble is an own goal. If nobody is watching it during business
 *    hours, set an away message that says so plainly and routes to WhatsApp.
 *
 * 2. IT IS A DATA PROCESSOR. Both vendors set cookies and collect visitor IP,
 *    page history and anything typed into the widget. /privacy currently does
 *    not mention live chat or these vendors. That needs adding before this goes
 *    live in the EU or UK, and it should be part of the legal review /privacy
 *    and /terms are already waiting on.
 */

const TAWK_PROPERTY = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "default";
const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

export function LiveChat() {
  if (TAWK_PROPERTY) {
    return (
      <Script id="tawk-to" strategy="lazyOnload">
        {`
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();
          (function () {
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = "https://embed.tawk.to/${TAWK_PROPERTY}/${TAWK_WIDGET}";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");
            s0.parentNode.insertBefore(s1, s0);
          })();
        `}
      </Script>
    );
  }

  if (CRISP_ID) {
    return (
      <Script id="crisp-chat" strategy="lazyOnload">
        {`
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "${CRISP_ID}";
          (function () {
            var d = document, s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `}
      </Script>
    );
  }

  /**
   * Neither vendor configured — fall back to the in-house contact panel.
   *
   * This used to `return null`, which left the bottom-right corner empty until
   * an account existed. That is correct behaviour for a widget loader and
   * useless behaviour for a website: the corner sat empty, and the only thing
   * a visitor could do was WhatsApp.
   *
   * ChatLauncher is not a chatbot and does not imitate one — it is a routed
   * contact panel that works with no third-party account, no cookies and no
   * data processor. When a Tawk or Crisp ID is added above, the real widget
   * takes that corner and this stops rendering automatically. No code change,
   * no leftover duplicate launcher.
   */
  return <ChatLauncher />;
}
