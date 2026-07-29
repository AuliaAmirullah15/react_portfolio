"use client";

import { Code2, Database, Zap, Download, MapPin } from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/lib/constants";

const statColors = [
  { border: "border-t-blue-500", value: "text-blue-600" },
  { border: "border-t-violet-500", value: "text-violet-600" },
  { border: "border-t-teal-500", value: "text-teal-600" },
  { border: "border-t-amber-500", value: "text-amber-600" },
];

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
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Measurable Impact",
    description:
      "Cut support queries by 85%, eliminated missing-order incidents across major delivery platforms, and improved accessibility scores by 10 points.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Database,
    title: "Full-Stack Ownership",
    description:
      "From Azure infrastructure and .NET microservices through to Flutter, React and Vue.js frontend frameworks.",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-amber-50/60">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Copy ──────────────────────────────────────────── */}
        <div>
          <SectionHeading
            eyebrow="About Me"
            title="Building production systems that scale"
          />

          <p className="text-slate-600 leading-relaxed mb-4">
            I&apos;m a Senior Software Developer with 4+ years&apos; experience
            building event-driven, production systems across retail and
            enterprise settings. I specialise in distributed messaging and .NET
            microservices on Azure, with a strong eye for performance,
            observability, and clean system design.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            I hold an MSc in Data Science &amp; Artificial Intelligence from
            Newcastle University (Distinction), which informs my approach to
            building intelligent, data-driven systems which ranges from
            ML-powered recommendation engines to real-time analytics pipelines.
          </p>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <MapPin size={14} aria-hidden="true" />
            <span>{SITE_CONFIG.location}</span>
          </div>

          <a
            href="/cv/CV_Aulia_Zulkarneidi.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Download size={15} aria-hidden="true" />
            Download CV
          </a>
        </div>

        {/* ── Right: Stats + Feature cards ────────────────────────── */}
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4" aria-label="Key statistics">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-white rounded-2xl p-5 border border-slate-200 border-t-4 shadow-sm text-center ${statColors[i].border}`}
              >
                <p
                  className={`text-3xl font-bold mb-1 ${statColors[i].value}`}
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="space-y-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
              >
                <div
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}
                  aria-hidden="true"
                >
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">
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
