"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

// The theme lives outside React — the inline script in app/layout.tsx sets
// data-theme before first paint, and the OS can change underneath us. So this
// subscribes to both rather than holding its own state: no setState in an
// effect, and no cascading render on mount.
function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    mq.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function readTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// null on the server: the theme genuinely is not knowable there, and guessing
// would render the wrong icon and the wrong aria-label until hydration.
const serverSnapshot = (): Theme | null => null;

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    readTheme,
    serverSnapshot,
  );

  const isDark = theme === "dark";

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    // Setting the attribute is the whole state change — the MutationObserver
    // above re-renders this button from it.
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Safari private mode throws on setItem. The theme still applies to this
      // page; it just will not be remembered. Never break the page over it.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === null
          ? "Switch theme"
          : isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
      }
      aria-pressed={theme === null ? undefined : isDark}
      className="p-2 text-ink-600 transition-colors hover:text-navy-700 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {isDark ? (
        <Sun size={17} aria-hidden="true" />
      ) : (
        <Moon size={17} aria-hidden="true" />
      )}
    </button>
  );
}
