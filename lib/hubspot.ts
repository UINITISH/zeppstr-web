/**
 * HubSpot lead sync — every website form writes through here (25 Nov 2026).
 *
 * WHAT IT DOES
 *   1. Creates the contact, or finds and updates it if the email already exists.
 *   2. Adds a note with the full submission and which form it came from.
 *   3. Associates the note with the contact.
 * One contact per person, one note per submission — so a returning visitor's
 * history stacks up on a single record instead of creating duplicates.
 *
 * SETUP (one time, in HubSpot portal 245883344):
 *   Settings → Integrations → Private Apps → Create private app
 *   Scopes: crm.objects.contacts.read, crm.objects.contacts.write
 *   (notes are written through the contacts scopes)
 *   Copy the access token into Vercel → zeppstr-web → Settings →
 *   Environment Variables as HUBSPOT_TOKEN, for Production AND Preview.
 *
 * Lifecycle stage and lead status are set only when the contact is CREATED.
 * Overwriting them on an existing record could move a customer back to "lead",
 * which HubSpot rejects and which would be wrong anyway.
 */

const API = "https://api.hubapi.com";

export interface LeadInput {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  website?: string;
  jobTitle?: string;
  /** Which form produced the lead, e.g. "Contact form". Shown in the note heading. */
  source: string;
  /** Page path the form was on, if known. */
  page?: string;
  /** Label/value pairs written into the note, in order. */
  details: Array<[string, string | undefined | null]>;
}

export function hubspotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_TOKEN?.trim());
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function splitName(name?: string): { firstname?: string; lastname?: string } {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return {};
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") || undefined };
}

function clean<T extends Record<string, string | undefined>>(o: T): Record<string, string> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== "")) as Record<
    string,
    string
  >;
}

async function hs(path: string, token: string, init: RequestInit = {}) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}

/** Push one lead to HubSpot. Throws on failure so the caller can fall back. */
export async function pushLeadToHubSpot(lead: LeadInput): Promise<{ contactId: string; created: boolean }> {
  const token = process.env.HUBSPOT_TOKEN?.trim();
  if (!token) throw new Error("HUBSPOT_TOKEN not set");

  const website = lead.website?.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  const shared = clean({
    email: lead.email.trim().toLowerCase(),
    ...splitName(lead.name),
    company: lead.company,
    phone: lead.phone,
    website,
    jobtitle: lead.jobTitle,
  });

  // 1. Create, or update on conflict.
  let contactId: string | null = null;
  let created = false;
  const createRes = await hs("/crm/v3/objects/contacts", token, {
    method: "POST",
    body: JSON.stringify({ properties: { ...shared, lifecyclestage: "lead", hs_lead_status: "NEW" } }),
  });

  if (createRes.ok) {
    contactId = (await createRes.json()).id;
    created = true;
  } else if (createRes.status === 409) {
    const lookup = await hs(
      `/crm/v3/objects/contacts/${encodeURIComponent(shared.email)}?idProperty=email`,
      token,
    );
    if (!lookup.ok) throw new Error(`HubSpot lookup failed (${lookup.status}): ${await lookup.text()}`);
    contactId = (await lookup.json()).id;
    const { email: _email, ...updatable } = shared;
    void _email;
    if (Object.keys(updatable).length) {
      const patch = await hs(`/crm/v3/objects/contacts/${contactId}`, token, {
        method: "PATCH",
        body: JSON.stringify({ properties: updatable }),
      });
      if (!patch.ok) console.warn(`[hubspot] contact update failed (${patch.status}): ${await patch.text()}`);
    }
  } else {
    throw new Error(`HubSpot contact create failed (${createRes.status}): ${await createRes.text()}`);
  }
  if (!contactId) throw new Error("HubSpot contact ID not resolved");

  // 2. Note with the whole submission.
  const lines = [
    `<strong>Website lead — ${escapeHtml(lead.source)}</strong>`,
    lead.page ? `Page: ${escapeHtml(lead.page)}` : null,
    "",
    ...lead.details
      .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
      .map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v)).replace(/\n/g, "<br>")}`),
    "",
    `<em>Submitted ${new Date().toISOString()}</em>`,
  ].filter((l) => l !== null);

  const noteRes = await hs("/crm/v3/objects/notes", token, {
    method: "POST",
    body: JSON.stringify({
      properties: { hs_timestamp: Date.now().toString(), hs_note_body: lines.join("<br>") },
    }),
  });
  if (!noteRes.ok) {
    // Contact exists; losing the note loses the detail, so surface it in logs.
    console.error(`[hubspot] note create failed (${noteRes.status}): ${await noteRes.text()}`);
    return { contactId, created };
  }
  const noteId: string = (await noteRes.json()).id;

  // 3. Note → contact (association type 202 is HubSpot-defined note→contact).
  const assoc = await hs(`/crm/v4/objects/notes/${noteId}/associations/contacts/${contactId}`, token, {
    method: "PUT",
    body: JSON.stringify([{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }]),
  });
  if (!assoc.ok) console.warn(`[hubspot] note association failed (${assoc.status}): ${await assoc.text()}`);

  return { contactId, created };
}
