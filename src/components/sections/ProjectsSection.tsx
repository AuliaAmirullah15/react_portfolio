"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight, ImageOff } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { projects } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import type { Project } from "@/types";

// Categories are distinguished by the *weight* of the brass rule and the fill
// of the badge, not by six competing hues. Two families only — brass and ink —
// which keeps the grid reading as one collection.
//
// (The previous `categoryTopBorder.linux` was `bg-green-50`, a background class
// in a border slot, so Linux cards silently rendered no top rule at all. Every
// entry here is a border colour.)
const categoryBadge: Record<Project["category"], string> = {
  web: "bg-ink-900 text-brass-300 border-ink-900",
  api: "bg-brass-200 text-brass-800 border-brass-400",
  ai: "bg-brass-500 text-ink-950 border-brass-500",
  mobile: "bg-verdigris-100 text-verdigris-700 border-verdigris-400",
  other: "bg-bone-200 text-ink-700 border-bone-400",
  linux: "bg-ink-700 text-brass-200 border-ink-700",
};

const categoryTopBorder: Record<Project["category"], string> = {
  web: "border-t-ink-900",
  api: "border-t-brass-400",
  ai: "border-t-brass-600",
  mobile: "border-t-verdigris-600",
  other: "border-t-bone-400",
  linux: "border-t-ink-700",
};

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="projects" className="bg-bone-200">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="A selection of projects ranging from production-grade platforms to developer tools and open-source work."
      />

      <div
        ref={gridRef}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      >
        {featured.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            // The category top rule is the card's identity, so hover shifts the
            // fill rather than the border — a `hover:border-*` would repaint all
            // four sides and take the top rule's colour with it.
            className={`bg-bone-50 hover:bg-brass-200/25 border border-bone-400 border-t-4 hover:-translate-y-1 transition-[transform,background-color] duration-200 flex flex-col overflow-hidden ${categoryTopBorder[project.category]}`}
          >
            {/* Project image / placeholder */}
            <div className="relative h-40 w-full shrink-0 bg-bone-200">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1 opacity-30">
                  <ImageOff size={24} aria-hidden="true" />
                  <span className="text-xs font-medium">
                    Screenshot coming soon
                  </span>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-5 flex-1">
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 border uppercase tracking-[0.16em] ${categoryBadge[project.category]}`}
                >
                  {project.category}
                </span>
                <div className="flex gap-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-ink-500 hover:text-brass-700 hover:bg-brass-200/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
                      aria-label={`View ${project.title} source on GitHub`}
                    >
                      <GitHubIcon size={15} aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-ink-500 hover:text-brass-700 hover:bg-brass-200/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
                      aria-label={`Open ${project.title} live site`}
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display text-lg text-ink-900 mb-2">
                {project.title}
              </h3>
              <p className="text-ink-600 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech stack chips */}
            <div className="px-5 pb-5">
              <div
                className="flex flex-wrap gap-1.5"
                aria-label="Technologies used"
              >
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2 py-0.5 bg-bone-200 text-ink-700 border border-bone-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View all */}
      <div className="text-center">
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-brass-700 hover:text-ink-900 border-b border-brass-500 pb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700 focus-visible:ring-offset-2"
        >
          View all projects on GitHub
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </SectionWrapper>
  );
}
