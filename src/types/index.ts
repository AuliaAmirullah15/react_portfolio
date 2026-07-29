export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category: "web" | "mobile" | "linux" | "api" | "ai" | "other";
}

export interface Skill {
  name: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "tools"
    | "languages";
  level: "expert" | "proficient" | "familiar";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null; // null = present
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
