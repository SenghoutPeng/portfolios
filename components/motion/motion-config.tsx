"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { easeOut } from "./variants";

/** Wraps the app once so every Motion primitive respects
 *  prefers-reduced-motion automatically, instead of each component
 *  re-checking matchMedia itself. */
export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: easeOut }}>
      {children}
    </MotionConfig>
  );
}
