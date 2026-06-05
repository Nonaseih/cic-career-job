'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'

const MotionNextLink = motion(Link)

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0  },
}

type BaseProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

/** Animates on mount — use for above-the-fold content. */
export function FadeUp({ children, className, delay = 0 }: BaseProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Animates when scrolled into view — use for below-the-fold sections. */
export function FadeInView({ children, className, delay = 0 }: BaseProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  stagger?: number
}

/** Wraps a list — children that are StaggerItem will cascade in. */
export function StaggerList({ children, className, delay = 0, stagger = 0.09 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: { delayChildren: delay, staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Direct child of StaggerList. */
export function StaggerItem({ children, className }: Omit<BaseProps, 'delay'>) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Lifts a card on hover — wrap any card-shaped element. */
export function HoverCard({ children, className }: Omit<BaseProps, 'delay'>) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Animated CTA link — scales up on hover, springs back on tap. */
export function MotionLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <MotionNextLink
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={className}
    >
      {children}
    </MotionNextLink>
  )
}
