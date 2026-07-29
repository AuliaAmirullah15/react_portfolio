"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, Globe } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

// ── Validation schema (mirrors the server-side schema) ────────────────────────
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

const inputBase =
  "w-full px-4 py-2.5 text-sm text-slate-900 bg-white border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400";

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

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Have a project in mind? I'm always open to interesting opportunities. Drop me a message and I'll get back to you within 24 hours."
        centered
      />

      <div className="grid lg:grid-cols-5 gap-12 max-w-4xl mx-auto">
        {/* ── Left: contact info ─────────────────────────────── */}
        <aside className="lg:col-span-2 space-y-7">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Email
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Socials
            </p>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-slate-600 hover:text-slate-900 text-sm transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="group-hover:underline underline-offset-2">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <p className="text-sm font-semibold text-blue-800 mb-1">
              Response time
            </p>
            <p className="text-xs text-blue-600">
              Typically within 24 hours on business days.
            </p>
          </div>
        </aside>

        {/* ── Right: form ────────────────────────────────────── */}
        <div className="lg:col-span-3">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-14"
              role="status"
            >
              <CheckCircle2
                size={44}
                className="text-green-500 mb-4"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Message sent!
              </h3>
              <p className="text-slate-500 text-sm">
                Thanks for reaching out — I&apos;ll reply within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
              aria-label="Contact form"
            >
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
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
                    className={cn(
                      inputBase,
                      errors.name
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300",
                    )}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1 text-xs text-red-500"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
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
                    className={cn(
                      inputBase,
                      errors.email
                        ? "border-red-400"
                        : "border-slate-200 hover:border-slate-300",
                    )}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1 text-xs text-red-500"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
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
                  className={cn(
                    inputBase,
                    errors.subject
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300",
                  )}
                />
                {errors.subject && (
                  <p
                    id="subject-error"
                    role="alert"
                    className="mt-1 text-xs text-red-500"
                  >
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={cn(
                    inputBase,
                    "resize-none",
                    errors.message
                      ? "border-red-400"
                      : "border-slate-200 hover:border-slate-300",
                  )}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-1 text-xs text-red-500"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={15} aria-hidden="true" />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-600 to-violet-600 rounded-xl hover:from-blue-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 shadow-sm"
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} aria-hidden="true" />
                    Send Message
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
