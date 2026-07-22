export type PhilosophyPrinciple = {
  id: string;
  title: string;
  /** TODO: first-draft copy — personalize with real examples/voice. */
  body: string;
  /** lucide-react icon name (PascalCase export). */
  icon: string;
};

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    id: "boundaries",
    title: "Clear boundaries over clever shortcuts",
    body: "Services own their data and talk through explicit contracts — events, queues, typed APIs — instead of reaching into each other's internals. It costs more up front and pays for itself the first time a team needs to ship a service independently.",
    icon: "Boxes",
  },
  {
    id: "maintainability",
    title: "Code is read far more than it's written",
    body: "I optimize for the engineer who opens this file in a year with no context — including future me. Naming, structure, and a few well-placed comments about the why, not the what.",
    icon: "FileCode2",
  },
  {
    id: "scale-when-needed",
    title: "Scale for the load you have, design for the load you'll get",
    body: "Premature microservices are as costly as a monolith that can't split. I start with the simplest architecture that solves the real problem, and design data ownership so it can be pulled apart later without a rewrite.",
    icon: "TrendingUp",
  },
  {
    id: "dx",
    title: "Developer experience is a feature",
    body: "A team that can run the whole stack locally in one command, understand a failing test in ten seconds, and deploy without ceremony ships faster and breaks less. Tooling is not overhead — it's leverage.",
    icon: "Terminal",
  },
  {
    id: "observability",
    title: "If you can't see it, you can't fix it",
    body: "Logs, metrics, and traces aren't an afterthought bolted on before launch — they're how I find out an event-driven system is actually working the way I designed it to, not just the way I hope it is.",
    icon: "Activity",
  },
  {
    id: "security",
    title: "Security is a default, not a feature request",
    body: "Access control, input validation, and least-privilege service accounts are part of the first commit, not a hardening pass before a deadline. Retrofitting security is always more expensive than designing for it.",
    icon: "ShieldCheck",
  },
];
