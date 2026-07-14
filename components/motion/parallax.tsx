"use client"

import { motion, useScroll, useTransform } from "motion/react"
import type { ReactNode } from "react"
import { useRef } from "react"

/** Moves its child vertically by `offset` px as the wrapper scrolls through
 *  the viewport — subtle depth effect for hero art / background elements. */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: ReactNode
  offset?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
