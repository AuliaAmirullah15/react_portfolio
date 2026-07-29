"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { skills, skillCategories, type SkillCategoryKey } from "@/data/skills";
import { cn } from "@/lib/utils";

type Filter = "all" | SkillCategoryKey;

const levelConfig = {
  expert: { label: "Expert", className: "bg-blue-600 text-white" },
  proficient: { label: "Proficient", className: "bg-blue-100 text-blue-700" },
  familiar: { label: "Familiar", className: "bg-slate-100 text-slate-600" },
} as const;

// Per-property transitions. Keeping `layout` separate from opacity/scale matters:
// a single shared transition with a per-index delay staggers the layout animation
// too, so the grid reflows on every card's arrival and cards visibly hunt for
// their slot. Nothing here is staggered — the spring alone carries the motion.
const CARD_TRANSITION = {
  layout: { type: "spring", stiffness: 420, damping: 36, mass: 0.7 },
  opacity: { duration: 0.15, ease: "easeOut" },
  scale: { duration: 0.15, ease: "easeOut" },
  y: { duration: 0.15, ease: "easeOut" },
} as const;

// Smooths the container's height change so content below doesn't jump.
const GRID_TRANSITION = {
  layout: { type: "spring", stiffness: 380, damping: 40, mass: 0.8 },
} as const;

export default function SkillsSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? skills : skills.filter((s) => s.category === filter);

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        eyebrow="Skills & Expertise"
        title="Technologies I work with"
        description="My toolkit spans the full stack which ranges from frontends to backend and cloud infrastructure."
        centered
      />

      {/* Category filter tabs */}
      <div
        className="flex flex-wrap gap-2 justify-center mb-10"
        role="tablist"
        aria-label="Filter skills by category"
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
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  isActive
                    ? "bg-linear-to-r from-blue-600 to-violet-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {label}
              </button>
            );
          },
        )}
      </div>

      {/* Skill cards */}
      <motion.div
        layout
        transition={GRID_TRANSITION}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        role="tabpanel"
        aria-label={`${filter === "all" ? "All" : filter} skills`}
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.div
              key={skill.name}
              // Position-only: cards glide to their new slot without Framer
              // scale-correcting their size, which is what squashed the box and
              // its text while the grid tracks resized underneath.
              layout="position"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              whileHover={{ y: -2 }}
              transition={CARD_TRANSITION}
              className="flex flex-col items-center gap-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-sm font-semibold text-slate-900 text-center leading-tight">
                {skill.name}
              </span>
              <span
                className={cn(
                  "text-[11px] px-2 py-0.5 rounded-full font-semibold",
                  levelConfig[skill.level].className,
                )}
                aria-label={`Level: ${levelConfig[skill.level].label}`}
              >
                {levelConfig[skill.level].label}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
