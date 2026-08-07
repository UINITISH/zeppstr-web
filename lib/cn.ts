import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge tailwind class names with conflict resolution.
 * Use everywhere instead of string concatenation.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
