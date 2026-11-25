import { deliverLead } from "@/lib/lead";
import { NextResponse } from "next/server";

/**
 * /api/diagnostic-intake
 *
 * Receives a prospect's structured intake form data and:
 *   1. Creates (or upserts) a contact in HubSpot via the CRM API
 *   2. Attaches a Note to the contact containing the full intake transcript
 *      so the team can read it inside HubSpot when reviewing the lead
 *   3. Always logs to console as a fallback so leads aren't lost in dev
 *      or if HubSpot is misconfigured
 *
 * Required env vars (optional — falls back to log-only if missing):
 *   HUBSPOT_TOKEN — Private App access token with scopes:
 *     crm.objects.contacts.write
 *     crm.objects.notes.write
 *     crm.associations.write
 */

interface IntakePayload {
  fullName: string;
  email: string;
  company: string;
  website?: string;
  annualRevenue: string;
  marketingBudget: string;
  constraints: string[];
  industry: string;
  channels: string[];
  desiredOutcome: string;
  startTimeline: string;
}

const CONSTRAINT_LABELS: Record<string, string> = {
  brand: "Brand & positioning",
  demand: "Demand generation / paid + organic",
  conversion: "Conversion / website performance",
  lifecycle: "Lifecycle / retention / owned channels",
  measurement: "Measurement / attribution",
  unknown: "Doesn't know — that's why they're here",
};

const TIMELINE_LABELS: Record<string, string> = {
  now: "Ready now",
  "1-3": "Within 1–3 months",
  "3-6": "3–6 months out",
  exploring: "Just exploring",
};

function formatNoteBody(d: IntakePayload): string {
  return [
    "<strong>Diagnostic Intake — Preliminary Submission</strong>",
    "",
    `<strong>Annual revenue:</strong> ${d.annualRevenue}`,
    `<strong>Marketing investment:</strong> ${d.marketingBudget}/year`,
    `<strong>Industry:</strong> ${d.industry}`,
    "",
    `<strong>Channels currently running:</strong><br>${d.channels.join(", ") || "—"}`,
    "",
    `<strong>Where it leaks:</strong><br>${d.constraints.map((c) => CONSTRAINT_LABELS[c] ?? c).join(", ")}`,
    "",
    `<strong>Desired 12-month outcome:</strong><br>${d.desiredOutcome.replace(/\n/g, "<br>")}`,
    "",
    `<strong>Engagement timing:</strong> ${TIMELINE_LABELS[d.startTimeline] ?? d.startTimeline}`,
    "",
    `<em>Submitted ${new Date().toISOString()} via /book-consultation</em>`,
  ].join("<br>");
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as IntakePayload;

    // Basic validation
    if (
      !data.fullName ||
      !data.email ||
      !data.company ||
      !data.annualRevenue ||
      !data.constraints ||
      data.constraints.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await deliverLead(
      {
        email: data.email,
        name: data.fullName,
        company: data.company,
        website: data.website,
        source: "Diagnostic intake",
        page: "/book-consultation",
        details: [
          ["Annual revenue", data.annualRevenue],
          ["Marketing investment", `${data.marketingBudget}/year`],
          ["Industry", data.industry],
          ["Channels running", data.channels?.join(", ")],
          ["Where it leaks", data.constraints.map((c) => CONSTRAINT_LABELS[c] ?? c).join(", ")],
          ["Desired 12-month outcome", data.desiredOutcome],
          ["Engagement timing", TIMELINE_LABELS[data.startTimeline] ?? data.startTimeline],
        ],
      },
      {
        subject: `[Diagnostic] ${data.company} — ${data.fullName}`,
        replyTo: data.email,
        html: formatNoteBody(data),
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
    console.error("[diagnostic-intake] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
