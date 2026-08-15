import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea } from '../components/FormField'
import ConfirmDialog from '../components/ConfirmDialog'
import Toggle from '../components/Toggle'
import { generateId } from '../data/defaultContent'

export default function ServicesEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [services, setServices] = useState(() => content.services || [])
  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  const [editingService, setEditingService] = useState(null)
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: 'bi-briefcase',
    link: '#',
    visible: true,
  })

  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAdd = () => {
    setServiceForm({
      title: '',
      description: '',
      icon: 'bi-briefcase',
      link: '#',
      visible: true,
    })
    setEditingService({ isNew: true })
  }

  const openEdit = (serv) => {
    setServiceForm({ ...serv })
    setEditingService(serv)
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    if (!serviceForm.title.trim()) return

    if (editingService.isNew) {
      const newServ = {
        ...serviceForm,
        id: generateId(),
        order: services.length + 1,
      }
      setServices(prev => [...prev, newServ])
    } else {
      setServices(prev =>
        prev.map(s => (s.id === editingService.id ? { ...s, ...serviceForm } : s))
      )
    }

    setDirty(true)
    setEditingService(null)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    setServices(prev => prev.filter(s => s.id !== deleteTarget.id))
    setDirty(true)
    setDeleteTarget(null)
    success('Deleted', `Service "${deleteTarget.title}" removed.`)
  }

  const handleToggle = (id, checked) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, visible: checked } : s))
    )
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('services', services)
      if (ok) {
        success('Saved', 'Services updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save services.')
      }
    } catch {
      error('Error', 'Could not save services.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Manage Services"
        description="Add, edit, enable, or delete services offered on your portfolio."
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>
            <i className="bi bi-plus-lg"></i> Add New Service
          </button>
        }
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Services List ({services.length})</h3>
        </div>
        <div className="adm-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {services.map(serv => (
            <div
              key={serv.id}
              style={{
                background: 'var(--adm-surface-2)',
                border: '1px solid var(--adm-border)',
                borderRadius: 'var(--adm-radius)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'var(--adm-primary-glow)',
                    color: 'var(--adm-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  <i className={`bi ${serv.icon}`}></i>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Toggle
                    checked={serv.visible !== false}
                    onChange={(val) => handleToggle(serv.id, val)}
                    id={`serv-toggle-${serv.id}`}
                  />
                  <button
                    className="adm-btn-icon"
                    onClick={() => openEdit(serv)}
                    title="Edit Service"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="adm-btn-icon danger"
                    onClick={() => setDeleteTarget(serv)}
                    title="Delete Service"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--adm-text)', margin: '4px 0 0' }}>
                {serv.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--adm-text-muted)', lineHeight: 1.5, margin: 0 }}>
                {serv.description}
              </p>
            </div>
          ))}

          {services.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--adm-text-muted)', gridColumn: '1 / -1' }}>
              No services added yet. Click "+ Add New Service" above.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {editingService && (
        <div className="adm-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setEditingService(null)}>
          <div className="adm-modal">
            <form onSubmit={handleModalSubmit}>
              <div className="adm-modal-header">
                <div className="adm-modal-icon warning">
                  <i className="bi bi-grid-3x3-gap"></i>
                </div>
                <div>
                  <h3>{editingService.isNew ? 'Add Service' : 'Edit Service'}</h3>
                  <p>Define service title, description, and icon class.</p>
                </div>
              </div>

              <div className="adm-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <FormField label="Service Title" required id="serv-title-input">
                  <Input
                    id="serv-title-input"
                    value={serviceForm.title}
                    onChange={e => setServiceForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Web Development"
                    autoFocus
                  />
                </FormField>

                <FormField label="Bootstrap Icon Class" id="serv-icon-input">
                  <Input
                    id="serv-icon-input"
                    value={serviceForm.icon}
                    onChange={e => setServiceForm(p => ({ ...p, icon: e.target.value }))}
                    placeholder="e.g. bi-briefcase, bi-code-slash"
                  />
                </FormField>

                <FormField label="Description" id="serv-desc-input">
                  <Textarea
                    id="serv-desc-input"
                    rows={3}
                    value={serviceForm.description}
                    onChange={e => setServiceForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Short description of this service offering..."
                  />
                </FormField>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary"
                  onClick={() => setEditingService(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn adm-btn-primary">
                  {editingService.isNew ? 'Create Service' : 'Update Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Service?"
        itemName={deleteTarget?.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
