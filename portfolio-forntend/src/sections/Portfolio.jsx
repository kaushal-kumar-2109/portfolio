import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const portfolioItems = [
  { img: '/assets/img/portfolio/app-1.jpg',      title: 'App 1',      category: 'filter-app',      gallery: 'portfolio-gallery-app' },
  { img: '/assets/img/portfolio/product-1.jpg',  title: 'Product 1',  category: 'filter-product',  gallery: 'portfolio-gallery-product' },
  { img: '/assets/img/portfolio/branding-1.jpg', title: 'Branding 1', category: 'filter-branding', gallery: 'portfolio-gallery-branding' },
  { img: '/assets/img/portfolio/books-1.jpg',    title: 'Books 1',    category: 'filter-books',    gallery: 'portfolio-gallery-book' },
  { img: '/assets/img/portfolio/app-2.jpg',      title: 'App 2',      category: 'filter-app',      gallery: 'portfolio-gallery-app' },
  { img: '/assets/img/portfolio/product-2.jpg',  title: 'Product 2',  category: 'filter-product',  gallery: 'portfolio-gallery-product' },
  { img: '/assets/img/portfolio/branding-2.jpg', title: 'Branding 2', category: 'filter-branding', gallery: 'portfolio-gallery-branding' },
  { img: '/assets/img/portfolio/books-2.jpg',    title: 'Books 2',    category: 'filter-books',    gallery: 'portfolio-gallery-book' },
  { img: '/assets/img/portfolio/app-3.jpg',      title: 'App 3',      category: 'filter-app',      gallery: 'portfolio-gallery-app' },
  { img: '/assets/img/portfolio/product-3.jpg',  title: 'Product 3',  category: 'filter-product',  gallery: 'portfolio-gallery-product' },
  { img: '/assets/img/portfolio/branding-3.jpg', title: 'Branding 3', category: 'filter-branding', gallery: 'portfolio-gallery-branding' },
  { img: '/assets/img/portfolio/books-3.jpg',    title: 'Books 3',    category: 'filter-books',    gallery: 'portfolio-gallery-book' },
]

const filters = [
  { label: 'All',      value: '*' },
  { label: 'App',      value: 'filter-app' },
  { label: 'Product',  value: 'filter-product' },
  { label: 'Branding', value: 'filter-branding' },
  { label: 'Books',    value: 'filter-books' },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('*')
  const glightboxRef = useRef(null)

  const filteredItems = activeFilter === '*'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter)

  // Re-init GLightbox whenever filtered list changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.GLightbox) {
        if (glightboxRef.current) glightboxRef.current.destroy()
        glightboxRef.current = window.GLightbox({ selector: '.glightbox' })
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [activeFilter])

  return (
    <section id="portfolio" className="portfolio section light-background">

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
          consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
          in iste officiis commodi quidem hic quas.
        </p>
      </div>

      <div className="container">

        {/* Portfolio Filters — wrappable pills */}
        <ul
          className="portfolio-filters isotope-filters"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            listStyle: 'none',
            padding: '0 10px',
            margin: '0 0 24px',
          }}
        >
          {filters.map((f) => (
            <li
              key={f.value}
              className={activeFilter === f.value ? 'filter-active' : ''}
              onClick={() => setActiveFilter(f.value)}
              style={{
                cursor: 'pointer',
                padding: '6px 16px',
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {f.label}
            </li>
          ))}
        </ul>

        {/* Portfolio Grid — 1 col mobile, 2 col md, 3 col lg */}
        <div
          className="row gy-4 isotope-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredItems.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className={`col-12 col-md-6 col-lg-4 portfolio-item isotope-item ${item.category}`}
            >
              <div className="portfolio-content h-100">
                <img
                  src={item.img}
                  className="img-fluid"
                  alt={item.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <p>Lorem ipsum, dolor sit amet consectetur</p>
                  <a
                    href={item.img}
                    title={item.title}
                    data-gallery={item.gallery}
                    className="glightbox preview-link"
                    aria-label={`Preview ${item.title}`}
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                  <Link
                    to="/portfolio-details"
                    title="More Details"
                    className="details-link"
                    aria-label={`View details for ${item.title}`}
                  >
                    <i className="bi bi-link-45deg"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
