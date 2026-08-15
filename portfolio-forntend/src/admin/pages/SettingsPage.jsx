import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea } from '../components/FormField'

export default function SettingsPage() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [form, setForm] = useState(() => ({
    siteTitle: content.settings?.siteTitle || 'Alex Smith — Portfolio',
    metaDescription: content.settings?.metaDescription || 'Personal portfolio of Alex Smith, UI/UX Designer and Web Developer.',
    email: content.settings?.email || 'info@example.com',
    phone: content.settings?.phone || '+1 5589 55488 55',
    address: content.settings?.address || 'A108 Adam Street, New York, NY 535022',
    website: content.settings?.website || 'www.example.com',
    socialLinks: {
      twitter: content.settings?.socialLinks?.twitter || '',
      facebook: content.settings?.socialLinks?.facebook || '',
      instagram: content.settings?.socialLinks?.instagram || '',
      linkedin: content.settings?.socialLinks?.linkedin || '',
      github: content.settings?.socialLinks?.github || '',
    },
  }))

  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    setDirty(true)
  }

  const handleSocialChange = (key, val) => {
    setForm(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: val },
    }))
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('settings', form)
      if (ok) {
        success('Saved', 'Global settings updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save settings.')
      }
    } catch {
      error('Error', 'An error occurred while saving.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Website Settings"
        description="Configure website meta information, SEO defaults, and global contact credentials."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* SEO & Meta */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>SEO &amp; General Configuration</h3>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormField label="Website Title (Browser Tab)" required id="set-title">
              <Input
                id="set-title"
                value={form.siteTitle}
                onChange={e => handleChange('siteTitle', e.target.value)}
                placeholder="e.g. Alex Smith — Portfolio"
              />
            </FormField>

            <FormField label="Meta Description (Search Engines)" id="set-meta">
              <Textarea
                id="set-meta"
                rows={3}
                value={form.metaDescription}
                onChange={e => handleChange('metaDescription', e.target.value)}
                placeholder="Brief summary of portfolio for search results..."
              />
            </FormField>

            <FormField label="Main Domain URL" id="set-web">
              <Input
                id="set-web"
                value={form.website}
                onChange={e => handleChange('website', e.target.value)}
                placeholder="https://example.com"
              />
            </FormField>
          </div>
        </div>

        {/* Global Social Channels */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Default Social Channels</h3>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['twitter', 'facebook', 'instagram', 'linkedin', 'github'].map(net => (
              <FormField key={net} label={net.toUpperCase()} id={`set-social-${net}`}>
                <Input
                  id={`set-social-${net}`}
                  value={form.socialLinks[net] || ''}
                  onChange={e => handleSocialChange(net, e.target.value)}
                  placeholder={`https://${net}.com/username`}
                />
              </FormField>
            ))}
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
