import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";
import { sendEmail, emailTemplate, PRIMARY_INBOX } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some fields didn't validate.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  if (data.website_hp && data.website_hp.length > 0) {
    return NextResponse.json({ ok: true, stub: true });
  }

  const html = emailTemplate({
    title: `New ${data.topic.toLowerCase()}`,
    rows: [
      { label: "Name", value: data.name },
      { label: "Email", value: data.businessEmail },
      { label: "Topic", value: data.topic },
    ],
    message: data.message,
  });

  const result = await sendEmail({
    to: PRIMARY_INBOX,
    subject: `[Contact · ${data.topic}] ${data.name}`,
    html,
    replyTo: data.businessEmail,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "Couldn't send the message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
