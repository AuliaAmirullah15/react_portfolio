"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="experience" className="bg-paper-200">
      <SectionHeading
        index={4}
        label="History"
        title="Where I've worked."
        aside="Most recent first"
      />

      {/* A single left rule with dates hanging in the margin. The old centred
          zigzag timeline was symmetrical decoration; this reads as a CV. */}
      <ol ref={listRef} className="relative z-10">
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="ed-row py-12"
          >
            <div className="ed-grid">
              {/* Dates + company in the gutter */}
              <div>
                <p className="t-label-lg text-brass-700">
                  {exp.startDate} &mdash; {exp.endDate ?? "Present"}
                </p>
                <p className="t-label-lg mt-3 text-jade-800">{exp.company}</p>
              </div>

              <div>
                <h3 className="t-title text-3xl text-ink-950 sm:text-4xl">
                  {exp.role}
                </h3>
                <p className="mt-5 max-w-2xl leading-relaxed text-ink-600">
                  {exp.description}
                </p>

                {/* Achievements as a hanging-indent list with mono markers */}
                <ul className="mt-8 space-y-3" aria-label="Key achievements">
                  {exp.achievements.map((achievement, n) => (
                    <li
                      key={achievement}
                      className="grid grid-cols-[1.75rem_1fr] items-baseline text-sm leading-relaxed text-ink-700"
                    >
                      <span
                        aria-hidden="true"
                        className="t-label text-bord-400"
                      >
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <span className="max-w-xl">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <ul
                  className="t-meta t-meta-list mt-8 text-ink-600"
                  aria-label="Technologies used"
                >
                  {exp.techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
