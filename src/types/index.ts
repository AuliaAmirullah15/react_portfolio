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
  /** Long-form write-up. Projects without one get no detail page and no link. */
  caseStudy?: CaseStudy;
}

/** Real intrinsic dimensions, so next/image can reserve space and nothing shifts
    as the gallery loads. Kept in the data rather than measured at build time
    because these are static files that will not change under us. */
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface GalleryGroup {
  title: string;
  /** Shape of the mat every thumbnail in this group is letterboxed into.
      Images are never cropped, so a group of phone screenshots wants
      "portrait" and a group of mixed-orientation photos wants "square".
      This is explicit rather than inferred from the first image, because a
      mixed group has no single correct answer to infer. */
  aspect: "portrait" | "landscape" | "square";
  images: ProjectImage[];
}

/** One horizontal slice of the system, ordered outermost-first. */
export interface ArchitectureLayer {
  name: string;
  /** One line: what this layer is responsible for. */
  role: string;
  detail: string;
  tech: string[];
}

/** A choice, its alternatives, and what it cost. The tradeoff is the point —
    a decision with no stated cost reads as marketing rather than engineering. */
export interface Decision {
  title: string;
  chose: string;
  over: string[];
  why: string;
  tradeoff?: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface CaseStudy {
  role: string;
  company: string;
  period?: string;
  /** What the product is, for someone who has never heard of it. */
  context: string;
  /** What the author personally did. */
  overview: string;
  architecture?: {
    summary: string;
    layers: ArchitectureLayer[];
  };
  decisions?: Decision[];
  stack?: StackGroup[];
  gallery?: GalleryGroup[];
  outcome?: string;
}

export interface Skill {
  name: string;
  category:
    "frontend" | "backend" | "database" | "devops" | "tools" | "languages";
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
