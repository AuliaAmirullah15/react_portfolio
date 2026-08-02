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
          "absolute inset-x-0 top-0 h-14 border-b border-ink-950 bg-paper-100/95 backdrop-blur-sm transition-opacity duration-300 ease-out",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-14 items-center justify-between">
          {/* Wordmark — full name in mono caps, read as a masthead slug */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="t-label-lg text-ink-950 transition-colors hover:text-jade-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 focus-visible:ring-offset-2"
            aria-label="Scroll to top"
          >
            {SITE_CONFIG.name}
            {/* <span className="text-jade-600" aria-hidden="true">
              {" "}
              &mdash;
            </span> */}
          </button>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "t-label group flex items-center gap-1.5 px-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 focus-visible:ring-offset-2",
                  activeSection === link.href
                    ? "text-jade-700"
                    : "text-ink-500 hover:text-ink-950",
                )}
                aria-current={activeSection === link.href ? "true" : undefined}
              >
                {/* Numbered nav — matches the section numerals on the page */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "tabular-nums transition-colors",
                    activeSection === link.href
                      ? "text-jade-500"
                      : "text-ink-300",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="t-label hidden items-center bg-ink-950 px-5 py-2.5 text-paper-50 transition-colors hover:bg-jade-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 focus-visible:ring-offset-2 md:inline-flex"
            >
              Get in touch
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 text-ink-600 transition-colors hover:text-jade-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700 md:hidden"
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
            className="border-b border-ink-950 bg-paper-50 shadow-lg md:hidden"
          >
            <div className="flex flex-col px-5 py-2 sm:px-8">
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "t-label ed-row flex items-center gap-3 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-700",
                    activeSection === link.href
                      ? "text-jade-700"
                      : "text-ink-600 hover:text-ink-950",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="tabular-nums text-ink-300"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
