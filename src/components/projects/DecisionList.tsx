import type { Decision } from "@/types";

interface Props {
  decisions: Decision[];
}

// ─── DecisionList ────────────────────────────────────────────────────────────
// Rendered on the contrast band, because this is the part of a case study worth
// reading — the alternatives that were rejected and what the choice cost.
//
// Each decision is a <dl>: "Chose / Instead of / Why / Trade-off" are genuinely
// terms with descriptions, and the fixed label column makes the whole section
// scannable down a single axis. Wrapping each pair in a <div> inside the <dl> is
// valid HTML5 and is what keeps a term glued to its description on wrap.
//
// Band tokens throughout (band-strong / band-body / band-accent). The band does
// NOT invert in dark mode, so page tokens would break here: text-paper-100 is
// the page ground in dark mode and would vanish against this background.

function Row({
  term,
  children,
  emphasis = false,
}: {
  term: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6">
      <dt className="t-label pt-1.5 text-band-accent">{term}</dt>
      <dd
        className={
          emphasis
            ? "font-serif text-lg leading-snug text-band-strong"
            : "text-sm leading-relaxed text-band-body"
        }
      >
        {children}
      </dd>
    </div>
  );
}

export default function DecisionList({ decisions }: Props) {
  return (
    <ol>
      {decisions.map((d, i) => (
        <li
          key={d.title}
          // Divider on every row but the first, set explicitly rather than with
          // an adjacent-sibling variant — `[&+&]` compiles to a selector that
          // matches only when both siblings carry the identical class string,
          // which is fragile enough not to rely on.
          className={
            i === 0
              ? "ed-row ed-grid"
              : "ed-row ed-grid border-t border-band-line"
          }
        >
          <div>
            <p className="t-label-lg text-band-accent">
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </p>
          </div>

          <div>
            <h3 className="t-sub max-w-2xl text-xl text-band-strong sm:text-2xl">
              {d.title}
            </h3>

            <dl className="mt-8 space-y-6">
              <Row term="Chose" emphasis>
                {d.chose}
              </Row>

              <Row term="Instead of">
                <ul className="space-y-1.5">
                  {d.over.map((alt) => (
                    <li key={alt} className="flex gap-3">
                      {/* A plain dot rather than a dash: it reads as a mark
                          instead of as punctuation. mt-2 centres it on the
                          first line of a text-sm/leading-relaxed item, so it
                          stays put when the item wraps to two lines. */}
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-band-accent"
                      />
                      <span>{alt}</span>
                    </li>
                  ))}
                </ul>
              </Row>

              <Row term="Why">{d.why}</Row>

              {d.tradeoff && <Row term="Trade-off">{d.tradeoff}</Row>}
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}
