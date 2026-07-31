import type { NavLink } from "@/types";

export const SITE_CONFIG = {
  name: "Aulia Zulkarneidi",
  title: "Senior Software Developer",
  description:
    "Senior Software Developer with 7+ years\' experience delivering event-driven, production systems at scale. Specialising in distributed messaging, .NET microservices on Azure, and full-stack engineering across retail and enterprise environments.",
  email: "auliaamir153@gmail.com",
  github: "https://github.com/auliaamirullah15",
  linkedin: "https://linkedin.com/in/auliazulkarneidi",
  website: "https://auliaz.com",
  location: "Newcastle, UK",
  openToWork: false,
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "Contact", href: "#contact" },
];
