"use client";

import * as React from "react";
import Link from "next/link";
import { CHAT_FLOW, CHAT_START, type ChatNode } from "@/lib/chat-flow";
import { CHANNELS, whatsappHref } from "@/lib/contact-channels";

/**
 * ChatLauncher — the site chat widget.
 *
 * ── WHAT IT IS ──────────────────────────────────────────────────────────────
 * A guided conversation that routes visitors to real pages and captures a
 * lead. Every line it can say lives in lib/chat-flow.ts, so it cannot invent a
 * client result, a price or a capability — see the note at the top of that
 * file for why that constraint matters on this particular site.
 *
 * It says on the first line that it is a menu and not a person. Pretending
 * otherwise is the single most common way these widgets erode trust: a visitor
 * types a real question, gets a canned reply, and concludes the firm is
 * careless. Being told up front costs nothing and sets the right expectation.
 *
 * ── LEAD CAPTURE ────────────────────────────────────────────────────────────
 * Three fields, posted to /api/chat-lead → HubSpot. It also sends the branch
 * the visitor took (`trail`) and the page they opened the chat on, because a
 * lead from "Tell me about the diagnostic" is worth a different follow-up from
 * one that came via "Something else".
 *
 * Deliberately three fields and not eight. The diagnostic intake exists for
 * qualified applications and asks far better questions; a chat box competing
 * with it on depth would get abandoned halfway and capture nothing at all.
 * Every capture node offers the intake as the better route.
 *
 * ── IF A REAL WIDGET IS CONFIGURED ──────────────────────────────────────────
 * This does not render at all — LiveChat swaps in Tawk.to or Crisp instead.
 * See components/utility/LiveChat.tsx.
 */

type Msg =
  | { from: "bot"; text: string }
  | { from: "user"; text: string }
  | { from: "bot-links"; node: ChatNode };

