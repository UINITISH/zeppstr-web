"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Solution, Industry, SubService } from "@/sanity/lib/types";

interface SolutionWithServices extends Solution {
  subServices?: SubService[];
}

interface MobileDrawerProps {
  solutions: SolutionWithServices[];
  industries: Industry[];
}

/**
 * Mobile drawer — full-screen sheet slid in from the right.
 * Accordion sub-menus for Solutions + Industries to avoid deep stacking.
 */
export function MobileDrawer({ solutions, industries }: MobileDrawerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open menu"
          className="md:hidden p-2 -mr-2 text-ink-headline focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 rounded"
        >
          <MenuIcon />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 bg-bg-inverse/40 backdrop-blur-sm z-40",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in data-[state=closed]:fade-out"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-[60] w-full max-w-sm bg-bg-primary",
            "shadow-2xl flex flex-col",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
            "duration-300 ease-smooth"
          )}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Navigation menu</Dialog.Title>
            <Dialog.Description>
              Browse Solutions, Industries, Work, Insights, and About sections of zeppstr.com.
            </Dialog.Description>
          </VisuallyHidden.Root>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-rule">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center"
              aria-label="Zeppstr — home"
            >
              <Image
                src="/brand/zeppstr-logo-horizontal.png"
                alt="Zeppstr"
                width={1999}
                height={548}
                className="h-[26px] w-auto"
              />
            </Link>
            <Dialog.Close asChild>
              <button
                aria-label="Close menu"
                className="p-2 -mr-2 text-ink-headline focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 rounded"
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Accordion.Root type="multiple" className="space-y-2">
              {/* Solutions accordion */}
              <Accordion.Item value="solutions" className="border-b border-rule pb-2">
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-center justify-between py-3",
                      "font-display text-display-sm font-light text-ink-headline",
                      "hover:text-brand-blue transition-colors duration-hover",
                      "[&[data-state=open]>svg]:rotate-180"
                    )}
                  >
                    Solutions
                    <ChevronDown />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2">
                  <div className="pl-2 pb-3 space-y-3">
                    {solutions.map((s) => (
                      <Link
                        key={s._id}
                        href={`/solutions/${s.slug.current}`}
                        onClick={() => setOpen(false)}
                        className="block py-1.5"
                      >
                        <div className="font-body font-medium text-body text-ink-headline hover:text-brand-blue transition-colors">
                          {s.name}
                        </div>
                        {s.tagline && (
                          <div className="font-body text-body-sm text-ink-muted mt-0.5">
                            {s.tagline}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Industries accordion */}
              <Accordion.Item value="industries" className="border-b border-rule pb-2">
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-center justify-between py-3",
                      "font-display text-display-sm font-light text-ink-headline",
                      "hover:text-brand-blue transition-colors duration-hover",
                      "[&[data-state=open]>svg]:rotate-180"
                    )}
                  >
                    Industries
                    <ChevronDown />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2">
                  <div className="pl-2 pb-3 space-y-2">
                    {industries.map((i) => (
                      <Link
                        key={i._id}
                        href={`/industries/${i.slug.current}`}
                        onClick={() => setOpen(false)}
                        className="block font-body text-body text-ink-headline hover:text-brand-blue transition-colors py-1.5"
                      >
                        {i.name}
                      </Link>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>

              {/* Plain links */}
              {SIMPLE_NAV_ITEMS.map((item) => (
                <div key={item.href} className="border-b border-rule pb-2">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-display-sm font-light text-ink-headline hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </Accordion.Root>

            {/* CTA */}
            <Link
              href="/book-consultation"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center bg-brand-yellow text-[#000] font-body font-medium text-button px-[42px] py-[18px] rounded hover:bg-brand-yellow-hover transition-colors"
            >
              Book a Call
            </Link>

            {/* Footer info */}
            <div className="mt-10 pt-6 border-t border-rule">
              <p className="font-display text-body-sm font-medium text-brand-blue mb-2">
                You Grow, We Grow.
              </p>
              <p className="font-body text-body-sm text-ink-muted leading-relaxed">
                27th Main Rd, HSR Layout
                <br />
                Bengaluru, Karnataka 560102
              </p>
              <a
                href="mailto:nitish@zeppstr.com"
                className="font-body text-body-sm text-brand-blue mt-2 inline-block hover:opacity-70"
              >
                nitish@zeppstr.com
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const SIMPLE_NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

// ─────────────────────────────────────────────
// Inline icons
// ─────────────────────────────────────────────

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 ease-smooth"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
