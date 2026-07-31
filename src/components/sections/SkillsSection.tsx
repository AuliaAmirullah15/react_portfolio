"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { skills, skillCategories, type SkillCategoryKey } from "@/data/skills";
import { cn } from "@/lib/utils";

type Filter = "all" | SkillCategoryKey;

// Level is shown as a filled-square meter rather than a coloured pill — it
// encodes rank ordinally instead of relying on hue, which also means it reads
// correctly in greyscale and for colour-blind users.
const LEVEL_RANK = { expert: 3, proficient: 2, familiar: 1 } as const;
const LEVEL_LABEL = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
} as const;

const CARD_TRANSITION = {
  layout: { type: "spring", stiffness: 420, damping: 36, mass: 0.7 },
  opacity: { duration: 0.15, ease: "easeOut" },
} as const;

const GRID_TRANSITION = {
  layout: { type: "spring", stiffness: 380, damping: 40, mass: 0.8 },
} as const;

export default function SkillsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? skills : skills.filter((s) => s.category === filter);

  return (
    <SectionWrapper id="skills" className="bg-paper-200">
      <SectionHeading
        index={2}
        label="Stack"
        title="Technologies I work with."
        aside={`${skills.length} tools across the full stack`}
      />

      <div className="ed-grid">
        {/* Left gutter: filters as a vertical index, not a row of pills */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-row flex-wrap gap-x-5 gap-y-3 md:flex-col md:gap-y-3.5"
        >
          {(["all", ...skillCategories.map((c) => c.key)] as Filter[]).map(
            (key) => {
              const label =
                key === "all"
                  ? "All"
                  : (skillCategories.find((c) => c.key === key)?.label ?? key);
              const isActive = filter === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(key)}
                  // jade-800 / ink-700 rather than jade-700 / ink-500: on wide
                  // viewports this filter column overlaps the ghost numeral, so
                  // the effective background is paper-400. The lighter pair
                  // measured 3.40:1 and 3.88:1 there.
                  className={cn(
                    "t-label group flex items-center gap-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 focus-visible:ring-offset-2",
                    isActive
                      ? "text-jade-800"
                      : "text-ink-700 hover:text-ink-950",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px transition-all",
                      isActive
                        ? "w-6 bg-jade-600"
                        : "w-2.5 bg-ink-400 group-hover:w-4",
                    )}
                  />
                  {label}
                </button>
              );
            },
          )}
        </div>

        {/* Skills as hairline rows in columns — no card boxes at all */}
        <motion.ul
          layout
          transition={GRID_TRANSITION}
          className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3"
          role="tabpanel"
          aria-label={`${filter === "all" ? "All" : filter} skills`}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => (
              <motion.li
                key={skill.name}
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={CARD_TRANSITION}
                className="ed-row flex items-baseline justify-between gap-4 py-3"
              >
                <span className="text-sm font-medium text-ink-800">
                  {skill.name}
                </span>
                <span
                  className="flex shrink-0 items-center gap-1"
                  aria-label={`Level: ${LEVEL_LABEL[skill.level]}`}
                >
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 rotate-45",
                        n <= LEVEL_RANK[skill.level]
                          ? "bg-jade-600"
                          : "bg-ink-300",
                      )}
                    />
                  ))}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* Legend, so the meter is never unexplained */}
      <p className="t-label mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-500">
        {(["expert", "proficient", "familiar"] as const).map((lvl) => (
          <span key={lvl} className="flex items-center gap-1.5">
            <span className="flex gap-1" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={cn(
                    "h-1.5 w-1.5 rotate-45",
                    n <= LEVEL_RANK[lvl] ? "bg-jade-600" : "bg-ink-300",
                  )}
                />
              ))}
            </span>
            {LEVEL_LABEL[lvl]}
          </span>
        ))}
      </p>
    </SectionWrapper>
  );
}
