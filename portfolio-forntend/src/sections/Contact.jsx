import { useState } from 'react'
import { useContent } from '../admin/context/ContentContext'
import { generateId } from '../admin/data/defaultContent'

export default function Contact() {
  const { content, updateSection } = useContent()
  const contactInfo = content?.contact || {}

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    setTimeout(() => {
      // Save new message into CMS messages list
      const newMessage = {
        id: generateId(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toISOString(),
        read: false,
      }

      const existingMessages = content.messages || []
      updateSection('messages', [newMessage, ...existingMessages])

      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
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
          {/* Contact Info */}
          <div className="col-12 col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>{contactInfo.address || 'A108 Adam Street, New York, NY 535022'}</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>{contactInfo.phone || '+1 5589 55488 55'}</p>
                </div>
              </div>

              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p style={{ wordBreak: 'break-all' }}>{contactInfo.email || 'info@example.com'}</p>
                </div>
              </div>

              {contactInfo.mapUrl && (
                <iframe
                  src={contactInfo.mapUrl}
                  frameBorder="0"
                  style={{ border: 0, width: '100%', height: '250px', marginTop: '16px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-lg-7">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="name-field" className="pb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name-field"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="email-field" className="pb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email-field"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject-field"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="message-field" className="pb-2">Message</label>
                  <textarea
                    name="message"
                    id="message-field"
                    className="form-control"
                    rows="8"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12 text-center">
                  {status === 'sending' && (
                    <div className="loading" style={{ display: 'block' }}>Sending Message…</div>
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
