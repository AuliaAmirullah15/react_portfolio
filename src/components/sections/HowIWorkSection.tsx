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

// Squared icon tiles: navy fill, sky hairline edge, sky glyph.
// The edge is not decoration — on a near-black ground the navy fill alone is
// low-contrast and the tile would read as a floating icon rather than a tile.
// The sky edge carries the shape.
const principles = [
  {
    icon: GitBranch,
    title: "Event-Driven by Default",
    description:
      "I design systems around events and async messaging using NATS, Kafka, Websocket and Azure Service Bus which keep services decoupled, resilient, and independently deployable.",
  },
  {
    icon: Eye,
    title: "Observability First",
    description:
      "Every production system I ship includes structured logging (Seq), metrics (Prometheus or Grafana), and dashboards from day one. If you can't observe it, you can't own it.",
  },
  {
    icon: ToggleLeft,
    title: "Ship Safely",
    description:
      "Feature flags (LaunchDarkly), A/B tests, and staged rollouts let me push to production continuously without big-bang releases or late-night rollbacks.",
  },
  {
    icon: FlaskConical,
    title: "Test at Every Layer",
    description:
      "Unit, integration, contract, and E2E tests using frameworks such as xUnit, Flutter Test, Vitest, Jest, Cypress and Playwright. Good test coverage enables confident refactoring and fast PR reviews.",
  },
  {
    icon: Layers,
    title: "Reusable Architecture",
    description:
      "I build shared packages and clean domain boundaries that other teams can adopt. At Greggs, my order-sharing and loyalty packages were picked up by POS team.",
  },
  {
    icon: Gauge,
    title: "Accessibility & Performance",
    description:
      "Every UI I build starts from semantic HTML and ARIA standards. I measure Core Web Vitals from the start (not as an afterthought) and treat accessibility as a first-class requirement.",
  },
] as const;

export default function HowIWorkSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="how-i-work" className="on-ink bg-ink-950">
      {/* Sunburst anchored bottom-left, mirroring the hero's right-hand one */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/2 -left-1/4 aspect-square w-[90vw] text-sky-300/10"
        // Centre faded too — see the note in HeroSection.
        style={{
          maskImage:
            "radial-gradient(circle, transparent 10%, black 40%, transparent 76%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 10%, black 40%, transparent 76%)",
        }}
      />

      <SectionHeading
        index={5}
        label="Method"
        title="How I work."
        aside="Six principles, applied from first commit to production rollout."
        inverted
      />

      {/* Squared icon tiles in the accent trio, on hairline rows. */}
      <ol ref={listRef} className="relative z-10 grid gap-x-14 lg:grid-cols-2">
        {principles.map((principle, i) => (
          <motion.li
            key={principle.title}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="ed-row grid grid-cols-[3.25rem_1fr] items-start gap-x-4 py-8"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center border border-sky-300 bg-navy-800 text-sky-300"
            >
              <principle.icon size={18} strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="t-sub text-xl text-paper-100">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200">
                {principle.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
