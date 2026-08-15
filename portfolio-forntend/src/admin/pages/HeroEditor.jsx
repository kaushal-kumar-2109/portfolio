import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea } from '../components/FormField'
import ImageUploader from '../components/ImageUploader'

export default function HeroEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [form, setForm] = useState(() => ({
    greeting: content.hero?.greeting || "Hello, I'm",
    name: content.hero?.name || 'Alex Smith',
    typedStringRaw: (content.hero?.typedStrings || ['UI/UX Designer', 'Web Developer', 'Freelancer']).join(', '),
    description: content.hero?.description || '',
    profileImage: content.hero?.profileImage || '/assets/img/my-profile-img.jpg',
    heroBg: content.hero?.heroBg || '/assets/img/hero-bg.jpg',
    btn1Text: content.hero?.btn1Text || 'Download CV',
    btn1Link: content.hero?.btn1Link || '/assets/cv.pdf',
    btn2Text: content.hero?.btn2Text || 'Contact Me',
    btn2Link: content.hero?.btn2Link || '#contact',
    socialLinks: {
      twitter: content.hero?.socialLinks?.twitter || '',
      facebook: content.hero?.socialLinks?.facebook || '',
      instagram: content.hero?.socialLinks?.instagram || '',
      linkedin: content.hero?.socialLinks?.linkedin || '',
      github: content.hero?.socialLinks?.github || '',
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
      const typedStrings = form.typedStringRaw
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)

      const payload = {
        ...form,
        typedStrings,
      }
      delete payload.typedStringRaw

      const ok = updateSection('hero', payload)
      if (ok) {
        success('Saved', 'Hero section updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save Hero section.')
      }
    } catch {
      error('Error', 'Could not save Hero section.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Edit Hero Section"
        description="Update your name, animated typing titles, description, images, buttons, and social links."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left: Text Info */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Hero Content</h3>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="adm-form-grid">
              <FormField label="Greeting" id="hero-greeting">
                <Input
                  id="hero-greeting"
                  value={form.greeting}
                  onChange={e => handleChange('greeting', e.target.value)}
                  placeholder="e.g. Hello, I'm"
                />
              </FormField>

              <FormField label="Full Name" required id="hero-name">
                <Input
                  id="hero-name"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="e.g. Alex Smith"
                />
              </FormField>
            </div>

            <FormField
              label="Typing Titles (comma separated)"
              hint="List the roles or skills to cycle through with Typed.js (e.g. Designer, Developer, Freelancer)"
              id="hero-typed"
            >
              <Input
                id="hero-typed"
                value={form.typedStringRaw}
                onChange={e => handleChange('typedStringRaw', e.target.value)}
                placeholder="Developer, Designer, Freelancer"
              />
            </FormField>

            <FormField label="Short Description / Bio" id="hero-desc">
              <Textarea
                id="hero-desc"
                rows={3}
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Brief summary shown in the hero..."
              />
            </FormField>

            <h4 style={{ fontSize: '13px', color: 'var(--adm-text-muted)', marginTop: '8px' }}>Action Buttons</h4>
            <div className="adm-form-grid">
              <FormField label="Primary Button Text" id="hero-b1-t">
                <Input
                  id="hero-b1-t"
                  value={form.btn1Text}
                  onChange={e => handleChange('btn1Text', e.target.value)}
                />
              </FormField>
              <FormField label="Primary Button Link" id="hero-b1-l">
                <Input
                  id="hero-b1-l"
                  value={form.btn1Link}
                  onChange={e => handleChange('btn1Link', e.target.value)}
                />
              </FormField>
              <FormField label="Secondary Button Text" id="hero-b2-t">
                <Input
                  id="hero-b2-t"
                  value={form.btn2Text}
                  onChange={e => handleChange('btn2Text', e.target.value)}
                />
              </FormField>
              <FormField label="Secondary Button Link" id="hero-b2-l">
                <Input
                  id="hero-b2-l"
                  value={form.btn2Link}
                  onChange={e => handleChange('btn2Link', e.target.value)}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Right: Images & Social Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Profile & Background Images */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>Hero Images</h3>
            </div>
            <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="adm-label" style={{ marginBottom: '8px', display: 'block' }}>
                  Profile Image
                </label>
                <ImageUploader
                  value={form.profileImage}
                  onChange={val => handleChange('profileImage', val)}
                  label="Profile Image"
                />
              </div>

              <div style={{ borderTop: '1px solid var(--adm-border)', paddingTop: '16px' }}>
                <label className="adm-label" style={{ marginBottom: '8px', display: 'block' }}>
                  Hero Background Image
                </label>
                <ImageUploader
                  value={form.heroBg}
                  onChange={val => handleChange('heroBg', val)}
                  label="Hero Background"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>Social Links</h3>
            </div>
            <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['twitter', 'facebook', 'instagram', 'linkedin', 'github'].map(net => (
                <FormField key={net} label={net.toUpperCase()} id={`social-${net}`}>
                  <Input
                    id={`social-${net}`}
                    value={form.socialLinks[net] || ''}
                    onChange={e => handleSocialChange(net, e.target.value)}
                    placeholder={`https://${net}.com/yourusername`}
                  />
                </FormField>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
