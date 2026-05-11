"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const [animationComplete, setAnimationComplete] = useState(false)

  const accumulatedScrollRef = useRef(0)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    const updateAnimation = (progress: number) => {
      if (!contentRef.current) return

      // Animation plus légère pour mobile
      const translateY = progress * 100
      const rotationX = progress * 15
      const scale = 1 - progress * 0.1

      contentRef.current.style.transform = `
        translateY(${translateY}px)
        rotateX(${rotationX}deg)
        scale(${scale})
      `
    }

    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY === 0

      if (atTop) {
        e.preventDefault()

        accumulatedScrollRef.current = Math.max(
          0,
          Math.min(700, accumulatedScrollRef.current + e.deltaY)
        )

        const progress = accumulatedScrollRef.current / 700

        updateAnimation(progress)

        setAnimationComplete(progress >= 1)
      }
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

      accumulatedScrollRef.current = Math.max(
        0,
        Math.min(700, accumulatedScrollRef.current + deltaY * 2)
      )

      const progress = accumulatedScrollRef.current / 700

      updateAnimation(progress)

      setAnimationComplete(progress >= 1)

      lastTouchY.current = currentY
    }

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    window.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    })

    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/image_90b62de5.png"
          alt="Interior Design"
          className="w-full h-full object-cover object-center"
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="
          relative
          z-10
          w-full
          px-4
          sm:px-6
          md:px-10
        "
        style={{
          willChange: "transform",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="
            max-w-6xl
            mx-auto
            text-center
            mt-10
            sm:mt-16
            md:mt-0
          "
        >
          {/* Subtitle */}
          <p
            className="
              uppercase
              tracking-[0.25em]
              text-orange-200
              mb-4

              text-[10px]
              sm:text-xs
              md:text-sm
            "
          >
            Menuiserie de bois
          </p>

          {/* Title */}
          <h1
            className="
              font-bold
              text-white
              tracking-tight
              leading-tight

              text-[2.2rem]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            On façonne des meubles
            <br className="hidden sm:block" />
            {" "}à voir et à vivre,
            <br />

            <span className="text-orange-300">
              Qui vous facilite la vie
            </span>
          </h1>
        </div>
      </div>

      {/* Arrow */}
      {animationComplete && (
        <div
          className="
            absolute
            bottom-6
            sm:bottom-10
            left-1/2
            -translate-x-1/2
            animate-bounce
            z-20
          "
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
      )}
    </section>
  )
}