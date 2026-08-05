"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryGroup } from "@/types";
import { cn } from "@/lib/utils";

// ─── ProjectGallery ──────────────────────────────────────────────────────────
// Thumbnails on a mat, opening into a full-size viewer.
//
// Every thumbnail is letterboxed with object-contain into a fixed-aspect mat
// rather than cropped with object-cover. These are screenshots: cropping one
// removes the part that makes it worth showing. The mat shape comes from the
// data (`aspect`) instead of being inferred from the first image, because a
// mixed-orientation group has no single right answer to infer.
//
// The viewer is a native <dialog> opened with showModal(), which is doing real
// work here: focus containment, Escape-to-close, focus restored to the thumbnail
// that opened it, and the rest of the page made inert to assistive technology.
// All of that is browser behaviour, and all of it is easy to get subtly wrong by
// hand. Only body scroll locking is left to us — showModal does not cover it.

const MAT = {
  portrait: "aspect-3/4",
  landscape: "aspect-16/10",
  square: "aspect-square",
} as const;

const GRID = {
  portrait: "grid-cols-2 lg:grid-cols-4",
  landscape: "grid-cols-1 sm:grid-cols-2",
  square: "grid-cols-2 lg:grid-cols-4",
} as const;

const SIZES = {
  portrait: "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw",
  landscape: "(max-width: 640px) 92vw, 44vw",
  square: "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw",
} as const;

interface Props {
  groups: GalleryGroup[];
}

export default function ProjectGallery({ groups }: Props) {
  // One flat sequence across every group, so the viewer's arrows run through the
  // whole gallery. The group name travels with each entry and is shown in the
  // viewer, so crossing a boundary does not lose the context.
  const flat = useMemo(
    () =>
      groups.flatMap((group) =>
        group.images.map((image) => ({ image, group: group.title })),
      ),
    [groups],
  );

  // Where each group starts in that flat sequence, so a thumbnail can map to
  // its viewer position without mutating a counter during render.
  // Written without an accumulator: the React Compiler lint rules reject
  // mutation during render, and a running total over two or three groups is not
  // worth arguing with them about.
  const offsets = useMemo(
    () =>
      groups.map((_, gi) =>
        groups.slice(0, gi).reduce((sum, g) => sum + g.images.length, 0),
      ),
    [groups],
  );

  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;

  // Keep the native dialog in step with React state. showModal() is what buys
  // the focus trap and the inert background; setting the `open` attribute
  // directly would render a non-modal dialog with none of that.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (isOpen && !el.open) el.showModal();
    if (!isOpen && el.open) el.close();
  }, [isOpen]);

  // Body scroll lock. The padding compensation stops the fixed header and the
  // page beneath from jumping sideways as the scrollbar is removed.
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [isOpen]);

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + flat.length) % flat.length));

  const current = index === null ? null : flat[index];

  return (
    // relative z-10 for the same reason .ed-grid carries it: the section's ghost
    // numeral is positioned at z-0 and would otherwise paint over the first
    // group heading, which sits right under it.
    <div className="relative z-10">
      {groups.map((group, gi) => (
        <section key={group.title} className="mt-16 first:mt-0">
          {/* h3: the gallery's own <h2> is the section heading above it. */}
          <h3 className="t-label-lg text-navy-700">{group.title}</h3>

          <ul className={cn("mt-8 grid gap-5 sm:gap-6", GRID[group.aspect])}>
            {group.images.map((img, i) => {
              const at = offsets[gi] + i;
              return (
                <li key={img.src}>
                  <figure>
                    <button
                      type="button"
                      onClick={() => setIndex(at)}
                      className="group block w-full cursor-zoom-in focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {/* Border AND fill. This mat sits on a tinted section, and
                          paper-50 against paper-200 is 1.06:1 in dark mode — the
                          fill alone would vanish there. The paper-400 edge is
                          what actually carries the mat in dark, exactly as the
                          sky border carries the icon tiles elsewhere. */}
                      <div
                        className={cn(
                          "relative overflow-hidden border border-paper-400 bg-paper-50 p-2 transition-colors group-hover:border-navy-600",
                          MAT[group.aspect],
                        )}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes={SIZES[group.aspect]}
                          className="object-contain p-1"
                        />
                      </div>
                      {/* Gives the button an accessible name of
                          "<alt>, view larger" without repeating the alt text as
                          a separate aria-label. */}
                      <span className="sr-only">, view larger</span>
                    </button>
                    {img.caption && (
                      <figcaption className="mt-3 text-xs leading-relaxed text-ink-500">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {/* ── Viewer ──
          `on-ink` so focus rings inside pick up the band accent: this panel is
          dark in both themes, and the default navy ring would be near-invisible
          on it in light mode. */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          // On a modal dialog a backdrop click targets the dialog itself, so
          // this closes on backdrop only and never on the content inside.
          if (e.target === dialogRef.current) setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
          // Escape is handled by the dialog itself and surfaces via onClose.
        }}
        aria-label="Image viewer"
        className="on-ink m-0 h-full max-h-none w-full max-w-none border-0 bg-band/95 p-0 backdrop:bg-band/80 open:flex"
      >
        {current && index !== null && (
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-4 sm:px-8 sm:py-6">
            {/* Chrome */}
            <div className="flex shrink-0 items-start justify-between gap-6">
              <p
                className="t-label text-band-accent"
                // Announces the group and position as the arrows move through
                // the gallery — without it, keyboard navigation is silent.
                aria-live="polite"
              >
                {current.group}
                <span className="text-band-muted">
                  {" "}
                  / {index + 1} of {flat.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setIndex(null)}
                className="-mt-1 -mr-1 p-2 text-band-body transition-colors hover:text-band-strong"
                aria-label="Close image viewer"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* The image. min-h-0 lets this flex child actually shrink, which is
                what keeps the caption and chrome on screen on short viewports. */}
            <div className="relative my-4 min-h-0 w-full flex-1">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Caption + paging */}
            <div className="flex shrink-0 items-end justify-between gap-6">
              <p className="max-w-2xl text-sm leading-relaxed text-band-body">
                {current.image.caption ?? current.image.alt}
              </p>

              {flat.length > 1 && (
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="border border-band-line p-2.5 text-band-body transition-colors hover:border-band-accent hover:text-band-strong"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="border border-band-line p-2.5 text-band-body transition-colors hover:border-band-accent hover:text-band-strong"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
