import { deliverLead } from "@/lib/lead";
import { NextResponse } from "next/server";

/**
 * POST /api/chat-lead
 *
 * Leads captured from the site chat widget.
 *
 * ── WHY THIS IS SEPARATE FROM /api/diagnostic-intake ────────────────────────
 * The diagnostic intake collects revenue band, budget, channels, constraints
 * and timeline — a genuinely qualified application. A chat lead is a name, an
 * email and a company, volunteered in a hurry. Pushing both through the same
 * endpoint would mean either loosening that route's validation (so real
 * applications stop being validated) or padding chat leads with empty fields
 * (so the CRM can no longer tell a serious applicant from a curious browser).
 *
 * They are different things and are kept different. The `chat_intent` note on
 * the HubSpot contact records which branch of the conversation produced it, so
 * a lead from "Tell me about the diagnostic" is distinguishable from one that
 * came from "Something else".
 *
 * ── BEHAVIOUR WITHOUT HUBSPOT_TOKEN ─────────────────────────────────────────
 * Same contract as /api/diagnostic-intake: the lead is ALWAYS logged to the
 * server console first, then pushed to HubSpot only if a token exists. A
 * missing token must never cost a lead, and the visitor must never see an
 * error for a configuration problem that is not theirs.
 *
 * As of writing HUBSPOT_TOKEN is not set in Vercel, so leads currently land in
 * the Vercel function logs only. That is a real gap, not a design choice —
 * console logs are not a CRM and nobody reads them. Set the token.
 */

interface ChatLeadPayload {
  name?: string;
  email?: string;
  company?: string;
  /** Which conversation branch produced this lead. */
  intent?: string;
  /** The path the visitor took, for context. */
  trail?: string[];
  /** Page they were on when they opened the chat. */
  page?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ChatLeadPayload;

    if (!data.name?.trim() || !data.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(data.email.trim())) {
      return NextResponse.json(
        { error: "That email address doesn't look right" },
        { status: 400 }
      );
    }

    const result = await deliverLead(
      {
        email: (data.email ?? "").trim(),
        name: data.name,
        company: data.company,
        source: "Chat widget",
        page: data.page,
        details: [
          ["Intent", data.intent ?? "unknown"],
          ["Path through the chat", data.trail?.join(" → ")],
        ],
      },
      {
        subject: `[Chat] ${data.name}${data.company ? ` — ${data.company}` : ""}`,
        replyTo: (data.email ?? "").trim(),
        html: `<p><strong>${data.name}</strong> (${data.email})${data.company ? `, ${data.company}` : ""}</p><p>Intent: ${data.intent ?? "unknown"}<br>Page: ${data.page ?? "—"}<br>Path: ${data.trail?.join(" → ") ?? "—"}</p>`,
      },
    );

    if (!result.delivered) {
      return NextResponse.json(
        { error: "Something went wrong sending this. Please try again, or email nitish@zeppstr.com directly." },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[chat-lead] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
