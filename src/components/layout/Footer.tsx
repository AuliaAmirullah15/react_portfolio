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
    <footer className="bg-slate-900 text-slate-400" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-sm mb-0.5">
              {SITE_CONFIG.name}
              <span className="text-blue-400" aria-hidden="true">
                .
              </span>
            </p>
            <p className="text-slate-500 text-xs">{SITE_CONFIG.title}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                aria-label={label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500 text-center md:text-right">
            © {year} {SITE_CONFIG.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
