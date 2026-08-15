import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navGroups = [
  {
    label: 'MAIN',
    items: [
      { to: '/admin/dashboard', icon: 'bi-grid-1x2', label: 'Dashboard' },
    ],
  },
  {
    label: 'WEBSITE',
    items: [
      { to: '/admin/sections',              icon: 'bi-layout-three-columns', label: 'Sections' },
      { to: '/admin/sections/hero',         icon: 'bi-person-badge',         label: 'Hero' },
      { to: '/admin/sections/about',        icon: 'bi-person-circle',        label: 'About' },
      { to: '/admin/sections/skills',       icon: 'bi-bar-chart-line',       label: 'Skills' },
      { to: '/admin/sections/resume',       icon: 'bi-file-earmark-text',    label: 'Resume' },
      { to: '/admin/sections/services',     icon: 'bi-grid-3x3-gap',         label: 'Services' },
      { to: '/admin/sections/testimonials', icon: 'bi-chat-quote',           label: 'Testimonials' },
      { to: '/admin/sections/contact',      icon: 'bi-envelope',             label: 'Contact' },
      { to: '/admin/sections/footer',       icon: 'bi-layout-bottom',        label: 'Footer' },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { to: '/admin/projects',  icon: 'bi-folder2-open', label: 'Projects' },
      { to: '/admin/messages',  icon: 'bi-inbox',        label: 'Messages' },
      { to: '/admin/media',     icon: 'bi-images',       label: 'Media' },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { to: '/admin/settings', icon: 'bi-gear',         label: 'Website Settings' },
      { to: '/admin/profile',  icon: 'bi-shield-lock',  label: 'Admin Profile' },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const { logout, username } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="adm-sidebar-backdrop"
          style={{ display: 'block' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`adm-sidebar${isOpen ? ' open' : ''}`} aria-label="Admin Navigation">
        {/* Brand */}
        <div className="adm-sidebar-brand">
          <div className="brand-logo">
            <i className="bi bi-briefcase-fill"></i>
          </div>
          <div className="brand-text">
            <h2>iPortfolio</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="adm-nav">
          {navGroups.map((group) => (
            <div key={group.label} className="adm-nav-section">
              <div className="adm-nav-section-label">{group.label}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin/dashboard'}
                  className={({ isActive }) => `adm-nav-item${isActive ? ' active' : ''}`}
                  onClick={onClose}
                >
                  <i className={`bi ${item.icon} nav-icon`}></i>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer — user info + logout */}
        <div className="adm-sidebar-footer">
          <div style={{ padding: '8px 20px 4px', fontSize: '11px', color: 'var(--adm-text-dim)' }}>
            Signed in as <strong style={{ color: 'var(--adm-text-muted)' }}>{username}</strong>
          </div>
          <button className="adm-logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left nav-icon"></i>
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
