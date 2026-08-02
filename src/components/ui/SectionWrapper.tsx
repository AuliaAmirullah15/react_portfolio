"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── SectionWrapper ──────────────────────────────────────────────────────────
// Vertical rhythm, max-width, and a scroll-triggered fade for every section.
// `on-ink` is set by dark sections so the CSS in globals.css can flip rule and
// focus-ring colours without every child needing an `inverted` prop.

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  /** Outer <section> — background overrides go here */
  className?: string;
  /** Inner constrained container */
  innerClassName?: string;
}

export default function SectionWrapper({
  id,
  children,
  className,
  innerClassName,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative overflow-hidden py-24 lg:py-36", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12",
          innerClassName,
        )}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────
// The editorial masthead used at the top of every section:
//
//   ┌ 03 ──────────────────────────────────────────────
//   │  PROJECTS   │  Things I've
//   │  ─────────  │  built.
//   │  6 shipped  │
//   └──────────────────────────────────────────────────
//
// Asymmetric, left-aligned, structured by a vertical rule instead of a box,
// with an oversized ghost numeral bleeding off the top-left corner.

interface SectionHeadingProps {
  /** Section number, rendered as oversized page furniture */
  index: number;
  label: string;
  title: string;
  /** Optional short line in the left gutter, under the label */
  aside?: string;
  description?: string;
  /** Light-on-dark variant for ink-ground sections */
  inverted?: boolean;
}

export function SectionHeading({
  index,
  label,
  title,
  aside,
  description,
  inverted = false,
}: SectionHeadingProps) {
  const num = String(index).padStart(2, "0");

  return (
    <header className="relative mb-16 lg:mb-24">
      {/* Ghost numeral — decorative only; the real number is repeated in the
          label below for anyone who can't see it. paper-400 rather than
          paper-300 so it survives on the tinted (paper-200) sections too,
          where paper-300 measured 1.25:1 and disappeared. */}
      {/* z-0 with the content lifted to z-10 — NOT a negative z-index. With
          -z-10 the numeral rendered only while the reveal animation was in
          flight: an active transform/opacity on the wrapping motion.div creates
          a stacking context, which the numeral could sit behind harmlessly.
          Once Framer settled to `transform: none; opacity: 1` that stacking
          context disappeared, so the numeral fell behind the nearest ancestor
          background instead — invisible on every section that sets one
          (bg-paper-200 / bg-ink-950), and fine on those that don't. */}
      <span
        aria-hidden="true"
        className={cn(
          "numeral-ghost absolute -top-10 -left-6 z-0 select-none sm:-top-16 sm:-left-10",
          inverted ? "text-ink-700" : "text-paper-400",
        )}
      >
        {num}
      </span>

      <div className="ed-grid">
        {/* Left gutter: label + aside */}
        <div className="pt-1">
          {/* jade-800 / ink-800, not the lighter tones: both of these sit on
              top of the ghost numeral, so their effective background is
              paper-400 (ink-700 when inverted), not the page ground. jade-700
              measured 3.40:1 there and ink-500 3.88:1 — both failed AA. */}
          <p
            className={cn(
              "t-label",
              inverted ? "text-jade-300" : "text-jade-800",
            )}
          >
            {num} / {label}
          </p>
          {aside && (
            <p
              className={cn(
                "mt-4 max-w-52 text-sm leading-relaxed",
                inverted ? "text-ink-200" : "text-ink-800",
              )}
            >
              {aside}
            </p>
          )}
        </div>

        {/* Content column: the title, very large */}
        <div>
          <h2
            className={cn(
              "t-title",
              inverted ? "text-paper-100" : "text-ink-950",
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg leading-relaxed",
                inverted ? "text-ink-200" : "text-ink-600",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
