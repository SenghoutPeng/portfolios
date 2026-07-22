export type ProjectStatus = "active" | "archived" | "concept"

export type ProjectMetric = { label: string; value: string }

export type ProjectChallenge = {
  title: string
  problem: string
  solution: string
  /** lucide-react icon name (PascalCase export), resolved at render time. */
  icon: string
}

export type ProjectStep = { step: string; title: string; description: string }

/**
 * Phase 2 will add richer per-project data to drive an interactive
 * architecture diagram. Modeled as optional now so Phase 1 projects simply
 * omit it - filling it in later is additive, not a breaking restructure.
 */
export type ArchitectureNode = {
  id: string
  label: string
  kind: "service" | "datastore" | "queue" | "gateway" | "external"
  connectsTo: string[]
}

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  year: string
  status: ProjectStatus
  role: string
  teamSize?: number
  /** slugs into lib/tech-stack.ts's TECH_STACK, not free-text strings. */
  tech: string[]
  logo?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  /** TODO: mostly placeholder until real metrics are supplied. */
  metrics?: ProjectMetric[]
  features?: string[]
  howItWorks?: ProjectStep[]
  challenges?: ProjectChallenge[]
  architecture?: ArchitectureNode[]
}

export const PROJECTS: Project[] = [
  {
    slug: "mylms",
    title: "MyLMS",
    tagline: "Learning Management System planned and built by a 10 third-year engineer team, built in a 2-month sprint window",
    description:
      "Learning management system for Paragon International University's English Preparatory Program.This platform allows lecturers to toggle between self-paced and lecturer-gated progression per course instead of being boxed in by an off-the-shelf tool like Google Classroom.",
    year: "2026",
    status: "active",
    role: "Backend Lead",
    teamSize: 10,
    tech: ["go", "next", "postgres", "redis", "rabbitmq", "kong"],
    logo: "/logos/mylms.png",
    githubUrl: "",
    liveUrl: "https://mylms.paragoniu.app/auth/login",
    featured: true,
    metrics: [
      { label: "Engineers led", value: "3" },
      { label: "Microservices", value: "4" },
    ],
    features: [
      "Role-based Access Control (RBAC)",
      "CSV bulk onboarding with auto-invites",
      "Self-paced or lecturer-controlled progression",
      "Assessment-wall progress gating",
      "Assessment building syncs live data to cache",
      "Multi-tier progress dashboards",
      "Cloudflare R2 lesson material storage",
    ],
    howItWorks: [
      { step: "1", title: "Director Onboards", description: "Bulk invite uservia CSV, triggering automatic invite emails" },
      { step: "2", title: "Lecturer Builds Content", description: "Structures lessons and assessments, choosing self-paced or scheduled delivery" },
      { step: "3", title: "Student Progresses", description: "Works through lessons behind an assessment-wall that unlocks material on mastery" },
      { step: "4", title: "Dashboards Report", description: "Director and lecturer dashboards track individual and class-wide progress live" },
    ],
    challenges: [
      {
        title: "Flexible Progression Control",
        problem: "Google Classroom couldn't support an assessment-wall or mixed self-paced and lecturer-controlled progression",
        solution: "Designed a configurable progression engine so lecturers toggle between self-paced and scheduled delivery per class",
        icon: "Settings2",
      },
      {
        title: "Team Coordination",
        problem: "Coordinating team across frontend, backend, API, UI/UX, and DevOps under a fixed 2-month, budget-capped timeline",
        solution: "Ran 2-week Agile Scrum sprints with clear service ownership and a single source of truth maintained with the tech lead",
        icon: "Users",
      },
      {
        title: "Service-to-Service Consistency",
        problem: "Keeping independent Go microservices and their own databases in sync without tight coupling using gRPC communication",
        solution: "Adopted an event-driven architecture with RabbitMQ and Redis caching, so services react to events instead of polling each other",
        icon: "Waypoints",
      },
    ],
  },
  {
    slug: "stem-arkh",
    title: "STEM-ArKH+",
    tagline: "Refactoring a closed contest archive into an open, AI-readable repository",
    description:
      "A Cambodian STEM project archive for STEMEOC, rebuilt from a closed, security-first competition platform into an open, search-engine- and AI-readable repository. Years of inconsistent legacy contest data were normalized into a structured metadata schema, then indexed through a hybrid semantic search pipeline - Gemini embeddings piped into Meilisearch - so every contributor's project is discoverable, not just the winners.",
    year: "2026",
    status: "active",
    role: "API Lead",
    teamSize: 13,
    tech: ["go", "next", "postgres", "meilisearch", "gemini"],
    logo: "/logos/stem-arkh.png",
    githubUrl: "",
    liveUrl: "https://stemark.site/",
    featured: true,
    metrics: [
      { label: "Engineers led", value: "1" },
      { label: "Search pipeline", value: "Hybrid" },
      { label: "Semantic ratio", value: "0.7" },
    ],
    features: [
      "Hybrid semantic + keyword search",
      "Gemini-based project embeddings",
      "Legacy data normalization pipeline",
      "Contributor recognition profiles",
      "Google OAuth sign-in",
      "Khmer localization",
    ],
    howItWorks: [
      { step: "1", title: "Contributor Submits", description: "Students and educators upload project details, files, and metadata through the submission portal" },
      { step: "2", title: "Reviewer Approves", description: "Judges and admins review submissions before publishing, assigning domain and theme tags" },
      { step: "3", title: "System Indexes", description: "Approved projects are embedded with Gemini and indexed in Meilisearch for semantic search" },
      { step: "4", title: "Public Discovers", description: "Search engines, AI tools, and visitors browse the archive by topic, school, or event" },
    ],
    challenges: [
      {
        title: "Refactoring for Open Access",
        problem: "The prior platform prioritized security over visibility, rendering pages unreadable by search engines and AI tools",
        solution: "Restructured the backend around open indexing and server-rendered public pages, without weakening access control for private data",
        icon: "Unlock",
      },
      {
        title: "Inconsistent Legacy Data",
        problem: "Years of past STEMEOC projects existed in inconsistent, unstructured formats across different competitions",
        solution: "Built a metadata schema and tagging framework, then ran a pilot archive upload to normalize historical projects",
        icon: "Database",
      },
      {
        title: "Contributor Engagement",
        problem: "Participants who didn't win a competition often left with no lasting record of their work",
        solution: "Added a recognition module that publishes every contributor's profile and project, not just winners",
        icon: "Award",
      },
    ],
  },
  {
    slug: "dev-search",
    title: "Dev Search",
    tagline: "RAG Search System",
    description:
      "A RAG search system that answers question solely based on the provided datasets about backend programming languages, specifically Java(Springboot), PHP(Laravel), Golang(Gin and GORM)",
    year: "2026",
    status: "active",
    role: "Full-Stack Developer",
    teamSize: 1,
    tech: ["python", "streamlit", "chromadb", "gemini", "ollama"],
    logo: "/logos/dev-search.png",
    githubUrl: "https://github.com/SenghoutPeng/dev-search",
    liveUrl: "https://devdatasearch.tech/",
    featured: true,
    metrics: [
      { label: "Documents", value: "61" },
      { label: "Data Chunks", value: "1,400+" },
      { label: "Search Speed", value: "< 400ms" },
    ],
    features: [
      "Semantic Search via Chroma DB",
      "Extractive & Generative Modes",
      "Gemini & Ollama LLM Support",
      "Dockerized Deployment",
    ],
    howItWorks: [
      { step: "1", title: "Embed Query", description: "User query is converted into embeddings using the all-MiniLM model." },
      { step: "2", title: "Retrieve", description: "Chroma DB finds the most relevant document chunks via cosine similarity." },
      { step: "3", title: "Generate Answer", description: "The LLM generates a grounded answer citing the retrieved sources." },
    ],
    challenges: [
      {
        title: "Resource Constraints",
        problem: "Running embedding models in a Dockerized environment with limited CPU specs.",
        solution: "Used the lightweight all-MiniLM-L6-v2 model and an ephemeral Chroma DB for fast, low-memory performance.",
        icon: "Cpu",
      },
      {
        title: "Hallucination Prevention",
        problem: "Ensuring the LLM answers strictly based on the provided backend knowledge base.",
        solution: "Implemented strict system prompts to ground answers and built an Extractive mode to verify retrieved context.",
        icon: "Brain",
      },
    ],
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
