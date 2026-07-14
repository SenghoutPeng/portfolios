export type ExperienceEntry = {
  id: string
  role: string
  org: string
  period: { start: string; end: string | "present" }
  summary: string
  /** TODO: fill in real bullets — kept empty-safe so the section renders
   *  cleanly even before real content is written. */
  bullets: string[]
  relatedProjectSlugs?: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "mylms-backend-lead",
    role: "Backend Lead",
    org: "MyLMS",
    period: { start: "2026", end: "present" },
    // TODO: replace with real scope/ownership summary.
    summary: "",
    bullets: [],
    relatedProjectSlugs: ["mylms", "stem-arkh"],
  },
  {
    id: "stem-arkh-api-lead",
    role: "API Lead",
    org: "STEM-ArKH+",
    period: { start: "2026", end: "present" },
    // TODO: replace with real scope/ownership summary.
    summary: "",
    bullets: [],
    relatedProjectSlugs: ["stem-arkh"],
  },
]
