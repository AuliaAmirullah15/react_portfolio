import { Globe } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { SITE_CONFIG } from "@/lib/constants";

const socials = [
  { icon: GitHubIcon, label: "GitHub", href: SITE_CONFIG.github },
  { icon: LinkedInIcon, label: "LinkedIn", href: SITE_CONFIG.linkedin },
  { icon: Globe, label: "Website", href: SITE_CONFIG.website },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink bg-ink-950 text-ink-300" role="contentinfo">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        {/* The name set large one last time — a colophon, not a small print row */}
        <p className="t-title text-paper-100">
          {SITE_CONFIG.name}
          <span className="text-jade-500" aria-hidden="true">
            .
          </span>
        </p>

        <div className="ed-row mt-12 grid gap-8 pt-8 sm:grid-cols-3">
          <div>
            <p className="t-label text-ink-400">Role</p>
            <p className="mt-2 text-sm text-ink-200">{SITE_CONFIG.title}</p>
          </div>

          <div>
            <p className="t-label text-ink-400">Elsewhere</p>
            <ul className="mt-2 space-y-1.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-jade-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-200 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    <Icon size={13} aria-hidden="true" />
                    <span className="underline-offset-4 group-hover:underline">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label text-ink-400">Copyright</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">
              © {year}. Built with Next.js.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
