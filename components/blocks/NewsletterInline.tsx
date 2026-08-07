"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";

const schema = z.object({
  email: z.string().email("Enter a valid work email."),
  // Honeypot — should remain empty. Bots fill all fields.
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

interface NewsletterInlineProps {
  /** Where the form was rendered, for analytics + downstream segmentation */
  source?: string;
  className?: string;
}

/**
 * NewsletterInline — inline email capture for The Brief.
 * Posts to /api/newsletter (Week 3 deliverable). Until the route exists,
 * the form gracefully degrades with an optimistic success state.
 */
export function NewsletterInline({ source = "inline", className }: NewsletterInlineProps) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.website && values.website.length > 0) {
      // Silent honeypot trip — pretend success
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? "Subscription failed. Try again.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try again in a moment."
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "max-w-[440px] mx-auto px-6 py-5 rounded-md border border-rule bg-bg-primary text-center",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <p className="font-body font-medium text-body text-ink-headline">
          You&rsquo;re on the list.
        </p>
        <p className="font-body text-body-sm text-ink-muted mt-1">
          The next essay lands in your inbox on the next publishing Thursday.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("max-w-[460px] mx-auto", className)}
      aria-label="Subscribe to The Brief newsletter"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Work email
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          {...register("email")}
          className={cn(
            "flex-1 min-w-0 px-4 py-3 rounded-md bg-bg-primary border",
            "font-body text-body text-ink-headline placeholder:text-ink-muted",
            "focus:outline-2 focus:outline-brand-blue focus:outline-offset-0",
            errors.email ? "border-red-500" : "border-rule"
          )}
        />

        {/* Honeypot — visually hidden but still in DOM */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register("website")}
          className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center px-6 py-3 rounded-md",
            "bg-brand-yellow text-[#000] font-body font-medium text-button",
            "hover:bg-brand-yellow-hover transition-colors duration-hover ease-smooth",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2"
          )}
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      {errors.email && (
        <p
          id="newsletter-email-error"
          className="font-body text-body-sm text-red-600 mt-2 text-left"
        >
          {errors.email.message}
        </p>
      )}

      {status === "error" && errorMsg && (
        <p className="font-body text-body-sm text-red-600 mt-2 text-left" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
