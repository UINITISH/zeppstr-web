import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { sanity } from "./client";
import type { SanityImage } from "./types";

const builder = imageUrlBuilder(sanity);

/**
 * Sanity image URL builder.
 *
 * Usage:
 *   urlFor(image).width(800).height(600).format('webp').url()
 *
 * For Next/Image: pair with sizes prop and let Sanity serve responsive variants.
 */
export function urlFor(source: SanityImage): ImageUrlBuilder {
  return builder.image(source);
}

/**
 * Generate a Next/Image-compatible src + responsive sizes for a Sanity image.
 *
 * Returns: { src, width, height, blurDataURL?, alt }
 */
export function sanityImageProps(
  image: SanityImage | undefined,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
} | null {
  if (!image?.asset) return null;

  const width = options?.width ?? 1600;
  const height = options?.height ?? Math.round(width * 0.5625); // 16:9 default
  const quality = options?.quality ?? 85;

  const url = urlFor(image)
    .width(width)
    .height(height)
    .fit("crop")
    .quality(quality)
    .auto("format")
    .url();

  // Blur placeholder via LQIP if available
  // @ts-expect-error metadata is added by GROQ projection in queries.ts
  const blurDataURL = image.asset.metadata?.lqip;

  return {
    src: url,
    width,
    height,
    alt: image.alt ?? "",
    blurDataURL,
  };
}

/** Square crop helper (for client logos, founder photos, etc.) */
export function sanityImageSquare(
  image: SanityImage | undefined,
  size = 400
) {
  return sanityImageProps(image, { width: size, height: size });
}
