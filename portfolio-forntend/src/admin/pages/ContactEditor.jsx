import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input } from '../components/FormField'

export default function ContactEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [form, setForm] = useState(() => ({
    address: content.contact?.address || 'A108 Adam Street, New York, NY 535022',
    phone: content.contact?.phone || '+1 5589 55488 55',
    email: content.contact?.email || 'info@example.com',
    mapUrl: content.contact?.mapUrl || '',
  }))

  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('contact', form)
      if (ok) {
        success('Saved', 'Contact details updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save contact details.')
      }
    } catch {
      error('Error', 'Could not save contact details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Edit Contact Section"
        description="Update physical address, phone number, primary inquiry email, and Google Maps embed URL."
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Contact Details</h3>
        </div>
        <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="adm-form-grid">
            <FormField label="Email Address" id="contact-email">
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
              />
            </FormField>

            <FormField label="Phone Number" id="contact-phone">
              <Input
                id="contact-phone"
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Physical Address" id="contact-address">
            <Input
              id="contact-address"
              value={form.address}
              onChange={e => handleChange('address', e.target.value)}
            />
          </FormField>

          <FormField
            label="Google Maps Embed URL"
            hint="Paste the iframe src URL from Google Maps (Share -> Embed a map)"
            id="contact-map"
          >
            <Input
              id="contact-map"
              value={form.mapUrl}
              onChange={e => handleChange('mapUrl', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </FormField>

          {form.mapUrl && (
            <div>
              <label className="adm-label" style={{ marginBottom: '8px', display: 'block' }}>
                Map Preview
              </label>
              <div style={{ borderRadius: 'var(--adm-radius)', overflow: 'hidden', border: '1px solid var(--adm-border)', height: '220px' }}>
                <iframe
                  src={form.mapUrl}
                  style={{ width: '100%', height: '100%', border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps Preview"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
