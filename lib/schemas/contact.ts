import { z } from "zod";

export const CONTACT_TOPICS = [
  "Engagement application",
  "Press / media",
  "Partnership",
  "General question",
  "Career interest",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  businessEmail: z.string().trim().email("Please enter a valid business email."),
  topic: z.enum(CONTACT_TOPICS, {
    errorMap: () => ({ message: "Please pick a topic." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more — at least 20 characters.")
    .max(5000, "Message is too long — please keep it under 5,000 characters."),
  // Honeypot
  website_hp: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  source: z.string().trim().max(64).optional(),
  website: z.string().max(0).optional(),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
