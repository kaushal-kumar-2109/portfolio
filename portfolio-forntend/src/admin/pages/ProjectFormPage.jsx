import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea, Select } from '../components/FormField'
import ImageUploader from '../components/ImageUploader'
import { generateId } from '../data/defaultContent'

const categories = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Branding', label: 'Branding' },
  { value: 'Books', label: 'Books' },
  { value: 'Other', label: 'Other' },
]

const filterMap = {
  'Mobile App': 'filter-app',
  'Web Development': 'filter-product',
  'Branding': 'filter-branding',
  'Books': 'filter-books',
  'UI/UX Design': 'filter-app',
  'Other': 'filter-app',
}

export default function ProjectFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const isEdit = Boolean(id)
  const existing = isEdit ? content.projects?.find(p => p.id === id) : null

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'Web Development',
    client: '',
    projectDate: '',
    projectUrl: '',
    githubUrl: '',
    technologiesRaw: '',
    featuredImage: '/assets/img/portfolio/app-1.jpg',
    status: 'published',
  })

  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (isEdit) {
      if (existing) {
        setForm({
          ...existing,
          technologiesRaw: (existing.technologies || []).join(', '),
        })
      } else {
        error('Not Found', 'Project with this ID was not found.')
        navigate('/admin/projects')
      }
    }
  }, [id, isEdit, existing, navigate, error])

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    setDirty(true)
  }

  const handleSubmit = (e) => {
    e?.preventDefault?.()
    if (!form.title.trim()) {
      error('Validation Error', 'Project title is required.')
      return
    }

    setLoading(true)
    try {
      const technologies = form.technologiesRaw
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const payload = {
        ...form,
        technologies,
        filter: filterMap[form.category] || 'filter-app',
      }
      delete payload.technologiesRaw

      const list = content.projects || []
      let updatedList
      if (isEdit) {
        updatedList = list.map(p => (p.id === id ? { ...p, ...payload } : p))
      } else {
        const newProject = {
          ...payload,
          id: generateId(),
          createdAt: new Date().toISOString(),
        }
        updatedList = [newProject, ...list]
      }

      const ok = updateSection('projects', updatedList)
      if (ok) {
        success('Saved', isEdit ? 'Project updated successfully!' : 'New project added to portfolio!')
        navigate('/admin/projects')
      } else {
        error('Error', 'Failed to save project.')
      }
    } catch {
      error('Error', 'An unexpected error occurred while saving.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Project' : 'Add New Project'}
        description={isEdit ? `Modifying "${form.title || 'Untitled Project'}"` : 'Create a new project showcase for your public portfolio.'}
        actions={
          <Link to="/admin/projects" className="adm-btn adm-btn-secondary">
            <i className="bi bi-arrow-left"></i> Back to Projects
          </Link>
        }
      />

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Main Info */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>Project Information</h3>
            </div>
            <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField label="Project Title" required id="proj-title">
                <Input
                  id="proj-title"
                  value={form.title}
                  onChange={e => handleChange('title', e.target.value)}
                  placeholder="e.g. Modern E-Commerce Platform"
                  autoFocus={!isEdit}
                />
              </FormField>

              <div className="adm-form-grid">
                <FormField label="Category" id="proj-cat">
                  <Select
                    id="proj-cat"
                    options={categories}
                    value={form.category}
                    onChange={e => handleChange('category', e.target.value)}
                  />
                </FormField>

                <FormField label="Publication Status" id="proj-status">
                  <Select
                    id="proj-status"
                    options={[
                      { value: 'published', label: 'Published (Public)' },
                      { value: 'draft', label: 'Draft (Hidden)' },
                      { value: 'archived', label: 'Archived' },
                    ]}
                    value={form.status}
                    onChange={e => handleChange('status', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Short Description (Thumbnail Summary)" id="proj-short-desc">
                <Input
                  id="proj-short-desc"
                  value={form.shortDescription}
                  onChange={e => handleChange('shortDescription', e.target.value)}
                  placeholder="Brief 1-sentence overview..."
                />
              </FormField>

              <FormField label="Full Description / Case Study" id="proj-full-desc">
                <Textarea
                  id="proj-full-desc"
                  rows={5}
                  value={form.fullDescription}
                  onChange={e => handleChange('fullDescription', e.target.value)}
                  placeholder="Comprehensive description of technologies, challenges, and solutions..."
                />
              </FormField>

              <FormField
                label="Technologies Used (comma separated)"
                hint="e.g. React, Node.js, Tailwind, MongoDB, Stripe"
                id="proj-tech"
              >
                <Input
                  id="proj-tech"
                  value={form.technologiesRaw}
                  onChange={e => handleChange('technologiesRaw', e.target.value)}
                  placeholder="React, Express, MongoDB"
                />
              </FormField>
            </div>
          </div>

          {/* Media & Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Featured Image */}
            <div className="adm-card">
              <div className="adm-card-header">
                <h3>Featured Thumbnail Image</h3>
              </div>
              <div className="adm-card-body">
                <ImageUploader
                  value={form.featuredImage}
                  onChange={val => handleChange('featuredImage', val)}
                  label="Featured Image"
                />
              </div>
            </div>

            {/* Extra Metadata */}
            <div className="adm-card">
              <div className="adm-card-header">
                <h3>Links & Metadata</h3>
              </div>
              <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="adm-form-grid">
                  <FormField label="Client Name" id="proj-client">
                    <Input
                      id="proj-client"
                      value={form.client}
                      onChange={e => handleChange('client', e.target.value)}
                      placeholder="e.g. Acme Corp"
                    />
                  </FormField>

                  <FormField label="Project Date" id="proj-date">
                    <Input
                      id="proj-date"
                      type="date"
                      value={form.projectDate}
                      onChange={e => handleChange('projectDate', e.target.value)}
                    />
                  </FormField>
                </div>

                <FormField label="Live Demo URL" id="proj-url">
                  <Input
                    id="proj-url"
                    type="url"
                    value={form.projectUrl}
                    onChange={e => handleChange('projectUrl', e.target.value)}
                    placeholder="https://example.com"
                  />
                </FormField>

                <FormField label="GitHub Repository URL" id="proj-github">
                  <Input
                    id="proj-github"
                    type="url"
                    value={form.githubUrl}
                    onChange={e => handleChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </FormField>
              </div>
            </div>
          </div>
        </div>

        <SaveBar onSave={handleSubmit} loading={loading} dirty={dirty} />
      </form>
    </div>
  )
}
