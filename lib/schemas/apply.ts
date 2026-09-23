import { z } from "zod";

/**
 * Apply form (Strategic Diagnostic application).
 * Spec: deliverables/content/apply.md
 *
 * Schema is split per step so each step can validate independently before advancing.
 * The full schema is the merge of all step schemas — that's what we POST.
 */

// ─────────────────────────────────────────────
// Enumerations
// ─────────────────────────────────────────────

export const ROLES = [
  "Founder",
  "CEO",
  "CMO",
  "Head of Marketing",
  "Marketing Manager",
  "Other",
] as const;

export const INDUSTRIES = [
  "Real Estate",
  "E-commerce / D2C",
  "SaaS / Tech",
  "Healthcare & Wellness",
  "EdTech / Education",
  "Professional Services",
  "Other",
] as const;

export const REVENUE_RANGES = [
  "Under $500K",
  "$500K–$1M",
  "$1M–$5M",
  "$5M–$20M",
  "$20M+",
] as const;

export const SPEND_RANGES = [
  "Under ₹3L / $3K",
  "₹3L–₹10L / $3K–$10K",
  "₹10L–₹30L / $10K–$30K",
  "₹30L+ / $30K+",
] as const;

export const SOLUTIONS_OF_INTEREST = [
  "Growth Strategy & Advisory",
  "Organic Growth Practice",
  "Performance Media",
  "Experience & Engineering",
  "Brand, Engagement & Lifecycle",
  "Not sure — diagnose for me",
] as const;

/**
 * "How did you hear about us?"
 *
 * Worth taking seriously rather than treating as a formality — for a business
 * with long consideration cycles, self-reported attribution consistently
 * surfaces sources that last-click analytics never records.
 *
 * "DemandForge YouTube" was removed: no such channel exists. The YouTube
 * channel is @zeppstr.
 */
export const HEARD_FROM = [
  "Referral",
  "Google search",
  "LinkedIn",
  "Instagram",
  "YouTube",
  "Industry publication",
  "Podcast",
  "Other",
] as const;

// ─────────────────────────────────────────────
// Per-step schemas
// ─────────────────────────────────────────────

export const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  businessEmail: z
    .string()
    .trim()
    .email("Please enter a valid business email."),
  companyName: z.string().trim().min(1, "Please enter your company name."),
  role: z.enum(ROLES, {
    errorMap: () => ({ message: "Please select your role." }),
  }),
  companyWebsite: z
    .string()
    .trim()
    .url("Please enter a valid URL (e.g. https://yourcompany.com)."),
});

export const step2Schema = z.object({
  industry: z.enum(INDUSTRIES, {
    errorMap: () => ({ message: "Please pick an industry." }),
  }),
  annualRevenue: z.enum(REVENUE_RANGES, {
    errorMap: () => ({ message: "Please pick a revenue range." }),
  }),
  monthlySpend: z.enum(SPEND_RANGES, {
    errorMap: () => ({ message: "Please pick a marketing-spend range." }),
  }),
});

export const step3Schema = z.object({
  solutionsOfInterest: z
    .array(z.enum(SOLUTIONS_OF_INTEREST))
    .min(1, "Pick at least one — or choose 'Not sure — diagnose for me'."),
});

export const step4Schema = z.object({
  desiredOutcome: z
    .string()
    .trim()
    .min(200, "Tell us a bit more — at least 200 characters helps us scope."),
});

export const step5Schema = z.object({
  heardFrom: z.enum(HEARD_FROM, {
    errorMap: () => ({ message: "Please tell us how you found us." }),
  }),
  referralName: z.string().trim().optional(),
  additionalContext: z.string().trim().optional(),
  // Honeypot — must remain empty
  website_hp: z.string().max(0).optional(),
}).refine(
  (data) =>
    data.heardFrom !== "Referral" ||
    (data.referralName !== undefined && data.referralName.length > 0),
  {
    message: "Please tell us who referred you.",
    path: ["referralName"],
  }
);

// ─────────────────────────────────────────────
// Composite schema for final submit
// ─────────────────────────────────────────────

export const applySchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .and(step5Schema);

export type ApplyFormValues = z.infer<typeof applySchema>;

// Per-step value types — useful for typing the form state per step
export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
export type Step3Values = z.infer<typeof step3Schema>;
export type Step4Values = z.infer<typeof step4Schema>;
export type Step5Values = z.infer<typeof step5Schema>;

// ─────────────────────────────────────────────
// Step config used by the form UI
// ─────────────────────────────────────────────

export const STEP_FIELDS: ReadonlyArray<ReadonlyArray<keyof ApplyFormValues>> = [
  ["fullName", "businessEmail", "companyName", "role", "companyWebsite"],
  ["industry", "annualRevenue", "monthlySpend"],
  ["solutionsOfInterest"],
  ["desiredOutcome"],
  ["heardFrom", "referralName", "additionalContext", "website_hp"],
] as const;

export const STEP_LABELS = [
  "About you",
  "Your business",
  "Solutions of interest",
  "The outcome",
  "How you found us",
] as const;
