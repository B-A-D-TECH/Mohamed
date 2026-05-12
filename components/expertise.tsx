"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building, Armchair, Trees } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const expertiseAreas = [
  {
    title: "Meuble Design",
    description: "On crée Des meubles sur mesure qui allient fonctionnalité et esthétique, transformant les espaces de vie en œuvres d'art.",
    icon: Home,
  },
  {
    title: "Meuble de bureau",
    description:
      "Concevoir des environnements de travail inspirants avec des meubles de bureau ergonomiques et élégants, favorisant la productivité et le bien-être.",
    icon: Building,
  },
  {
    title: "Meuble d'intérieur",
    description:
      "Nous créons des meubles d'intérieur sur mesure qui allient fonctionnalité et esthétique, transformant les espaces de vie en œuvres d'art.",
    icon: Armchair,
  },
  {
    title: "Meuble d'extérieur",
    description:
      "Nous concevons des meubles pour l'espace extérieur qui allient confort et esthétique, transformant les terrasses et jardins en espaces de vie agréables.",
    icon: Trees,
  },
  {
    title: "Meuble de cuisine",
    description:
      "Nous créons des meubles de cuisine sur mesure qui allient fonctionnalité et esthétique, transformant les espaces de vie en œuvres d'art.",
    icon: Home,
  },
  {
    title: "Meuble de salle de bain",
    description:
      "Nous concevons des meubles de salle de bain sur mesure qui allient fonctionnalité et esthétique, transformant les espaces de vie en œuvres d'art.",
    icon: Home,
  },
  {
    title: "Meuble Décoration",
    description:
      "Nous créons des meubles de décoration sur mesure qui allient fonctionnalité et esthétique, transformant les espaces de vie en œuvres d'art.",
    icon: Home,
  }
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Qu'est ce qu'on fait ?</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Expertise</HighlightedText>
            <br />
              dans la création de meubles sur mesure
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Nous sommes spécialisés dans la création de meubles sur mesure, offrant des solutions personnalisées pour répondre aux besoins uniques de nos clients. Notre expertise couvre une large gamme de styles et de matériaux, garantissant que chaque pièce que nous créons est à la fois fonctionnelle et esthétiquement plaisante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
