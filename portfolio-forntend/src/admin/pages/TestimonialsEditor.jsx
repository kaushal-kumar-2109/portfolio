import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea } from '../components/FormField'
import ImageUploader from '../components/ImageUploader'
import ConfirmDialog from '../components/ConfirmDialog'
import Toggle from '../components/Toggle'
import { generateId } from '../data/defaultContent'

export default function TestimonialsEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [testimonials, setTestimonials] = useState(() => content.testimonials || [])
  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({
    name: '',
    position: '',
    company: '',
    message: '',
    image: '/assets/img/testimonials/testimonials-1.jpg',
    rating: 5,
    visible: true,
  })

  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAdd = () => {
    setForm({
      name: '',
      position: '',
      company: '',
      message: '',
      image: '/assets/img/testimonials/testimonials-1.jpg',
      rating: 5,
      visible: true,
    })
    setEditingItem({ isNew: true })
  }

  const openEdit = (item) => {
    setForm({ ...item })
    setEditingItem(item)
  }

  const handleModalSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return

    if (editingItem.isNew) {
      const newItem = {
        ...form,
        id: generateId(),
        order: testimonials.length + 1,
      }
      setTestimonials(prev => [...prev, newItem])
    } else {
      setTestimonials(prev =>
        prev.map(t => (t.id === editingItem.id ? { ...t, ...form } : t))
      )
    }

    setDirty(true)
    setEditingItem(null)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    setTestimonials(prev => prev.filter(t => t.id !== deleteTarget.id))
    setDirty(true)
    setDeleteTarget(null)
    success('Deleted', `Testimonial from "${deleteTarget.name}" removed.`)
  }

  const handleToggle = (id, checked) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, visible: checked } : t))
    )
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('testimonials', testimonials)
      if (ok) {
        success('Saved', 'Testimonials updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save testimonials.')
      }
    } catch {
      error('Error', 'Could not save testimonials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Manage Testimonials"
        description="Add, edit, remove, or toggle client reviews and feedback."
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>
            <i className="bi bi-plus-lg"></i> Add Testimonial
          </button>
        }
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Client Testimonials ({testimonials.length})</h3>
        </div>
        <div className="adm-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {testimonials.map(item => (
            <div
              key={item.id}
              style={{
                background: 'var(--adm-surface-2)',
                border: '1px solid var(--adm-border)',
                borderRadius: 'var(--adm-radius)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image || '/assets/img/testimonials/testimonials-1.jpg'}
                    alt={item.name}
                    style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--adm-text)', margin: 0 }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>
                      {item.position} {item.company ? `· ${item.company}` : ''}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Toggle
                    checked={item.visible !== false}
                    onChange={(val) => handleToggle(item.id, val)}
                    id={`testi-toggle-${item.id}`}
                  />
                  <button
                    className="adm-btn-icon"
                    onClick={() => openEdit(item)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="adm-btn-icon danger"
                    onClick={() => setDeleteTarget(item)}
                    title="Delete"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--adm-text-muted)', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
                "{item.message}"
              </p>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--adm-text-muted)', gridColumn: '1 / -1' }}>
              No testimonials yet. Click "+ Add Testimonial" above.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {editingItem && (
        <div className="adm-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setEditingItem(null)}>
          <div className="adm-modal">
            <form onSubmit={handleModalSubmit}>
              <div className="adm-modal-header">
                <div className="adm-modal-icon warning">
                  <i className="bi bi-chat-quote"></i>
                </div>
                <div>
                  <h3>{editingItem.isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
                  <p>Client quote, name, company, and avatar.</p>
                </div>
              </div>

              <div className="adm-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <FormField label="Client Full Name" required id="testi-name-input">
                  <Input
                    id="testi-name-input"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Saul Goodman"
                    autoFocus
                  />
                </FormField>

                <div className="adm-form-grid">
                  <FormField label="Position / Role" id="testi-pos-input">
                    <Input
                      id="testi-pos-input"
                      value={form.position}
                      onChange={e => setForm(p => ({ ...p, position: e.target.value }))}
                      placeholder="e.g. CEO & Founder"
                    />
                  </FormField>
                  <FormField label="Company" id="testi-comp-input">
                    <Input
                      id="testi-comp-input"
                      value={form.company}
                      onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                      placeholder="e.g. Acme Corp"
                    />
                  </FormField>
                </div>

                <FormField label="Review / Quote Message" required id="testi-msg-input">
                  <Textarea
                    id="testi-msg-input"
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="What the client said..."
                  />
                </FormField>

                <div>
                  <label className="adm-label" style={{ marginBottom: '8px', display: 'block' }}>
                    Client Avatar Image
                  </label>
                  <ImageUploader
                    value={form.image}
                    onChange={val => setForm(p => ({ ...p, image: val }))}
                    label="Client Avatar"
                  />
                </div>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn adm-btn-primary">
                  {editingItem.isNew ? 'Add Testimonial' : 'Update Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Testimonial?"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
