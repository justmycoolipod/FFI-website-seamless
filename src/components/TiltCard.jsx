import { useEffect, useRef } from 'react'

/*
 * Cursor-following 3D tilt (ref: lessestudio.com "Our services").
 * Writes --rx / --ry (deg), --mx / --my (% for the glare) and --tx / --ty (px, inner parallax)
 * onto the <li>. Values ease toward the pointer with a rAF lerp so entry/exit feel smooth,
 * and nothing re-renders React. Only runs for fine pointers that can hover.
 */
const MAX_TILT = 9 // degrees
const SHIFT = 10 // px of inner-content parallax
const EASE = 0.14 // 0–1, higher = snappier

export default function TiltCard({ disabled = false, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return

    const cur = { x: 0, y: 0, a: 0 } // x,y in -1..1, a = hover amount 0..1
    const tgt = { x: 0, y: 0, a: 0 }
    let raf = 0

    const write = () => {
      el.style.setProperty('--rx', `${(-cur.y * MAX_TILT).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(cur.x * MAX_TILT).toFixed(2)}deg`)
      el.style.setProperty('--tx', `${(cur.x * SHIFT).toFixed(2)}px`)
      el.style.setProperty('--ty', `${(cur.y * SHIFT).toFixed(2)}px`)
      el.style.setProperty('--mx', `${((cur.x + 1) * 50).toFixed(1)}%`)
      el.style.setProperty('--my', `${((cur.y + 1) * 50).toFixed(1)}%`)
      el.style.setProperty('--hover', cur.a.toFixed(3))
    }
    const tick = () => {
      cur.x += (tgt.x - cur.x) * EASE
      cur.y += (tgt.y - cur.y) * EASE
      cur.a += (tgt.a - cur.a) * EASE
      write()
      const settled =
        Math.abs(tgt.x - cur.x) < 0.001 && Math.abs(tgt.y - cur.y) < 0.001 && Math.abs(tgt.a - cur.a) < 0.001
      raf = settled ? 0 : requestAnimationFrame(tick)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tgt.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1))
      tgt.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1))
      tgt.a = 1
      kick()
    }
    const onLeave = () => {
      tgt.x = 0
      tgt.y = 0
      tgt.a = 0
      kick()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onMove)
      el.removeEventListener('pointerleave', onLeave)
      ;['--rx', '--ry', '--tx', '--ty', '--mx', '--my', '--hover'].forEach((p) => el.style.removeProperty(p))
    }
  }, [disabled])

  return (
    <li ref={ref} className={`${className} tilt`} {...rest}>
      {children}
    </li>
  )
}
