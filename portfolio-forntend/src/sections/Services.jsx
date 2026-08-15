import { Link } from 'react-router-dom'
import { useContent } from '../admin/context/ContentContext'

export default function Services() {
  const { content } = useContent()
  const servicesList = (content?.services || []).filter(s => s.visible !== false)

  return (
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
          consectetur velit.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {servicesList.map((service, i) => (
            <div
              key={service.id || i}
              className="col-12 col-md-6 col-lg-4 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay={`${(i + 1) * 100}`}
            >
              <div className="icon flex-shrink-0" style={{ minWidth: '54px' }}>
                <i className={`bi ${service.icon || 'bi-briefcase'}`}></i>
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h4 className="title">
                  <Link to="/portfolio-details" className="stretched-link">
                    {service.title}
                  </Link>
                </h4>
                <p className="description" style={{ wordBreak: 'break-word' }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
