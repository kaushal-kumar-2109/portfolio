import { useEffect, useRef } from 'react'
import { useContent } from '../admin/context/ContentContext'

export default function Hero() {
  const { content } = useContent()
  const typedRef = useRef(null)

  const heroData = content?.hero || {}
  const typedStrings = heroData.typedStrings || ['Designer', 'Developer', 'Freelancer']

  useEffect(() => {
    // Initialize Typed.js with dynamic strings
    if (window.Typed && typedRef.current) {
      const typed = new window.Typed(typedRef.current, {
        strings: typedStrings,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      })
      return () => typed.destroy()
    }
  }, [JSON.stringify(typedStrings)])

  return (
    <section id="hero" className="hero section dark-background">
      <img
        src={heroData.heroBg || '/assets/img/hero-bg.jpg'}
        alt="Hero Background"
        data-aos="fade-in"
      />

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <h2>{heroData.name || 'Alex Smith'}</h2>
        <p>
          {heroData.greeting || "I'm"}{' '}
          <span ref={typedRef} className="typed"></span>
          <span className="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
        </p>
      </div>
    </section>
  )
}
