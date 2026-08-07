import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas/contact";
import { sendEmail, emailTemplate, PRIMARY_INBOX } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Newsletter — The Brief.
 * V1: validates email, sends an internal notification so Nitish manually adds to ConvertKit/Mailchimp.
 * V2 (later): direct-add to ESP via API once provider is selected.
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

  const html = emailTemplate({
    title: "New subscriber to The Brief",
    rows: [
      { label: "Email", value: email },
      { label: "Source", value: source },
      { label: "Subscribed at", value: new Date().toISOString() },
    ],
  });

  const result = await sendEmail({
    to: PRIMARY_INBOX,
    subject: `[Brief] New subscriber: ${email}`,
    html,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
