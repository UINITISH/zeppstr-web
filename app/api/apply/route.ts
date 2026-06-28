import { NextResponse } from "next/server";
import { applySchema } from "@/lib/schemas/apply";
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

  const parsed = applySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some fields didn't validate. Please check and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot trip — pretend success, do nothing
  if (data.website_hp && data.website_hp.length > 0) {
    return NextResponse.json({ ok: true, stub: true });
  }

  const html = emailTemplate({
    title: "New Strategic Diagnostic application",
    intro: `${data.fullName} from ${data.companyName} just applied. Reply within 48 hours.`,
    rows: [
      { label: "Name", value: data.fullName },
      { label: "Email", value: data.businessEmail },
      { label: "Company", value: data.companyName },
      { label: "Role", value: data.role },
      { label: "Website", value: data.companyWebsite },
      { label: "Industry", value: data.industry },
      { label: "Annual revenue", value: data.annualRevenue },
      { label: "Monthly marketing spend", value: data.monthlySpend },
      { label: "Solutions of interest", value: data.solutionsOfInterest.join(", ") },
      {
        label: "How they found us",
        value:
          data.heardFrom === "Referral" && data.referralName
            ? `Referral — ${data.referralName}`
            : data.heardFrom,
      },
    ],
    message: [
      `OUTCOME THEY WANT:\n${data.desiredOutcome}`,
      data.additionalContext ? `\n\nADDITIONAL CONTEXT:\n${data.additionalContext}` : "",
    ].join(""),
  });

  const result = await sendEmail({
    to: PRIMARY_INBOX,
    subject: `[Apply] ${data.companyName} — ${data.fullName}`,
    html,
    replyTo: data.businessEmail,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We received your application but the confirmation email failed. We'll still see it. Please email nitish@zeppstr.com if you don't hear back in 48 hours.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
