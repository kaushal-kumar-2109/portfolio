import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../admin/context/ContentContext'

export default function Portfolio() {
  const { content } = useContent()
  const [activeFilter, setActiveFilter] = useState('*')
  const glightboxRef = useRef(null)

  const rawProjects = content?.projects || []
  const publishedProjects = rawProjects.filter(p => p.status !== 'draft' && p.status !== 'archived')

  // Derive available filters dynamically
  const availableCategories = Array.from(new Set(publishedProjects.map(p => p.category).filter(Boolean)))
  const filters = [
    { label: 'All', value: '*' },
    ...availableCategories.map(cat => ({
      label: cat,
      value: cat,
    })),
  ]

  const filteredItems = activeFilter === '*'
    ? publishedProjects
    : publishedProjects.filter(item => item.category === activeFilter)

  // Re-init GLightbox whenever filtered list changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.GLightbox) {
        if (glightboxRef.current) glightboxRef.current.destroy()
        glightboxRef.current = window.GLightbox({ selector: '.glightbox' })
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [activeFilter, filteredItems.length])

  return (
    <section id="portfolio" className="portfolio section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
          consectetur velit.
        </p>
      </div>

      <div className="container">
        {/* Portfolio Filters */}
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

        {/* Portfolio Grid */}
        <div
          className="row gy-4 isotope-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {filteredItems.map((item, i) => (
            <div
              key={item.id || i}
              className="col-12 col-md-6 col-lg-4 portfolio-item isotope-item"
            >
              <div className="portfolio-content h-100">
                <img
                  src={item.featuredImage || '/assets/img/portfolio/app-1.jpg'}
                  className="img-fluid"
                  alt={item.title}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <p>{item.shortDescription || item.category}</p>
                  <a
                    href={item.featuredImage || '/assets/img/portfolio/app-1.jpg'}
                    title={item.title}
                    data-gallery="portfolio-gallery"
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

          {filteredItems.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
