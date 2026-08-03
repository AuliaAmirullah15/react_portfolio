"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Globe } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(150),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000),
});

type FormValues = z.infer<typeof contactSchema>;

const socials = [
  { icon: GitHubIcon, label: "GitHub", href: SITE_CONFIG.github },
  { icon: LinkedInIcon, label: "LinkedIn", href: SITE_CONFIG.linkedin },
  { icon: Globe, label: "Website", href: SITE_CONFIG.website },
] as const;

// Underlined fields, not boxes — the same "rules instead of borders" logic the
// rest of the page uses. The bottom rule is a UI component under WCAG 1.4.11,
// so it needs 3:1 against the ground: ink-400 gives 3.34:1, red-600 gives 6.25:1.
const inputBase =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-ink-900 transition-colors placeholder:text-ink-400 focus:outline-none focus:ring-0";

export default function ContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (hasError: boolean) =>
    cn(
      inputBase,
      hasError
        ? "border-red-600 focus:border-red-700"
        : "border-ink-400 hover:border-ink-600 focus:border-navy-600",
    );

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        index={6}
        label="Contact"
        title="Let's work together."
        aside="Reply within 24 hours on business days."
      />

      <div className="ed-grid">
        {/* Left gutter: direct routes */}
        <div className="space-y-8">
          <div>
            <p className="t-label text-ink-400">Email</p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-2 block text-sm break-all text-navy-700 underline decoration-navy-400 underline-offset-4 transition-colors hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          <div>
            <p className="t-label text-ink-400">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-ink-600 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span className="underline-offset-4 group-hover:underline">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t-2 border-navy-600 py-12"
              role="status"
            >
              <CheckCircle2
                size={32}
                className="text-navy-600"
                aria-hidden="true"
              />
              <h3 className="t-title mt-6 text-3xl text-ink-950">
                Message sent.
              </h3>
              <p className="mt-4 text-ink-600">
                Thanks for reaching out. I&apos;ll reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="t-label mt-8 pb-1 text-navy-700 transition-colors hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="max-w-xl space-y-9"
              aria-label="Contact form"
            >
              <div className="grid gap-9 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="t-label block text-ink-500">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass(!!errors.name)}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="t-label mt-2 text-red-700"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="t-label block text-ink-500">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="t-label mt-2 text-red-700"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="t-label block text-ink-500">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  id="subject"
                  type="text"
                  placeholder="What's this about?"
                  aria-invalid={!!errors.subject}
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                  className={fieldClass(!!errors.subject)}
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    role="alert"
                    className="t-label mt-2 text-red-700"
                  >
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="t-label block text-ink-500">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project or idea…"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={cn(fieldClass(!!errors.message), "resize-none")}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="t-label mt-2 text-red-700"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-center gap-3 border-l-2 border-red-600 bg-red-100 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle size={15} aria-hidden="true" />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="t-label-lg group inline-flex items-center gap-3 bg-ink-950 px-8 py-4 text-paper-50 transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      size={14}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