export function ChatLauncher() {
  const [ready, setReady] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [nodeId, setNodeId] = React.useState<string>(CHAT_START);
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const [trail, setTrail] = React.useState<string[]>([]);
  const [typing, setTyping] = React.useState(false);

  // Lead form
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const panelRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const node = CHAT_FLOW[nodeId] ?? CHAT_FLOW[CHAT_START];

  React.useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  // Seed the opening messages the first time it is opened, not on mount —
  // there is no reason to build a transcript nobody has asked for.
  React.useEffect(() => {
    if (open && msgs.length === 0) emit(CHAT_FLOW[CHAT_START]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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

  // Keep the newest message in view.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, typing]);

  /**
   * ── THE OUT-OF-ORDER TRANSCRIPT BUG — FIXED 15 SEP 2026 ───────────────────
   *
   * Caught on the deployed build by clicking two options in quick succession.
   * The transcript came out as:
   *
   *     "What brings you here?"
   *     [user] I'm looking for a specific service
   *     [user] Paid media
   *     "Which one is closest?"          ← belongs to the PREVIOUS node
   *
   * and the Performance Media reply never appeared at all.
   *
   * CAUSE: emit() scheduled one setTimeout per line and nothing cancelled them
   * when the visitor moved on. A superseded node's messages kept firing, landed
   * after the newer user bubble, and raced the current node's own timeouts.
   * The faster someone clicks, the more scrambled it gets — and a visitor who
   * knows what they want clicks fast, so this hit the most engaged users
   * hardest.
   *
   * FIX: a monotonically increasing generation ref. Every emit claims the next
   * generation; a queued callback appends only if its generation is still the
   * current one. Superseded messages are discarded rather than delivered late.
   * Timer ids are also tracked so they can be cleared on unmount.
   *
   * ── ON THE DELAY ITSELF ───────────────────────────────────────────────────
   * 380ms per line, and deliberately not a realistic typing simulation. Long
   * fake typing indicators imply a person is composing a reply, which this
   * widget has already said it is not. This is only enough stagger that three
   * messages do not land as one wall of text.
   */
  const generation = React.useRef(0);
  const timers = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    []
  );

  function emit(n: ChatNode) {
    const gen = ++generation.current;
    setTyping(true);

    if (n.say.length === 0) {
      setTyping(false);
      return;
    }

    n.say.forEach((text, i) => {
      const id = window.setTimeout(() => {
        // Superseded — the visitor has already moved to another node.
        if (generation.current !== gen) return;
        setMsgs((m) => [...m, { from: "bot", text }]);
        if (i === n.say.length - 1) {
          if (n.links?.length) {
            setMsgs((m) => [...m, { from: "bot-links", node: n }]);
          }
          setTyping(false);
        }
      }, 380 * (i + 1));
      timers.current.push(id);
    });
  }

  function choose(label: string, next: string) {
    const target = CHAT_FLOW[next];
    if (!target) return;

    // Claim a generation immediately, before the 260ms gap, so any messages
    // still queued from the previous node are invalidated the moment the
    // visitor clicks rather than 260ms later.
    generation.current += 1;
    setTyping(false);

    setMsgs((m) => [...m, { from: "user", text: label }]);
    setTrail((t) => [...t, label]);
    setNodeId(next);
    setError(null);

    const id = window.setTimeout(() => emit(target), 260);
    timers.current.push(id);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError("Name and email, please.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          intent: node.intent,
          trail,
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "That didn't send. Try WhatsApp instead?");
        setSending(false);
        return;
      }
      setMsgs((m) => [...m, { from: "user", text: `${name} · ${email}` }]);
      setNodeId("done");
      window.setTimeout(() => emit(CHAT_FLOW.done), 260);
    } catch {
      setError("That didn't send. Try WhatsApp instead?");
    }
    setSending(false);
  }

  if (!ready) return null;

  const inputCls =
    "w-full bg-transparent border-b border-white/25 focus:border-brand-yellow outline-none py-2 font-body text-body-sm text-white placeholder:text-white/35 transition-colors";

  return (
    <div ref={panelRef} className="fixed right-5 bottom-5 z-[60]">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Zeppstr"
          className="mb-3 w-[min(92vw,370px)] bg-bg-inverse text-white rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col max-h-[min(70vh,560px)] motion-safe:animate-rise-in"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/15 flex items-start justify-between gap-3 flex-shrink-0">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                Zeppstr
              </p>
              {/* Honest availability, never a response-time promise. */}
              <p className="mt-1 font-body text-body-sm text-white/55">
                {CHANNELS.hours}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/50 hover:text-white transition-colors -mr-1 -mt-1 p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {msgs.map((m, i) => {
              if (m.from === "bot-links") {
                return (
                  <div key={i} className="space-y-2 pt-1">
                    {m.node.links!.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md border border-white/20 px-3.5 py-2.5 hover:border-brand-yellow hover:bg-white/[0.06] transition-colors group"
                      >
                        <span className="font-body text-body-sm text-white group-hover:text-brand-yellow transition-colors">
                          {l.label} <span aria-hidden="true">→</span>
                        </span>
                        {l.note && (
                          <span className="block mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                            {l.note}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                );
              }
              const isUser = m.from === "user";
              return (
                <div key={i} className={isUser ? "flex justify-end" : ""}>
                  <p
                    className={
                      isUser
                        ? "max-w-[85%] rounded-lg rounded-br-sm bg-brand-yellow text-ink-headline px-3.5 py-2 font-body text-body-sm"
                        : "max-w-[92%] rounded-lg rounded-bl-sm bg-white/[0.08] px-3.5 py-2 font-body text-body-sm text-white/90 leading-relaxed"
                    }
                  >
                    {m.text}
                  </p>
                </div>
              );
            })}

            {typing && (
              <div className="flex gap-1 px-1" aria-label="Typing">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse"
                    style={{ animationDelay: `${d * 150}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer — either the option buttons or the lead form */}
          <div className="flex-shrink-0 border-t border-white/15 px-5 py-4">
            {node.capture ? (
              <form onSubmit={submitLead} className="space-y-3">
                <input
                  className={inputCls}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                <input
                  className={inputCls}
                  placeholder="Work email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <input
                  className={inputCls}
                  placeholder="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                />
                {error && (
                  <p className="font-body text-body-sm text-brand-yellow">{error}</p>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-brand-yellow text-ink-headline font-body text-body-sm font-medium px-5 py-2.5 rounded-md hover:bg-white transition-colors disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={() => choose("Back", CHAT_START)}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-wrap gap-2">
                {node.options?.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => choose(o.label, o.next)}
                    className="rounded-full border border-white/25 px-3.5 py-1.5 font-body text-body-sm text-white hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                  >
                    {o.label}
                  </button>
                ))}
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-3.5 py-1.5 font-body text-body-sm text-white/70 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                >
                  WhatsApp instead
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className={[
          "ml-auto flex items-center justify-center h-14 w-14 rounded-full",
          "bg-bg-inverse text-white border border-white/15",
          "shadow-[0_4px_14px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]",
          "hover:-translate-y-0.5 transition-all duration-300 ease-smooth",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
          "motion-safe:animate-rise-in",
        ].join(" ")}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
