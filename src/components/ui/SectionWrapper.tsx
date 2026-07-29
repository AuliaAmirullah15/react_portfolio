"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── SectionWrapper ──────────────────────────────────────────────────────────
// Applies consistent vertical padding, max-width, and a scroll-triggered
// fade-in animation to every section on the page.

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  /** Applied to the outer <section> element — use for background overrides */
  className?: string;
  /** Applied to the inner constrained container */
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
    <section id={id} ref={ref} className={cn("py-20 lg:py-28", className)}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={cn("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", innerClassName)}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────
// Reusable heading block used at the top of every section.

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  /** Switch to light-on-dark colours for dark-background sections */
  inverted?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", centered && "text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-widest mb-3",
            inverted
              ? "text-blue-400"
              : "bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl lg:text-4xl font-bold tracking-tight",
          inverted ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            centered && "max-w-2xl mx-auto",
            inverted ? "text-slate-400" : "text-slate-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
