"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { PortableText } from "@/components/article/PortableText";
import { cn } from "@/lib/cn";
import type { FAQ } from "@/sanity/lib/types";

interface FAQAccordionProps {
  faqs: FAQ[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}

/**
 * FAQ Accordion — used on Solution hubs, Sub-services, Industry pages.
 * Built on Radix Accordion for full keyboard + ARIA accessibility.
 */
export function FAQAccordion({ faqs, eyebrow, heading, className }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={cn("container-layout py-20 md:py-24", className)}>
      <div className="max-w-3xl mx-auto">
        {(eyebrow || heading) && (
          <div className="mb-12 text-center">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {heading && (
              <h2 className="font-display font-light text-display-lg text-ink-headline tracking-tight">
                {heading}
              </h2>
            )}
          </div>
        )}

        <Accordion.Root type="single" collapsible className="border-t border-rule">
          {faqs.map((faq, idx) => (
            <Accordion.Item
              key={idx}
              value={`item-${idx}`}
              className="border-b border-rule"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    "flex w-full items-start justify-between gap-6 py-6 text-left",
                    "font-display font-light text-display-sm text-ink-headline tracking-tight",
                    "hover:text-brand-blue transition-colors duration-hover",
                    "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 rounded",
                    "[&[data-state=open]>svg]:rotate-180"
                  )}
                >
                  {faq.question}
                  <ChevronDown />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={cn(
                  "overflow-hidden",
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2",
                  "duration-300 ease-smooth"
                )}
              >
                <div className="pb-6 pr-12 [&_p]:text-body [&_p]:mb-4 [&_p:last-child]:mb-0">
                  <PortableText value={faq.answer} />
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-1.5 transition-transform duration-300 ease-smooth"
      aria-hidden="true"
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}
