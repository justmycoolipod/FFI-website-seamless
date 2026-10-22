import { useEffect } from 'react'

/*
 * Lightweight scroll parallax.
 *
 * Each layer moves by (distance between the viewport centre and its anchor's centre) × speed,
 * clamped to ±max px (or an optional lo/hi range). It writes the CSS `translate` property only, so it stacks on top of
 * the elements' existing `transform` animations (float, reveal, slash fade-in) without
 * fighting them. Positive speed = moves with the scroll (feels closer),
 * negative = against it (feels further back).
 *
 * Disabled under prefers-reduced-motion.
 */
const LAYERS = [
  // About us
  { sel: '.hero__slash', anchor: '#about', speed: -0.14, max: 140 },
  { sel: '.marquee__track', anchor: '#about', speed: -0.45, max: 360, axis: 'x' },
  // What we do (anchor = the pinned section, so they drift while it's pinned)
  { sel: '.wwd__gear', anchor: '#what-we-do', speed: -0.04, max: 70 },
  { sel: '.wwd__bot', anchor: '#what-we-do', speed: 0.04, max: 90 },
  { sel: '.wwd__code', anchor: '#what-we-do', speed: 0.04, max: 70 }, // drifts down, away from the card stack
  // Initiatives
  { sel: '.skyline img', anchor: '#initiatives', speed: 0.05, max: 80 },
  // Our ecosystem
  { sel: '.ecosystem__img', anchor: '#ecosystem', speed: -0.1, max: 90 },
  { sel: '.ecosystem__puzzle', anchor: '#ecosystem', speed: 0.18, max: 110 },
  { sel: '.ecosystem__magnifier', anchor: '#ecosystem', speed: -0.08, max: 60 },
  // Footer
  // only ever lifts (never pushes down), so it always rests 20px above the navy bar
  { sel: '.footer__logo', anchor: '.footer', speed: -0.12, max: 70, hi: 0 },
]

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let items = []
    let raf = 0

    const measure = () => {
      items = LAYERS.flatMap((l) => {
        const anchor = document.querySelector(l.anchor)
        if (!anchor) return []
        const r = anchor.getBoundingClientRect()
        const center = r.top + window.scrollY + r.height / 2
        return [...document.querySelectorAll(l.sel)].map((el) => ({ el, center, ...l }))
      })
    }

    const update = () => {
      raf = 0
      const view = window.scrollY + window.innerHeight / 2
      // gentler on small screens
      const k = window.innerWidth < 768 ? 0.6 : 1
      for (const it of items) {
        const v = Math.max(it.lo ?? -it.max, Math.min(it.hi ?? it.max, (view - it.center) * it.speed * k))
        it.el.style.translate = it.axis === 'x' ? `${v.toFixed(1)}px 0` : `0 ${v.toFixed(1)}px`
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    // sections resize after fonts/images load and when pinned sections set their heights
    measure()
    update()
    const t = setTimeout(onResize, 600)
    document.fonts?.ready.then(onResize)
    window.addEventListener('load', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      items.forEach(({ el }) => el.style.removeProperty('translate'))
    }
  }, [])
}
