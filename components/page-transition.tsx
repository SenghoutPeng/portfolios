"use client"

import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import type { ReactNode } from "react"

/** Fades in on every route change. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
