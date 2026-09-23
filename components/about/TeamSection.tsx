import Image from "next/image";
import Link from "next/link";
import { LEADERSHIP, TEAM, initials, type TeamMember } from "@/lib/team";

/**
 * TeamSection — leadership and team on the About page.
 *
 * ── THE PORTRAIT PROBLEM ────────────────────────────────────────────────────
 * No photography has been supplied. The two usual responses are both wrong:
 * stock headshots of strangers (a checkable lie on the page whose entire job is
 * establishing that real people do this work), or silhouette avatars (which
 * read as a broken image).
 *
 * The third option is a monogram tile — initials set on the brand emerald, at
 * the same size and aspect as a real portrait. It reads as a deliberate
 * placeholder, it keeps the grid rhythm intact, and it swaps to a photograph
 * the moment one is added with no layout shift, because the frame is identical.
 *
 * ── WHY THE TEAM GRID CAN RENDER EMPTY ──────────────────────────────────────
 * Only the founder is documented. The grid renders whatever is in lib/team.ts
 * and nothing more, so the section is visibly incomplete rather than quietly
 * populated with invented colleagues.
 */

function Portrait({
  member,
  size,
}: {
  member: TeamMember;
  /** "lg" for leadership, "sm" for the team grid. */
  size: "lg" | "sm";
}) {
  const monogramClass =
    size === "lg"
      ? "text-display-lg"
      : "text-display-sm";

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-bg-inverse">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name} — ${member.role}, Zeppstr`}
          fill
          sizes={size === "lg" ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 50vw, 22vw"}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden="true"
            className={`font-display font-light text-brand-yellow tracking-[-0.02em] ${monogramClass}`}
          >
            {initials(member.name)}
          </span>
        </div>
      )}
    </div>
  );
}

export function TeamSection() {
  const lead = LEADERSHIP[0];
  const hasPhotos =
    LEADERSHIP.some((m) => m.photo) || TEAM.some((m) => m.photo);

  return (
    <>
      {/* ── Leadership ── */}
      {lead && (
        <section
          className="bg-bg-secondary border-y border-ink-headline/10"
          aria-labelledby="leadership-heading"
        >
          {/* Asymmetric padding: leadership and the team grid are one idea in
              two parts, so the seam between them is tighter than the gap to
              the sections above and below. Two stacked py-32s left ~250px of
              dead air here. */}
          <div className="container-layout pt-24 md:pt-32 pb-20 md:pb-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10">
              Leadership
            </p>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-4">
                <Portrait member={lead} size="lg" />
              </div>
              <div className="md:col-span-8">
                <h2
                  id="leadership-heading"
                  className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline mb-3 text-balance"
                >
                  {lead.name}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-8">
                  {lead.role}
                </p>
                {lead.bio?.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-body text-body-lg text-ink-body leading-relaxed max-w-[58ch]"
                        : "mt-6 font-body text-body text-ink-muted leading-relaxed max-w-[58ch]"
                    }
                  >
                    {para}
                  </p>
                ))}
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link
                    href="/contact"
                    className="inline-flex font-mono text-[13px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Get in touch &rarr;
                  </Link>
                  {lead.linkedin && (
                    <Link
                      href={lead.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex font-mono text-[13px] uppercase tracking-[0.18em] text-ink-muted border-b border-ink-muted/40 pb-0.5 hover:text-ink-headline hover:border-brand-yellow transition-colors"
                    >
                      LinkedIn &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── The team ── */}
      <section
        className="bg-bg-primary border-b border-ink-headline/10"
        aria-labelledby="team-heading"
      >
        <div className="container-layout pt-20 md:pt-24 pb-24 md:pb-32">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-14 md:mb-16">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                The team
              </p>
              <h2
                id="team-heading"
                className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[22ch] text-balance"
              >
                The people you meet are the people who do the work.
              </h2>
            </div>
            <p className="md:col-span-5 font-body text-body text-ink-muted leading-relaxed">
              Capacity is capped at a dozen clients a year precisely so that
              senior time is not a pitch device. There is no bench to hand your
              account to once the contract is signed.
            </p>
          </div>

          {TEAM.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {TEAM.map((m) => (
                <li key={m.slug}>
                  <Portrait member={m} size="sm" />
                  <p className="mt-4 font-display font-light text-display-xs text-ink-headline leading-[1.2] tracking-[-0.01em]">
                    {m.name}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    {m.role}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            /* Honest empty state. A grid of invented colleagues would be worse
               than a section that says what it is. */
            <div className="border-t border-ink-headline/15 pt-10">
              <p className="font-body text-body text-ink-body leading-relaxed max-w-[62ch]">
                Team profiles are being photographed. Rather than fill this space
                with stock portraits of people who do not work here, it stays
                empty until the real ones exist — which is the same rule
                we apply to the numbers elsewhere on this site.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b border-ink-headline pb-1 hover:text-brand-blue hover:border-brand-yellow transition-colors"
              >
                Meet the team on a call instead &rarr;
              </Link>
            </div>
          )}

          {/* Only when there ARE people in the grid. With an empty grid the
              paragraph above already says portraits are pending, and printing
              both reads as a stutter. */}
          {!hasPhotos && TEAM.length > 0 && (
            <p className="mt-10 font-body text-body-sm text-ink-muted/70 leading-relaxed max-w-[62ch]">
              {/* Visible to the client in review, and the reason the monogram
                  tiles look deliberate rather than broken. Delete this line
                  once portraits are in /public/team/. */}
              Portraits pending — monogram tiles are placeholders and swap
              to photography with no layout change.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
