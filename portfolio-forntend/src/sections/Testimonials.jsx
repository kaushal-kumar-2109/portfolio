import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useContent } from '../admin/context/ContentContext'

export default function Testimonials() {
  const { content } = useContent()
  const list = (content?.testimonials || []).filter(t => t.visible !== false)

  if (list.length === 0) return null

  return (
    <section id="testimonials" className="testimonials section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={list.length > 1}
          speed={600}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 40 },
            1200: { slidesPerView: Math.min(3, list.length), spaceBetween: 1 },
          }}
          className="testimonials-carousel"
        >
          {list.map((t, i) => (
            <SwiperSlide key={t.id || i}>
              <div className="testimonial-item">
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>{t.message || t.text}</span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
                <img
                  src={t.image || t.img || '/assets/img/testimonials/testimonials-1.jpg'}
                  className="testimonial-img"
                  alt={t.name}
                />
                <h3>{t.name}</h3>
                <h4>{t.position || t.role}</h4>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  )
}
