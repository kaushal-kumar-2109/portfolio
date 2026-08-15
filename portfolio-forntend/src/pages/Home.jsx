import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import ScrollTop from '../components/ScrollTop'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Stats from '../sections/Stats'
import Skills from '../sections/Skills'
import Resume from '../sections/Resume'
import Portfolio from '../sections/Portfolio'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'
import { useContent } from '../admin/context/ContentContext'

const sectionMap = {
  hero: Hero,
  about: About,
  stats: Stats,
  skills: Skills,
  resume: Resume,
  portfolio: Portfolio,
  services: Services,
  testimonials: Testimonials,
  contact: Contact,
}

export default function Home() {
  const { content } = useContent()

  useEffect(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      })
    }

    // Initialize PureCounter
    if (window.PureCounter) {
      new window.PureCounter()
    }
  }, [])

  // Order sections according to admin configuration
  const activeSections = (content.sections || [])
    .filter(s => s.visible && sectionMap[s.key])
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <>
      <Preloader />
      <Header />

      <main className="main">
        {activeSections.length > 0 ? (
          activeSections.map(sec => {
            const Comp = sectionMap[sec.key]
            return <Comp key={sec.id || sec.key} />
          })
        ) : (
          <>
            <Hero />
            <About />
            <Stats />
            <Skills />
            <Resume />
            <Portfolio />
            <Services />
            <Testimonials />
            <Contact />
          </>
        )}
      </main>

      <Footer />
      <ScrollTop />
    </>
  )
}
