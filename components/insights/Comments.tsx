"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";

export interface PublicComment {
  _id: string;
  name: string;
  body: string;
  createdAt?: string;
}

const schema = z.object({
  name: z.string().min(2, "Tell us your name.").max(80),
  email: z.string().email("Enter a valid email."),
  body: z.string().min(2, "Write something first.").max(2000),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

interface CommentsProps {
  articleId: string;
  comments: PublicComment[];
  className?: string;
}

/**
 * Comment thread + submission form.
 *
 * Approved comments are rendered server-side (passed in as props); new ones
 * post to /api/comments and enter a moderation queue rather than appearing
 * immediately. The form says so plainly instead of faking an instant publish.
 */
export function Comments({ articleId, comments, className }: CommentsProps) {
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
    defaultValues: { name: "", email: "", body: "", website: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, articleId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message ?? "Couldn't post that comment.");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const field =
    "w-full px-4 py-3 rounded-md bg-bg-primary border border-rule font-body text-body text-ink-headline placeholder:text-ink-muted focus:outline-2 focus:outline-brand-blue focus:outline-offset-0";

  return (
    <section id="comments" className={cn("", className)}>
      <div className="flex items-baseline justify-between gap-4 mb-8">
        <h2 className="font-display font-light text-display-sm text-ink-headline tracking-tight">
          Discussion
        </h2>
        <span className="font-body text-body-sm text-ink-muted">
          {comments.length === 0
            ? "No comments yet"
            : `${comments.length} comment${comments.length === 1 ? "" : "s"}`}
        </span>
      </div>

      {comments.length > 0 && (
        <ul className="space-y-8 mb-12">
          {comments.map((c) => {
            const date = c.createdAt ? new Date(c.createdAt) : null;
            return (
              <li key={c._id} className="border-l-2 border-rule pl-5">
                <div className="flex flex-wrap items-center gap-x-2 mb-2">
                  <span className="font-body font-medium text-body-sm text-ink-headline">
                    {c.name}
                  </span>
                  {date && (
                    <>
                      <span className="text-ink-muted" aria-hidden="true">
                        ·
                      </span>
                      <time
                        dateTime={c.createdAt}
                        className="font-body text-body-sm text-ink-muted"
                      >
                        {date.toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </>
                  )}
                </div>
                <p className="font-body text-body text-ink-body leading-relaxed whitespace-pre-line">
                  {c.body}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {status === "success" ? (
        <div
          className="rounded-md border border-rule bg-bg-secondary px-6 py-5"
          role="status"
          aria-live="polite"
        >
          <p className="font-body font-medium text-body text-ink-headline">
            Thanks — your comment is in the queue.
          </p>
          <p className="font-body text-body-sm text-ink-muted mt-1">
            We read every one. It&rsquo;ll appear here once it&rsquo;s approved.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-lg border border-rule bg-bg-secondary p-6 md:p-8"
          aria-label="Leave a comment"
        >
          <p className="font-body font-medium text-body text-ink-headline mb-1">
            Leave a comment
          </p>
          <p className="font-body text-body-sm text-ink-muted mb-6">
            Comments are moderated before they appear. Your email is never published.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="comment-name" className="sr-only">
                Name
              </label>
              <input
                id="comment-name"
                placeholder="Your name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
                className={cn(field, errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="font-body text-body-sm text-red-600 mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="comment-email" className="sr-only">
                Email
              </label>
              <input
                id="comment-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
                className={cn(field, errors.email && "border-red-500")}
              />
              {errors.email && (
                <p className="font-body text-body-sm text-red-600 mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <label htmlFor="comment-body" className="sr-only">
            Comment
          </label>
          <textarea
            id="comment-body"
            rows={5}
            placeholder="What did this miss, or what would you push back on?"
            aria-invalid={errors.body ? "true" : "false"}
            {...register("body")}
            className={cn(field, "resize-y", errors.body && "border-red-500")}
          />
          {errors.body && (
            <p className="font-body text-body-sm text-red-600 mt-1.5">
              {errors.body.message}
            </p>
          )}

          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            {...register("website")}
            className="absolute left-[-10000px] w-px h-px overflow-hidden"
          />

          <div className="flex items-center gap-4 mt-6">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded bg-brand-yellow text-[#000] font-body font-medium text-button hover:bg-brand-yellow-hover transition-colors duration-hover ease-smooth disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Posting…" : "Post comment"}
            </button>
            {status === "error" && errorMsg && (
              <p className="font-body text-body-sm text-red-600" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
