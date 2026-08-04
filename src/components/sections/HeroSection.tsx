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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-20"
      aria-label="Introduction"
    >
      {/* Ghost monogram — the same device as the section numerals, so it reads
          as part of the system rather than a one-off flourish. paper-300, not
          paper-400: the surname crosses it, and navy-700 measures 3.4:1 over
          400 but 5.70:1 over 300. */}
      <span
        aria-hidden="true"
        className="numeral-ghost pointer-events-none absolute top-1/2 -left-10 z-0 hidden -translate-y-1/2 text-paper-300 select-none md:block md:-left-16"
      >
        AZ
      </span>

      {/* Vertical slug on the outer edge — editorial furniture, real content,
          hidden where there is no room for it. */}
      <span className="t-label pointer-events-none absolute top-1/2 right-6 z-0 hidden -translate-y-1/2 text-ink-500 [writing-mode:vertical-rl] lg:block">
        {SITE_CONFIG.title}
      </span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="ed-grid">
          {/* ── Left gutter: the metadata block ── */}
          <div className="pt-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="t-label text-navy-700"
            >
              00 / Index
            </motion.p>

            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 space-y-3 text-sm"
            >
              <div>
                <dt className="t-label text-ink-600">Based</dt>
                <dd className="mt-1 text-ink-600">{SITE_CONFIG.location}</dd>
              </div>
              {SITE_CONFIG.openToWork && (
                <div>
                  <dt className="t-label text-ink-600">Status</dt>
                  <dd className="mt-1 flex items-center gap-2 text-navy-700">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45 bg-navy-600"
                    />
                    Open to work
                  </dd>
                </div>
              )}
            </motion.dl>
          </div>

          {/* ── Content column ── */}
          <div>
            {/* Name, set very large and ragged. Two lines, deliberately
                unbalanced — the surname overhangs the given name. */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="t-display text-ink-950"
            >
              <span className="block">Aulia</span>
              <span className="block pl-[8%] text-navy-700">Zulkarneidi</span>
            </motion.h1>

            {/* Cycling role, as a mono ticker rather than a soft subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex items-baseline gap-4 pt-4"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="t-label shrink-0 text-ink-600">Currently</span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="t-label-lg text-ink-800"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600"
            >
              {SITE_CONFIG.description}
            </motion.p>

            {/* CTAs — a solid ink block and a bare underlined link, not two
                matching buttons. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="t-label-lg group inline-flex items-center gap-3 bg-ink-950 px-7 py-4 text-paper-50 transition-colors hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
              >
                View Work
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="t-label-lg border-b-2 border-navy-600 pb-1 text-ink-800 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
              >
                Get in touch
              </button>

              <div className="flex items-center gap-1">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-ink-500 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
                    aria-label={label}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue, pinned to the left rather than centred */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-5 flex items-center gap-3 text-ink-500 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 sm:left-8 lg:left-12"
        aria-label="Scroll to About section"
      >
        <span className="t-label">Scroll</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={14} aria-hidden="true" />
        </motion.span>
      </motion.button>
    </section>
  );
}
