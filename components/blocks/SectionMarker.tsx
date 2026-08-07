import { cn } from "@/lib/cn";

interface SectionMarkerProps {
  number: string;
  label: string;
  variant?: "default" | "inverse";
  className?: string;
}

/**
 * Editorial section marker — monospace, restrained, like footnotes in a research report.
 * Sits at the top of major home-page sections to give the page rhythmic structure.
 */
export function SectionMarker({
  number,
  label,
  variant = "default",
  className,
}: SectionMarkerProps) {
  const isInverse = variant === "inverse";

  return (
    <div
      className={cn(
        "container-layout pt-8 pb-2 flex items-center gap-4",
        "font-mono text-[11px] uppercase tracking-[0.18em]",
        isInverse ? "text-white/50" : "text-ink-muted",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block w-8 h-px",
          isInverse ? "bg-white/30" : "bg-ink-muted/40"
        )}
      />
      <span className={isInverse ? "text-white/80" : "text-ink-body"}>{number}</span>
      <span aria-hidden="true">/</span>
      <span>{label}</span>
    </div>
  );
}
