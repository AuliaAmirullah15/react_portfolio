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
            className="t-label group inline-flex items-center gap-2 border-b border-ink-400 pb-1.5 text-ink-700 transition-colors hover:border-jade-600 hover:text-jade-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 focus-visible:ring-offset-2"
          >
            <Download size={12} aria-hidden="true" />
            Download CV
          </a>
        </div>

        {/* Content column */}
        <div>
          {/* Lead paragraph, set larger than the rest — an editorial drop-in */}
          <p className="max-w-2xl font-serif text-xl leading-snug text-ink-800 sm:text-2xl">
            I&apos;m a Senior Software Developer with 7+ years&apos; experience
            building event-driven, production systems across retail and
            enterprise settings.
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-600">
            I specialise in distributed messaging and .NET microservices on
            Azure, with a strong eye for performance, observability, and clean
            system design. I hold an MSc in Data Science &amp; Artificial
            Intelligence from Newcastle University (Distinction), which informs
            my approach to building intelligent, data-driven systems, from
            ML-powered recommendation engines to real-time analytics pipelines.
          </p>

          {/* ── Figures on a rule, not in boxes ── */}
          <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t-2 border-ink-950 pt-4">
                <dd className="t-figure text-jade-700">{stat.value}</dd>
                <dt className="t-label mt-3 text-ink-500">{stat.label}</dt>
              </div>
            ))}
          </dl>

          {/* ── Highlights as hairline rows ── */}
          <ul className="mt-20">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="ed-row grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-7"
              >
                <item.icon
                  size={20}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-jade-600"
                />
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
