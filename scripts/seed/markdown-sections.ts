import { readFileSync } from "node:fs";

/**
 * Parses a markdown file into a Map of H2-section title → section body.
 * Used for case studies, where each H2 ("The situation", "The diagnosis", etc.)
 * maps to a Sanity field.
 *
 * The H1 and any text before the first H2 are stored under the special key "_intro".
 */
export function parseSections(filePath: string): Map<string, string> {
  const raw = readFileSync(filePath, "utf-8");
  const sections = new Map<string, string>();

  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let currentTitle = "_intro";
  let buffer: string[] = [];

  const flush = () => {
    const body = buffer.join("\n").trim();
    if (body) sections.set(currentTitle, body);
    buffer = [];
  };

  for (const line of lines) {
    const m = /^##\s+(.+)$/.exec(line);
    if (m) {
      flush();
      currentTitle = m[1].trim();
      continue;
    }
    buffer.push(line);
  }
  flush();

  return sections;
}

/**
 * Get a section by title with a fallback. Forgiving on whitespace + case.
 */
export function getSection(sections: Map<string, string>, ...titles: string[]): string | null {
  for (const title of titles) {
    const norm = title.trim().toLowerCase();
    for (const [key, value] of sections.entries()) {
      if (key.trim().toLowerCase() === norm) return value;
    }
  }
  return null;
}
