import { Resend } from "resend";

/**
 * Email helper.
 * Uses Resend in production; logs to console in dev or when RESEND_API_KEY is unset.
 *
 * Required env vars (production):
 *   RESEND_API_KEY      — your Resend API key
 *   ZEPPSTR_FROM_EMAIL  — sender address (default "Zeppstr Website <noreply@zeppstr.com>")
 *                         Note: requires domain verification in Resend dashboard
 *   ZEPPSTR_INBOX       — primary inbox (default "nitish@zeppstr.com")
 */

const FROM = process.env.ZEPPSTR_FROM_EMAIL ?? "Zeppstr Website <onboarding@resend.dev>";
export const PRIMARY_INBOX = process.env.ZEPPSTR_INBOX ?? "nitish@zeppstr.com";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  cc?: string | string[];
}

export async function sendEmail(opts: SendEmailOptions): Promise<{
  ok: boolean;
  id?: string;
  stub?: boolean;
  error?: unknown;
}> {
  // Dev / no-key fallback — log payload so devs can verify shape
  if (!resend) {
    // eslint-disable-next-line no-console
    console.log("[email-stub]", {
      from: FROM,
      to: opts.to,
      cc: opts.cc,
      subject: opts.subject,
      replyTo: opts.replyTo,
      bodyLength: opts.html.length,
    });
    return { ok: true, stub: true };
  }

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      cc: opts.cc,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
    });

    if (result.error) {
      return { ok: false, error: result.error };
    }
    return { ok: true, id: result.data?.id };
  } catch (err) {
    return { ok: false, error: err };
  }
}

// ─────────────────────────────────────────────
// Tiny HTML template helper — no JSX in API routes
// ─────────────────────────────────────────────

export function emailTemplate({
  title,
  intro,
  rows,
  message,
}: {
  title: string;
  intro?: string;
  rows: Array<{ label: string; value: string }>;
  message?: string;
}): string {
  const rowHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #E5E7EB;font:500 13px/1.4 -apple-system,sans-serif;color:#69727D;width:34%;vertical-align:top;">
          ${escapeHtml(r.label)}
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #E5E7EB;font:400 14px/1.5 -apple-system,sans-serif;color:#0A102F;">
          ${escapeHtml(r.value).replace(/\n/g, "<br/>")}
        </td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:32px 16px;background:#F8F8F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;">
    <tr><td style="padding:24px 28px;background:#0A102F;color:#fff;">
      <div style="font:500 12px/1 -apple-system,sans-serif;letter-spacing:0.08em;color:#3147FF;text-transform:uppercase;margin-bottom:8px;">Zeppstr · zeppstr.com</div>
      <div style="font:300 22px/1.3 -apple-system,sans-serif;">${escapeHtml(title)}</div>
    </td></tr>
    ${intro ? `<tr><td style="padding:20px 28px;font:400 14px/1.5 -apple-system,sans-serif;color:#404040;">${escapeHtml(intro)}</td></tr>` : ""}
    <tr><td style="padding:8px 16px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">${rowHtml}</table>
    </td></tr>
    ${
      message
        ? `<tr><td style="padding:16px 28px 24px;">
        <div style="font:500 13px/1.4 -apple-system,sans-serif;color:#69727D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Message</div>
        <div style="font:400 14px/1.6 -apple-system,sans-serif;color:#0A102F;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </td></tr>`
        : ""
    }
    <tr><td style="padding:16px 28px 24px;font:400 12px/1.4 -apple-system,sans-serif;color:#69727D;">
      Submitted via zeppstr.com · ${new Date().toISOString()}
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
