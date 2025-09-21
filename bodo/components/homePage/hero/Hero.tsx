"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import styles from "./Hero.module.css"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { cn } from "@/lib/utils/cn"
import { neueRegrade } from "@/lib/fonts/neueRegrade"
import { AnimatePresence, motion } from "motion/react"

type StrapiFormat = { url: string }
type StrapiMedia = {
  url: string
  formats?: { small?: StrapiFormat; medium?: StrapiFormat; large?: StrapiFormat }
}

type Slide =
  | { sliderBackground: StrapiMedia; sliderText: any }
  | { heroBackgroundUrl: string; heroTitle: any }

type Props = {
  items: Slide[]
  intervalMs?: number
  pauseOnHover?: boolean
  baseHost?: string
}

const pickFromStrapi = (m: StrapiMedia) =>
  m.formats?.large?.url || m.formats?.medium?.url || m.formats?.small?.url || m.url || ""

const makeAbsolute = (baseHost: string | undefined, path: string) => {
  if (!path) return ""
  if (/^https?:\/\//i.test(path)) return path
  const base =
    baseHost ??
    process.env.NEXT_PUBLIC_STRAPI_HOST ??
    ""
  const baseClean = base.replace(/\/$/, "")
  const pathClean = path.replace(/^\//, "")
  return `${baseClean}/${pathClean}`
}

export function Hero({
  items = [],
  intervalMs = 6000,
  pauseOnHover = true,
  baseHost,
}: Props) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const count = items.length

  const current = items[index]
  const bgUrl = useMemo(() => {
    if (!current) return ""
    if ("sliderBackground" in current) {
      const rel = pickFromStrapi(current.sliderBackground)
      return makeAbsolute(baseHost, rel)
    } else {
      return makeAbsolute(baseHost, current.heroBackgroundUrl)
    }
  }, [current, baseHost])

  useEffect(() => {
    if (index > 0 && index >= count) setIndex(0)
  }, [count, index])

  const start = () => {
    if (timerRef.current !== null || count <= 1) return
    timerRef.current = window.setInterval(
      () => setIndex((p) => (p + 1) % count),
      Math.max(intervalMs, 2000)
    )
  }
  const stop = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, intervalMs])

  useEffect(() => {
    if (!bgUrl) return
    const img = new Image()
    img.onload = () => console.log("[Hero] IMG OK:", bgUrl)
    img.onerror = (e) => console.warn("[Hero] IMG ERROR:", bgUrl, e)
    img.src = bgUrl
  }, [bgUrl])

  return (
    <section
      className={cn(styles.container)}
      aria-roledescription="carousel"
      aria-label="Hero rotativo"
      onMouseEnter={pauseOnHover ? stop : undefined}
      onMouseLeave={pauseOnHover ? start : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.bg}
          style={bgUrl ? { backgroundImage: `url("${bgUrl}")` } : undefined}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div className={cn(styles.title, neueRegrade.className)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
            className={styles.titleInner}
            aria-live="polite"
          >
            {"sliderText" in (current ?? {}) && (current as any).sliderText ? (
              <BlocksRenderer content={(current as any).sliderText} />
            ) : "heroTitle" in (current ?? {}) && (current as any).heroTitle ? (
              <BlocksRenderer content={(current as any).heroTitle} />
            ) : (
              <div>Loading...</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Cambiar slide">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-controls={`hero-slide-${i}`}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
            >
              <span className={styles.srOnly}>Ir a slide {i + 1}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}