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
    <footer
      className="dark-section bg-ink-950 text-ink-300 border-t-2 border-brass-500"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-xl text-bone-100 mb-1">
              {SITE_CONFIG.name}
              <span className="text-brass-400" aria-hidden="true">
                .
              </span>
            </p>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink-300">
              {SITE_CONFIG.title}
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300"
                aria-label={label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-ink-300 text-center md:text-right">
            © {year} {SITE_CONFIG.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
