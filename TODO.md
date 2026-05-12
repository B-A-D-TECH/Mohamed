# TODO - Rend tout beau & rapide (mobile-first)

## Étape 1 — Audit visuel (fait)
- Header, Hero, Projects, Expertise, FAQ, CallToAction, Footer lus.

## Étape 2 — Responsive + performance (à implémenter)
- [ ] Fixer Hero: empêcher animations scroll/touch gourmandes sur mobile (respect prefers-reduced-motion + désactiver listeners quand petit écran).
- [ ] Améliorer Header: éviter textes trop grands sur mobile (liens menu: text-4xl trop gros), padding/touch targets.
- [x] Remplacer `<img>` par `next/image` dans Projects + optimiser (sizes, loading lazy) pour performance.

- [x] Éviter images background non optimisées dans Hero (passer en `next/image` + `priority`/`fill`).

- [ ] Ajuster globals.css: base typography, `img{max-width:100%;height:auto}`, `section` spacing, réduction des animations globales si besoin.
- [x] Optimiser next.config: mettre `images.unoptimized` à `false` (ou supprimer) pour bénéficier des optimisations Next.


## Étape 3 — Tests
- [ ] build + start
- [ ] vérifier sur mobile (devtools) que le layout est stable et rapide.

