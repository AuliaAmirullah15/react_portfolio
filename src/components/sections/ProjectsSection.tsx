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

const categoryBadge: Record<Project["category"], string> = {
  web: "bg-blue-50 text-blue-700 border-blue-100",
  api: "bg-teal-50 text-teal-700 border-teal-100",
  ai: "bg-violet-50 text-violet-700 border-violet-100",
  mobile: "bg-amber-50 text-amber-700 border-amber-100",
  other: "bg-slate-50 text-slate-700 border-slate-200",
  linux: "bg-green-50 text-green-700 border-green-100",
};

const categoryTopBorder: Record<Project["category"], string> = {
  web: "border-t-blue-500",
  api: "border-t-teal-500",
  ai: "border-t-violet-500",
  mobile: "border-t-amber-500",
  other: "border-t-slate-400",
  linux: "bg-green-50",
};

const categoryPlaceholderBg: Record<Project["category"], string> = {
  web: "bg-blue-50",
  api: "bg-teal-50",
  ai: "bg-violet-50",
  mobile: "bg-amber-50",
  other: "bg-slate-50",
  linux: "bg-green-50",
};

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="projects" className="bg-violet-50/40">
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
            className={`bg-white rounded-2xl border border-slate-200 border-t-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden ${categoryTopBorder[project.category]}`}
          >
            {/* Project image / placeholder */}
            <div
              className={`relative h-40 w-full shrink-0 ${categoryPlaceholderBg[project.category]}`}
            >
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
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${categoryBadge[project.category]}`}
                >
                  {project.category}
                </span>
                <div className="flex gap-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`Open ${project.title} live site`}
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
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
                    className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          View all projects on GitHub
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </SectionWrapper>
  );
}
