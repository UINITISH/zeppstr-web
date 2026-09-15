import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { sanityImageProps } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

/**
 * Portable Text renderer.
 *
 * Renders Sanity rich text with brand-consistent typography.
 * Used in: case studies, articles, solution descriptions, industry pages.
 *
 * Voice rules baked in:
 *  - Headlines use Plus Jakarta Sans (extra-light for h2, light for h3)
 *  - Body uses Inter
 *  - Pull quotes get the brand-yellow left accent border
 */

interface PortableTextProps {
  value: PortableTextBlock[] | undefined;
  className?: string;
  /**
   * Map of block `_key` → anchor id. Supplied by the article page so the
   * sidebar table of contents and the rendered headings agree on ids without
   * any client-side DOM scraping.
   */
  headingIds?: Record<string, string>;
  /**
   * Draw a hairline + accent mark above each h2. Long-form articles need the
   * extra section break; short rich-text fields (solutions, industries) don't.
   */
  sectionMarkers?: boolean;
}

/**
 * Reconstruct a markdown pipe-table from a text block whose row newlines were
 * collapsed to spaces during seeding. Strategy: split on "|", count separator
 * cells (---) to get the column count, drop empties + separators, then chunk.
 * Returns null when the text isn't a table.
 */
const SEP_CELL = /^:?-{2,}:?$/;
function parsePipeTable(text: string): { headers: string[]; rows: string[][] } | null {
  if (!text || !text.includes("|") || !/\|\s*:?-{2,}/.test(text)) return null;
  const cells = text.split("|").map((c) => c.trim());
  const cols = cells.filter((c) => SEP_CELL.test(c)).length;
  if (cols < 2) return null;
  const data = cells.filter((c) => c !== "" && !SEP_CELL.test(c));
  if (data.length < cols * 2) return null; // need at least a header + one row
  const headers = data.slice(0, cols);
  const rows: string[][] = [];
  for (let i = cols; i + cols <= data.length; i += cols) {
    rows.push(data.slice(i, i + cols));
  }
  return { headers, rows };
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-10 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-ink-headline">
            {headers.map((h, i) => (
              <th
                key={i}
                className="py-3 pr-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-headline whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-rule">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={cn(
                    "py-3 pr-6 font-body text-body-sm whitespace-nowrap",
                    c === 0 ? "text-ink-headline font-medium" : "text-ink-body"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function buildComponents(
  headingIds: Record<string, string>,
  sectionMarkers: boolean
): PortableTextComponents {
  return {
  block: {
    h2: ({ children, value }) => (
      <>
        {sectionMarkers && (
          <div aria-hidden="true" className="flex items-center gap-3 mt-16 mb-7">
            <span className="w-7 h-[3px] bg-brand-yellow shrink-0" />
            <span className="flex-1 h-px bg-rule" />
          </div>
        )}
        <h2
          id={headingIds[(value as { _key?: string })?._key ?? ""]}
          className={cn(
            "scroll-mt-28 font-display font-light text-display-md text-ink-headline mb-6 tracking-tight",
            sectionMarkers ? "mt-0" : "mt-16"
          )}
        >
          {children}
        </h2>
      </>
    ),
    h3: ({ children, value }) => (
      <h3
        id={headingIds[(value as { _key?: string })?._key ?? ""]}
        className="scroll-mt-28 font-display font-light text-display-sm text-ink-headline mt-12 mb-4 tracking-tight"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-body font-semibold text-body-lg text-ink-headline mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children, value }) => {
      const raw = ((value as { children?: { text?: string }[] })?.children ?? [])
        .map((c) => c.text ?? "")
        .join("");
      const table = parsePipeTable(raw);
      if (table) return <DataTable headers={table.headers} rows={table.rows} />;
      return (
        <p className="font-body text-body-lg text-ink-body leading-relaxed mb-6">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="my-10 pl-6 border-l-2 border-brand-yellow font-display font-light text-display-sm text-ink-headline italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 marker:text-brand-blue">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 marker:text-brand-blue">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="font-body text-body-lg text-ink-body leading-relaxed pl-2">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="font-body text-body-lg text-ink-body leading-relaxed pl-2">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-ink-headline">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-body-sm bg-bg-secondary text-ink-headline px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = href.startsWith("http");
      const className =
        "text-brand-blue underline underline-offset-2 hover:opacity-70 transition-opacity";

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
  },

  types: {
    image: ({ value }: { value: SanityImage }) => {
      const props = sanityImageProps(value, { width: 1280 });
      if (!props) return null;
      return (
        <figure className="my-10">
          <Image
            src={props.src}
            width={props.width}
            height={props.height}
            alt={props.alt}
            placeholder={props.blurDataURL ? "blur" : "empty"}
            blurDataURL={props.blurDataURL}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          {value.alt && (
            <figcaption className="font-body text-body-sm text-ink-muted mt-3 text-center italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  };
}

export function PortableText({
  value,
  className,
  headingIds,
  sectionMarkers = false,
}: PortableTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={cn("portable-text", className)}>
      <BasePortableText
        value={value}
        components={buildComponents(headingIds ?? {}, sectionMarkers)}
      />
    </div>
  );
}
