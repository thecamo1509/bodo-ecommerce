"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"                 // 👈
import styles from "./TopMenu.module.css"
import { FullLogo } from "../branding/logos/FullLogo"
import { cn } from "@/lib/utils/cn"
import { neueRegrade } from "@/lib/fonts/neueRegrade"

export const TopMenu = () => {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)          // 👈
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => setMounted(true), [])                   // 👈 portal solo en cliente

  useEffect(() => { setOpen(false) }, [pathname])

  // scroll-lock en <html>
  useEffect(() => {
    const root = document.documentElement
    if (open) root.classList.add("no-scroll")
    else root.classList.remove("no-scroll")
    return () => root.classList.remove("no-scroll")
  }, [open])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768 && open) setOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [open])

  useEffect(() => {
    const setH = () => {
      const h = headerRef.current?.offsetHeight ?? 72
      document.documentElement.style.setProperty("--header-height", `${h}px`)
    }
    setH()
    window.addEventListener("resize", setH)
    return () => window.removeEventListener("resize", setH)
  }, [])

  return (
    <>
      <header ref={headerRef} className={`${styles.wrapper} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={cn(styles.container, neueRegrade.className)}>
          <Link href="/" className={styles.logo} aria-label="Ir al inicio">
            <FullLogo />
          </Link>

          {/* Desktop */}
          <nav className={styles.menu} aria-label="Menú principal">
            <Link href="/">Products</Link>
            <Link href="/about">Work</Link>
            <Link href="/contact">Studio</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className={`${styles.burger} ${open ? styles.active : ""}`}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-controls="mobileMenu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Spacer para mobile */}
      <div className={styles.spacer} aria-hidden="true" />

      {/* Drawer + Backdrop en PORTAL al <body> */}
      {mounted && createPortal(
        <>
          <div id="mobileMenu" className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
            <div className={styles.mobileInner}>
              <Link className={styles.mobileLink} href="/">Products</Link>
              <Link className={styles.mobileLink} href="/about">Work</Link>
              <Link className={styles.mobileLink} href="/contact">Studio</Link>
              <Link className={styles.mobileLink} href="/contact">Contact</Link>
            </div>
          </div>

          {open && (
            <button
              className={styles.backdrop}
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            />
          )}
        </>
      , document.body)}
    </>
  )
}