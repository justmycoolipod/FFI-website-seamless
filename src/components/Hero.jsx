import { useState } from 'react'
import { PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { marqueeWords } from '../data/content'
import slashImg from '../assets/hero-slash.webp'
import SplitReveal from './SplitReveal'
import ellipseImg from '../assets/icons/ellipse.svg'

function MarqueeGroup({ hidden }) {
  return (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {marqueeWords.map((w) => (
        <span key={w} className="marquee__word">
          <span className="slash">/</span>
          {w}
          <img className="marquee__dot" src={ellipseImg} alt="" width="24" height="24" />
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="hero" id="about" aria-labelledby="hero-title">
      <img
        className="hero__slash"
        src={slashImg}
        width="836"
        height="1466"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />

      <div className="container hero__grid">
        <SplitReveal as="h1" id="hero-title" className="hero__title" stagger={0.08} delay={0.2}>
          Shaping the
          <br />
          future of finance
        </SplitReveal>
        <SplitReveal as="p" className="hero__lead" stagger={0.018} delay={0.6}>
          Bringing together Singapore&rsquo;s financial and technology ecosystems to accelerate innovation into
          trusted, scalable solutions for the financial sector.
        </SplitReveal>
      </div>

      <div className={`marquee ${paused ? 'marquee--paused' : ''}`}>
        <p className="sr-only">Innovate, Integrate, Impact</p>
        <div className="marquee__track" aria-hidden="true">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
        <button
          type="button"
          className="marquee__control"
          aria-pressed={paused}
          aria-label={paused ? 'Play scrolling text' : 'Pause scrolling text'}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <PlayIcon size={14} weight="fill" aria-hidden="true" /> : <PauseIcon size={14} weight="fill" aria-hidden="true" />}
        </button>
      </div>
    </section>
  )
}
