"use client";

import { Code2, Database, Zap, Download, MapPin } from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/lib/constants";

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "3", label: "Industries" },
  { value: "85%", label: "Support Query Reduction" },
  { value: "MSc", label: "Data Science & AI" },
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
    <SectionWrapper id="about" className="bg-bone-200">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Copy ──────────────────────────────────────────── */}
        <div>
          <SectionHeading
            eyebrow="About Me"
            title="Building production systems that scale"
          />

          <p className="text-ink-700 leading-relaxed mb-4">
            I&apos;m a Senior Software Developer with 4+ years&apos; experience
            building event-driven, production systems across retail and
            enterprise settings. I specialise in distributed messaging and .NET
            microservices on Azure, with a strong eye for performance,
            observability, and clean system design.
          </p>
          <p className="text-ink-700 leading-relaxed mb-6">
            I hold an MSc in Data Science &amp; Artificial Intelligence from
            Newcastle University (Distinction), which informs my approach to
            building intelligent, data-driven systems which ranges from
            ML-powered recommendation engines to real-time analytics pipelines.
          </p>

          <div className="flex items-center gap-2 text-ink-500 text-sm mb-8">
            <MapPin size={14} aria-hidden="true" />
            <span>{SITE_CONFIG.location}</span>
          </div>

          <a
            href="/cv/CV_Aulia_Zulkarneidi.pdf"
            download
            className="inline-flex items-center gap-2.5 px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-800 bg-transparent border border-ink-400 hover:border-brass-600 hover:text-brass-700 hover:bg-brass-200/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700 focus-visible:ring-offset-2"
          >
            <Download size={15} aria-hidden="true" />
            Download CV
          </a>
        </div>

        {/* ── Right: Stats + Feature cards ────────────────────────── */}
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4" aria-label="Key statistics">
            {/* One material, one accent. The old version gave each tile its own
                hue, which read as decoration rather than hierarchy. */}
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative bg-bone-50 p-5 border border-bone-400 border-t-2 border-t-brass-500 text-center"
              >
                <span
                  className="deco-corner top-2 right-2 text-brass-500/60"
                  aria-hidden="true"
                />
                <p
                  className="font-display text-4xl text-brass-600 mb-1"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </p>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="space-y-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-bone-50 p-4 border border-bone-400"
              >
                <div
                  className="shrink-0 w-10 h-10 flex items-center justify-center bg-ink-900 text-brass-300"
                  aria-hidden="true"
                >
                  <item.icon size={18} />
                </div>
                <div>
                  <h3 className="font-display text-base text-ink-900">
                    {item.title}
                  </h3>
                  <p className="text-ink-600 text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
