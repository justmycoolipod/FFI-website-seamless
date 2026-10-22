import { FFILogo } from './Visuals'
import SplitReveal, { RevealBlock } from './SplitReveal'

const footerLinks = [
  { label: 'About us', href: '#about' },
  { label: 'What we do', href: '#what-we-do' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Our Ecosystem', href: '#ecosystem' },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__streaks" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <FFILogo className="footer__logo" />
          <p className="footer__name">
            Future of
            <br />
            Finance
            <br />
            Institute
          </p>
        </div>

        <div className="footer__right">
          <nav aria-label="Footer">
            <ul className="footer__nav">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <SplitReveal as="h2" className="section-title footer__title" stagger={0.08}>
            <span className="slash">/</span> Contact us
          </SplitReveal>
          <SplitReveal as="p" className="footer__lead" stagger={0.02} delay={0.3}>
            Join a growing community dedicated to shaping the future of finance through collaboration, innovation, and
            shared learning.
          </SplitReveal>
          <RevealBlock delay={0.75}>
            <a className="btn btn--primary" href="mailto:hello@ffi.example">
              <span className="slash">/</span> Talk to us
            </a>
          </RevealBlock>

          <div className="footer__join">
            <h3>Join Our Team</h3>
            <p>
              Explore and apply for current opportunities on our{' '}
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>{' '}
              page or <a href="mailto:careers@ffi.example">submit your resume</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>&copy; {new Date().getFullYear()} Future of Finance Institute. All rights reserved.</p>
          <ul>
            <li>
              <a href="#terms">Terms of use</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy Statement</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
