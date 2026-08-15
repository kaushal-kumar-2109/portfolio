import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, EmptyState } from '../components/Badge'
import Badge from '../components/Badge'
import ConfirmDialog from '../components/ConfirmDialog'

export default function ProjectsPage() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const projects = content.projects || []
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    const updated = projects.filter(p => p.id !== deleteTarget.id)
    const ok = updateSection('projects', updated)
    if (ok) {
      success('Deleted', `Project "${deleteTarget.title}" has been deleted.`)
    } else {
      error('Error', 'Failed to delete project.')
    }
    setDeleteTarget(null)
  }

  const filteredProjects = projects.filter(p => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <PageHeader
        title="Manage Projects"
        description="Add, edit, publish, or remove portfolio showcase projects and gallery images."
        actions={
          <Link to="/admin/projects/new" className="adm-btn adm-btn-primary">
            <i className="bi bi-plus-lg"></i> Add New Project
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '240px' }}>
          <div className="adm-input-wrapper" style={{ flex: 1 }}>
            <input
              type="text"
              className="adm-input"
              placeholder="Search projects by title or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="adm-select"
            style={{ width: '140px' }}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Projects ({filteredProjects.length})</h3>
        </div>

        {/* Desktop Table View */}
        <div className="adm-table-wrap d-none d-md-block">
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(proj => (
                <tr key={proj.id}>
                  <td>
                    <img
                      src={proj.featuredImage || '/assets/img/portfolio/app-1.jpg'}
                      alt={proj.title}
                      className="adm-table-thumb"
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--adm-text)' }}>{proj.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--adm-text-dim)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {proj.shortDescription}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: 'var(--adm-text-muted)' }}>
                      {proj.category || 'General'}
                    </span>
                  </td>
                  <td>
                    <Badge type={proj.status || 'published'} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="adm-table-actions" style={{ justifyContent: 'flex-end' }}>
                      <Link
                        to={`/admin/projects/${proj.id}/edit`}
                        className="adm-btn-icon"
                        title="Edit Project"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        type="button"
                        className="adm-btn-icon danger"
                        onClick={() => setDeleteTarget(proj)}
                        title="Delete Project"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="d-md-none" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              style={{
                background: 'var(--adm-surface-2)',
                borderRadius: 'var(--adm-radius)',
                border: '1px solid var(--adm-border)',
                padding: '14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <img
                src={proj.featuredImage || '/assets/img/portfolio/app-1.jpg'}
                alt={proj.title}
                style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: 'var(--adm-text)', fontSize: '14px' }}>
                  {proj.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--adm-text-muted)', marginBottom: '4px' }}>
                  {proj.category}
                </div>
                <Badge type={proj.status || 'published'} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Link
                  to={`/admin/projects/${proj.id}/edit`}
                  className="adm-btn-icon"
                  title="Edit"
                >
                  <i className="bi bi-pencil"></i>
                </Link>
                <button
                  type="button"
                  className="adm-btn-icon danger"
                  onClick={() => setDeleteTarget(proj)}
                  title="Delete"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <EmptyState
            icon="bi-folder2-open"
            title="No projects found"
            message={search ? 'No projects match your search query.' : 'Start building your portfolio by adding your first project.'}
            action={
              <Link to="/admin/projects/new" className="adm-btn adm-btn-primary" style={{ marginTop: '12px' }}>
                <i className="bi bi-plus-lg"></i> Add First Project
              </Link>
            }
          />
        )}
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Project?"
        itemName={deleteTarget?.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
