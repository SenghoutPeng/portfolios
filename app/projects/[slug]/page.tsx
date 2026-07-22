import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowUpRight, Calendar, Github, Users } from "lucide-react";

import { getProjectBySlug, PROJECTS } from "@/lib/content/projects";
import { TECH_STACK, resolveIcon } from "@/lib/tech-stack";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ProjectLogo } from "@/components/project-logo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return {
    title: `${project.title} | Case Study | Senghout Peng`,
    description: project.tagline,
  };
}

/** Brighten near-black brand glyphs so they stay visible on the dark canvas. */
function iconColor(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 30 ? "#f5f2ed" : `#${hex}`;
}

function TechChip({ slug }: { slug: string }) {
  const tech = TECH_STACK.find((t) => t.key === slug);
  if (!tech) return null;
  const icon = resolveIcon(tech.slug);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium text-foreground/90">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill={iconColor(icon.hex)}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      ) : null}
      {tech.label}
    </span>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-28">
      <FadeIn>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </Link>
      </FadeIn>

      {/* Header */}
      <FadeIn delay={0.05}>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <ProjectLogo
            src={project.logo}
            title={project.title}
            className="h-20 w-20 sm:h-24 sm:w-24"
          />
          <div className="min-w-0">
            <span className="eyebrow">{project.status}</span>
            <h1 className="font-display mt-2 text-4xl font-semibold text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 text-lg text-primary/90">{project.tagline}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 text-primary" />
            {project.year}
          </span>
          <span className="font-mono text-xs uppercase tracking-wide">
            {project.role}
          </span>
          {project.teamSize ? (
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5 text-primary" />
              {project.teamSize} engineers
            </span>
          ) : null}
        </div>

        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.githubUrl ? (
              <Button asChild variant="outline">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="size-4" />
                  Source
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : null}
          </div>
        )}
      </FadeIn>

      {/* Description */}
      <FadeIn delay={0.1}>
        <p className="mt-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {project.description}
        </p>
      </FadeIn>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 ? (
        <FadeIn delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-6 rounded-xl border border-border bg-surface-1 p-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </dt>
                <dd className="font-display mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      ) : null}

      {/* Tech stack */}
      {project.tech.length > 0 ? (
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <h2 className="section-label text-lg" data-index="Stack">
              Tech Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((techSlug) => (
                <TechChip key={techSlug} slug={techSlug} />
              ))}
            </div>
          </div>
        </FadeIn>
      ) : null}

      {/* Features */}
      {project.features && project.features.length > 0 ? (
        <FadeIn delay={0.1}>
          <div className="mt-14">
            <h2 className="section-label text-lg" data-index="Features">
              Key Features
            </h2>
            <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <StaggerItem key={feature}>
                  <div className="surface-card flex items-start gap-3 p-4">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-foreground/90">
                      {feature}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </FadeIn>
      ) : null}

      {/* How it works */}
      {project.howItWorks && project.howItWorks.length > 0 ? (
        <FadeIn delay={0.1}>
          <div className="mt-14">
            <h2 className="section-label text-lg" data-index="Flow">
              How It Works
            </h2>
            <StaggerGroup className="mt-5 flex flex-col gap-4">
              {project.howItWorks.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="surface-card flex gap-5 p-5">
                    <span className="font-display shrink-0 text-2xl font-semibold text-primary/70">
                      {step.step.padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </FadeIn>
      ) : null}

      {/* Challenges */}
      {project.challenges && project.challenges.length > 0 ? (
        <FadeIn delay={0.1}>
          <div className="mt-14">
            <h2 className="section-label text-lg" data-index="Challenges">
              Challenges &amp; Solutions
            </h2>
            <StaggerGroup className="mt-5 flex flex-col gap-4">
              {project.challenges.map((challenge) => {
                const IconComponent = (
                  Icons as unknown as Record<string, LucideIcon>
                )[challenge.icon];
                return (
                  <StaggerItem key={challenge.title}>
                    <div className="surface-card p-6">
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-primary">
                          {IconComponent ? (
                            <IconComponent className="size-4" />
                          ) : null}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {challenge.title}
                        </h3>
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                            Problem
                          </span>
                          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                            {challenge.problem}
                          </p>
                        </div>
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wide text-primary">
                            Solution
                          </span>
                          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                            {challenge.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </FadeIn>
      ) : null}

      {/* Footer nav */}
      <FadeIn delay={0.1}>
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to all projects
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
