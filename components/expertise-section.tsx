"use client"

import { useState } from "react"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ChevronDown } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/motion"
import { cn } from "@/lib/utils"
import { EXPERTISE_CATEGORIES } from "@/lib/content/expertise"
import { TECH_STACK, resolveIcon } from "@/lib/tech-stack"

/* Background is dark now — near-BLACK brand marks need brightening instead
   of near-white marks needing darkening (inverse of the old light-canvas logic). */
function displayHex(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum < 30 ? "f5f2ed" : hex
}

function CategoryIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name]
  if (!Icon) return null
  return <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} aria-hidden="true" />
}

function TechGlyph({ slug, className }: { slug: string; className?: string }) {
  const icon = resolveIcon(slug)
  if (!icon) return null
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={`#${displayHex(icon.hex)}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}

function CategoryCard({
  label,
  description,
  icon,
  techSlugs,
}: {
  label: string
  description: string
  icon: string
  techSlugs: string[]
}) {
  const [open, setOpen] = useState(true)
  const techs = techSlugs
    .map((slug) => TECH_STACK.find((t) => t.key === slug))
    .filter((t): t is (typeof TECH_STACK)[number] => Boolean(t))

  return (
    <div className="surface-card surface-card-hover flex h-full flex-col gap-4 p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-start justify-between gap-3 text-left"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <CategoryIcon name={icon} />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">{label}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="flex flex-wrap gap-2 pt-1">
          {techs.map((tech) => (
            <div
              key={tech.key}
              className="tile-hover flex items-center gap-2 border border-border px-3 py-1.5"
            >
              <TechGlyph slug={tech.slug} className="h-4 w-4 shrink-0" />
              <span className="text-xs text-foreground">{tech.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ExpertiseSection() {
  return (
    <section id="expertise" className="scroll-mt-28">
      <h2 className="section-label mb-8" data-index="03">
        Technical Expertise
      </h2>

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERTISE_CATEGORIES.map((category) => (
          <StaggerItem key={category.id} className={cn(category.id === "tools" && "sm:col-span-2 lg:col-span-1")}>
            <CategoryCard
              label={category.label}
              description={category.description}
              icon={category.icon}
              techSlugs={category.techSlugs}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
