import { useEffect, useRef } from 'react'

export default function Hero() {
  const typedRef = useRef(null)

  useEffect(() => {
    // Initialize Typed.js after component mounts
    if (window.Typed && typedRef.current) {
      const typed = new window.Typed(typedRef.current, {
        strings: ['Designer', 'Developer', 'Freelancer', 'Photographer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      })
      return () => typed.destroy()
    }
  }, [])

  return (
    <section id="hero" className="hero section dark-background">
      <img src="/assets/img/hero-bg.jpg" alt="Hero Background" data-aos="fade-in" />

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <h2>Alex Smith</h2>
        <p>
          I&apos;m <span ref={typedRef} className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span>
          <span className="typed-cursor typed-cursor--blink" aria-hidden="true"></span>
        </p>
      </div>
    </section>
  )
}
