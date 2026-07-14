"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/motion"
import { EXPERIENCE } from "@/lib/content/experience"

function formatPeriod(period: { start: string; end: string | "present" }) {
  const end = period.end === "present" ? "Present" : period.end
  return `${period.start} – ${end}`
}

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28">
      <h2 className="section-label mb-8" data-index="04">
        Experience
      </h2>

      <StaggerGroup className="divide-y divide-border border-t border-border">
        {EXPERIENCE.map((entry) => (
          <StaggerItem key={entry.id}>
            <div className="surface-card surface-card-hover grid gap-2 border-x-0 border-t-0 border-b-0 p-6 md:grid-cols-[10rem_1fr] md:gap-8 md:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {formatPeriod(entry.period)}
              </p>

              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{entry.org}</p>

                {entry.summary && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                )}

                {entry.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {entry.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.75 h-1 w-1 shrink-0 bg-primary/60" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.relatedProjectSlugs && entry.relatedProjectSlugs.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.relatedProjectSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="tile-hover inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {slug}
                        <ArrowUpRight className="size-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
