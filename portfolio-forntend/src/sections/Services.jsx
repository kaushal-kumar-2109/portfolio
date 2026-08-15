import { Link } from 'react-router-dom'

const services = [
  {
    icon: 'bi-briefcase',
    title: 'Lorem Ipsum',
    desc: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
  },
  {
    icon: 'bi-card-checklist',
    title: 'Dolor Sitema',
    desc: 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata',
  },
  {
    icon: 'bi-bar-chart',
    title: 'Sed ut perspiciatis',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
  },
  {
    icon: 'bi-binoculars',
    title: 'Magni Dolores',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
  {
    icon: 'bi-brightness-high',
    title: 'Nemo Enim',
    desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque',
  },
  {
    icon: 'bi-calendar4-week',
    title: 'Eiusmod Tempor',
    desc: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
  },
]

export default function Services() {
  return (
    <section id="services" className="services section">

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
          consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
          in iste officiis commodi quidem hic quas.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="col-12 col-md-6 col-lg-4 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay={`${(i + 1) * 100}`}
            >
              <div className="icon flex-shrink-0" style={{ minWidth: '54px' }}>
                <i className={`bi ${service.icon}`}></i>
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h4 className="title">
                  <Link to="/portfolio-details" className="stretched-link">
                    {service.title}
                  </Link>
                </h4>
                <p className="description" style={{ wordBreak: 'break-word' }}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
