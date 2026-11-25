import { NextResponse } from "next/server";
import { applySchema } from "@/lib/schemas/apply";
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

  const result = await deliverLead(
    {
      email: data.businessEmail,
      name: data.fullName,
      company: data.companyName,
      website: data.companyWebsite,
      jobTitle: data.role,
      source: "Strategic Diagnostic application",
      page: "/apply",
      details: [
        ["Role", data.role],
        ["Industry", data.industry],
        ["Annual revenue", data.annualRevenue],
        ["Monthly marketing spend", data.monthlySpend],
        ["Solutions of interest", data.solutionsOfInterest.join(", ")],
        [
          "How they found us",
          data.heardFrom === "Referral" && data.referralName ? `Referral — ${data.referralName}` : data.heardFrom,
        ],
        ["Outcome they want", data.desiredOutcome],
        ["Additional context", data.additionalContext],
      ],
    },
    {
      subject: `[Apply] ${data.companyName} — ${data.fullName}`,
      html,
      replyTo: data.businessEmail,
    },
  );

  if (!result.delivered) {
    return NextResponse.json({ ok: false, message: "Something went wrong sending this. Please try again, or email nitish@zeppstr.com directly." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
