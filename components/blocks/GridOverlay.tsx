/**
 * GridOverlay — static grid-cell texture (graph paper feel).
 *
 * Two intersecting repeating-linear-gradients form a 7×7px grid of cells.
 * Light gray hairlines at 40% opacity. Static — no animation.
 *
 * mix-blend-multiply lets the pattern darken whatever section is below:
 *   • White sections → soft gray grid showing
 *   • Yellow manifesto → faint darkened grid through the yellow
 *   • Navy CTA → blends out almost completely (intended)
 *
 * Fixed positioning + pointer-events: none → never interferes with scroll
 * or clicks.
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="hatch-overlay pointer-events-none fixed inset-0 z-[5] mix-blend-multiply"
    />
  );
}
