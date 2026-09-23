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

async function pushToHubSpot(d: IntakePayload, token: string): Promise<void> {
  const [firstName, ...restName] = d.fullName.trim().split(/\s+/);
  const lastName = restName.join(" ") || "—";

  // Strip protocol from website for cleaner HubSpot record
  const cleanWebsite = d.website
    ? d.website.replace(/^https?:\/\//i, "").replace(/\/$/, "")
    : undefined;

  const baseHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // ─── Step 1: Create or update contact ─────────────────────────────
  const properties: Record<string, string> = {
    email: d.email,
    firstname: firstName,
    lastname: lastName,
    company: d.company,
    lifecyclestage: "lead",
  };
  if (cleanWebsite) properties.website = cleanWebsite;

  let contactId: string | null = null;

  const createRes = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({ properties }),
    }
  );

  if (createRes.ok) {
    const created = await createRes.json();
    contactId = created.id;
  } else if (createRes.status === 409) {
    // Conflict — contact already exists. Look up by email then update.
    const lookupRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(d.email)}?idProperty=email`,
      { headers: baseHeaders }
    );
    if (lookupRes.ok) {
      const existing = await lookupRes.json();
      contactId = existing.id;
      // PATCH the contact with any updated fields (latest company, name, etc.)
      await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: "PATCH",
          headers: baseHeaders,
          body: JSON.stringify({ properties }),
        }
      );
    }
  } else {
    const errText = await createRes.text();
    throw new Error(`HubSpot contact create failed (${createRes.status}): ${errText}`);
  }

  if (!contactId) {
    throw new Error("Could not resolve HubSpot contact ID");
  }

  // ─── Step 2: Create a Note with the full intake transcript ────────
  const noteRes = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      properties: {
        hs_timestamp: Date.now().toString(),
        hs_note_body: formatNoteBody(d),
      },
    }),
  });

  if (!noteRes.ok) {
    const errText = await noteRes.text();
    throw new Error(`HubSpot note create failed (${noteRes.status}): ${errText}`);
  }

  const note = await noteRes.json();
  const noteId: string = note.id;

  // ─── Step 3: Associate the note with the contact ──────────────────
  // Association type 202 = note → contact (HubSpot defined)
  const assocRes = await fetch(
    `https://api.hubapi.com/crm/v4/objects/notes/${noteId}/associations/contacts/${contactId}`,
    {
      method: "PUT",
      headers: baseHeaders,
      body: JSON.stringify([
        { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 },
      ]),
    }
  );

  if (!assocRes.ok) {
    const errText = await assocRes.text();
    // Don't throw — contact + note exist, association is best-effort
    console.warn(`HubSpot association failed (${assocRes.status}): ${errText}`);
  }
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

    // Always log so the lead is captured even if HubSpot fails / isn't configured
    console.log("[diagnostic-intake] new submission:", {
      name: data.fullName,
      email: data.email,
      company: data.company,
      website: data.website,
      revenue: data.annualRevenue,
      budget: data.marketingBudget,
      industry: data.industry,
      channels: data.channels,
      constraints: data.constraints,
      outcome: data.desiredOutcome,
      timeline: data.startTimeline,
    });

    const hsToken = process.env.HUBSPOT_TOKEN;
    if (hsToken) {
      try {
        await pushToHubSpot(data, hsToken);
        console.log(`[diagnostic-intake] pushed to HubSpot: ${data.email}`);
      } catch (err) {
        // Log the failure but still return success to the user — the lead is in console logs
        console.error("[diagnostic-intake] HubSpot push failed:", err);
      }
    } else {
      console.warn(
        "[diagnostic-intake] HUBSPOT_TOKEN not set — submission logged only"
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[diagnostic-intake] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
