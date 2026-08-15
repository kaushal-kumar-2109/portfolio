import { useEffect, useRef } from 'react'

const skillsLeft = [
  { name: 'HTML', val: 100 },
  { name: 'CSS', val: 90 },
  { name: 'JavaScript', val: 75 },
]

const skillsRight = [
  { name: 'PHP', val: 80 },
  { name: 'WordPress/CMS', val: 90 },
  { name: 'Photoshop', val: 55 },
]

function SkillBar({ name, val }) {
  return (
    <div className="progress">
      <span className="skill">
        <span>{name}</span> <i className="val">{val}%</i>
      </span>
      <div className="progress-bar-wrap">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={val}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true
          const bars = document.querySelectorAll('.skills .progress-bar')
          bars.forEach((bar) => {
            const val = bar.getAttribute('aria-valuenow')
            bar.style.width = `${val}%`
          })
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="skills section light-background" ref={sectionRef}>
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Skills</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row skills-content skills-animation">
          <div className="col-lg-6">
            {skillsLeft.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
          <div className="col-lg-6">
            {skillsRight.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
