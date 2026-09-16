/**
 * "a" or "an", chosen by how a name is SPOKEN rather than how it is spelled.
 *
 * ── WHY THIS IS A SHARED HELPER AND NOT AN INLINE REGEX ─────────────────────
 * It was an inline regex, in one file, used at one of the two call sites that
 * needed it. Pre-launch QA on 16 Sep found "Apply for an Real Estate
 * Diagnostic" still rendering on the footer CTA of all six industry pages,
 * because an earlier fix corrected the hero CTA and never grepped for the
 * others.
 *
 * A one-line rule copied into one place and not the other is how that happens.
 * Interpolating a name into a sentence is common enough on this site — footer
 * CTAs, hero CTAs, the diagnostic intake — that it needs one implementation
 * everyone imports.
 *
 * ── THE RULE ────────────────────────────────────────────────────────────────
 * English picks the article by sound, not spelling. A naive /^[AEIOU]/ test
 * gets the two cases this site actually has backwards:
 *
 *   "SaaS"     starts with a consonant LETTER, said "sass"  → "a SaaS"       ✓ naive
 *   "MBA"      starts with a consonant LETTER, said "em-bee-ay" → "an MBA"   ✗ naive
 *   "EdTech"   starts with a vowel, said "ed-tech"          → "an EdTech"    ✓ naive
 *   "UX"       starts with a vowel LETTER, said "you-ex"    → "a UX audit"   ✗ naive
 *
 * So: if the first word is an initialism read letter by letter, use the sound
 * of that first letter. If it is a pronounceable word, fall back to spelling,
 * with the small set of well-known exceptions handled explicitly.
 *
 * This is not a general-purpose English solution and does not pretend to be —
 * that needs a pronunciation dictionary. It is correct for every name this
 * site interpolates today and fails safe (to the spelling rule) for anything
 * it has not seen. If you add a name it gets wrong, add it to EXCEPTIONS and
 * leave a note rather than rewriting the rule.
 */

/** Consonant letters whose NAME begins with a vowel sound: F, H, L, M, N, R, S, X. */
const CONSONANTS_SOUNDING_VOWEL = /^[FHLMNRSX]$/;

/** Vowel letters whose NAME begins with a consonant sound: U ("you"), and O in "one". */
const VOWELS_SOUNDING_CONSONANT = /^[UO]$/;

/**
 * Words that break the spelling rule. Keyed lowercase, compared on the first
 * word only. Keep this short and evidenced — every entry should be a word this
 * codebase actually renders.
 */
const EXCEPTIONS: Record<string, "a" | "an"> = {
  // Pronounced "you-…" — consonant sound despite the vowel.
  ux: "a",
  ui: "a",
  user: "a",
  unit: "a",
  unique: "a",
  european: "a",
  // Pronounced "sass" / "pass" — vowel-free opening despite ending in S.
  saas: "a",
  paas: "a",
  // Silent H — vowel sound despite the consonant.
  hour: "an",
  honest: "an",
  honour: "an",
  honor: "an",
};

/** True when a token reads as an initialism — all caps, no lowercase letters. */
function isInitialism(word: string): boolean {
  return word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word);
}

export function indefiniteArticle(name: string): "a" | "an" {
  // Only the first word decides the article. Strip anything that is not a
  // letter or digit so "E-commerce / D2C" is judged on "E", not on punctuation.
  const first = (name.trim().split(/[\s/]+/)[0] ?? "").replace(/[^A-Za-z0-9]/g, "");
  if (!first) return "a";

  const lower = first.toLowerCase();
  if (lower in EXCEPTIONS) return EXCEPTIONS[lower];

  /**
   * Also check the segment before the first hyphen. "Hour-long" strips to
   * "Hourlong", which is not in EXCEPTIONS, so the spelling rule wrongly
   * returned "a Hour-long". Compound modifiers are common enough in headings
   * that the exception has to survive one.
   *
   * Safe for "E-commerce": the leading segment is "E", which is a single
   * character, so isInitialism (length > 1) declines it and the spelling rule
   * correctly returns "an".
   */
  const beforeHyphen = (name.trim().split(/[\s/]+/)[0] ?? "")
    .split("-")[0]
    .replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase();
  if (beforeHyphen && beforeHyphen in EXCEPTIONS) return EXCEPTIONS[beforeHyphen];

  if (isInitialism(first)) {
    const letter = first[0];
    if (CONSONANTS_SOUNDING_VOWEL.test(letter)) return "an";
    if (VOWELS_SOUNDING_CONSONANT.test(letter)) return "a";
    return /^[AEIO]/.test(letter) ? "an" : "a";
  }

  // Pronounceable word — spelling is a good enough proxy, exceptions aside.
  return /^[aeiou]/i.test(first) ? "an" : "a";
}

/** Convenience: "an EdTech & Education diagnostic". */
export function withArticle(name: string): string {
  return `${indefiniteArticle(name)} ${name}`;
}
