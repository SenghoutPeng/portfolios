"use client"

import { useInView, useMotionValue, useSpring } from "motion/react"
import { useEffect, useRef, useState } from "react"

/** Counts up from 0 to the numeric part of `value` once it scrolls into
 *  view, keeping any non-numeric prefix/suffix (e.g. "100K+") static. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/-?\d+/)
  const target = match ? parseInt(match[0], 10) : NaN
  const prefix = match ? value.slice(0, match.index) : ""
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : ""

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView && !Number.isNaN(target)) motionVal.set(target)
  }, [inView, target, motionVal])

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring])

  if (Number.isNaN(target)) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
