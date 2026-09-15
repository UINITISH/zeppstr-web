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

async function pushToHubSpot(data: ChatLeadPayload, token: string) {
  const [firstName, ...rest] = (data.name ?? "").trim().split(/\s+/);

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        email: data.email,
        firstname: firstName || undefined,
        lastname: rest.join(" ") || undefined,
        company: data.company || undefined,
        hs_lead_status: "NEW",
        // Free-text so it works without creating custom properties first.
        message: [
          `Source: site chat widget`,
          `Intent: ${data.intent ?? "unknown"}`,
          data.page ? `Page: ${data.page}` : null,
          data.trail?.length ? `Path: ${data.trail.join(" → ")}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      },
    }),
  });

  // 409 means the contact already exists — that is a normal outcome for a
  // returning visitor, not a failure worth throwing on.
  if (!res.ok && res.status !== 409) {
    throw new Error(`HubSpot ${res.status}: ${await res.text()}`);
  }
}

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

    // Log first, always — see the note above. A lead that reaches the console
    // is recoverable; one lost to a failed integration is not.
    console.log("[chat-lead] new lead:", {
      name: data.name,
      email: data.email,
      company: data.company,
      intent: data.intent,
      page: data.page,
      trail: data.trail,
    });

    const token = process.env.HUBSPOT_TOKEN;
    if (token) {
      try {
        await pushToHubSpot(data, token);
        console.log(`[chat-lead] pushed to HubSpot: ${data.email}`);
      } catch (err) {
        // Never surface an integration failure to the visitor — the lead is
        // already in the logs and they have done nothing wrong.
        console.error("[chat-lead] HubSpot push failed:", err);
      }
    } else {
      console.warn("[chat-lead] HUBSPOT_TOKEN not set — lead logged only");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[chat-lead] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
