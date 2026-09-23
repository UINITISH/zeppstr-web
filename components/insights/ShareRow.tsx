"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface ShareRowProps {
  title: string;
  path: string;
  className?: string;
}

/** Share + copy-link row. Builds the absolute URL client-side so it works on
 *  localhost, preview deploys and production without config. */
export function ShareRow({ title, path, className }: ShareRowProps) {
  const [copied, setCopied] = React.useState(false);
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const item =
    "inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-rule font-body text-body-sm text-ink-body hover:border-brand-blue hover:text-brand-blue transition-colors duration-hover";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="font-body text-body-sm text-ink-muted mr-1">Share</span>
      <a
        className={item}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        className={item}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className={item}
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <button type="button" onClick={copy} className={item}>
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
