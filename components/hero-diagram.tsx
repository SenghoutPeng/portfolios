"use client";

import { motion } from "motion/react";

/**
 * Abstract architecture-flavored visual for the hero — nodes + connecting
 * lines suggesting a service graph, animated on mount. Deliberately not a
 * literal 3D scene to keep Phase 1 scoped; can be upgraded to a real
 * interactive diagram once Architecture Showcase (Phase 2) lands.
 */
const nodes = [
  { id: "gateway", x: 50, y: 12, label: "gateway" },
  { id: "auth", x: 18, y: 38, label: "auth" },
  { id: "api", x: 50, y: 38, label: "api" },
  { id: "workers", x: 82, y: 38, label: "workers" },
  { id: "queue", x: 66, y: 64, label: "queue" },
  { id: "cache", x: 34, y: 64, label: "cache" },
  { id: "db", x: 50, y: 88, label: "db" },
];

const edges: [string, string][] = [
  ["gateway", "auth"],
  ["gateway", "api"],
  ["gateway", "workers"],
  ["api", "cache"],
  ["api", "queue"],
  ["workers", "queue"],
  ["cache", "db"],
  ["queue", "db"],
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

export function HeroDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        {edges.map(([from, to], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--border)"
              strokeWidth={0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}

        {edges.map(([from, to], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          return (
            <motion.circle
              key={`pulse-${from}-${to}`}
              r={0.8}
              fill="var(--primary)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [a.x, b.x],
                cy: [a.y, b.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: 1.5 + i * 0.5,
                repeat: Infinity,
                repeatDelay: edges.length * 0.5,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={n.id === "gateway" ? 4.5 : 3.5}
              fill="var(--surface-2)"
              stroke={n.id === "gateway" ? "var(--primary)" : "var(--border)"}
              strokeWidth={0.6}
            />
          </motion.g>
        ))}
      </svg>

      {nodes.map((n, i) => (
        <motion.span
          key={`label-${n.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
          className="pointer-events-none absolute -translate-x-1/2 translate-y-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </motion.span>
      ))}
    </div>
  );
}
