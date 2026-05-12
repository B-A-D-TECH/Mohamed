"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Où est votre Atelier?",
    answer:
    "Notre atelier est situé à Lafiaboug-Bamako, au Mali. C'est là que nous concevons et fabriquons tous nos meubles sur mesure, en utilisant des matériaux de haute qualité et en collaborant avec des artisans locaux pour créer des pièces uniques qui répondent aux besoins de nos clients.",
  },
  {
    question: "Quel est votre processus de conception?",
    answer:
      "Les délais des projets varient en fonction de l'étendue et de la complexité. Un projet résidentiel typique prend 6 à 12 mois depuis le concept initial jusqu'à la documentation de construction. Nous travaillons en étroite collaboration avec les clients pour établir des délais réalistes qui permettent un développement de conception réfléchi.",
  },
  {
    question: "Comment abordez-vous le design durable?",
    answer:
      "La durabilité est intégrale à notre pratique, et non pas un ajout. Nous privilégions les stratégies de conception passive, la sélection des matériaux, l'efficacité énergétique et la longévité. Chaque projet est conçu pour minimiser l'impact environnemental tout en maximisant le confort des occupants et leur connexion avec la nature.",
  },
  {
    question: "Quels services proposez-vous?",
    answer:
      "Nous proposons une gamme complète de services de conception, y compris la conception architecturale, la planification de l'espace, la sélection des matériaux et la gestion de projet. Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et créer des espaces qui sont à la fois fonctionnels et esthétiquement plaisants.",
  },
  {
    question: "Travaillez-vous avec des structures existantes?",
    answer:
      "Oui, nous avons de l'expérience dans la rénovation et la réhabilitation de structures existantes. Nous comprenons les défis uniques que présentent les projets de rénovation et nous sommes compétents pour trouver des solutions créatives qui respectent l'intégrité du bâtiment tout en répondant aux besoins de nos clients.",
  },
  {
    question: "Comment commençons-nous?",
    answer:
      "Le processus commence par une consultation initiale où nous discutons de votre projet, de vos besoins et de votre vision. Nous vous guiderons à travers les étapes suivantes, y compris la conception, la sélection des matériaux et la gestion du projet, pour assurer que votre projet se déroule sans heurts du début à la fin.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">FAQ</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Questions & Answers
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
