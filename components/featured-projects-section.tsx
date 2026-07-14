import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, Users } from "lucide-react"

import { FEATURED_PROJECTS } from "@/lib/content/projects"
import { TECH_STACK, resolveIcon } from "@/lib/tech-stack"
import { cn } from "@/lib/utils"
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion"
import { Button } from "@/components/ui/button"

/** Brighten near-black brand glyphs so they stay visible on the dark canvas. */
function iconColor(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  return luminance < 30 ? "#f5f2ed" : `#${hex}`
}

function TechChip({ slug }: { slug: string }) {
  const tech = TECH_STACK.find((t) => t.key === slug)
  if (!tech) return null
  const icon = resolveIcon(tech.slug)

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-foreground/90">
      {icon ? (
        <svg viewBox="0 0 24 24" width={14} height={14} fill={iconColor(icon.hex)} aria-hidden="true">
          <path d={icon.path} />
        </svg>
      ) : null}
      {tech.label}
    </span>
  )
}

function ProjectBlock({
  project,
  index,
  reverse,
}: {
  project: (typeof FEATURED_PROJECTS)[number]
  index: number
  reverse: boolean
}) {
  return (
    <StaggerItem>
      <article
        className={cn(
          "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        {/* Visual side */}
        <Link
          href={`/projects/${project.slug}`}
          className="group surface-card surface-card-hover relative flex aspect-[4/3] items-center justify-center overflow-hidden p-10 sm:aspect-[16/10]"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%)",
            }}
          />
          {project.logo ? (
            <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl border border-border bg-surface-2 shadow-[0_0_0_1px_var(--glow-primary)] transition-transform duration-500 group-hover:scale-105 sm:h-36 sm:w-36">
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={96}
                height={96}
                className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              />
            </div>
          ) : (
            <span className="relative z-10 font-display text-4xl text-muted-foreground">{project.title}</span>
          )}
          <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1 rounded-full border border-border bg-surface-1/80 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground backdrop-blur">
            {project.status}
          </span>
        </Link>

        {/* Content side */}
        <div className="min-w-0">
          <span className="eyebrow">
            {String(index + 1).padStart(2, "0")} &middot; {project.year}
          </span>
          <h3 className="font-display mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-base text-primary/90 sm:text-lg">{project.tagline}</p>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="font-mono text-xs uppercase tracking-wide">{project.role}</span>
            {project.teamSize ? (
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5 text-primary" />
                {project.teamSize} engineers
              </span>
            ) : null}
          </div>

          {project.metrics && project.metrics.length > 0 ? (
            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-border py-5">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd className="font-display mt-1 text-xl font-semibold text-foreground sm:text-2xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.tech.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((slug) => (
                <TechChip key={slug} slug={slug} />
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href={`/projects/${project.slug}`}>
                View case study
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            {project.githubUrl ? (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  Source
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild variant="outline">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live site
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </StaggerItem>
  )
}

export function FeaturedProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-28">
      <FadeIn>
        <h2 className="section-label" data-index="01">
          Selected Projects
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Full-scale systems led end-to-end — from architecture and team coordination to the code
          that shipped.
        </p>
      </FadeIn>

      <StaggerGroup className="mt-14 flex flex-col gap-24 sm:mt-16 sm:gap-32">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectBlock key={project.slug} project={project} index={i} reverse={i % 2 === 1} />
        ))}
      </StaggerGroup>
    </section>
  )
}
