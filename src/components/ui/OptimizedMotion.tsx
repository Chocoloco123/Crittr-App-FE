// Optimized motion components to reduce bundle size
import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface OptimizedMotionProps extends MotionProps {
  children: ReactNode
  className?: string
}

// Pre-defined animations to reduce bundle size
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 }
  }
}

export const MotionDiv = ({ children, className, ...props }: OptimizedMotionProps) => (
  <motion.div className={className} {...props}>
    {children}
  </motion.div>
)

export const MotionSection = ({ children, className, ...props }: OptimizedMotionProps) => (
  <motion.section className={className} {...props}>
    {children}
  </motion.section>
)

export const MotionButton = ({ children, className, ...props }: OptimizedMotionProps) => (
  <motion.button className={className} {...props}>
    {children}
  </motion.button>
)

// Pre-configured motion components
export const FadeInUp = ({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
  <MotionDiv 
    className={className}
    {...animations.fadeInUp}
    transition={{ ...animations.fadeInUp.transition, delay }}
  >
    {children}
  </MotionDiv>
)

export const FadeIn = ({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
  <MotionDiv 
    className={className}
    {...animations.fadeIn}
    transition={{ ...animations.fadeIn.transition, delay }}
  >
    {children}
  </MotionDiv>
)

export const ScaleIn = ({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
  <MotionDiv 
    className={className}
    {...animations.scaleIn}
    transition={{ ...animations.scaleIn.transition, delay }}
  >
    {children}
  </MotionDiv>
)

export { animations }
