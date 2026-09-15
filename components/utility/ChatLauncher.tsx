"use client";

import * as React from "react";
import Link from "next/link";
import { CHANNELS, whatsappHref } from "@/lib/contact-channels";

/**
 * ChatLauncher — bottom-right contact panel.
 *
 * ── WHAT THIS IS, AND WHAT IT IS NOT ────────────────────────────────────────
 * This is NOT a chatbot and does not pretend to be one. It is a routed contact
 * panel: four ways to reach a person, ranked by how useful each is to Zeppstr.
 *
 * It exists because the live-chat widget (Tawk.to / Crisp) needs an account
 * and a property ID that only Vikas can create, and an empty bottom-right
 * corner in the meantime is worth nothing. The moment a vendor ID is set in
 * the environment, LiveChat renders the real widget and this steps aside
 * automatically — see the guard in components/utility/LiveChat.tsx.
 *
 * ── WHY IT DOES NOT SAY "WE TYPICALLY REPLY IN MINUTES" ─────────────────────
 * Because nobody is sitting in it. A widget that promises a response time it
 * cannot keep is worse than no widget, and on a site whose entire positioning
 * is "we only claim what we can prove" it is actively self-defeating. It says
 * what the hours are and what each route actually does, and nothing else.
 *
 * ── ORDERING ────────────────────────────────────────────────────────────────
 * The diagnostic is first because it is the firm's actual entry point and the
 * only route that produces a qualified enquiry. WhatsApp is second because it
 * is the lowest-friction and the one most people will take. Email and phone
 * follow. This is not alphabetical or arbitrary.
 */

type Route = {
  label: string;
  detail: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatLauncher() {
  const [open, setOpen] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Mount a beat after load, matching the WhatsApp button, so neither competes
  // for attention during first paint.
  React.useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  // Close on Escape and on outside click — both expected of a popover, and
  // their absence is the kind of thing that makes a widget feel cheap.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!ready) return null;

  const routes: Route[] = [
    {
      label: "Apply for a diagnostic",
      detail: "A written assessment, refunded if it tells you nothing new",
      href: "/book-consultation",
      primary: true,
    },
    {
      label: "WhatsApp us",
      detail: CHANNELS.whatsappDisplay,
      href: whatsappHref(),
      external: true,
    },
    {
      label: "Email",
      detail: CHANNELS.email,
      href: `mailto:${CHANNELS.email}`,
      external: true,
    },
    {
      label: "Call",
      detail: CHANNELS.phoneDisplay,
      href: CHANNELS.phoneHref,
      external: true,
    },
  ];

  return (
    <div ref={panelRef} className="fixed right-5 bottom-5 z-[60]">
      {open && (
        <div
          role="dialog"
          aria-label="Contact Zeppstr"
          className="mb-3 w-[min(92vw,340px)] bg-bg-inverse text-white rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] motion-safe:animate-rise-in"
        >
          <div className="px-6 pt-6 pb-5 border-b border-white/15">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 mb-2.5">
              Talk to us
            </p>
            <p className="font-display font-light text-display-xs text-white leading-snug">
              Four ways through. The first one is the one that works.
            </p>
            {/* An honest availability line, not a promised response time. */}
            <p className="mt-2.5 font-body text-body-sm text-white/55">
              {CHANNELS.hours}
            </p>
          </div>

          <ul>
            {routes.map((r) => {
              const inner = (
                <>
                  <span
                    className={`font-body text-body-sm ${
                      r.primary ? "text-brand-yellow font-medium" : "text-white"
                    }`}
                  >
                    {r.label}
                  </span>
                  <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 leading-relaxed">
                    {r.detail}
                  </span>
                </>
              );
              const cls =
                "block px-6 py-4 border-b border-white/10 last:border-b-0 hover:bg-white/[0.06] transition-colors duration-hover focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-yellow";

              return (
                <li key={r.label}>
                  {r.external ? (
                    <a
                      href={r.href}
                      target={r.href.startsWith("http") ? "_blank" : undefined}
                      rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cls}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={r.href} className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className={[
          "ml-auto flex items-center justify-center",
          "h-14 w-14 rounded-full",
          "bg-bg-inverse text-white border border-white/15",
          "shadow-[0_4px_14px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]",
          "hover:-translate-y-0.5 transition-all duration-300 ease-smooth",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
          "motion-safe:animate-rise-in",
        ].join(" ")}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <ChatIcon />
        )}
      </button>
    </div>
  );
}
