import Link from "next/link";

interface ManifestoBlockProps {
  eyebrow: string;
  headline: React.ReactNode;
  body: string;
  link?: { label: string; href: string };
}

/**
 * Yellow full-bleed manifesto — the page's loudest statement.
 * Pure brand-yellow background, ink-headline type, no decoration.
 * Used as a punctuation mark between content sections.
 */
export function ManifestoBlock({ eyebrow, headline, body, link }: ManifestoBlockProps) {
  return (
    <section className="relative z-10 bg-brand-yellow text-ink-headline">
      <div className="container-layout py-28 md:py-44">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline/70 mb-12">
          {eyebrow}
        </p>

        <h2 className="font-extralight tracking-[-0.03em] text-[clamp(48px,8vw,128px)] leading-[0.92] mb-16 md:mb-20 max-w-[16ch]">
          {headline}
        </h2>

        <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-ink-headline/20 items-center">
          <p className="md:col-span-7 font-body text-body-lg leading-[1.55] max-w-[56ch]">
            {body}
          </p>
          {link && (
            <div className="md:col-span-5 flex md:justify-end">
              <Link
                href={link.href}
                className="inline-flex items-center gap-3 bg-ink-headline text-white font-body font-medium text-[clamp(15px,1.1vw,18px)] px-8 py-4 hover:bg-emerald-900 transition-colors duration-hover"
              >
                <span>{link.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
