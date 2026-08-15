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

export default function Home() {
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

  return (
    <>
      <Preloader />
      <Header />

      <main className="main">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Resume />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </>
  )
}
