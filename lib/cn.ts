import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Merge tailwind class names with conflict resolution.
 * Use everywhere instead of string concatenation.
 *
 * IMPORTANT — why this is `extendTailwindMerge` and not plain `twMerge`:
 *
 * Our type scale uses word-shaped font sizes (`text-display-md`, `text-body-lg`,
 * `text-eyebrow`, `text-button`). Stock tailwind-merge only knows the default
 * scale (`text-sm`, `text-lg`, …), so it classifies anything else in the
 * `text-*` namespace as a COLOUR. That makes `cn("text-white", "text-display-md")`
 * resolve as a colour conflict and silently drop `text-white` — the element
 * then inherits body ink and the text disappears against a dark panel.
 *
 * Registering the scale here tells tailwind-merge these are sizes, so size and
 * colour stop fighting. Add any new font size to FONT_SIZES below.
 */

const FONT_SIZES = [
  "display-xl",
  "display-lg",
  "display-md",
  "display-sm",
  "body-lg",
  "body",
  "body-sm",
  "button",
  "eyebrow",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: FONT_SIZES }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
