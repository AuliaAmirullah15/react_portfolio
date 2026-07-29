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
          className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-linear-to-b from-blue-300 via-violet-300 to-teal-300"
          aria-hidden="true"
        />
        {/* Mobile line */}
        <div
          className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-linear-to-b from-blue-300 to-violet-300"
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
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 mt-6 w-3.5 h-3.5 rounded-full bg-linear-to-br from-blue-500 to-violet-600 border-2 border-white shadow ring-2 ring-violet-200"
                  aria-hidden="true"
                />
                {/* Mobile dot */}
                <div
                  className="md:hidden absolute left-5 -translate-x-1/2 mt-5 w-3 h-3 rounded-full bg-linear-to-br from-blue-500 to-violet-600 border-2 border-white shadow"
                  aria-hidden="true"
                />

                {/* Card — full width on mobile, half on desktop */}
                <div
                  className={`relative overflow-hidden ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] bg-[#fafaf7] rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 ${isLeft ? "md:pr-8" : "md:pl-8"}`}
                >
                  {/* Geometric corner accent */}
                  <div
                    className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-slate-200"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-slate-400">
                    {exp.startDate} - {exp.endDate ?? "Present"}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-violet-600 mb-3">
                    {exp.company}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-4" aria-label="Key achievements">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2 text-slate-500 text-xs leading-relaxed"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"
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
                        className="text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
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
