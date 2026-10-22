import { useReveal } from '../hooks/useReveal'
import networkImg from '../assets/ecosystem-network.webp'
import glassImg from '../assets/ecosystem-puzzle.webp'
import magnifierImg from '../assets/ecosystem-magnifier.webp'

export default function Ecosystem() {
  const ref = useReveal()
  return (
    <section className="ecosystem reveal" id="ecosystem" ref={ref} aria-labelledby="eco-title">
      <div className="container ecosystem__grid">
        <div className="ecosystem__visual">
          <img
            className="ecosystem__img"
            src={networkImg}
            alt=""
            aria-hidden="true"
            width="1070"
            height="606"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="ecosystem__copy">
          <img className="float ecosystem__puzzle" src={glassImg} alt="" aria-hidden="true" width="173" height="199" loading="lazy" decoding="async" />
          <h2 id="eco-title" className="section-title">
            <span className="slash">/</span> Our ecosystem
          </h2>
          <p>
            FFI brings together MAS, financial institutions, technology firms, researchers and global partners. When
            knowledge flows, standards are shaped together and adoption challenges are solved collectively,
            innovation moves faster for everyone.
          </p>
          <img
            className="float float--slow ecosystem__magnifier"
            src={magnifierImg}
            alt=""
            aria-hidden="true"
            width="186"
            height="203"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
