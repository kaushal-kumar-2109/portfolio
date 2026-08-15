import { useEffect, useRef } from 'react'
import { useContent } from '../admin/context/ContentContext'

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
          style={{ width: `${val}%` }}
        ></div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { content } = useContent()
  const sectionRef = useRef(null)

  const activeSkills = (content?.skills || []).filter(s => s.visible !== false)
  const half = Math.ceil(activeSkills.length / 2)
  const skillsLeft = activeSkills.slice(0, half)
  const skillsRight = activeSkills.slice(half)

  useEffect(() => {
    const bars = document.querySelectorAll('.skills .progress-bar')
    bars.forEach((bar) => {
      const val = bar.getAttribute('aria-valuenow')
      bar.style.width = `${val}%`
    })
  }, [activeSkills])

  return (
    <section id="skills" className="skills section light-background" ref={sectionRef}>
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Skills</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row skills-content skills-animation">
          <div className="col-12 col-lg-6">
            {skillsLeft.map((s) => (
              <SkillBar key={s.id || s.name} name={s.name} val={s.percentage} />
            ))}
          </div>
          <div className="col-12 col-lg-6">
            {skillsRight.map((s) => (
              <SkillBar key={s.id || s.name} name={s.name} val={s.percentage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
