import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input } from '../components/FormField'

export default function FooterEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [form, setForm] = useState(() => ({
    copyright: content.footer?.copyright || `© ${new Date().getFullYear()} Alex Smith`,
    creditsText: content.footer?.creditsText || 'Designed by BootstrapMade',
    creditsLink: content.footer?.creditsLink || 'https://bootstrapmade.com/',
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
      const ok = updateSection('footer', form)
      if (ok) {
        success('Saved', 'Footer details updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save footer.')
      }
    } catch {
      error('Error', 'Could not save footer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Edit Footer Section"
        description="Update copyright notice and footer credit links."
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Footer Information</h3>
        </div>
        <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormField label="Copyright Text" id="footer-copy">
            <Input
              id="footer-copy"
              value={form.copyright}
              onChange={e => handleChange('copyright', e.target.value)}
              placeholder={`© ${new Date().getFullYear()} Alex Smith`}
            />
          </FormField>

          <div className="adm-form-grid">
            <FormField label="Credits Text" id="footer-credit-text">
              <Input
                id="footer-credit-text"
                value={form.creditsText}
                onChange={e => handleChange('creditsText', e.target.value)}
              />
            </FormField>

            <FormField label="Credits Link URL" id="footer-credit-link">
              <Input
                id="footer-credit-link"
                value={form.creditsLink}
                onChange={e => handleChange('creditsLink', e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
