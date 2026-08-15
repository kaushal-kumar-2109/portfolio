import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea } from '../components/FormField'
import ConfirmDialog from '../components/ConfirmDialog'
import { generateId } from '../data/defaultContent'

export default function ResumeEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [resume, setResume] = useState(() => ({
    education: content.resume?.education || [],
    experience: content.resume?.experience || [],
  }))

  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  // Modal states: type = 'education' | 'experience'
  const [modalItem, setModalItem] = useState(null) // { type, isNew, data }
  const [deleteTarget, setDeleteTarget] = useState(null) // { type, item }

  const openAdd = (type) => {
    setModalItem({
      type,
      isNew: true,
      data: {
        title: '',
        subtitle: '',
        startYear: '',
        endYear: '',
        description: '',
      },
    })
  }

  const openEdit = (type, item) => {
    setModalItem({
      type,
      isNew: false,
      data: {
        id: item.id,
        title: type === 'education' ? item.degree : item.position,
        subtitle: type === 'education' ? item.institution : item.company,
        startYear: item.startYear,
        endYear: item.endYear,
        description: item.description,
      },
    })
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    const { type, isNew, data } = modalItem
    if (!data.title?.trim()) return

    const formatted = {
      id: data.id || generateId(),
      [type === 'education' ? 'degree' : 'position']: data.title,
      [type === 'education' ? 'institution' : 'company']: data.subtitle,
      startYear: data.startYear,
      endYear: data.endYear,
      description: data.description,
    }

    setResume(prev => {
      const list = prev[type] || []
      const nextList = isNew
        ? [...list, formatted]
        : list.map(it => (it.id === formatted.id ? formatted : it))
      return { ...prev, [type]: nextList }
    })

    setDirty(true)
    setModalItem(null)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    const { type, item } = deleteTarget
    setResume(prev => ({
      ...prev,
      [type]: prev[type].filter(i => i.id !== item.id),
    }))
    setDirty(true)
    setDeleteTarget(null)
    success('Deleted', 'Resume entry removed. Remember to save changes!')
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('resume', resume)
      if (ok) {
        success('Saved', 'Resume section updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save resume.')
      }
    } catch {
      error('Error', 'Could not save resume.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Manage Resume"
        description="Add, edit, or remove education milestones and professional work experiences."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Education Column */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Education ({resume.education.length})</h3>
            <button
              className="adm-btn adm-btn-secondary"
              style={{ fontSize: '12px', padding: '6px 12px', minHeight: '30px' }}
              onClick={() => openAdd('education')}
            >
              <i className="bi bi-plus-lg"></i> Add Education
            </button>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {resume.education.map(item => (
              <div key={item.id} className="adm-resume-item">
                <div className="adm-resume-item-actions">
                  <button
                    className="adm-btn-icon"
                    onClick={() => openEdit('education', item)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="adm-btn-icon danger"
                    onClick={() => setDeleteTarget({ type: 'education', item })}
                    title="Delete"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
                <h4>{item.degree}</h4>
                <div className="meta">
                  <span>{item.institution}</span> ·{' '}
                  <strong style={{ color: 'var(--adm-primary-light)' }}>
                    {item.startYear} - {item.endYear}
                  </strong>
                </div>
                <p>{item.description}</p>
              </div>
            ))}

            {resume.education.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--adm-text-muted)' }}>
                No education history added yet.
              </div>
            )}
          </div>
        </div>

        {/* Experience Column */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Professional Experience ({resume.experience.length})</h3>
            <button
              className="adm-btn adm-btn-secondary"
              style={{ fontSize: '12px', padding: '6px 12px', minHeight: '30px' }}
              onClick={() => openAdd('experience')}
            >
              <i className="bi bi-plus-lg"></i> Add Experience
            </button>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {resume.experience.map(item => (
              <div key={item.id} className="adm-resume-item">
                <div className="adm-resume-item-actions">
                  <button
                    className="adm-btn-icon"
                    onClick={() => openEdit('experience', item)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="adm-btn-icon danger"
                    onClick={() => setDeleteTarget({ type: 'experience', item })}
                    title="Delete"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
                <h4>{item.position}</h4>
                <div className="meta">
                  <span>{item.company}</span> ·{' '}
                  <strong style={{ color: 'var(--adm-primary-light)' }}>
                    {item.startYear} - {item.endYear}
                  </strong>
                </div>
                <p>{item.description}</p>
              </div>
            ))}

            {resume.experience.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--adm-text-muted)' }}>
                No experience items added yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalItem && (
        <div className="adm-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setModalItem(null)}>
          <div className="adm-modal">
            <form onSubmit={handleModalSubmit}>
              <div className="adm-modal-header">
                <div className="adm-modal-icon warning">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <div>
                  <h3>
                    {modalItem.isNew ? 'Add' : 'Edit'}{' '}
                    {modalItem.type === 'education' ? 'Education' : 'Experience'}
                  </h3>
                  <p>Fill in the details for this resume entry.</p>
                </div>
              </div>

              <div className="adm-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <FormField
                  label={modalItem.type === 'education' ? 'Degree / Field of Study' : 'Job Title / Position'}
                  required
                  id="res-title-input"
                >
                  <Input
                    id="res-title-input"
                    value={modalItem.data.title}
                    onChange={e => setModalItem(p => ({ ...p, data: { ...p.data, title: e.target.value } }))}
                    placeholder={modalItem.type === 'education' ? 'e.g. B.S. in Computer Science' : 'e.g. Senior Frontend Engineer'}
                    autoFocus
                  />
                </FormField>

                <FormField
                  label={modalItem.type === 'education' ? 'University / Institution' : 'Company / Organization'}
                  id="res-sub-input"
                >
                  <Input
                    id="res-sub-input"
                    value={modalItem.data.subtitle}
                    onChange={e => setModalItem(p => ({ ...p, data: { ...p.data, subtitle: e.target.value } }))}
                    placeholder="e.g. Stanford University or Google Inc."
                  />
                </FormField>

                <div className="adm-form-grid">
                  <FormField label="Start Year" id="res-start">
                    <Input
                      id="res-start"
                      value={modalItem.data.startYear}
                      onChange={e => setModalItem(p => ({ ...p, data: { ...p.data, startYear: e.target.value } }))}
                      placeholder="2020"
                    />
                  </FormField>
                  <FormField label="End Year" id="res-end">
                    <Input
                      id="res-end"
                      value={modalItem.data.endYear}
                      onChange={e => setModalItem(p => ({ ...p, data: { ...p.data, endYear: e.target.value } }))}
                      placeholder="Present or 2024"
                    />
                  </FormField>
                </div>

                <FormField label="Description / Key Achievements" id="res-desc">
                  <Textarea
                    id="res-desc"
                    rows={3}
                    value={modalItem.data.description}
                    onChange={e => setModalItem(p => ({ ...p, data: { ...p.data, description: e.target.value } }))}
                    placeholder="Summary of responsibilities or coursework..."
                  />
                </FormField>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary"
                  onClick={() => setModalItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn adm-btn-primary">
                  {modalItem.isNew ? 'Save Item' : 'Update Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Resume Item?"
        itemName={deleteTarget?.type === 'education' ? deleteTarget?.item?.degree : deleteTarget?.item?.position}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
