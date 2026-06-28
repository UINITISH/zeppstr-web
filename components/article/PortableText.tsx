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
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display font-extralight text-display-md text-ink-headline mt-16 mb-6 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-light text-display-sm text-ink-headline mt-12 mb-4 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-body font-semibold text-body-lg text-ink-headline mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-body text-body-lg text-ink-body leading-relaxed mb-6">
        {children}
      </p>
    ),
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

export function PortableText({ value, className }: PortableTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={cn("portable-text", className)}>
      <BasePortableText value={value} components={components} />
    </div>
  );
}
