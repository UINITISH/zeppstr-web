import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";
import { emailTemplate } from "@/lib/email";
import { deliverLead } from "@/lib/lead";

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

  const result = await deliverLead(
    {
      email: data.businessEmail,
      name: data.name,
      source: `Contact form · ${data.topic}`,
      page: "/contact",
      details: [
        ["Topic", data.topic],
        ["Message", data.message],
      ],
    },
    {
      subject: `[Contact · ${data.topic}] ${data.name}`,
      replyTo: data.businessEmail,
      html: emailTemplate({
        title: `New ${data.topic.toLowerCase()}`,
        rows: [
          { label: "Name", value: data.name },
          { label: "Email", value: data.businessEmail },
          { label: "Topic", value: data.topic },
        ],
        message: data.message,
      }),
    },
  );

  if (!result.delivered) {
    return NextResponse.json({ ok: false, message: "Something went wrong sending this. Please try again, or email nitish@zeppstr.com directly." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
