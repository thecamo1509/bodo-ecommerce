"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { motion } from "motion/react"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  distance?: number
  threshold?: number
  rootMargin?: string
}

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 50,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Disconnect observer after first intersection to prevent re-triggering
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  const getInitialAnimation = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "fade":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimateAnimation = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      case "fade":
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialAnimation()}
      animate={isVisible ? getAnimateAnimation() : getInitialAnimation()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smooth animation
      }}
    >
      {children}
    </motion.div>
  )
}
