import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContent } from '../admin/context/ContentContext'

const navLinks = [
  { href: '#hero',      icon: 'bi-house',            label: 'Home',      key: 'hero' },
  { href: '#about',     icon: 'bi-person',           label: 'About',     key: 'about' },
  { href: '#resume',    icon: 'bi-file-earmark-text', label: 'Resume',    key: 'resume' },
  { href: '#portfolio', icon: 'bi-images',           label: 'Portfolio', key: 'portfolio' },
  { href: '#services',  icon: 'bi-hdd-stack',        label: 'Services',  key: 'services' },
  { href: '#contact',   icon: 'bi-envelope',         label: 'Contact',   key: 'contact' },
]

export default function Header() {
  const { content } = useContent()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()
  const isMobile = () => window.innerWidth < 1200

  const hero = content?.hero || {}
  const profileImg = hero.profileImage || '/assets/img/my-profile-img.jpg'
  const sitename = hero.name || 'Alex Smith'

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen && isMobile()) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }
    return () => document.body.classList.remove('sidebar-open')
  }, [isOpen])

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openSidebar = () => setIsOpen(true)
  const closeSidebar = () => setIsOpen(false)
  const toggleSidebar = () => setIsOpen(prev => !prev)

  // Smooth scroll + close sidebar on nav click
  const handleNavClick = useCallback((e, href) => {
    if (isMobile()) closeSidebar()
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }, [])

  // Scroll-spy — detect which section is in view
  useEffect(() => {
    if (location.pathname !== '/') return
    const sectionEls = navLinks
      .map(l => document.querySelector(l.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0,
        rootMargin: '-30% 0px -60% 0px',
      }
    )

    sectionEls.forEach(s => observer.observe(s))
    return () => sectionEls.forEach(s => observer.unobserve(s))
  }, [location.pathname])

  const isHomePage = location.pathname === '/'

  return (
    <>
      {/* Mobile hamburger toggle — shown only on < 1200px */}
      <button
        className="header-toggle d-xl-none"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 9999,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--accent-color)',
          color: '#fff',
          fontSize: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 996,
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Header */}
      <header
        id="header"
        className={`header dark-background d-flex flex-column${isOpen ? ' header-show' : ''}`}
        style={{ zIndex: 997 }}
      >
        <div className="profile-img">
          <img
            src={profileImg}
            alt={`${sitename} profile`}
            className="img-fluid rounded-circle"
          />
        </div>

        <Link
          to="/"
          className="logo d-flex align-items-center justify-content-center"
          onClick={() => isMobile() && closeSidebar()}
        >
          <h1 className="sitename">{sitename}</h1>
        </Link>

        <div className="social-links text-center">
          {hero.socialLinks?.twitter && (
            <a href={hero.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="twitter" aria-label="Twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
          )}
          {hero.socialLinks?.facebook && (
            <a href={hero.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="facebook" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
          )}
          {hero.socialLinks?.instagram && (
            <a href={hero.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
          )}
          {hero.socialLinks?.linkedin && (
            <a href={hero.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin" aria-label="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          )}
          {hero.socialLinks?.github && (
            <a href={hero.socialLinks.github} target="_blank" rel="noopener noreferrer" className="github" aria-label="GitHub">
              <i className="bi bi-github"></i>
            </a>
          )}
        </div>

        <nav id="navmenu" className="navmenu" aria-label="Main navigation">
          <ul>
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = isHomePage && activeSection === sectionId
              return (
                <li key={link.href}>
                  <a
                    href={isHomePage ? link.href : `/${link.href}`}
                    className={isActive ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{ minHeight: '44px' }}
                  >
                    <i className={`bi ${link.icon} navicon`}></i>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    </>
  )
}
