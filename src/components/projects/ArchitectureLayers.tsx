import type { ArchitectureLayer } from "@/types";

interface Props {
  summary: string;
  layers: ArchitectureLayer[];
}

// ─── ArchitectureLayers ──────────────────────────────────────────────────────
// The layer stack, ordered outermost-first. An <ol> rather than a <ul> because
// the order IS the architecture — "outermost first" is information, and a screen
// reader announcing "1 of 6" carries it where a bullet would not.
//
// No connecting spine or bracket art between rows: the numbering and the
// vertical order already read as a stack, and the page's whole argument is that
// structure comes from rhythm rather than from drawing more lines.

export default function ArchitectureLayers({ summary, layers }: Props) {
  return (
    // relative z-10, like .ed-grid. The section's ghost numeral is absolutely
    // positioned at z-0, and a positioned element paints above a non-positioned
    // one whatever the source order — so an unlifted block here would end up
    // UNDER the numeral at narrow widths, where the numeral grows to 22vw.
    <div className="relative z-10">
      <p className="deco-frame max-w-3xl p-6 text-base leading-relaxed text-ink-800 sm:p-8 sm:text-lg">
        {summary}
      </p>

      <ol className="mt-4">
        {layers.map((layer, i) => (
          <li key={layer.name} className="ed-divide ed-row ed-grid">
            {/* Gutter: the layer's position in the stack */}
            <div>
              <p className="t-label-lg text-navy-700">
                {/* aria-hidden: the <ol> already conveys the position, and "L1"
                    read aloud next to "1 of 6" is just noise. */}
                <span aria-hidden="true">L{i + 1}</span>
              </p>
            </div>

            <div>
              <h3 className="t-sub text-xl text-ink-950">{layer.name}</h3>
              <p className="mt-2 font-serif text-lg leading-snug text-navy-700 italic">
                {layer.role}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">
                {layer.detail}
              </p>
              <ul
                className="t-meta t-meta-list mt-5 text-ink-500"
                aria-label={`${layer.name} layer technologies`}
              >
                {layer.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
