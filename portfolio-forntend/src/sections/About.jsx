import { useContent } from '../admin/context/ContentContext'

export default function About() {
  const { content } = useContent()
  const aboutData = content?.about || {}

  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>{aboutData.title || 'About'}</h2>
        <p>{aboutData.description}</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center align-items-start">
          {/* Profile image */}
          <div className="col-12 col-lg-4 text-center">
            <img
              src={aboutData.profileImage || '/assets/img/my-profile-img.jpg'}
              className="img-fluid rounded"
              alt={content.hero?.name || 'Alex Smith'}
              style={{ maxWidth: '260px', width: '100%', margin: '0 auto' }}
            />
          </div>

          {/* Content */}
          <div className="col-12 col-lg-8 content">
            <h2>{aboutData.subtitle || 'UI/UX Designer & Web Developer.'}</h2>
            <p className="fst-italic py-3">
              {aboutData.bioText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            </p>

            <div className="row">
              <div className="col-12 col-sm-6">
                <ul>
                  {aboutData.birthday && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>{aboutData.birthday}</span></li>
                  )}
                  {aboutData.website && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>{aboutData.website}</span></li>
                  )}
                  {aboutData.phone && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>{aboutData.phone}</span></li>
                  )}
                  {aboutData.city && (
                    <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>{aboutData.city}</span></li>
                  )}
                </ul>
              </div>
              <div className="col-12 col-sm-6">
                <ul>
                  {aboutData.age && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>{aboutData.age}</span></li>
                  )}
                  {aboutData.degree && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>{aboutData.degree}</span></li>
                  )}
                  {aboutData.email && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>{aboutData.email}</span></li>
                  )}
                  {aboutData.freelance && (
                    <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>{aboutData.freelance}</span></li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
