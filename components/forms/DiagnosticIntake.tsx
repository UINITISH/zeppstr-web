"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

// Client logos shown alongside the intake form. Uses the same files as
// the home page Logos Wall — 24 brands curated for relevance.
const LOGOS = [
  "wise-market.png",
  "mini-leaves.png",
  "tristar-online.png",
  "aishwarya-interiors.png",
  "empuls.png",
  "fixstars.png",
  "prohance.png",
  "my-keto-co.png",
  "lucky-white-goods.png",
  "sky-phonez.png",
  "homatico.png",
  "pacer.png",
  "ignite.png",
  "twenty-one-finance.png",
  "tansi-fintech.png",
  "learncab.png",
  "ace-online.png",
  "bsg.png",
  "nakshatech.png",
  "vehiclemall.png",
  "ivehiclevalue.png",
  "jp-parking-yard.png",
  "eagledrift.png",
];

/**
 * DiagnosticIntake — modern, focused 5-step prospect intake form.
 *
 * Design language: Typeform-inspired single-column composition. One question
 * at a time, large editorial typography, pill-style choice options, modern
 * filled inputs, fade transitions between steps, prominent Continue button.
 *
 * Submission posts to /api/diagnostic-intake → HubSpot. The user sees a
 * confirmation that their preliminary read will arrive within 24 hours.
 */

interface IntakeData {
  fullName: string;
  email: string;
  company: string;
  website: string;
  annualRevenue: string;
  marketingBudget: string;
  constraints: string[];
  industry: string;
  channels: string[];
  desiredOutcome: string;
  startTimeline: string;
}

const TOTAL_STEPS = 4;

const REVENUE_OPTIONS = [
  { value: "<1M", label: "Under $1M" },
  { value: "1-5M", label: "$1M – $5M" },
  { value: "5-25M", label: "$5M – $25M" },
  { value: "25M+", label: "$25M+" },
];

const BUDGET_OPTIONS = [
  { value: "<50K", label: "Under $50K" },
  { value: "50K-250K", label: "$50K – $250K" },
  { value: "250K-1M", label: "$250K – $1M" },
  { value: "1M+", label: "$1M+" },
];

const CONSTRAINT_OPTIONS = [
  { value: "brand", label: "Brand & positioning" },
  { value: "demand", label: "Demand generation — paid + organic" },
  { value: "conversion", label: "Conversion / website performance" },
  { value: "lifecycle", label: "Lifecycle / retention / owned channels" },
  { value: "measurement", label: "Measurement / attribution" },
  { value: "unknown", label: "Honestly, we don’t know — that’s why we’re here" },
];

const INDUSTRY_OPTIONS = [
  "E-commerce / D2C",
  "SaaS / Tech",
  "Real Estate",
  "Healthcare & Wellness",
  "EdTech / Education",
  "Professional Services",
  "Fintech",
  "Other",
];

const CHANNEL_OPTIONS = [
  "SEO",
  "Paid Search",
  "Paid Social",
  "Email",
  "SMS",
  "Influencer",
  "Content",
  "PR / Earned",
  "Affiliate",
  "Marketplace",
];

