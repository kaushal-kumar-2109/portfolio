import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import StatCard from '../components/StatCard'
import { PageHeader } from '../components/Badge'

export default function DashboardPage() {
  const { content } = useContent()

  const totalSections = content.sections?.length || 10
  const activeSections = content.sections?.filter(s => s.visible)?.length || 9
  const totalProjects = content.projects?.length || 0
  const totalSkills = content.skills?.length || 0
  const totalMessages = content.messages?.length || 0
  const unreadMessages = content.messages?.filter(m => !m.read)?.length || 0

  const quickActions = [
    {
      title: 'Edit Hero Section',
      desc: 'Update your name, title, and hero text',
      to: '/admin/sections/hero',
      icon: 'bi-person-badge',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.15)',
    },
    {
      title: 'Add New Project',
      desc: 'Add a new project to your portfolio',
      to: '/admin/projects/new',
      icon: 'bi-plus-circle-dotted',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
    },
    {
      title: 'Manage Skills',
      desc: 'Add, update or reorder skills & percentages',
      to: '/admin/sections/skills',
      icon: 'bi-bar-chart-line',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.15)',
    },
    {
      title: 'Edit Resume',
      desc: 'Update education and work experience',
      to: '/admin/sections/resume',
      icon: 'bi-file-earmark-text',
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'Manage Services',
      desc: 'Add, edit, or remove service offerings',
      to: '/admin/sections/services',
      icon: 'bi-grid-3x3-gap',
      color: '#ec4899',
      bg: 'rgba(236, 72, 153, 0.15)',
    },
    {
      title: 'View Messages',
      desc: `${unreadMessages} unread messages from contact form`,
      to: '/admin/messages',
      icon: 'bi-envelope',
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.15)',
    },
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview and quick controls for your iPortfolio website."
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-btn adm-btn-primary"
          >
            <i className="bi bi-box-arrow-up-right"></i> View Live Site
          </a>
        }
      />

      {/* Stats Cards */}
      <div className="adm-stat-grid">
        <StatCard
          icon="bi-layout-three-columns"
          iconBg="rgba(124, 58, 237, 0.15)"
          iconColor="#9f67ff"
          number={`${activeSections}/${totalSections}`}
          label="Active Sections"
          link="#/admin/sections"
        />
        <StatCard
          icon="bi-folder2-open"
          iconBg="rgba(59, 130, 246, 0.15)"
          iconColor="#60a5fa"
          number={totalProjects}
          label="Total Projects"
          link="#/admin/projects"
        />
        <StatCard
          icon="bi-bar-chart-steps"
          iconBg="rgba(245, 158, 11, 0.15)"
          iconColor="#fbbf24"
          number={totalSkills}
          label="Total Skills"
          link="#/admin/sections/skills"
        />
        <StatCard
          icon="bi-chat-left-dots"
          iconBg="rgba(16, 185, 129, 0.15)"
          iconColor="#34d399"
          number={unreadMessages ? `${unreadMessages} new` : totalMessages}
          label="Contact Messages"
          link="#/admin/messages"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Quick Actions Card */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="adm-card-body" style={{ padding: '16px' }}>
            <div className="adm-quick-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {quickActions.map((qa, i) => (
                <Link key={i} to={qa.to} className="adm-quick-item">
                  <div className="adm-quick-item-icon" style={{ background: qa.bg, color: qa.color }}>
                    <i className={`bi ${qa.icon}`}></i>
                  </div>
                  <div className="adm-quick-item-text">
                    <h4>{qa.title}</h4>
                    <p>{qa.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Live Website Preview Card */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Website Preview</h3>
            <span style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>
              Public Hero Preview
            </span>
          </div>
          <div className="adm-card-body">
            <div
              style={{
                background: 'var(--adm-surface-2)',
                borderRadius: 'var(--adm-radius)',
                border: '1px solid var(--adm-border)',
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              <img
                src={content.hero?.profileImage || '/assets/img/my-profile-img.jpg'}
                alt="Profile"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--adm-primary)',
                }}
              />
              <div style={{ flex: 1, minWidth: '180px' }}>
                <span style={{ fontSize: '13px', color: 'var(--adm-text-muted)' }}>
                  {content.hero?.greeting || "Hello, I'm"}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '2px 0 6px', color: 'var(--adm-text)' }}>
                  {content.hero?.name || 'Alex Smith'}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--adm-primary-light)', fontWeight: 500 }}>
                  {content.hero?.typedStrings?.join(' · ') || 'Developer & Designer'}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="adm-btn adm-btn-primary"
                style={{ flex: 1 }}
              >
                <i className="bi bi-box-arrow-up-right"></i> Open Full Website
              </a>
              <Link to="/admin/sections/hero" className="adm-btn adm-btn-secondary">
                <i className="bi bi-pencil"></i> Customize Hero
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
