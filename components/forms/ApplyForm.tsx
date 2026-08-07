"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/cn";
import {
  ROLES,
  INDUSTRIES,
  REVENUE_RANGES,
  SPEND_RANGES,
  SOLUTIONS_OF_INTEREST,
  HEARD_FROM,
  STEP_LABELS,
  STEP_FIELDS,
  applySchema,
  type ApplyFormValues,
} from "@/lib/schemas/apply";

const TOTAL_STEPS = STEP_LABELS.length;

/**
 * ApplyForm — multi-step Strategic Diagnostic application.
 *
 * Validation strategy: each step uses RHF's `trigger()` against the fields of that step
 * before the user can advance. Final submit re-validates the whole composite schema.
 *
 * Honeypot field (`website_hp`) is hidden visually but in the DOM. Bots that fill it
 * trip a silent success path so we don't reveal the trap.
 */
export function ApplyForm() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [submitState, setSubmitState] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors },
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      businessEmail: "",
      companyName: "",
      companyWebsite: "",
      solutionsOfInterest: [],
      desiredOutcome: "",
      referralName: "",
      additionalContext: "",
      website_hp: "",
    },
  });

  const watchHeardFrom = watch("heardFrom");
  const watchOutcome = watch("desiredOutcome") ?? "";

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = await trigger(fields as any, { shouldFocus: true });
    if (!valid) return;
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (values: ApplyFormValues) => {
    // Honeypot trip — silent success
    if (values.website_hp && values.website_hp.length > 0) {
      router.push("/thank-you");
      return;
    }

    setSubmitState("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.message ??
            "We couldn’t submit the application. Please try again, or email nitish@zeppstr.com directly."
        );
      }

      setSubmitState("success");
      router.push("/thank-you");
    } catch (err) {
      setSubmitState("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-[680px] mx-auto"
      aria-label="Strategic Diagnostic application form"
    >
      <ProgressIndicator currentStep={step} />

      <div className="mt-10 space-y-6">
        {/* ─── Step 1: About you ─── */}
        {step === 0 && (
          <fieldset className="space-y-6">
            <Legend>About you</Legend>

            <Field
              label="Full name"
              error={errors.fullName?.message}
              required
            >
              <Input
                id="fullName"
                placeholder="Your full name"
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
            </Field>

            <Field
              label="Business email"
              error={errors.businessEmail?.message}
              required
            >
              <Input
                id="businessEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@yourcompany.com"
                aria-invalid={!!errors.businessEmail}
                {...register("businessEmail")}
              />
            </Field>

            <Field
              label="Company name"
              error={errors.companyName?.message}
              required
            >
              <Input
                id="companyName"
                placeholder="Your company"
                autoComplete="organization"
                aria-invalid={!!errors.companyName}
                {...register("companyName")}
              />
            </Field>

            <Field label="Your role" error={errors.role?.message} required>
              <Select id="role" aria-invalid={!!errors.role} {...register("role")}>
                <option value="">Select your role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Company website"
              error={errors.companyWebsite?.message}
              required
            >
              <Input
                id="companyWebsite"
                type="url"
                inputMode="url"
                placeholder="https://yourcompany.com"
                autoComplete="url"
                aria-invalid={!!errors.companyWebsite}
                {...register("companyWebsite")}
              />
            </Field>
          </fieldset>
        )}

        {/* ─── Step 2: Your business ─── */}
        {step === 1 && (
          <fieldset className="space-y-6">
            <Legend>Your business</Legend>

            <Field label="Industry" error={errors.industry?.message} required>
              <Select id="industry" aria-invalid={!!errors.industry} {...register("industry")}>
                <option value="">Select your industry</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Annual revenue"
              error={errors.annualRevenue?.message}
              required
              hint="Best estimate is fine — used to scope engagement size."
            >
              <Select
                id="annualRevenue"
                aria-invalid={!!errors.annualRevenue}
                {...register("annualRevenue")}
              >
                <option value="">Select revenue range</option>
                {REVENUE_RANGES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label="Monthly marketing spend"
              error={errors.monthlySpend?.message}
              required
              hint="All channels combined — paid media, agencies, tools, freelancers."
            >
              <Select
                id="monthlySpend"
                aria-invalid={!!errors.monthlySpend}
                {...register("monthlySpend")}
              >
                <option value="">Select spend range</option>
                {SPEND_RANGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
          </fieldset>
        )}

        {/* ─── Step 3: Solutions of interest ─── */}
        {step === 2 && (
          <fieldset className="space-y-6">
            <Legend>Solutions of interest</Legend>
            <p className="font-body text-body-sm text-ink-muted -mt-2">
              Pick all that apply, or choose &ldquo;Not sure&rdquo; and we&rsquo;ll diagnose for you.
            </p>

            <Controller
              name="solutionsOfInterest"
              control={control}
              render={({ field }) => (
                <div role="group" aria-label="Solutions of interest" className="space-y-3">
                  {SOLUTIONS_OF_INTEREST.map((solution) => {
                    const checked = field.value?.includes(solution) ?? false;
                    return (
                      <label
                        key={solution}
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-md border cursor-pointer",
                          "transition-colors duration-hover",
                          checked
                            ? "border-brand-blue bg-brand-blue/5"
                            : "border-rule hover:border-ink-headline"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-brand-blue"
                          checked={checked}
                          onChange={(e) => {
                            const next = new Set(field.value ?? []);
                            if (e.target.checked) next.add(solution);
                            else next.delete(solution);
                            field.onChange(Array.from(next));
                          }}
                        />
                        <span className="font-body text-body text-ink-headline">
                          {solution}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            />

            {errors.solutionsOfInterest && (
              <p className="font-body text-body-sm text-red-600" role="alert">
                {errors.solutionsOfInterest.message as string}
              </p>
            )}
          </fieldset>
        )}

        {/* ─── Step 4: The outcome ─── */}
        {step === 3 && (
          <fieldset className="space-y-6">
            <Legend>The outcome</Legend>

            <Field
              label="What outcome would you want from working with us?"
              error={errors.desiredOutcome?.message}
              required
              hint='E.g. "Predictable pipeline at a CPL we can afford" / "Scale revenue from $1M to $5M in 18 months" / "Fix our conversion rate."'
            >
              <Textarea
                id="desiredOutcome"
                rows={6}
                placeholder="Be specific — vague answers get vague diagnostics."
                aria-invalid={!!errors.desiredOutcome}
                {...register("desiredOutcome")}
              />
              <CharCount value={watchOutcome} min={200} />
            </Field>
          </fieldset>
        )}

        {/* ─── Step 5: How you found us ─── */}
        {step === 4 && (
          <fieldset className="space-y-6">
            <Legend>How you found us</Legend>

            <Field
              label="How did you hear about us?"
              error={errors.heardFrom?.message}
              required
            >
              <Select
                id="heardFrom"
                aria-invalid={!!errors.heardFrom}
                {...register("heardFrom")}
              >
                <option value="">Select an option</option>
                {HEARD_FROM.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </Select>
            </Field>

            {watchHeardFrom === "Referral" && (
              <Field
                label="Who referred you?"
                error={errors.referralName?.message}
                required
              >
                <Input
                  id="referralName"
                  placeholder="Their name (so we can thank them)"
                  aria-invalid={!!errors.referralName}
                  {...register("referralName")}
                />
              </Field>
            )}

            <Field
              label="Anything else we should know?"
              error={errors.additionalContext?.message}
              hint="Optional — clinical considerations, regulatory constraints, internal team structure, etc."
            >
              <Textarea
                id="additionalContext"
                rows={4}
                placeholder="Optional context"
                {...register("additionalContext")}
              />
            </Field>

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
              <p
                className="font-body text-body-sm text-red-600 mt-2"
                role="alert"
              >
                {submitError}
              </p>
            )}
          </fieldset>
        )}
      </div>

      {/* Nav buttons */}
      <div className="mt-10 flex items-center justify-between gap-4 pt-6 border-t border-rule">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0 || submitState === "submitting"}
          className={cn(
            "font-body text-body text-ink-body",
            "hover:text-ink-headline transition-colors duration-hover",
            "disabled:opacity-30 disabled:cursor-not-allowed",
            "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 rounded"
          )}
        >
          ← Back
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className={cn(
              "inline-flex items-center justify-center px-7 py-3 rounded-md",
              "bg-brand-yellow text-ink-headline font-body font-medium text-button",
              "hover:bg-emerald-900 hover:text-white transition-colors duration-hover",
              "focus-visible:outline-2 focus-visible:outline-emerald-700 focus-visible:outline-offset-2"
            )}
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className={cn(
              "inline-flex items-center justify-center px-7 py-3 rounded-md",
              "bg-brand-yellow text-[#000] font-body font-medium text-button",
              "hover:bg-brand-yellow-hover transition-colors duration-hover",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2"
            )}
          >
            {submitState === "submitting" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </form>
  );
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div aria-label={`Step ${currentStep + 1} of ${TOTAL_STEPS}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="font-body text-eyebrow text-ink-muted uppercase">
          Step {currentStep + 1} of {TOTAL_STEPS}
        </p>
        <p className="font-body text-eyebrow text-brand-blue uppercase">
          {STEP_LABELS[currentStep]}
        </p>
      </div>
      <div
        className="h-1 bg-rule rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
      >
        <div
          className="h-full bg-brand-blue transition-all duration-page ease-smooth"
          style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Legend({ children }: { children: React.ReactNode }) {
  return (
    <legend className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-2">
      {children}
    </legend>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, error, required, hint, children }: FieldProps) {
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
      {hint && (
        <p className="font-body text-body-sm text-ink-muted mb-2 -mt-1">{hint}</p>
      )}
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
  return (
    <select
      ref={ref}
      className={cn(inputClasses, "appearance-none pr-10 bg-no-repeat bg-right")}
      {...props}
    />
  );
});

function CharCount({ value, min }: { value: string; min: number }) {
  const len = value.length;
  const ok = len >= min;
  return (
    <p
      className={cn(
        "font-body text-body-sm mt-2",
        ok ? "text-ink-muted" : "text-ink-soft"
      )}
      aria-live="polite"
    >
      {len} / {min} characters {ok ? "·  ✓" : "minimum"}
    </p>
  );
}
