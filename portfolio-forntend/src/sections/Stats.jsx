import { useEffect, useRef } from 'react'

const statsData = [
  { icon: 'bi-emoji-smile',      end: 232,  label: 'Happy Clients',    desc: 'consequuntur quae' },
  { icon: 'bi-journal-richtext', end: 521,  label: 'Projects',         desc: 'adipisci atque cum quia aut' },
  { icon: 'bi-headset',          end: 1453, label: 'Hours Of Support', desc: 'aut commodi quaerat' },
  { icon: 'bi-people',           end: 32,   label: 'Hard Workers',     desc: 'rerum asperiores dolor' },
]

export default function Stats() {
  const initialized = useRef(false)

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
          {statsData.map((stat, i) => (
            <div key={i} className="col-6 col-md-6 col-lg-3">
              <div className="stats-item" style={{
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <i className={`bi ${stat.icon}`} style={{
                  color: 'var(--accent-color)',
                  fontSize: '2.5rem',
                  marginBottom: '8px',
                  lineHeight: 1,
                }}></i>
                <span
                  data-purecounter-start="0"
                  data-purecounter-end={stat.end}
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
                <p style={{
                  color: 'color-mix(in srgb, var(--default-color), transparent 40%)',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  fontFamily: 'var(--heading-font)',
                  margin: '4px 0 0',
                }}>
                  <strong>{stat.label}</strong>{' '}
                  <span style={{ display: 'block' }}>{stat.desc}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
