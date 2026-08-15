import { useContent } from '../admin/context/ContentContext'

export default function Resume() {
  const { content } = useContent()
  const education = content?.resume?.education || []
  const experience = content?.resume?.experience || []
  const about = content?.about || {}

  return (
    <section id="resume" className="resume section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
          consectetur velit. Quisquam quos quisquam cupiditate.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {/* Summary + Education */}
          <div className="col-12 col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Summary</h3>

            <div className="resume-item pb-0">
              <h4>{content?.hero?.name || 'Alex Smith'}</h4>
              <p>
                <em>
                  {content?.hero?.description || 'Innovative and deadline-driven Graphic Designer and Full Stack Developer.'}
                </em>
              </p>
              <ul>
                {about.city && <li>{about.city}</li>}
                {about.phone && <li>{about.phone}</li>}
                {about.email && <li>{about.email}</li>}
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>

            {education.map(item => (
              <div key={item.id} className="resume-item">
                <h4>{item.degree}</h4>
                <h5>
                  {item.startYear} - {item.endYear}
                </h5>
                <p><em>{item.institution}</em></p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Professional Experience */}
          <div className="col-12 col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="resume-title">Professional Experience</h3>

            {experience.map(item => (
              <div key={item.id} className="resume-item">
                <h4>{item.position}</h4>
                <h5>
                  {item.startYear} - {item.endYear}
                </h5>
                <p><em>{item.company}</em></p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
