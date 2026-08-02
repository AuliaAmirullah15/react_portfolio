"use client";

import { useEffect } from "react";
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
  // Tells the failsafe in app/layout.tsx that the app really did hydrate, so it
  // leaves the entrance animations alone. If this never runs — bundle blocked,
  // chunk 404, a throw on an old browser — the failsafe fires instead and
  // reveals the content that Framer server-rendered at opacity 0.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "1";
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
