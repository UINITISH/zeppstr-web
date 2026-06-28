import { randomUUID } from "node:crypto";

/**
 * Lightweight Markdown → Portable Text converter.
 * Handles: paragraphs, H2/H3 headings, bullet/numbered lists, bold (**...**),
 * italic (*...*), and links ([text](url)). Tables, images, and blockquotes are
 * out of scope — Sanity Studio is the right place to edit those by hand.
 */

export interface PtSpan {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}

export interface PtMarkDef {
  _type: "link";
  _key: string;
  href: string;
}

export interface PtBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  markDefs: PtMarkDef[];
  children: PtSpan[];
}

const k = () => randomUUID().replace(/-/g, "").slice(0, 12);

export function toPortableText(markdown: string): PtBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: PtBlock[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(" ").trim();
    if (text) blocks.push(makeBlock("normal", text));
    para = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    // blank line → paragraph break
    if (line.trim() === "") {
      flushPara();
      continue;
    }

    // headings
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    const h4 = /^####\s+(.+)$/.exec(line);
    if (h2) {
      flushPara();
      blocks.push(makeBlock("h2", h2[1]));
      continue;
    }
    if (h3) {
      flushPara();
      blocks.push(makeBlock("h3", h3[1]));
      continue;
    }
    if (h4) {
      flushPara();
      blocks.push(makeBlock("h4", h4[1]));
      continue;
    }

    // bullet list
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    if (bullet) {
      flushPara();
      blocks.push({ ...makeBlock("normal", bullet[1]), listItem: "bullet", level: 1 });
      continue;
    }

    // numbered list
    const num = /^\d+\.\s+(.+)$/.exec(line);
    if (num) {
      flushPara();
      blocks.push({ ...makeBlock("normal", num[1]), listItem: "number", level: 1 });
      continue;
    }

    // blockquote
    const quote = /^>\s+(.+)$/.exec(line);
    if (quote) {
      flushPara();
      blocks.push(makeBlock("blockquote", quote[1]));
      continue;
    }

    // accumulate paragraph
    para.push(line.trim());
  }
  flushPara();

  return blocks;
}

function makeBlock(style: PtBlock["style"], rawText: string): PtBlock {
  const { spans, markDefs } = parseInline(rawText);
  return {
    _type: "block",
    _key: k(),
    style,
    markDefs,
    children: spans,
  };
}

/**
 * Parse inline markdown — bold, italic, links — into spans with mark refs.
 * Order of operations: links first (because they may contain bold/italic inside),
 * then bold, then italic.
 */
function parseInline(text: string): { spans: PtSpan[]; markDefs: PtMarkDef[] } {
  const markDefs: PtMarkDef[] = [];
  // Tokens: array of { text, marks, mark? }
  type Token = { text: string; marks: string[] };
  let tokens: Token[] = [{ text, marks: [] }];

  // Apply a regex transform that splits matched ranges and assigns marks
  const applyMark = (
    pattern: RegExp,
    transform: (match: RegExpMatchArray) => { text: string; mark: string }
  ) => {
    const next: Token[] = [];
    for (const tok of tokens) {
      let s = tok.text;
      let lastIndex = 0;
      pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(s)) !== null) {
        if (m.index > lastIndex) {
          next.push({ text: s.slice(lastIndex, m.index), marks: tok.marks });
        }
        const result = transform(m);
        next.push({
          text: result.text,
          marks: [...tok.marks, result.mark],
        });
        lastIndex = m.index + m[0].length;
      }
      if (lastIndex < s.length) {
        next.push({ text: s.slice(lastIndex), marks: tok.marks });
      }
      if (next.length === 0 && tok.text.length > 0) {
        next.push(tok);
      }
    }
    tokens = next.filter((t) => t.text.length > 0);
  };

  // Links first → mark def reference, mark = the def key
  applyMark(/\[([^\]]+)\]\(([^)]+)\)/g, (m) => {
    const key = k();
    markDefs.push({ _type: "link", _key: key, href: m[2] });
    return { text: m[1], mark: key };
  });

  // Bold
  applyMark(/\*\*([^*]+)\*\*/g, (m) => ({ text: m[1], mark: "strong" }));

  // Italic — single-asterisk OR underscore, but only if not already inside bold
  applyMark(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, (m) => ({ text: m[1], mark: "em" }));

  if (tokens.length === 0) tokens = [{ text, marks: [] }];

  const spans: PtSpan[] = tokens.map((t) => ({
    _type: "span",
    _key: k(),
    text: t.text,
    marks: t.marks,
  }));

  return { spans, markDefs };
}

/**
 * Convenience: turn an array of paragraph strings into a simple PT array
 * with no inline marks. Useful for short hand-curated blurbs.
 */
export function paragraphsToPt(paragraphs: string[]): PtBlock[] {
  return paragraphs
    .filter((p) => p && p.trim().length > 0)
    .map((p) => makeBlock("normal", p.trim()));
}
