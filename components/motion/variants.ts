import type { Transition, Variants } from "motion/react";

/** The site's signature ease — was hand-encoded as a CSS cubic-bezier in
 *  ~8 places; now the one source every Motion primitive imports from. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const transitionBase: Transition = {
  duration: 0.7,
  ease: easeOut,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionBase },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitionBase },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};
