import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { initiatives } from '../data/content'
import { InitiativeLogo } from './Visuals'
import TiltCard from './TiltCard'
import skylineImg from '../assets/initiatives-skyline.webp'
import SplitReveal from './SplitReveal'

/*
 * Scroll-driven horizontal gallery (ref: cantor8.io).
 * The section pins while vertical scroll is translated into horizontal travel.
 * Cards sit on one horizontal line; on hover they tilt toward the cursor (ref: lessestudio.com).
 * Per-frame values are written as CSS custom properties (no React re-render per frame).
 */

const STAGGER = [0] // cards aligned on one line
const DRIFT = [0] // no per-card parallax — even spacing
const SCROLL_RATIO = 1.15 // vertical px scrolled per px of horizontal travel

function useReducedMotion() {
  const get = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [reduced, setReduced] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const on = (e) => setReduced(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export default function Initiatives() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const metrics = useRef({ dist: 0, scrollable: 1 })
  const reduced = useReducedMotion()
  const n = initiatives.length

  /* ---------- pinned / scroll-linked mode ---------- */
  const measure = useCallback(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const maxDrift = DRIFT[(initiatives.length - 1) % DRIFT.length]
    const dist = Math.max(0, track.scrollWidth - window.innerWidth + maxDrift)
    metrics.current.dist = dist
    section.style.setProperty('--dist', `${dist}px`)
    section.style.height = `${window.innerHeight + dist * SCROLL_RATIO}px`
    metrics.current.scrollable = Math.max(1, dist * SCROLL_RATIO)
  }, [])

  useEffect(() => {
    if (reduced) {
      sectionRef.current?.style.removeProperty('height')
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const section = sectionRef.current
      if (!section) return
      const top = section.getBoundingClientRect().top
      const p = Math.min(1, Math.max(0, -top / metrics.current.scrollable))
      section.style.setProperty('--p', p.toFixed(4))
      // entrance: 0 → 1 as the section's top travels the last 60% of the viewport
      const enter = Math.min(1, Math.max(0, 1 - top / (window.innerHeight * 0.6)))
      section.style.setProperty('--enter', enter.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }
    measure()
    update()
    // fonts/images can change card widths after first paint
    document.fonts?.ready.then(onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced, measure, n])

  // Scroll the page to the point where card i is in view
  const goTo = useCallback(
    (i) => {
      const section = sectionRef.current
      if (!section) return
      const p = n > 1 ? Math.min(1, Math.max(0, i / (n - 1))) : 0
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: sectionTop + p * metrics.current.scrollable, behavior: 'smooth' })
    },
    [n],
  )

  // Keyboard: tabbing to an off-screen card brings it into view
  const onFocusCapture = (e) => {
    if (reduced) return
    const li = e.target.closest('.icard')
    if (!li) return
    const i = Number(li.dataset.index)
    const r = li.getBoundingClientRect()
    if (r.left < 0 || r.right > window.innerWidth) goTo(i)
  }

  return (
    <section
      ref={sectionRef}
      className={`initiatives ${reduced ? 'initiatives--static' : 'initiatives--pinned'}`}
      id="initiatives"
      aria-labelledby="init-title"
    >
      <div className="initiatives__sticky">
        <div className="skyline" aria-hidden="true">
          <img src={skylineImg} alt="" width="1197" height="897" loading="lazy" decoding="async" />
        </div>

        <div className="container initiatives__head">
          <SplitReveal as="h2" id="init-title" className="section-title" stagger={0.1}>
            <span className="slash">/</span> Initiatives
          </SplitReveal>
        </div>

        <ul
          className="initiatives__track"
          ref={trackRef}
          onFocusCapture={onFocusCapture}
        >
          {initiatives.map((item, i) => (
            <TiltCard
              key={item.id}
              className="icard"
              data-index={i}
              disabled={reduced}
              style={{ '--stagger': STAGGER[i % STAGGER.length], '--drift': `${DRIFT[i % DRIFT.length]}px`, '--i': i }}
            >
              <span className="icard__glare" aria-hidden="true" />
              <div className="icard__top">
                <h3 className="icard__title">{item.title}</h3>
                <ArrowUpRightIcon className="icard__arrow" size={20} weight="bold" aria-hidden="true" />
              </div>
              <p className="icard__body">{item.body}</p>
              <div className="icard__logo">
                <InitiativeLogo type={item.logo} />
              </div>
              <a href={`#${item.id}`} className="icard__link">
                <span className="slash">/</span> Read more<span className="sr-only"> about {item.title}</span>
              </a>
              <span className="icard__corner" aria-hidden="true" />
            </TiltCard>
          ))}
        </ul>
      </div>
    </section>
  )
}
