"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Globe } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { SITE_CONFIG } from "@/lib/constants";

const roles = [
  "Senior Software Developer",
  ".NET & Azure Specialist",
  "ML & Data Systems Engineer",
  "Full-Stack Engineer",
];

const socials = [
  { icon: GitHubIcon, label: "GitHub", href: SITE_CONFIG.github },
  { icon: LinkedInIcon, label: "LinkedIn", href: SITE_CONFIG.linkedin },
  { icon: Globe, label: "Website", href: SITE_CONFIG.website },
] as const;

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            // var(), not a literal, so the dot grid follows the active palette.
            "radial-gradient(circle, var(--color-ink-950) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* ── Geometric rings — upper right (Art Deco / MCM) ──
          One hue, varied weight and opacity. The pastel-per-ring version read
          as a colour test card; concentric brass reads as inlay. */}
      <div
        className="absolute -top-24 -right-24 w-140 h-140 rounded-full border border-ink-300/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-10 -right-10 w-100 h-100 rounded-full border border-brass-500/25 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-12 w-60 h-60 rounded-full border-2 border-brass-500/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-24 right-24 w-30 h-30 rounded-full border border-brass-600/55 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Geometric rings — lower left ── */}
      <div
        className="absolute -bottom-20 -left-20 w-90 h-90 rounded-full border border-ink-300/35 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-6 -left-6 w-55 h-55 rounded-full border border-brass-500/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Stepped chevron bands — Deco corner fill, pure CSS gradient ── */}
      <div
        className="deco-band absolute top-0 left-0 w-40 h-40 text-ink-400/30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="deco-band absolute bottom-0 right-0 w-40 h-40 text-brass-500/25 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Open-to-work badge */}
        {SITE_CONFIG.openToWork && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 bg-verdigris-100 border border-verdigris-400/50 text-verdigris-700 text-[0.6875rem] font-bold uppercase tracking-[0.18em]"
            role="status"
          >
            <span
              className="w-1.5 h-1.5 rotate-45 bg-verdigris-600"
              aria-hidden="true"
            />
            Open to opportunities
          </motion.div>
        )}

        {/* ── Name heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink-900 mb-6"
        >
          <span className="block text-base font-sans font-bold uppercase tracking-[0.3em] text-ink-500 mb-4">
            Hi, I&apos;m
          </span>
          <span className="relative inline-block">
            <span className="relative z-10 text-ink-950">
              {SITE_CONFIG.name}
            </span>
            {/* Brass underlay — a struck rule rather than a gradient wash. */}
            <span
              className="absolute bottom-1.5 left-0 w-full h-2.5 bg-brass-300/60 -z-10"
              aria-hidden="true"
            />
          </span>
        </motion.h1>

        {/* Cycling role label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-9 mb-6"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="text-sm sm:text-base font-semibold uppercase tracking-[0.22em] text-brass-700"
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-ink-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {SITE_CONFIG.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          {/* Squared edges and tracked caps — Deco signage, not a SaaS pill. */}
          <button
            onClick={() => scrollTo("projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-bone-50 bg-ink-900 ring-1 ring-ink-900 ring-offset-2 ring-offset-bone-100 hover:bg-ink-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-800 bg-transparent border border-ink-400 hover:border-brass-600 hover:text-brass-700 hover:bg-brass-200/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700 focus-visible:ring-offset-2"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex items-center justify-center gap-3"
        >
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-ink-500 hover:text-brass-700 hover:bg-brass-200/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
              aria-label={label}
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ink-500 hover:text-brass-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={15} aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
