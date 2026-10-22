import ffiLogo from '../assets/logos/ffi.svg'
import bloomLogo from '../assets/logos/bloom.svg'
import guardianLogo from '../assets/logos/guardian.svg'
import buildfinLogo from '../assets/logos/buildfin.svg'
import pathfinLogo from '../assets/logos/pathfin.svg'

/*
 * Decorative 3D-style visuals recreated in CSS/SVG.
 * Swap any of these for exported Figma renders (WebP/PNG) — keep aria-hidden.
 */

/* Official FFI logo (src/assets/logos/ffi.svg) */
export function FFILogo({ className = '', title = 'Future of Finance Institute' }) {
  return <img className={className} src={ffiLogo} alt={title} width="132" height="65" decoding="async" />
}

/* Large glass "/" in the hero */
export function GlassSlash({ className = '' }) {
  return (
    <div className={`glass-slash ${className}`} aria-hidden="true">
      <div className="glass-slash__body">
        <span className="glass-slash__edge" />
        <span className="glass-slash__shine" />
      </div>
    </div>
  )
}

function gearPath(cx, cy, teeth, rOuter, rInner) {
  const pts = []
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const t = step * 0.22
    pts.push([a - step / 2 + t, rInner], [a - t * 0.9, rOuter], [a + t * 0.9, rOuter], [a + step / 2 - t, rInner])
  }
  return (
    pts
      .map(([a, r], i) => `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`)
      .join(' ') + 'Z'
  )
}

function GlassDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eaf4ff" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="#a9cdf5" stopOpacity="0.75" />
        <stop offset="1" stopColor="#5f9be0" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#7fb2ea" />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#3d6fb8" floodOpacity="0.25" />
      </filter>
    </defs>
  )
}

export function GlassGear({ className = '' }) {
  const id = 'gear'
  return (
    <svg className={`glass-obj ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <GlassDefs id={id} />
      <g filter={`url(#${id}-shadow)`}>
        <path d={gearPath(100, 100, 10, 88, 68)} fill={`url(#${id}-fill)`} stroke={`url(#${id}-rim)`} strokeWidth="2.5" />
        <circle cx="100" cy="100" r="34" fill="#dcecff" opacity="0.7" stroke="#fff" strokeWidth="2" />
        <circle cx="100" cy="100" r="18" fill="#87b6ec" opacity="0.8" />
        <path d="M44 70a64 64 0 0 1 40-32" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
      </g>
    </svg>
  )
}

export function GlassCode({ className = '' }) {
  const id = 'code'
  return (
    <svg className={`glass-obj ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <GlassDefs id={id} />
      <g filter={`url(#${id}-shadow)`} transform="rotate(-12 100 100)">
        <rect x="26" y="26" width="148" height="148" rx="44" fill={`url(#${id}-fill)`} stroke={`url(#${id}-rim)`} strokeWidth="2.5" />
        <rect x="46" y="46" width="108" height="108" rx="30" fill="#e8f2ff" opacity="0.55" stroke="#fff" strokeWidth="1.5" />
        <path d="M84 78 64 100l20 22M116 78l20 22-20 22M106 72 94 128" stroke="#5e95d8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M44 60a40 40 0 0 1 24-22" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

export function GlassBot({ className = '' }) {
  const id = 'bot'
  return (
    <svg className={`glass-obj ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <GlassDefs id={id} />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="36" y="40" width="128" height="104" rx="46" fill={`url(#${id}-fill)`} stroke={`url(#${id}-rim)`} strokeWidth="2.5" />
        <rect x="56" y="66" width="88" height="48" rx="24" fill="#2f5d9e" opacity="0.55" />
        <circle cx="82" cy="90" r="8" fill="#fff" />
        <circle cx="118" cy="90" r="8" fill="#fff" />
        <circle cx="146" cy="150" r="26" fill={`url(#${id}-fill)`} stroke={`url(#${id}-rim)`} strokeWidth="2.5" />
        <path d="M138 150h16M146 142v16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M54 62a40 40 0 0 1 22-14" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

export function GlassPuzzle({ className = '' }) {
  const id = 'puzzle'
  return (
    <svg className={`glass-obj ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <GlassDefs id={id} />
      <g filter={`url(#${id}-shadow)`} transform="rotate(14 100 100)">
        <path
          d="M40 60h34a16 16 0 1 1 32 0h34v34a16 16 0 1 0 0 32v34h-34a16 16 0 1 0-32 0H40v-34a16 16 0 1 1 0-32z"
          fill={`url(#${id}-fill)`}
          stroke={`url(#${id}-rim)`}
          strokeWidth="2.5"
        />
        <path d="M50 74a26 26 0 0 1 18-8" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

/* Orange-node network for the ecosystem section */
const nodes = [
  { x: 300, y: 260, r: 46, main: true },
  { x: 120, y: 120, r: 18 }, { x: 290, y: 70, r: 16 }, { x: 480, y: 130, r: 20 },
  { x: 70, y: 300, r: 14 }, { x: 520, y: 300, r: 16 }, { x: 160, y: 430, r: 18 },
  { x: 440, y: 440, r: 14 }, { x: 330, y: 470, r: 10 }, { x: 210, y: 220, r: 9 },
  { x: 400, y: 210, r: 8 }, { x: 40, y: 190, r: 8 }, { x: 580, y: 190, r: 9 },
]
const links = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
  [1, 2], [2, 3], [3, 5], [5, 7], [7, 8], [8, 6], [6, 4], [4, 1], [1, 11], [3, 12], [9, 1], [10, 3],
]

export function NetworkGraph({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 620 540" aria-hidden="true">
      <defs>
        <radialGradient id="node" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffe3c4" />
          <stop offset="0.35" stopColor="#ffa35a" />
          <stop offset="1" stopColor="#e2600f" />
        </radialGradient>
        <radialGradient id="node-soft" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#fff2e4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f6a46a" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ff8a3d" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="260" r="150" fill="url(#glow)" />
      <g stroke="#9db8d6" strokeWidth="1.4" opacity="0.7">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          className={n.main ? 'node node--main' : 'node'}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.main || n.r > 15 ? 'url(#node)' : 'url(#node-soft)'}
          style={{ animationDelay: `${(i % 5) * 0.6}s` }}
        />
      ))}
    </svg>
  )
}

/* Initiative logos — official SVG assets */

const logos = {
  bloom: { src: bloomLogo, w: 121, h: 36, name: 'BLOOM' },
  guardian: { src: guardianLogo, w: 136, h: 36, name: 'Project Guardian' },
  buildfin: { src: buildfinLogo, w: 184, h: 20, name: 'BuildFin.ai' },
  pathfin: { src: pathfinLogo, w: 153, h: 36, name: 'PathFin.ai' },
}

export function InitiativeLogo({ type }) {
  const logo = logos[type] ?? logos.pathfin
  return (
    <img
      className={`ilogo ilogo--${type}`}
      src={logo.src}
      width={logo.w}
      height={logo.h}
      alt={`${logo.name} logo`}
      loading="lazy"
      decoding="async"
    />
  )
}
