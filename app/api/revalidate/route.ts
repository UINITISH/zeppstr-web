import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sanity webhook handler.
 *
 * Configure in Sanity dashboard:
 *   Project → API → Webhooks → Create
 *   URL:        https://zeppstr.com/api/revalidate
 *   Trigger:    Create / Update / Delete
 *   Filter:     _type in ["solution","subService","industry","caseStudy","article","clientLogo"]
 *   Projection: { _type, slug, "parentSlug": parentSolution->slug.current }
 *   Secret:     match SANITY_REVALIDATE_SECRET env var
 *
 * Each content type's edits invalidate only the pages that depend on it.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, message: "Server not configured: SANITY_REVALIDATE_SECRET missing." },
      { status: 500 }
    );
  }

  let body: any;
  let isValid = false;
  try {
    const parsed = await parseBody<{
      _type: string;
      slug?: { current?: string } | string;
      parentSlug?: string;
    }>(request, secret);
    body = parsed.body;
    isValid = parsed.isValidSignature;
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Could not parse webhook." },
      { status: 400 }
    );
  }

  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Invalid signature." },
      { status: 401 }
    );
  }
  if (!body?._type) {
    return NextResponse.json(
      { ok: false, message: "Missing _type in payload." },
      { status: 400 }
    );
  }

  const slug =
    typeof body.slug === "string" ? body.slug : body.slug?.current ?? "";
  const parent = body.parentSlug;
  const revalidated: string[] = [];

  switch (body._type) {
    case "solution": {
      revalidated.push("/", "/solutions");
      if (slug) revalidated.push(`/solutions/${slug}`);
      break;
    }
    case "subService": {
      if (parent && slug) revalidated.push(`/solutions/${parent}/${slug}`);
      if (parent) revalidated.push(`/solutions/${parent}`);
      revalidated.push("/", "/solutions");
      break;
    }
    case "industry": {
      revalidated.push("/", "/industries");
      if (slug) revalidated.push(`/industries/${slug}`);
      break;
    }
    case "caseStudy": {
      revalidated.push("/", "/work");
      if (slug) revalidated.push(`/work/${slug}`);
      break;
    }
    case "article": {
      revalidated.push("/", "/insights");
      if (slug) revalidated.push(`/insights/${slug}`);
      break;
    }
    case "clientLogo": {
      revalidated.push("/", "/about/clients", "/industries");
      break;
    }
    default: {
      // Unknown types — just revalidate home as a safe default
      revalidated.push("/");
    }
  }

  for (const path of revalidated) {
    try {
      revalidatePath(path);
    } catch (err) {
      // Continue on individual failures — Vercel will report the rest
    }
  }

  // Also revalidate sitemap by tag (sitemap reads from Sanity and uses this tag)
  revalidateTag("sitemap");

  return NextResponse.json({ ok: true, revalidated, type: body._type });
}
