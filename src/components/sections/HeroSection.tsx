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
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* ── Geometric rings — upper right (Art Deco / MCM) ── */}
      <div
        className="absolute -top-24 -right-24 w-140 h-140 rounded-full border border-slate-200/80 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-10 -right-10 w-100 h-100 rounded-full border border-blue-200/60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-12 right-12 w-60 h-60 rounded-full border-2 border-violet-200/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-24 right-24 w-30 h-30 rounded-full border border-amber-300/60 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Geometric rings — lower left ── */}
      <div
        className="absolute -bottom-20 -left-20 w-90 h-90 rounded-full border border-teal-200/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-6 -left-6 w-55 h-55 rounded-full border border-violet-200/40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Open-to-work badge */}
        {SITE_CONFIG.openToWork && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium"
            role="status"
          >
            <span
              className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
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
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
        >
          Hi, I&apos;m{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </span>
            <span
              className="absolute bottom-1.5 left-0 w-full h-3 bg-linear-to-r from-blue-100 to-violet-100 -z-10 rounded"
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
              className="text-xl sm:text-2xl font-medium text-slate-500"
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
          className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
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
          <button
            onClick={() => scrollTo("projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-white bg-linear-to-r from-blue-600 to-violet-600 rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-lg"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-base font-semibold text-slate-700 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 shadow-sm hover:shadow-md"
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
              className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">
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
