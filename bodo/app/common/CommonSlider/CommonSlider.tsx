"use client"
import { CommonSliderProps } from "./CommonSlider.types"
import { useState, useRef, useMemo, useEffect } from "react"
import styles from './CommonSlider.module.css'

const makeAbsolute = (baseHost: string | undefined, rel: string): string => {
    if (!baseHost) return rel;
    return baseHost + rel;
};

export const CommonSlider = (props: CommonSliderProps) => {
    const { items, intervalMs, pauseOnHover, baseHost } = props
    const activeItems = useMemo(() => items.filter(item => item.isActive), [items])
    const [index, setIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const timerRef = useRef<number | null>(null)
    const count = activeItems.length

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Get the slides to display based on device type
    const getVisibleSlides = () => {
        if (count === 0) return []
        if (count === 1) return [activeItems[0]]
        
        if (isMobile) {
            // Mobile: show only the current slide
            return [activeItems[index]]
        } else {
            // Desktop: show 3 slides
            if (count === 2) return [activeItems[0], activeItems[1], activeItems[0]]
            
            const slides = []
            for (let i = 0; i < 3; i++) {
                slides.push(activeItems[(index + i) % count])
            }
            return slides
        }
    }

    const visibleSlides = getVisibleSlides()

    useEffect(() => {
        if (index > 0 && index >= count) setIndex(0)
    }, [count, index])

    const start = () => {
        if (timerRef.current !== null || count <= 1) return
        timerRef.current = window.setInterval(
            () => setIndex((p: number) => (p + 1) % count),
            Math.max(intervalMs ?? 2000, 2000)
        )
    }
    const stop = () => {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    const prev = () => {
        setIndex((p) => (p - 1 + count) % count)
    }
    const next = () => {
        setIndex((p) => (p + 1) % count)
    }

    // Touch/swipe support for mobile
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            next()
        } else if (isRightSwipe) {
            prev()
        }
    }

    useEffect(() => {
        start()
        return stop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, intervalMs])

    // Preload images for better performance
    useEffect(() => {
        visibleSlides.forEach(slide => {
            if (!slide) return
            const imgUrl = makeAbsolute(baseHost, slide.image)
            const img = new Image()
            img.onload = () => console.log("[Slider] IMG OK:", imgUrl)
            img.onerror = (e) => console.warn("[Slider] IMG ERROR:", imgUrl, e)
            img.src = imgUrl
        })
    }, [visibleSlides, baseHost])
    return (
        <div
            className={styles.slider}
            onMouseEnter={pauseOnHover ? stop : undefined}
            onMouseLeave={pauseOnHover ? start : undefined}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className={styles.sliderContainer}>
                {visibleSlides.map((slide, i) => (
                    <div
                        key={`${index}-${i}`}
                        className={`${styles.slide} ${i === 0 ? styles.active : styles.inactive}`}
                    >
                        <img 
                            src={makeAbsolute(baseHost, slide.image)} 
                            alt={slide.title || 'Slider image'} 
                            loading="lazy"
                        />
                        <div className={styles.slideContent}>
                            <h3 className={styles.slideTitle}>{slide.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Indicators */}
            <div className={styles.indicators}>
                {activeItems.map((_, i) => (
                    <span
                        key={i}
                        className={i === index ? styles.active : ''}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}