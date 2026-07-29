import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript / JS", category: "languages", level: "expert" },
  { name: "C#", category: "languages", level: "expert" },
  { name: "SQL", category: "languages", level: "proficient" },
  { name: "Dart", category: "languages", level: "proficient" },
  // Frontend
  { name: "React / Next.js", category: "frontend", level: "expert" },
  { name: "Vue.js / Nuxt", category: "frontend", level: "expert" },
  { name: "Flutter", category: "frontend", level: "proficient" },
  { name: "Tailwind CSS", category: "frontend", level: "expert" },
  { name: "Three.js", category: "frontend", level: "proficient" },
  { name: "GSAP", category: "frontend", level: "proficient" },
  // Backend
  { name: "ASP.NET Core", category: "backend", level: "expert" },
  { name: "Node.js", category: "backend", level: "proficient" },
  { name: "REST APIs", category: "backend", level: "expert" },
  { name: "Terraform", category: "backend", level: "familiar" },
  // Database
  { name: "PostgreSQL", category: "database", level: "proficient" },
  { name: "MongoDB", category: "database", level: "proficient" },
  { name: "MySQL", category: "database", level: "proficient" },
  // DevOps
  { name: "Azure", category: "devops", level: "expert" },
  { name: "Docker", category: "devops", level: "proficient" },
  { name: "Kubernetes / AKS", category: "devops", level: "proficient" },
  { name: "CI/CD (Azure DevOps)", category: "devops", level: "expert" },
  { name: "Nginx", category: "devops", level: "proficient" },
  // Tools & Messaging
  { name: "NATS", category: "tools", level: "expert" },
  { name: "Kafka", category: "tools", level: "proficient" },
  { name: "RabbitMQ", category: "tools", level: "proficient" },
  { name: "LaunchDarkly", category: "tools", level: "proficient" },
  { name: "ONNX", category: "tools", level: "proficient" },
  { name: "xUnit / Jest", category: "tools", level: "proficient" },
  { name: "Cypress", category: "tools", level: "familiar" },
];

export const skillCategories = [
  { key: "languages", label: "Languages" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Databases" },
  { key: "devops", label: "Cloud & DevOps" },
  { key: "tools", label: "Messaging & Tools" },
] as const;

export type SkillCategoryKey = (typeof skillCategories)[number]["key"];
