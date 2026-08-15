import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <section id="contact" className="contact section">

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">

          {/* Contact Info — full width mobile, 5-cols desktop */}
          <div className="col-12 col-lg-5">
            <div className="info-wrap">

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p style={{ wordBreak: 'break-all' }}>info@example.com</p>
                </div>
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                frameBorder="0"
                style={{ border: 0, width: '100%', height: '250px', marginTop: '16px', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Contact Form — full width mobile, 7-cols desktop */}
          <div className="col-12 col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">

                <div className="col-12 col-md-6">
                  <label htmlFor="name-field" className="pb-2">Your Name</label>
                  <input
                    type="text" name="name" id="name-field"
                    className="form-control"
                    value={formData.name} onChange={handleChange} required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="email-field" className="pb-2">Your Email</label>
                  <input
                    type="email" name="email" id="email-field"
                    className="form-control"
                    value={formData.email} onChange={handleChange} required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input
                    type="text" name="subject" id="subject-field"
                    className="form-control"
                    value={formData.subject} onChange={handleChange} required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="message-field" className="pb-2">Message</label>
                  <textarea
                    name="message" id="message-field"
                    className="form-control"
                    rows="8"
                    value={formData.message} onChange={handleChange} required
                  ></textarea>
                </div>

                <div className="col-12 text-center">
                  {status === 'sending' && (
                    <div className="loading" style={{ display: 'block' }}>Loading</div>
                  )}
                  {status === 'error' && (
                    <div className="error-message" style={{ display: 'block' }}>
                      An error occurred. Please try again.
                    </div>
                  )}
                  {status === 'sent' && (
                    <div className="sent-message" style={{ display: 'block' }}>
                      Your message has been sent. Thank you!
                    </div>
                  )}
                  <button type="submit" style={{ minWidth: '140px' }}>Send Message</button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
