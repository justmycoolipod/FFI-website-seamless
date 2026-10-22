import { Children, isValidElement, useEffect, useRef, useState } from 'react'

/*
 * Masked word-by-word text reveal (ref: kononenkogroup.com).
 * Each word sits in an overflow-hidden "line" and slides up from below when the
 * element scrolls into view, staggered word after word.
 *
 * Accessibility: the split, animated copy is aria-hidden; an sr-only copy of the
 * full text is rendered alongside, so screen readers read normal sentences.
 * Reduced motion: shown immediately (CSS).
 */

function useInView(threshold = 0.25) {
  const ref = useRef(null)
  // Without IntersectionObserver (very old browsers) just show the text
  const [inView, setInView] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView]
}

// Flatten children into units: words, spaces, <br>, and atomic elements (e.g. the orange slash)
function toUnits(children) {
  const units = []
  Children.toArray(children).forEach((child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child)
        .split(/(\s+)/)
        .forEach((part) => {
          if (!part) return
          units.push(/^\s+$/.test(part) ? { type: 'space' } : { type: 'word', node: part })
        })
    } else if (isValidElement(child) && child.type === 'br') {
      units.push({ type: 'br' })
    } else {
      units.push({ type: 'word', node: child })
    }
  })
  return units
}

// Plain text for screen readers (skips decorative slash spans)
function toText(children) {
  return Children.toArray(children)
    .map((c) => {
      if (typeof c === 'string' || typeof c === 'number') return String(c)
      if (isValidElement(c)) {
        if (c.type === 'br') return ' '
        if (c.props?.className?.includes?.('slash')) return ''
        return toText(c.props?.children)
      }
      return ''
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function SplitReveal({
  as: Tag = 'div',
  children,
  className = '',
  stagger = 0.06, // seconds between words
  delay = 0, // seconds before the first word
  threshold,
  ...rest
}) {
  const [ref, inView] = useInView(threshold)
  const units = toUnits(children)
  let w = 0

  return (
    <Tag ref={ref} className={`split ${inView ? 'is-in' : ''} ${className}`} {...rest}>
      <span className="sr-only">{toText(children)}</span>
      <span aria-hidden="true">
        {units.map((u, i) => {
          if (u.type === 'space') return ' '
          if (u.type === 'br') return <br key={i} />
          const d = delay + w++ * stagger
          return (
            <span key={i} className="split__w">
              <span className="split__in" style={{ '--d': `${d.toFixed(3)}s` }}>
                {u.node}
              </span>
            </span>
          )
        })}
      </span>
    </Tag>
  )
}

/* Same mask-and-rise for a single block (e.g. a button) */
export function RevealBlock({ children, delay = 0, className = '', threshold }) {
  const [ref, inView] = useInView(threshold)
  return (
    <span ref={ref} className={`split split--block ${inView ? 'is-in' : ''} ${className}`}>
      <span className="split__w">
        <span className="split__in" style={{ '--d': `${delay}s` }}>
          {children}
        </span>
      </span>
    </span>
  )
}
