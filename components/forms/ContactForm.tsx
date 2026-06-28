"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/cn";
import {
  contactSchema,
  CONTACT_TOPICS,
  type ContactFormValues,
} from "@/lib/schemas/contact";

export function ContactForm() {
  const [submitState, setSubmitState] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      businessEmail: "",
      message: "",
      website_hp: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    if (values.website_hp && values.website_hp.length > 0) {
      setSubmitState("success");
      reset();
      return;
    }

    setSubmitState("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message ?? "We couldn't send your message. Please try again."
        );
      }
      setSubmitState("success");
      reset();
    } catch (err) {
      setSubmitState("error");
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  };

  if (submitState === "success") {
    return (
      <div
        className="max-w-[560px] mx-auto px-8 py-10 rounded-lg border border-rule bg-bg-primary text-center"
        role="status"
        aria-live="polite"
      >
        <p className="font-display font-light text-display-md text-ink-headline mb-3">
          Thanks — message sent.
        </p>
        <p className="font-body text-body text-ink-body">
          We usually reply within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-[560px] mx-auto space-y-5"
      aria-label="Contact form"
    >
      <FieldRow label="Name" error={errors.name?.message} required>
        <Input
          id="contact-name"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </FieldRow>

      <FieldRow label="Business email" error={errors.businessEmail?.message} required>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourcompany.com"
          aria-invalid={!!errors.businessEmail}
          {...register("businessEmail")}
        />
      </FieldRow>

      <FieldRow label="Topic" error={errors.topic?.message} required>
        <Select id="contact-topic" aria-invalid={!!errors.topic} {...register("topic")}>
          <option value="">Select a topic</option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </FieldRow>

      <FieldRow label="Your message" error={errors.message?.message} required>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="Tell us what you're reaching out about"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </FieldRow>

      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website_hp")}
        className="absolute left-[-10000px] w-px h-px overflow-hidden"
      />

      {submitError && (
        <p className="font-body text-body-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className={cn(
          "w-full inline-flex items-center justify-center px-6 py-3 rounded-md",
          "bg-brand-yellow text-ink-headline font-body font-medium text-button",
          "hover:bg-emerald-900 hover:text-white transition-colors duration-hover",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "focus-visible:outline-2 focus-visible:outline-emerald-700 focus-visible:outline-offset-2"
        )}
      >
        {submitState === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

// ─── Helpers ───

function FieldRow({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-body font-medium text-body-sm text-ink-headline block mb-2">
        {label}
        {required && (
          <span className="text-red-600 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="font-body text-body-sm text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = cn(
  "w-full px-4 py-3 rounded-md bg-bg-primary border border-rule",
  "font-body text-body text-ink-headline placeholder:text-ink-muted",
  "focus:outline-2 focus:outline-brand-blue focus:outline-offset-0",
  "aria-[invalid=true]:border-red-500"
);

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    return <input ref={ref} className={inputClasses} {...props} />;
  }
);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea(props, ref) {
  return <textarea ref={ref} className={cn(inputClasses, "resize-y")} {...props} />;
});

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select(props, ref) {
  return <select ref={ref} className={cn(inputClasses, "appearance-none")} {...props} />;
});
