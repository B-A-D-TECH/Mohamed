"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const [animationComplete, setAnimationComplete] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobileLike, setIsMobileLike] = useState(false)

  useEffect(() => {
    const mqReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    const mqMobile = window.matchMedia?.("(max-width: 640px)")

    const apply = () => {
      setIsReducedMotion(Boolean(mqReduced?.matches))
      setIsMobileLike(Boolean(mqMobile?.matches))
    }

    apply()
    mqReduced?.addEventListener?.("change", apply)
    mqMobile?.addEventListener?.("change", apply)

    return () => {
      mqReduced?.removeEventListener?.("change", apply)
      mqMobile?.removeEventListener?.("change", apply)
    }
  }, [])

  const accumulatedScrollRef = useRef(0)
  const lastTouchY = useRef<number>(0)

  const shouldEnable3D = useMemo(() => !isReducedMotion && !isMobileLike, [isReducedMotion, isMobileLike])

  useEffect(() => {
    if (!shouldEnable3D) {
      // Remet à zéro pour éviter tout style résiduel
      if (contentRef.current) {
        contentRef.current.style.transform = ""
      }
      return
    }

    const updateAnimation = (progress: number) => {
      if (!contentRef.current) return

      const translateY = progress * 100
      const rotationX = progress * 15
      const scale = 1 - progress * 0.1

      contentRef.current.style.transform = `translateY(${translateY}px) rotateX(${rotationX}deg) scale(${scale})`
    }

    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY === 0
      if (!atTop) return

      // IMPORTANT: ne pas bloquer le scroll après animation
      if (accumulatedScrollRef.current >= 700) return

      e.preventDefault()

      accumulatedScrollRef.current = Math.max(
        0,
        Math.min(700, accumulatedScrollRef.current + e.deltaY)
      )

      const progress = accumulatedScrollRef.current / 700
      updateAnimation(progress)
      setAnimationComplete(progress >= 1)
    }


    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTop = window.scrollY === 0
      if (!atTop) return

      const currentY = e.touches[0].clientY
      const deltaY = lastTouchY.current - currentY

      e.preventDefault()

      accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + deltaY * 2))

      const progress = accumulatedScrollRef.current / 700
      updateAnimation(progress)
      setAnimationComplete(progress >= 1)

      lastTouchY.current = currentY
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [shouldEnable3D])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/image_90b62de5.png"
          alt="Interior Design"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-4 sm:px-6 md:px-10"
        style={{
          willChange: "transform",
          perspective: shouldEnable3D ? "1000px" : undefined,
          transformStyle: shouldEnable3D ? "preserve-3d" : undefined,
        }}
      >
        <div className="max-w-6xl mx-auto text-center mt-10 sm:mt-16 md:mt-0">
          <p className="uppercase tracking-[0.25em] text-orange-200 mb-4 text-[10px] sm:text-xs md:text-sm">
            Menuiserie de bois
          </p>

          <h1 className="font-bold text-white tracking-tight leading-tight text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            On façonne des meubles
            <br className="hidden sm:block" /> à voir et à vivre,
            <br />
            <span className="text-orange-300">Qui vous facilite la vie</span>
          </h1>
        </div>
      </div>

      {/* Arrow */}
      {animationComplete && (
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20">
          <ArrowDown
            className={shouldEnable3D ? "w-5 h-5 text-white animate-bounce" : "w-5 h-5 text-white"}
          />
        </div>
      )}

    </section>
  )
}

