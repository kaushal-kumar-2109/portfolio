import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import Toggle from '../components/Toggle'

const sectionRoutes = {
  hero: '/admin/sections/hero',
  about: '/admin/sections/about',
  stats: '/admin/sections/stats',
  skills: '/admin/sections/skills',
  resume: '/admin/sections/resume',
  portfolio: '/admin/projects',
  services: '/admin/sections/services',
  testimonials: '/admin/sections/testimonials',
  contact: '/admin/sections/contact',
  footer: '/admin/sections/footer',
}

export default function SectionsPage() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [sections, setSections] = useState(() => {
    const list = content.sections || []
    return [...list].sort((a, b) => (a.order || 0) - (b.order || 0))
  })
  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleToggle = (id, checked) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, visible: checked } : s))
    )
    setDirty(true)
  }

  const moveSection = (index, direction) => {
    const newIdx = index + direction
    if (newIdx < 0 || newIdx >= sections.length) return
    const updated = [...sections]
    const [moved] = updated.splice(index, 1)
    updated.splice(newIdx, 0, moved)
    // update order property
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx + 1 }))
    setSections(reordered)
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('sections', sections)
      if (ok) {
        success('Saved', 'Section order and visibility updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save sections.')
      }
    } catch {
      error('Error', 'Something went wrong while saving.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Manage Sections"
        description="Enable, disable, reorder, and configure public portfolio sections."
        actions={
          <button
            className="adm-btn adm-btn-primary"
            onClick={handleSave}
            disabled={!dirty || loading}
          >
            {loading ? (
              <><span className="spinner"></span> Saving…</>
            ) : (
              <><i className="bi bi-check2"></i> Save Section Order</>
            )}
          </button>
        }
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Public Sections List</h3>
          <span style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>
            Toggle visibility or use arrow buttons to reorder
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sections.map((sec, idx) => (
            <div key={sec.id} className="adm-section-row">
              {/* Order Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  type="button"
                  className="adm-btn-icon"
                  style={{ width: '24px', height: '24px', fontSize: '11px' }}
                  onClick={() => moveSection(idx, -1)}
                  disabled={idx === 0}
                  title="Move Up"
                  aria-label={`Move ${sec.name} up`}
                >
                  <i className="bi bi-chevron-up"></i>
                </button>
                <button
                  type="button"
                  className="adm-btn-icon"
                  style={{ width: '24px', height: '24px', fontSize: '11px' }}
                  onClick={() => moveSection(idx, 1)}
                  disabled={idx === sections.length - 1}
                  title="Move Down"
                  aria-label={`Move ${sec.name} down`}
                >
                  <i className="bi bi-chevron-down"></i>
                </button>
              </div>

              {/* Section Name & Key */}
              <div className="adm-section-name">
                <div>{sec.name}</div>
                <div className="adm-section-key">#{sec.key}</div>
              </div>

              {/* Status Badge */}
              <span
                className={`adm-badge ${sec.visible ? 'adm-badge-success' : 'adm-badge-muted'}`}
                style={{ fontSize: '11px' }}
              >
                {sec.visible ? 'Visible' : 'Hidden'}
              </span>

              {/* Visibility Toggle */}
              <div style={{ marginLeft: '8px' }}>
                <Toggle
                  checked={sec.visible}
                  onChange={(val) => handleToggle(sec.id, val)}
                  id={`sec-toggle-${sec.id}`}
                />
              </div>

              {/* Edit Button */}
              {sectionRoutes[sec.key] && (
                <Link
                  to={sectionRoutes[sec.key]}
                  className="adm-btn adm-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px', minHeight: '32px' }}
                >
                  <i className="bi bi-pencil"></i> Edit
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
