import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Preloader from '../components/Preloader'
import ScrollTop from '../components/ScrollTop'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const sliderImages = [
  '/assets/img/portfolio/app-1.jpg',
  '/assets/img/portfolio/product-1.jpg',
  '/assets/img/portfolio/branding-1.jpg',
  '/assets/img/portfolio/books-1.jpg',
]

export default function PortfolioDetails() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      })
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Preloader />
      <Header />

      <main className="main">
        {/* Page Title */}
        <div className="page-title dark-background" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Portfolio Details</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li className="current">Portfolio Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Portfolio Details Section */}
        <section id="portfolio-details" className="portfolio-details section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">

              {/* Slider — full-width on mobile, 8-cols on desktop */}
              <div className="col-12 col-lg-8">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  loop={true}
                  speed={600}
                  autoplay={{ delay: 5000 }}
                  pagination={{ clickable: true }}
                  className="portfolio-details-slider"
                  style={{ width: '100%', overflow: 'hidden' }}
                >
                  {sliderImages.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`Portfolio ${i + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '420px',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Project Info — stacks below slider on mobile, 4-cols on desktop */}
              <div className="col-12 col-lg-4">
                <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                  <h3>Project information</h3>
                  <ul>
                    <li><strong>Category</strong>: Web design</li>
                    <li><strong>Client</strong>: ASU Company</li>
                    <li><strong>Project date</strong>: 01 March, 2020</li>
                    <li>
                      <strong>Project URL</strong>:{' '}
                      <a href="#" style={{ wordBreak: 'break-all' }}>www.example.com</a>
                    </li>
                  </ul>
                </div>
                <div className="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                  <h2>Exercitationem repudiandae officiis neque suscipit</h2>
                  <p>
                    Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia
                    quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem
                    officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum
                    deserunt eius.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollTop />
    </>
  )
}