const TIMELINE_OPTIONS = [
  { value: "now", label: "Ready now" },
  { value: "1-3", label: "Within 1–3 months" },
  { value: "3-6", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

const INITIAL_DATA: IntakeData = {
  fullName: "",
  email: "",
  company: "",
  website: "",
  annualRevenue: "",
  marketingBudget: "",
  constraints: [],
  industry: "",
  channels: [],
  desiredOutcome: "",
  startTimeline: "",
};

export function DiagnosticIntake() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<IntakeData>(INITIAL_DATA);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const update = <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const toggleArray = (key: "constraints" | "channels", value: string) => {
    setData((d) => {
      const current = d[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...d, [key]: next };
    });
  };

  const stepIsValid = (s: number): boolean => {
    switch (s) {
      case 0:
        return Boolean(data.fullName && data.email && data.company);
      case 1:
        return Boolean(data.annualRevenue && data.marketingBudget && data.industry);
      case 2:
        return data.constraints.length > 0 && data.channels.length > 0;
      case 3:
        return Boolean(data.desiredOutcome.trim() && data.startTimeline);
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!stepIsValid(step)) return;
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else submit();
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Enter to advance (when current step is valid and we're not in a textarea)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "TEXTAREA") return;
      if (!stepIsValid(step)) return;
      e.preventDefault();
      goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, data]);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnostic-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Confirmation screen ───
  if (submitted) {
    return <ConfirmationScreen email={data.email} onReset={() => {
      setSubmitted(false);
      setStep(0);
      setData(INITIAL_DATA);
    }} />;
  }

  // ─── Loading screen ───
  if (submitting) return <LoadingScreen />;

  // ─── Step form — two-column split: logo wall left (60%), form right (40%) ───
  return (
    <div className="border-y border-ink-headline/10">
      <div className="container-layout py-0">
        <div className="grid lg:grid-cols-10 lg:gap-0">
          {/* ─── LEFT: Logo wall — 60% of width on desktop ─── */}
          <aside className="hidden lg:block lg:col-span-6 border-r border-ink-headline/10 bg-bg-primary">
            <div className="sticky top-[72px] py-12 px-8 xl:px-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-headline mb-3">
                <span className="inline-block w-2 h-2 bg-brand-yellow mr-2 align-middle" />
                Trusted by
              </p>
              <h3 className="font-bold tracking-[-0.02em] text-[clamp(20px,1.8vw,26px)] text-ink-headline leading-[1.2] mb-8 max-w-[24ch]">
                300+ businesses across 10+ countries — a few you may know.
              </h3>

              {/* Logo grid — 4 columns, full-color logos, no overlay */}
              <div className="grid grid-cols-4 border-t border-l border-ink-headline/10">
                {LOGOS.map((file) => (
                  <div
                    key={file}
                    className="relative flex items-center justify-center h-[80px] xl:h-[88px] px-3 border-r border-b border-ink-headline/10 bg-bg-primary"
                  >
                    <Image
                      src={`/client-logos/${file}`}
                      alt=""
                      width={120}
                      height={48}
                      className="max-h-[60%] max-w-[80%] w-auto object-contain"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-8 font-body text-body-sm text-ink-muted leading-relaxed max-w-[44ch]">
                Wise Market grew AUD 40K → AUD 2.7M in six months. Mini Leaves
                moved from 0.5% conversion to 3%+. Tru Aquapolis turned ₹39.7L of
                media into ₹34 Cr+ of qualified pipeline. The same architecture,
                applied across categories.
              </p>
            </div>
          </aside>

          {/* ─── RIGHT: Form column — 40% of width on desktop, yellow bg ─── */}
          <section className="lg:col-span-4 flex flex-col min-h-[760px] py-12 lg:py-16 px-0 lg:px-10 xl:px-12 bg-brand-yellow">
            {/* Question + content area — uses flex-1 to absorb extra height */}
            <div
              key={step}
              className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {/* Top row — title + step counter side-by-side, single-line title */}
              <div className="flex items-baseline justify-between gap-6 mb-3">
                <h2 className="font-bold tracking-[-0.02em] text-[clamp(20px,2.2vw,30px)] text-ink-headline leading-[1.1] whitespace-nowrap">
                  {step === 0 && "Let’s start with you."}
                  {step === 1 && "Tell us about your business."}
                  {step === 2 && "Where does it leak?"}
                  {step === 3 && "What does winning look like?"}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-headline/70 flex-shrink-0">
                  {String(step + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
                </p>
              </div>

              {/* Accent underline */}
              <span aria-hidden="true" className="block w-12 h-[3px] bg-ink-headline mb-5" />

              {/* Progress bar — segments */}
              <div className="flex gap-1.5 mb-10">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-[3px] flex-1 transition-colors duration-300 ${
                      i <= step ? "bg-ink-headline" : "bg-ink-headline/15"
                    }`}
                  />
                ))}
              </div>

              {/* Step content */}
              <div>
                {step === 0 && <StepIdentity data={data} update={update} />}
                {step === 1 && <StepProfile data={data} update={update} />}
                {step === 2 && <StepConstraintsChannels data={data} toggleArray={toggleArray} />}
                {step === 3 && <StepOutcome data={data} update={update} />}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-8 p-4 border border-red-300 bg-red-50">
                <p className="font-body text-body-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Nav — pinned to bottom by flex-1 spacer above */}
            <div className="mt-12 pt-6 border-t border-ink-headline/15 flex items-center justify-between gap-6">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink-headline disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!stepIsValid(step)}
                className="inline-flex items-center gap-3 bg-ink-headline text-white font-display font-light text-[15px] px-6 py-3.5 hover:bg-emerald-900 transition-colors duration-hover disabled:bg-ink-headline/15 disabled:text-ink-headline/40 disabled:cursor-not-allowed disabled:hover:bg-ink-headline/15"
              >
                <span>{step === TOTAL_STEPS - 1 ? "Send my intake" : "Continue"}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Modern field components
// ─────────────────────────────────────────────

function PillInput({
  id,
  placeholder,
  type = "text",
  value,
  onChange,
  optional,
  autoComplete,
}: {
  id: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between mb-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-headline">
          {placeholder}
        </span>
        {optional && (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-headline/50">
            Optional
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b-2 border-ink-headline/30 pb-2.5 font-display text-[20px] text-ink-headline placeholder:text-ink-headline/30 focus:outline-none focus:border-ink-headline transition-colors"
      />
    </div>
  );
}

function Dropdown({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-headline mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-transparent border-b-2 border-ink-headline/30 pb-2.5 pr-8 font-display text-[20px] focus:outline-none focus:border-ink-headline transition-colors appearance-none cursor-pointer ${
            value ? "text-ink-headline" : "text-ink-headline/40"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="absolute right-1 bottom-3 text-ink-headline/60 pointer-events-none"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 5L7 9L11 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

function PillChoice({
  label,
  selected,
  onClick,
  size = "md",
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const sizing =
    size === "sm"
      ? "px-4 py-2.5 text-[14px]"
      : size === "lg"
      ? "px-6 py-4 text-[16px]"
      : "px-5 py-3 text-[15px]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center justify-center font-body font-medium rounded-full border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 ${sizing} ${
        selected
          ? "bg-ink-headline text-white border-ink-headline"
          : "bg-bg-primary text-ink-headline border-ink-headline/20 hover:border-ink-headline hover:-translate-y-px"
      }`}
    >
      {label}
    </button>
  );
}

function CheckChoice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex items-center gap-4 w-full text-left px-4 py-3.5 bg-bg-primary border transition-all duration-150 focus:outline-none focus-visible:border-ink-headline ${
        selected
          ? "border-ink-headline"
          : "border-ink-headline/10 hover:border-ink-headline/40"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex-shrink-0 w-4 h-4 border transition-all flex items-center justify-center ${
          selected
            ? "bg-brand-yellow border-ink-headline"
            : "bg-transparent border-ink-headline/30 group-hover:border-ink-headline/60"
        }`}
      >
        {selected && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6.5L4.5 9L10 3"
              stroke="currentColor"
              className="text-ink-headline"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="font-body text-[15px] text-ink-headline leading-snug">{label}</span>
    </button>
  );
}

// ─────────────────────────────────────────────
// Steps
// ─────────────────────────────────────────────

function StepIdentity({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-7">
      <PillInput
        id="fullName"
        placeholder="Full name"
        autoComplete="name"
        value={data.fullName}
        onChange={(v) => update("fullName", v)}
      />
      <PillInput
        id="email"
        placeholder="Work email"
        type="email"
        autoComplete="email"
        value={data.email}
        onChange={(v) => update("email", v)}
      />
      <PillInput
        id="company"
        placeholder="Company"
        value={data.company}
        onChange={(v) => update("company", v)}
      />
      <PillInput
        id="website"
        placeholder="Website"
        type="url"
        value={data.website}
        onChange={(v) => update("website", v)}
        optional
      />
    </div>
  );
}

function StepProfile({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-7">
      <Dropdown
        id="annualRevenue"
        label="Annual revenue"
        value={data.annualRevenue}
        onChange={(v) => update("annualRevenue", v)}
        options={REVENUE_OPTIONS}
        placeholder="Select revenue range"
      />
      <Dropdown
        id="marketingBudget"
        label="Annual marketing investment"
        value={data.marketingBudget}
        onChange={(v) => update("marketingBudget", v)}
        options={BUDGET_OPTIONS}
        placeholder="Select budget range"
      />
      <Dropdown
        id="industry"
        label="Industry"
        value={data.industry}
        onChange={(v) => update("industry", v)}
        options={INDUSTRY_OPTIONS.map((i) => ({ value: i, label: i }))}
        placeholder="Select your industry"
      />
    </div>
  );
}

function StepConstraintsChannels({
  data,
  toggleArray,
}: {
  data: IntakeData;
  toggleArray: (key: "constraints" | "channels", value: string) => void;
}) {
  return (
    <div className="space-y-10">
      {/* Constraints — multi-select check rows */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-headline/60 mb-4">
          Where does it leak? — multi-select
        </p>
        <div className="space-y-2">
          {CONSTRAINT_OPTIONS.map((opt) => (
            <CheckChoice
              key={opt.value}
              label={opt.label}
              selected={data.constraints.includes(opt.value)}
              onClick={() => toggleArray("constraints", opt.value)}
            />
          ))}
        </div>
      </div>

      {/* Channels — multi-select pills */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-headline/60 mb-4">
          Channels currently running — multi-select
        </p>
        <div className="flex flex-wrap gap-2.5">
          {CHANNEL_OPTIONS.map((opt) => (
            <PillChoice
              key={opt}
              label={opt}
              size="sm"
              selected={data.channels.includes(opt)}
              onClick={() => toggleArray("channels", opt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepOutcome({
  data,
  update,
}: {
  data: IntakeData;
  update: <K extends keyof IntakeData>(key: K, value: IntakeData[K]) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <label
          htmlFor="outcome"
          className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-headline mb-2"
        >
          The 12-month win
        </label>
        <textarea
          id="outcome"
          value={data.desiredOutcome}
          onChange={(e) => update("desiredOutcome", e.target.value)}
          placeholder="A specific number, a category position, a launch — be concrete."
          rows={4}
          className="w-full bg-transparent border-b-2 border-ink-headline/30 pb-3 font-display text-[18px] text-ink-headline placeholder:text-ink-headline/30 focus:outline-none focus:border-ink-headline transition-colors leading-relaxed resize-none"
        />
      </div>
      <Dropdown
        id="startTimeline"
        label="Engagement timing"
        value={data.startTimeline}
        onChange={(v) => update("startTimeline", v)}
        options={TIMELINE_OPTIONS}
        placeholder="When are you ready to start?"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Loading + Confirmation states
// ─────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="container-layout pt-20 md:pt-28 pb-40">
      <div className="max-w-[720px] mx-auto text-center">
        <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mx-auto mb-8 animate-pulse" />
        <h1 className="font-bold tracking-[-0.025em] text-[clamp(32px,4.5vw,56px)] text-ink-headline leading-[1.1] mb-6">
          Filing your intake.
        </h1>
        <p className="font-body text-body-lg text-ink-body leading-[1.55]">
          One moment.
        </p>
      </div>
    </div>
  );
}

function ConfirmationScreen({
  email,
  onReset,
}: {
  email: string;
  onReset: () => void;
}) {
  return (
    <div className="container-layout pt-20 md:pt-28 pb-32 md:pb-40">
      <div className="max-w-[760px] mx-auto">
        <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-8" />
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted mb-5">
          Received
        </p>
        <h1 className="font-bold tracking-[-0.025em] text-[clamp(36px,5.5vw,72px)] text-ink-headline leading-[1.05] mb-10 max-w-[20ch] text-balance">
          We&rsquo;ve got it.{" "}
          <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
            Report
          </span>{" "}
          within 24 hours.
        </h1>
        <p className="font-body text-body-lg text-ink-body leading-[1.6] max-w-[58ch] mb-6">
          Your intake is in our system. A member of the Zeppstr team will read it
          against the patterns we&rsquo;ve seen across 300+ businesses and send your
          preliminary read to <strong className="text-ink-headline">{email}</strong> within 24 hours — usually faster.
        </p>
        <p className="font-body text-body text-ink-body leading-[1.6] max-w-[58ch] mb-12">
          The read is yours to keep, even if we never speak again. If it lines up with
          your read of the situation, the next step is the 45-minute paid diagnostic.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-ink-headline/15 mb-12">
          {[
            { n: "01", title: "We read your intake", note: "Within 24 hours." },
            { n: "02", title: "Preliminary read in inbox", note: "Yours to keep." },
            { n: "03", title: "Optional 45-min diagnostic", note: "Paid · refundable." },
          ].map((s) => (
            <div key={s.n}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
                Step {s.n}
              </p>
              <p className="font-display font-bold text-[16px] text-ink-headline tracking-[-0.01em] leading-snug">
                {s.title}
              </p>
              <p className="font-body text-body-sm text-ink-body leading-relaxed mt-1.5">
                {s.note}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(16px,1.2vw,20px)] px-7 py-3.5 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
          >
            <span>See selected work</span>
            <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink-headline transition-colors"
          >
            Submit another intake →
          </button>
        </div>
      </div>
    </div>
  );
}
