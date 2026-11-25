import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas/contact";
import { emailTemplate } from "@/lib/email";
import { deliverLead } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Newsletter — The Brief.
 * Subscribers go to HubSpot as contacts (note: "Newsletter · The Brief") plus an email alert.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "Invalid email.",
      },
      { status: 422 }
    );
  }

  const { email, source = "unknown", website } = parsed.data;

  // Honeypot
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true, stub: true });
  }

  const result = await deliverLead(
    {
      email,
      source: "Newsletter · The Brief",
      page: source,
      details: [["Subscribed from", source]],
    },
    {
      subject: `[Brief] New subscriber: ${email}`,
      html: emailTemplate({
        title: "New subscriber to The Brief",
        rows: [
          { label: "Email", value: email },
          { label: "Source", value: source },
          { label: "Subscribed at", value: new Date().toISOString() },
        ],
      }),
    },
  );

  if (!result.delivered) {
    return NextResponse.json({ ok: false, message: "Something went wrong sending this. Please try again, or email nitish@zeppstr.com directly." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
