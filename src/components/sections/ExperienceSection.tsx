"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="My professional journey building software at scale."
      />

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line — hidden on mobile, centred on desktop */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-linear-to-b from-brass-500 via-brass-400 to-transparent"
          aria-hidden="true"
        />
        {/* Mobile line */}
        <div
          className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-linear-to-b from-brass-500 to-transparent"
          aria-hidden="true"
        />

        <ol ref={listRef} className="space-y-10">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.li
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative flex items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline marker — a brass lozenge on point, not a bubble. */}
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-6 w-3 h-3 rotate-45 bg-brass-500 ring-4 ring-bone-100"
                  aria-hidden="true"
                />
                {/* Mobile marker */}
                <div
                  className="md:hidden absolute left-5 -translate-x-1/2 mt-5 w-2.5 h-2.5 rotate-45 bg-brass-500 ring-4 ring-bone-100"
                  aria-hidden="true"
                />

                {/* Card — full width on mobile, half on desktop */}
                <div
                  className={`relative overflow-hidden ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] bg-bone-50 border border-bone-400 border-l-2 border-l-brass-500 hover:bg-brass-200/20 transition-colors p-6 ${isLeft ? "md:pr-8" : "md:pl-8"}`}
                >
                  {/* Geometric corner accent */}
                  <div
                    className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-brass-500/50"
                    aria-hidden="true"
                  />
                  <span className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-500">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </span>
                  <h3 className="mt-2 font-display text-lg text-ink-900">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-brass-700 mb-3">
                    {exp.company}
                  </p>

                  <p className="text-ink-600 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-4" aria-label="Key achievements">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2.5 text-ink-600 text-xs leading-relaxed"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-brass-500 shrink-0"
                          aria-hidden="true"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="flex flex-wrap gap-1.5"
                    aria-label="Technologies used"
                  >
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2 py-0.5 bg-bone-200 text-ink-700 border border-bone-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </SectionWrapper>
  );
}
