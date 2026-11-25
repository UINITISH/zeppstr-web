import { pushLeadToHubSpot, hubspotConfigured, type LeadInput } from "@/lib/hubspot";
import { sendEmail, PRIMARY_INBOX } from "@/lib/email";

/**
 * deliverLead — the single path every website form uses (25 Nov 2026).
 *
 * Order: log → HubSpot (system of record) → email notification (backup + alert).
 * A lead counts as DELIVERED only if HubSpot accepted it or a real email went
 * out. The old behaviour returned "ok" even when no key was set and the lead
 * existed only in a log that Vercel deletes within hours — the visitor saw
 * "Thanks" and the lead was gone. Now the route can tell the visitor the truth.
 */

export interface DeliverResult {
  delivered: boolean;
  hubspot: "ok" | "failed" | "not-configured";
  email: "ok" | "failed" | "not-configured";
}

export async function deliverLead(
  lead: LeadInput,
  notify?: { subject: string; html: string; replyTo?: string },
): Promise<DeliverResult> {
  // Always log first: recoverable from runtime logs if everything else fails.
  console.log(`[lead] ${lead.source}:`, {
    email: lead.email,
    name: lead.name,
    company: lead.company,
    page: lead.page,
  });

  let hubspot: DeliverResult["hubspot"] = "not-configured";
  if (hubspotConfigured()) {
    try {
      const r = await pushLeadToHubSpot(lead);
      hubspot = "ok";
      console.log(`[lead] HubSpot ${r.created ? "created" : "updated"} contact ${r.contactId}`);
    } catch (err) {
      hubspot = "failed";
      console.error("[lead] HubSpot push failed:", err);
    }
  } else {
    console.warn("[lead] HUBSPOT_TOKEN not set — lead not in CRM");
  }

  let email: DeliverResult["email"] = "not-configured";
  if (notify) {
    const r = await sendEmail({ to: PRIMARY_INBOX, ...notify });
    email = r.stub ? "not-configured" : r.ok ? "ok" : "failed";
  }

  return { delivered: hubspot === "ok" || email === "ok", hubspot, email };
}
