"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, ImageOff } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { projects } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        index={3}
        label="Work"
        title="Selected projects."
        aside={`${featured.length} of ${projects.length} shown`}
      />

      {/* Projects as numbered editorial entries. The image alternates side on
          wide screens so the page never settles into a repeating card grid. */}
      <ol ref={listRef} className="relative z-10">
        {featured.map((project, i) => {
          const imageFirst = i % 2 === 0;
          return (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="ed-divide ed-row group grid gap-8 lg:grid-cols-12 lg:gap-10"
            >
              {/* Index + category, hanging in the margin */}
              <div className="lg:col-span-2">
                <p className="t-label-lg text-navy-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="t-label mt-2 text-ink-400">{project.category}</p>
              </div>

              {/* Image */}
              <div
                className={cn(
                  "relative aspect-16/10 overflow-hidden bg-paper-200 lg:col-span-5",
                  imageFirst ? "lg:order-1" : "lg:order-2",
                )}
              >
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-400">
                    <ImageOff size={22} aria-hidden="true" />
                    <span className="t-label">No screenshot</span>
                  </div>
                )}
              </div>

              {/* Copy */}
              <div
                className={cn(
                  "lg:col-span-5",
                  imageFirst ? "lg:order-2" : "lg:order-1",
                )}
              >
                <h3 className="t-sub text-2xl text-ink-950">
                  {project.caseStudy ? (
                    <Link
                      href={`/projects/${project.id}`}
                      className="transition-colors hover:text-navy-700 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {project.description}
                </p>

                {/* Tech as a mono run, not boxed chips. A real list rather than
                    a joined string so wrapping breaks between items and the
                    separators keep even spacing. */}
                <ul
                  className="t-meta t-meta-list mt-5 text-ink-500"
                  aria-label="Technologies used"
                >
                  {project.techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                {(project.caseStudy ||
                  project.githubUrl ||
                  project.liveUrl) && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {/* First, and styled as the accent: the write-up is the
                        thing worth reading, and it is the only destination here
                        that does not leave the site. */}
                    {project.caseStudy && (
                      <Link
                        href={`/projects/${project.id}`}
                        className="t-label group/cs inline-flex items-center gap-2 pb-1 text-navy-700 transition-colors hover:text-ink-950 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        Case study
                        <span className="sr-only"> for {project.title}</span>
                        <ArrowRight
                          size={12}
                          aria-hidden="true"
                          className="transition-transform group-hover/cs:translate-x-1"
                        />
                      </Link>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-label inline-flex items-center gap-2 pb-1 text-ink-700 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
                      >
                        <GitHubIcon size={12} aria-hidden="true" />
                        Source
                        <span className="sr-only"> for {project.title}</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-label inline-flex items-center gap-2 pb-1 text-ink-700 transition-colors hover:text-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
                      >
                        <ExternalLink size={12} aria-hidden="true" />
                        Live
                        <span className="sr-only">
                          {" "}
                          site for {project.title}
                        </span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>

      <div className="ed-row pt-10">
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="t-label-lg group inline-flex items-center gap-3 text-navy-700 transition-colors hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2"
        >
          All projects on GitHub
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </a>
      </div>
    </SectionWrapper>
  );
}
