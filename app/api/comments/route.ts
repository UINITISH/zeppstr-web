import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { z } from "zod";
import { sanityConfig } from "@/sanity/lib/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Reader comments — submission endpoint.
 *
 * Comments are written to Sanity with `approved: false` and never appear on the
 * site until an editor approves them in the Studio. Three cheap defences run
 * before the write: a Zod shape check, a honeypot field, and a per-IP
 * in-memory rate limit. That is deliberately not bulletproof — moderation is
 * the actual control; these just keep the volume sane.
 */

const schema = z.object({
  articleId: z.string().min(1),
  name: z.string().min(2, "Tell us your name.").max(80),
  email: z.string().email("Enter a valid email."),
  body: z.string().min(2, "Write something first.").max(2000),
  website: z.string().max(0).optional(), // honeypot
});

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Comments are not configured yet." },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "You've posted a few already — give it a few minutes." },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 422 }
    );
  }

  const { articleId, name, email, body, website } = parsed.data;

  // Honeypot trip — pretend success so bots don't learn anything.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true, pending: true });
  }

  try {
    const writeClient = createClient({ ...sanityConfig, useCdn: false, token });
    await writeClient.create({
      _type: "comment",
      article: { _type: "reference", _ref: articleId },
      name,
      email,
      body,
      approved: false,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Couldn't save that. Try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, pending: true });
}
