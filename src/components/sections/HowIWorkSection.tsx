"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitBranch,
  Eye,
  ToggleLeft,
  FlaskConical,
  Layers,
  Gauge,
} from "lucide-react";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";

const principles = [
  {
    icon: GitBranch,
    title: "Event-Driven by Default",
    description:
      "I design systems around events and async messaging using NATS, Kafka, Websocket and Azure Service Bus which keep services decoupled, resilient, and independently deployable.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: Eye,
    title: "Observability First",
    description:
      "Every production system I ship includes structured logging (Seq), metrics (Prometheus or Grafana), and dashboards from day one. If you can't observe it, you can't own it.",
    accent: "bg-violet-50 text-violet-600",
  },
  {
    icon: ToggleLeft,
    title: "Ship Safely",
    description:
      "Feature flags (LaunchDarkly), A/B tests, and staged rollouts let me push to production continuously without big-bang releases or late-night rollbacks.",
    accent: "bg-teal-50 text-teal-600",
  },
  {
    icon: FlaskConical,
    title: "Test at Every Layer",
    description:
      "Unit, integration, contract, and E2E tests using frameworks such as xUnit, Flutter Test, Vitest, Jest, Cypress and Playwright. Good test coverage enables confident refactoring and fast PR reviews.",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    icon: Layers,
    title: "Reusable Architecture",
    description:
      "I build shared packages and clean domain boundaries that other teams can adopt. At Greggs, my order-sharing and loyalty packages were picked up by POS team.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: Gauge,
    title: "Accessibility & Performance",
    description:
      "Every UI I build starts from semantic HTML and ARIA standards. I measure Core Web Vitals from the start (not as an afterthought) and treat accessibility as a first-class requirement.",
    accent: "bg-violet-50 text-violet-600",
  },
] as const;

export default function HowIWorkSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="how-i-work" className="bg-slate-900">
      <SectionHeading
        eyebrow="Approach"
        title="How I work"
        description="The engineering principles I bring to every project, from first commit to production rollout."
        inverted
      />

      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {principles.map((principle, i) => {
          const Icon = principle.icon;
          return (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${principle.accent}`}
                aria-hidden="true"
              >
                <Icon size={18} />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">
                {principle.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
