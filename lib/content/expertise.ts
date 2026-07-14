export type ExpertiseCategory = {
  id: string
  label: string
  description: string
  /** lucide-react icon name (PascalCase export). */
  icon: string
  /** slugs into lib/tech-stack.ts's TECH_STACK — not duplicated data. */
  techSlugs: string[]
}

/**
 * Capability-grouped expertise, replacing the old flat tech marquee.
 * Add a tech by adding its key to lib/tech-stack.ts and referencing the
 * same key here — never duplicate label/icon data.
 */
export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: "backend",
    label: "Backend & Systems",
    description: "Services, APIs, and the concurrency/data patterns that keep them consistent under load.",
    icon: "Server",
    techSlugs: ["go", "php", "laravel", "fastapi", "node", "java", "springboot"],
  },
  {
    id: "data-infra",
    label: "Data & Infrastructure",
    description: "Databases, queues, caching, and the plumbing that lets independent services stay in sync.",
    icon: "Database",
    techSlugs: ["postgres", "mysql","mariadb", "mongodb", "redis", "rabbitmq", "kong", "docker"],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces built on the same engineering rigor as the backends behind them.",
    icon: "LayoutPanelLeft",
    techSlugs: ["typescript", "javascript", "next", "vue", "tailwind", "html", "css"],
  },
  {
    id: "ai-cloud",
    label: "AI & Cloud",
    description: "Semantic search, embeddings, and the cloud platforms projects actually ship to.",
    icon: "Sparkles",
    techSlugs: ["gemini", "meilisearch", "googlecloud", "aws", "digitalocean"],
  },
  {
    id: "tools",
    label: "Tools & Practice",
    description: "The day-to-day tooling around version control, design handoff, and hardware.",
    icon: "Wrench",
    techSlugs: ["git", "figma", "linux", "arduino", "python"],
  },
]
