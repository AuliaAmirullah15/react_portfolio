"use client";

import { Code2, Database, Zap, Download } from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/lib/constants";

const stats = [
  { value: "7+", label: "Years" },
  { value: "3", label: "Industries" },
  { value: "85%", label: "Fewer queries" },
  { value: "MSc", label: "DS & AI" },
];

const highlights = [
  {
    icon: Code2,
    title: "Event-Driven Systems",
    description:
      "Distributed messaging with NATS, Kafka, Websocket and Azure Service Bus in high-availability retail environments.",
  },
  {
    icon: Zap,
    title: "Measurable Impact",
    description:
      "Cut support queries by 85%, eliminated missing-order incidents across major delivery platforms, and improved accessibility scores by 10 points.",
  },
  {
    icon: Database,
    title: "Full-Stack Ownership",
    description:
      "From Azure infrastructure and .NET microservices through to Flutter, React and Vue.js frontend frameworks.",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        index={1}
        label="About"
        title="Building production systems that scale."
        aside={SITE_CONFIG.location}
      />

      <div className="ed-grid">
        {/* Left gutter: the CV link sits in the margin, not under the copy */}
        <div>
          <a
            href="/cv/CV_Aulia_Zulkarneidi.pdf"
            download
            className="t-label-lg group inline-flex items-center gap-2.5 pb-1.5 text-ink-800 transition-colors hover:border-jade-600 hover:text-jade-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 focus-visible:ring-offset-2"
          >
            <Download size={15} aria-hidden="true" />
            Download CV
          </a>
        </div>

        {/* Content column */}
        <div>
          {/* Lead sentence set as a pull-quote. The quote glyph is decorative
              and aria-hidden — this is his own copy, not a quotation from a
              source, so a real <blockquote> would misrepresent it to a screen
              reader. The drop cap is gone: a drop cap and a quote mark fight
              each other for the same opening position. */}
          <div className="relative max-w-2xl pl-12 sm:pl-16">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 font-serif text-6xl leading-none text-jade-700 select-none sm:text-7xl"
            >
              &ldquo;
            </span>
            <p className="drop-cap font-serif text-2xl leading-snug text-ink-900 [&::first-letter]:text-jade-700 sm:text-3xl">
              I&apos;m a Senior Software Developer with 7+ years&apos;
              experience building event-driven, production systems across retail
              and enterprise settings.
            </p>
          </div>

          <p className="mt-8 max-w-2xl leading-relaxed text-ink-600">
            I specialise in distributed messaging and .NET microservices on
            Azure, with a strong eye for performance, observability, and clean
            system design. I hold an MSc in Data Science &amp; Artificial
            Intelligence from Newcastle University (Distinction), which informs
            my approach to building intelligent, data-driven systems, from
            ML-powered recommendation engines to real-time analytics pipelines.
          </p>

          {/* ── Figures in gold frames with inner corner brackets ── */}
          <dl className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="deco-frame bg-jade-700 px-5 py-7 text-center [--b:var(--color-brass-300)]"
              >
                <dd className="t-figure text-brass-200">{stat.value}</dd>
                <dt className="t-label mt-3 text-brass-300">{stat.label}</dt>
              </div>
            ))}
          </dl>

          {/* ── Highlights: the "How I work" icon tile, each in a gold frame ── */}
          <ul className="mt-16 space-y-5">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="deco-frame grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-brass-400 bg-jade-700 text-brass-300"
                >
                  <item.icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="t-sub text-ink-950">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
