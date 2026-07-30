"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll-triggered background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // sync on mount so reloading mid-page doesn't flash a transparent bar
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document
      .getElementById(href.slice(1))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scrolled chrome lives on its own layer so the transition only animates
          opacity. Animating these on the header itself meant transition-all also
          interpolated backdrop-filter (which pops) and border-width (0 -> 1px). */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-16 border-b border-brass-500/35 bg-bone-100/92 shadow-sm backdrop-blur-sm transition-opacity duration-300 ease-out",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl text-ink-900 hover:text-brass-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
            aria-label="Scroll to top"
          >
            {SITE_CONFIG.name.split(" ")[0]}
            <span className="text-brass-600" aria-hidden="true">
              .
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  // Brass underline instead of a filled pill — the active state
                  // reads as a rule under a masthead entry.
                  "px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700",
                  activeSection === link.href
                    ? "text-brass-700 border-brass-500"
                    : "text-ink-600 border-transparent hover:text-ink-900 hover:border-ink-300",
                )}
                aria-current={activeSection === link.href ? "true" : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:inline-flex items-center px-5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-bone-50 bg-ink-900 hover:bg-brass-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700 focus-visible:ring-offset-2"
            >
              Contact Me
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-ink-600 hover:text-brass-700 hover:bg-brass-200/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {mobileOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            // Do NOT animate height to/from "auto" here. Framer has to measure
            // the element to resolve "auto", and its measurement pass suspends
            // window scroll and then restores it to the offset captured before
            // the pass — which silently killed the smooth scroll that scrollTo()
            // starts in the same tick, so tapping a nav item closed the menu and
            // went nowhere. Opacity/transform need no measurement, and they are
            // compositor-only. The panel sits inside a fixed header, so its
            // height never affected document flow anyway.
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden bg-bone-50 border-b border-brass-500/35 shadow-lg"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] border-l-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-700",
                    activeSection === link.href
                      ? "text-brass-700 border-brass-500 bg-brass-200/30"
                      : "text-ink-600 border-transparent hover:text-ink-900 hover:bg-bone-200",
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
