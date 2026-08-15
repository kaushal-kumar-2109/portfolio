import { Link, useLocation } from 'react-router-dom'

const pageTitles = {
  '/admin/dashboard':              'Dashboard',
  '/admin/sections':               'Manage Sections',
  '/admin/sections/hero':          'Edit Hero Section',
  '/admin/sections/about':         'Edit About Section',
  '/admin/sections/stats':         'Edit Stats Section',
  '/admin/sections/skills':        'Manage Skills',
  '/admin/sections/resume':        'Manage Resume',
  '/admin/sections/services':      'Manage Services',
  '/admin/sections/testimonials':  'Manage Testimonials',
  '/admin/sections/contact':       'Edit Contact Section',
  '/admin/sections/footer':        'Edit Footer Section',
  '/admin/projects':               'All Projects',
  '/admin/projects/new':           'Add New Project',
  '/admin/messages':               'Messages',
  '/admin/media':                  'Media Library',
  '/admin/settings':               'Website Settings',
  '/admin/profile':                'Admin Profile',
}

export default function AdminHeader({ onToggleSidebar }) {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] || 'Admin'

  // Determine breadcrumb
  const parts = pathname.split('/').filter(Boolean)

  return (
    <header className="adm-header">
      {/* Mobile sidebar toggle */}
      <button
        className="adm-header-toggle"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
      >
        <i className="bi bi-list"></i>
      </button>

      <div className="adm-header-title">{title}</div>

      <div className="adm-header-actions">
        {/* Live site link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="adm-header-preview-btn"
          title="View live website"
        >
          <i className="bi bi-box-arrow-up-right"></i>
          <span className="d-none d-sm-inline">Live Site</span>
        </a>

        {/* Avatar / profile */}
        <Link to="/admin/profile" className="adm-header-avatar" title="Admin Profile">
          A
        </Link>
      </div>
    </header>
  )
}
