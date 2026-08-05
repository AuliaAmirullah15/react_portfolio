import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";
import ArchitectureLayers from "@/components/projects/ArchitectureLayers";
import DecisionList from "@/components/projects/DecisionList";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { caseStudies, getProject } from "@/data/projects";

// Every case study is known at build time, and `dynamicParams = false` makes an
// unknown id a 404 rather than an attempted render — so /projects/anything
// cannot produce a half-empty page.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ id: p.id }));
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project?.caseStudy) return {};

  const { caseStudy: cs } = project;
  return {
    title: project.title,
    description: cs.context,
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      type: "article",
      title: `${project.title} | ${cs.company}`,
      description: cs.context,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

export default async function ProjectCaseStudy({ params }: Params) {
  const { id } = await params;
  const project = getProject(id);
  if (!project?.caseStudy) notFound();

  const cs = project.caseStudy;

  // Section numbering is computed, not hard-coded: not every project has a
  // gallery or an architecture write-up, and a page that jumps 02 -> 04 looks
  // like a bug.
  const order = [
    "overview",
    cs.architecture && "architecture",
    cs.decisions && "decisions",
    cs.stack && "stack",
    cs.gallery && "gallery",
    cs.outcome && "outcome",
  ].filter(Boolean) as string[];
  const num = (key: string) => order.indexOf(key) + 1;

  const at = caseStudies.findIndex((p) => p.id === project.id);
  const prev = at > 0 ? caseStudies[at - 1] : null;
  const next = at < caseStudies.length - 1 ? caseStudies[at + 1] : null;

  const facts = [
    { term: "Role", value: cs.role },
    { term: "Organisation", value: cs.company },
    ...(cs.period ? [{ term: "When", value: cs.period }] : []),
  ];

  return (
    <>
      <Header />

      <main id="main-content">
        {/* ── Masthead ───────────────────────────────────────────────────────
            pt-28 clears the 3.5rem fixed header with editorial space to spare;
            the h1 is the project name, so the section headings below are h2. */}
        <header className="relative overflow-hidden pt-28 pb-14 lg:pt-36 lg:pb-20">
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
            <Link
              href="/#projects"
              className="t-label group inline-flex items-center gap-2.5 text-ink-600 transition-colors hover:text-navy-700 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ArrowLeft
                size={13}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
              />
              All projects
            </Link>

            <div className="ed-grid mt-14">
              {/* Marginalia: the facts, as a description list */}
              <div>
                <p className="t-label text-navy-700">Case study</p>
                <dl className="mt-7 space-y-5">
                  {facts.map((f) => (
                    <div key={f.term}>
                      <dt className="t-label text-ink-500">{f.term}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-ink-800">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h1 className="t-display text-ink-950">{project.title}</h1>

                <p className="mt-10 max-w-2xl font-serif text-xl leading-snug text-ink-800 sm:text-2xl">
                  {cs.context}
                </p>

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-label inline-flex items-center gap-2.5 bg-ink-950 px-5 py-3.5 text-paper-50 transition-colors hover:bg-navy-700 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <ExternalLink size={13} aria-hidden="true" />
                        Visit live site
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-label inline-flex items-center gap-2.5 text-ink-700 transition-colors hover:text-navy-700 focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <GitHubIcon size={13} aria-hidden="true" />
                        Source
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {project.imageUrl && (
              <div className="deco-frame mt-16 p-2 lg:mt-24">
                <div className="relative aspect-video overflow-hidden bg-paper-200">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title}, ${cs.company}`}
                    fill
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ── Overview ── */}
        <SectionWrapper id="overview">
          <SectionHeading
            index={num("overview")}
            label="Overview"
            title="What I did."
          />
          {/* Empty first cell: .ed-grid puts the left gutter first and applies
              the content inset to the second child, so the copy has to be the
              second child to line up with every other section on the page. */}
          <div className="ed-grid">
            <div />
            <p className="drop-cap max-w-2xl text-lg leading-relaxed text-ink-800">
              {cs.overview}
            </p>
          </div>
        </SectionWrapper>

        {/* ── Architecture ── */}
        {cs.architecture && (
          <SectionWrapper id="architecture" className="bg-paper-200">
            <SectionHeading
              index={num("architecture")}
              label="Architecture"
              title="How it's put together."
              aside="Layers listed outermost first."
            />
            <ArchitectureLayers
              summary={cs.architecture.summary}
              layers={cs.architecture.layers}
            />
          </SectionWrapper>
        )}

        {/* ── Decisions ──
            On the contrast band: this is the section the page exists for. */}
        {cs.decisions && (
          <SectionWrapper id="decisions" className="on-ink bg-band">
            <SectionHeading
              index={num("decisions")}
              label="Decisions"
              title="Choices, and what they cost."
              aside="Each of these had a credible alternative. The trade-off is stated, not hidden."
              inverted
            />
            <DecisionList decisions={cs.decisions} />
          </SectionWrapper>
        )}

        {/* ── Stack ── */}
        {cs.stack && (
          <SectionWrapper id="stack">
            <SectionHeading
              index={num("stack")}
              label="Stack"
              title="Technologies."
              aside="Grouped by the job they do rather than listed as a keyword run."
            />
            {/* The <dl> is inside the content column rather than being the grid
                itself: a <dl> may contain <div> wrappers around dt/dd pairs, but
                not a <div> containing another <div> containing them. */}
            <div className="ed-grid">
              <div />
              <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {cs.stack.map((group) => (
                  <div key={group.label}>
                    <dt className="t-label text-navy-700">{group.label}</dt>
                    <dd className="mt-3.5">
                      <ul className="t-meta t-meta-list text-ink-600">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </SectionWrapper>
        )}

        {/* ── Gallery ── */}
        {cs.gallery && (
          <SectionWrapper id="gallery" className="bg-paper-200">
            <SectionHeading
              index={num("gallery")}
              // "Gallery", not "Interface": the first group inside is already
              // called Interface, and the label repeated directly above it read
              // as a duplicated heading.
              label="Gallery"
              title="How it looks."
              aside="Select any image to view it full size."
            />
            <ProjectGallery groups={cs.gallery} />
          </SectionWrapper>
        )}

        {/* ── Outcome ── */}
        {cs.outcome && (
          <SectionWrapper id="outcome">
            <SectionHeading
              index={num("outcome")}
              label="Outcome"
              title="Where it landed."
            />
            <div className="ed-grid">
              <div aria-hidden="true" />
              <p className="max-w-2xl font-serif text-xl leading-snug text-ink-900 sm:text-2xl">
                {cs.outcome}
              </p>
            </div>
          </SectionWrapper>
        )}

        {/* ── Prev / next ── */}
        <nav
          aria-label="Other case studies"
          className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36"
        >
          <div className="grid gap-10 border-t border-paper-400 pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/projects/${prev.id}`}
                className="group focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="t-label flex items-center gap-2.5 text-ink-500">
                  <ArrowLeft
                    size={13}
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  Previous
                </span>
                <span className="t-sub mt-3 block text-xl text-ink-950 transition-colors group-hover:text-navy-700">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="group sm:text-right focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="t-label flex items-center gap-2.5 text-ink-500 sm:justify-end">
                  Next
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <span className="t-sub mt-3 block text-xl text-ink-950 transition-colors group-hover:text-navy-700">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </main>

      <Footer />
    </>
  );
}
