"use client"

import { useEffect, useState } from "react"
import { Download, Linkedin, Github, Send, Mail, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn, CountUp, Magnetic } from "@/components/motion"
import { scrollToId } from "@/lib/utils"
import { HeroDiagram } from "@/components/hero-diagram"

// TODO: fill these in — empty href leaves the link inert for now.
const CV_HREF = ""
const socials = [
  { label: "LinkedIn", href: "", icon: Linkedin },
  { label: "GitHub", href: "", icon: Github },
  { label: "Telegram", href: "", icon: Send },
  { label: "Email", href: "mailto:henglong0000@gmail.com", icon: Mail },
]

// Placeholder counters — swapped for real GitHub stats where the API
// resolves; everything else stays a TODO number until supplied.
const staticStats = [
  { value: "3+", label: "Years Coding" },
  { value: "2", label: "Systems Shipped" },
  { value: "20+", label: "Technologies" },
]

export function HeroSection() {
  const [contributions, setContributions] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/github/contributions", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const total = json?.stats?.totalContributions
        if (typeof total === "number") setContributions(`${total}+`)
      })
      .catch(() => {})
  }, [])

  const stats = [
    ...staticStats,
    { value: contributions ?? "—", label: "GitHub Contributions" },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] scroll-mt-28 flex-col justify-center gap-16 pt-28 lg:grid lg:min-h-screen lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:pt-24"
    >
      <FadeIn className="min-w-0">
        <p className="eyebrow">Backend &amp; Systems Engineer</p>

        <h1 className="mt-4 font-display text-6xl font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl lg:text-[5.5rem]">
          Senghout
          <br />
          Peng
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          I design and build backend systems — microservices, event-driven
          architectures, and the infrastructure underneath them. Currently
          leading backend and API work across two production platforms.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a href={CV_HREF} download={CV_HREF ? "Senghout-Peng_CV.pdf" : undefined}>
              <Button className="h-11 gap-2 bg-primary px-6 font-medium text-primary-foreground shadow-[0_0_30px_var(--glow-primary)] hover:bg-primary/90">
                Download CV
                <Download className="size-4" />
              </Button>
            </a>
          </Magnetic>

          <Button
            variant="outline"
            className="h-11 gap-2 border-border bg-transparent px-6 font-medium text-foreground hover:border-primary hover:text-primary"
            onClick={() => scrollToId("projects")}
          >
            View Work
          </Button>

          <div className="flex items-center gap-4 pl-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href || undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <CountUp
                value={s.value}
                className="font-display text-3xl font-semibold tracking-tight text-foreground tabular-nums"
              />
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className="relative hidden lg:block">
        <HeroDiagram />
      </FadeIn>

      <button
        onClick={() => scrollToId("projects")}
        aria-label="Scroll to projects"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float text-muted-foreground transition-colors hover:text-primary lg:block"
      >
        <ArrowDown className="size-5" />
      </button>
    </section>
  )
}
