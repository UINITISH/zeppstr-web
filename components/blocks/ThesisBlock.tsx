import Link from "next/link";

interface ThesisBlockProps {
  eyebrow: string;
  headline: React.ReactNode;
  body: string[];
  link?: { label: string; href: string };
}

/**
 * Thesis / POV section. Centered editorial layout.
 * Used on Home (POV teaser) and Our POV manifesto page.
 */
export function ThesisBlock({ eyebrow, headline, body, link }: ThesisBlockProps) {
  return (
    <section className="container-reading py-32 text-center">
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h2 className="font-light text-display-lg text-ink-headline mb-8 tracking-tight">
        {headline}
      </h2>
      {body.map((para, i) => (
        <p key={i} className="font-body text-body-lg text-ink-body leading-relaxed mb-6">
          {para}
        </p>
      ))}
      {link && (
        <Link
          href={link.href}
          className="inline-block font-body font-medium text-brand-blue border-b border-brand-blue pb-0.5 mt-4 hover:opacity-70 transition-opacity"
        >
          {link.label}
        </Link>
      )}
    </section>
  );
}
