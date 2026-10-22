import { useEffect, useRef, useState } from 'react'
import knowledgeIcon from '../assets/icons/knowledge-hub.svg'
import garageIcon from '../assets/icons/innovation-garage.svg'
import sandboxIcon from '../assets/icons/industry-sandboxes.svg'
import toolkitIcon from '../assets/icons/implementation-toolkits.svg'
import { pillars } from '../data/content'
import gearImg from '../assets/wwd-gear.webp'
import codeImg from '../assets/wwd-code.webp'
import botImg from '../assets/wwd-bot.webp'
import SplitReveal from './SplitReveal'

const glass = [
  { src: gearImg, w: 223, h: 243, cls: 'wwd__gear' },
  { src: codeImg, w: 224, h: 262, cls: 'wwd__code float--slow' },
  { src: botImg, w: 225, h: 272, cls: 'wwd__bot' },
]

// Custom FFI icons (decorative: the card title names the item)
const icons = {
  books: knowledgeIcon,
  bulb: garageIcon,
  sandbox: sandboxIcon,
  toolbox: toolkitIcon,
}

const PEEK = 84 // px of each earlier card left visible above the active one (title + first line)

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const on = (e) => setReduced(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/**
 * Scroll-driven stacking cards (ref: brilean.com).
 * The section is taller than the viewport; its inner frame is sticky.
 * Scroll progress through the section picks the active card; each new card
 * slides up over the previous one, which recedes into a stack of titles.
 */
export default function WhatWeDo() {
  const sectionRef = useRef(null)
  // -1 = no card shown yet (still on About us); 0..n-1 = card in front
  const [active, setActive] = useState(-1)
  const reduced = useReducedMotion()
  const n = pillars.length

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Knowledge Hub only slides in once you've scrolled off About us
      // (section top has risen past ~35% of the viewport)
      if (rect.top > window.innerHeight * 0.35) {
        setActive(-1)
        return
      }
      const scrollable = rect.height - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)))
      setActive(Math.min(n - 1, Math.floor(progress * n)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [n, reduced])

  // Jump the page so the chosen card becomes active (keyboard/click access)
  const goTo = (i) => {
    const el = sectionRef.current
    if (!el || reduced) return
    const scrollable = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / n) * scrollable
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className={`wwd ${reduced ? 'wwd--static' : 'wwd--scrolly'}`}
      id="what-we-do"
      aria-labelledby="wwd-title"
      style={{ '--steps': n }}
    >
      <div className="wwd__sticky">
        {glass.map((g) => (
          <img
            key={g.cls}
            className={`glass-obj float ${g.cls}`}
            src={g.src}
            width={g.w}
            height={g.h}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        ))}

        <div className="container wwd__grid">
          <div className="wwd__copy">
            <SplitReveal as="h2" id="wwd-title" className="section-title" stagger={0.08}>
              <span className="slash">/</span> What we do
            </SplitReveal>
            <SplitReveal as="p" stagger={0.02} delay={0.35}>
              Supporting financial institutions move from pilot to production* with the expertise, partners and
              tools to scale responsibly.
            </SplitReveal>
          </div>

          <div className="deck" style={{ '--peek': `${PEEK}px`, '--count': n }}>
            {pillars.map((p, i) => {
              const iconSrc = icons[p.icon]
              const state = reduced ? 'static' : i < active ? 'past' : i === active ? 'active' : 'next'
              const depth = active - i // >0 for cards behind
              return (
                <article
                  key={p.id}
                  className={`deck__card deck__card--${state}`}
                  style={reduced ? undefined : { '--i': i, '--depth': Math.max(0, depth), zIndex: i + 1 }}
                  aria-hidden={state === 'next' ? true : undefined}
                  onClick={state === 'past' ? () => goTo(i) : undefined}
                >
                  <div className="deck__head">
                    <h3 className="deck__title">
                      <span className="slash">/</span> {p.title}
                    </h3>
                    <img className="deck__icon" src={iconSrc} alt="" aria-hidden="true" width="34" height="34" decoding="async" />
                  </div>
                  <p className="deck__body">{p.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
