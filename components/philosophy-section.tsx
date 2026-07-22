import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { PHILOSOPHY_PRINCIPLES } from "@/lib/content/philosophy";

function PrincipleIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  if (!Icon) return null;
  return (
    <Icon
      className="h-6 w-6 text-primary"
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

export function PhilosophySection() {
  return (
    <section id="philosophy" className="scroll-mt-28">
      <h2 className="section-label mb-8" data-index="02">
        Engineering Philosophy
      </h2>

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PHILOSOPHY_PRINCIPLES.map((principle) => (
          <StaggerItem key={principle.id}>
            <div className="surface-card surface-card-hover flex h-full flex-col gap-4 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <PrincipleIcon name={principle.icon} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {principle.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
