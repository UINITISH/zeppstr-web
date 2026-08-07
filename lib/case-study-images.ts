/**
 * Placeholder tile/hero images per case study (keyed by slug).
 *
 * These are royalty-free Unsplash images (free for commercial use, no
 * attribution required) used as GENERIC, industry-relevant placeholders until
 * real project photography is uploaded to Sanity (heroImage), which overrides
 * these automatically. They are intentionally stock — swap for real visuals.
 */

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&h=900&q=70`;

export const CASE_STUDY_IMAGES: Record<string, string> = {
  // Real estate
  "tru-aquapolis": U("1545324418-cc1a3fa10c00"),
  // E-commerce / D2C
  "wise-market": U("1563013544-824ae1b704d3"),
  "mini-leaves": U("1539278383962-a7774385fa02"),
  // Professional services / investment promotion
  "vehiclemall": U("1449965408869-eaa3f722e40d"),
  "sky-phonez": U("1511707171634-5f897ff02aa9"),
  // Web & content
  "homatico": U("1467232004584-a241de8bcf5d"),
  "invest-in-sharjah": U("1512453979798-5ea266f8880c"),
};

export function getCaseStudyImage(slug: string): string | null {
  return CASE_STUDY_IMAGES[slug] ?? null;
}
