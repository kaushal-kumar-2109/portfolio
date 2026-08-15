import { useEffect, useRef } from 'react'
import { useContent } from '../admin/context/ContentContext'

export default function Stats() {
  const { content } = useContent()
  const initialized = useRef(false)
  const statsList = content?.stats || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !initialized.current) {
          initialized.current = true
          if (window.PureCounter) new window.PureCounter()
        }
      },
      { threshold: 0.3 }
    )
    const section = document.getElementById('stats')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {statsList.map((stat, i) => (
            <div key={stat.id || i} className="col-6 col-md-6 col-lg-3">
              <div
                className="stats-item"
                style={{
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <i
                  className={`bi ${stat.icon}`}
                  style={{
                    color: 'var(--accent-color)',
                    fontSize: '2.5rem',
                    marginBottom: '8px',
                    lineHeight: 1,
                  }}
                ></i>
                <span
                  data-purecounter-start="0"
                  data-purecounter-end={stat.value}
                  data-purecounter-duration="1"
                  className="purecounter"
                  style={{
                    color: 'var(--heading-color)',
                    fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    display: 'block',
                  }}
                ></span>
                <p
                  style={{
                    color: 'color-mix(in srgb, var(--default-color), transparent 40%)',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    fontFamily: 'var(--heading-font)',
                    margin: '4px 0 0',
                  }}
                >
                  <strong>{stat.label}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
