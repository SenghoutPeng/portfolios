import * as Icons from "simple-icons"
import type { SimpleIcon } from "simple-icons"

export const CATEGORIES = ["Languages", "Frameworks & Libraries", "Infrastructure & Data", "Tools"] as const
export type Category = (typeof CATEGORIES)[number]

export type Tech = {
  /** stable identity used as React key + DOM ref key */
  key: string
  /** simple-icons slug (single lowercase token) */
  slug: string
  /** display label shown next to the glyph */
  label: string
  /** relative size hint (kept for future use) */
  size: number
  /** grouping for the Skills section */
  category: Category
}

/**
 * Single source of truth for the tech stack — add a new tech by appending
 * an object here; the Skills section groups and renders straight from it.
 */
const RAW: Tech[] = [
  { key: "typescript", slug: "typescript", label: "TypeScript", size: 112, category: "Languages" },
  { key: "javascript", slug: "javascript", label: "JavaScript", size: 110, category: "Languages" },
  { key: "python", slug: "python", label: "Python", size: 108, category: "Languages" },
  { key: "go", slug: "go", label: "Go", size: 100, category: "Languages" },
  { key: "php", slug: "php", label: "PHP", size: 100, category: "Languages" },
  { key: "java", slug: "java", label: "Java", size: 100, category: "Languages" },
  { key: "html", slug: "html5", label: "HTML5", size: 104, category: "Languages" },

  { key: "springboot", slug: "springboot", label: "Spring Boot", size: 98, category: "Frameworks & Libraries" },
  { key: "css", slug: "css3", label: "CSS3", size: 100, category: "Languages" },

  { key: "next", slug: "nextdotjs", label: "Next.js", size: 104, category: "Frameworks & Libraries" },
  { key: "laravel", slug: "laravel", label: "Laravel", size: 108, category: "Frameworks & Libraries" },
  { key: "vue", slug: "vuedotjs", label: "Vue.js", size: 100, category: "Frameworks & Libraries" },
  { key: "node", slug: "nodedotjs", label: "Node.js", size: 102, category: "Frameworks & Libraries" },
  { key: "tailwind", slug: "tailwindcss", label: "Tailwind", size: 104, category: "Frameworks & Libraries" },
  { key: "fastapi", slug: "fastapi", label: "FastAPI", size: 98, category: "Frameworks & Libraries" },

  { key: "postgres", slug: "postgresql", label: "PostgreSQL", size: 102, category: "Infrastructure & Data" },
  { key: "mysql", slug: "mysql", label: "MySQL", size: 100, category: "Infrastructure & Data" },
  { key: "mariadb", slug: "mariadb", label: "MariaDB", size: 98, category: "Infrastructure & Data" },
  { key: "mongodb", slug: "mongodb", label: "MongoDB", size: 98, category: "Infrastructure & Data" },
  { key: "redis", slug: "redis", label: "Redis", size: 98, category: "Infrastructure & Data" },
  { key: "rabbitmq", slug: "rabbitmq", label: "RabbitMQ", size: 96, category: "Infrastructure & Data" },
  { key: "kong", slug: "kong", label: "Kong", size: 94, category: "Infrastructure & Data" },
  { key: "docker", slug: "docker", label: "Docker", size: 102, category: "Infrastructure & Data" },
  { key: "digitalocean", slug: "digitalocean", label: "DigitalOcean", size: 96, category: "Infrastructure & Data" },
  { key: "googlecloud", slug: "googlecloud", label: "Google Cloud", size: 96, category: "Infrastructure & Data" },
  { key: "aws", slug: "amazon", label: "AWS", size: 94, category: "Infrastructure & Data" },
  { key: "gemini", slug: "googlegemini", label: "Google Gemini", size: 98, category: "Infrastructure & Data" },
  { key: "meilisearch", slug: "meilisearch", label: "Meilisearch", size: 92, category: "Infrastructure & Data" },

  { key: "git", slug: "git", label: "Git", size: 100, category: "Tools" },
  { key: "figma", slug: "figma", label: "Figma", size: 98, category: "Tools" },
  { key: "arduino", slug: "arduino", label: "Arduino / ESP32", size: 96, category: "Tools" },
  { key: "linux", slug: "linux", label: "Linux", size: 96, category: "Tools" },
]

/** Resolve a simple-icons record from a single-token slug. */
export function resolveIcon(slug: string): SimpleIcon | null {
  const exportName = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
  return (Icons as unknown as Record<string, SimpleIcon | undefined>)[exportName] ?? null
}

/** Only techs whose brand icon actually resolves (guards against renamed slugs). */
export const TECH_STACK: Tech[] = RAW.filter((t) => resolveIcon(t.slug) !== null)
