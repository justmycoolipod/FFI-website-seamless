import Header from './components/Header'
import Hero from './components/Hero'
import WhatWeDo from './components/WhatWeDo'
import Initiatives from './components/Initiatives'
import Ecosystem from './components/Ecosystem'
import Footer from './components/Footer'
import { useParallax } from './hooks/useParallax'

export default function App() {
  useParallax()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="page" id="top">
        <Header />
        <main id="main">
          <Hero />
          <WhatWeDo />
          <Initiatives />
          <Ecosystem />
        </main>
        <Footer />
      </div>
    </>
  )
}
