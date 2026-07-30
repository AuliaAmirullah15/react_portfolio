"use client";

import { MotionConfig } from "framer-motion";

// Framer Motion drives animations in JS, so the `prefers-reduced-motion` block
// in globals.css — which only reaches CSS transitions and keyframes — can't
// touch them. `reducedMotion="user"` makes Framer honour the same OS setting:
// transform and layout animations resolve instantly to their end state, while
// opacity fades are kept (they don't trigger vestibular symptoms).
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
