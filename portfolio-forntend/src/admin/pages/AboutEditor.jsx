import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Textarea } from '../components/FormField'
import ImageUploader from '../components/ImageUploader'

export default function AboutEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [form, setForm] = useState(() => ({
    title: content.about?.title || 'About',
    subtitle: content.about?.subtitle || 'UI/UX Designer & Web Developer.',
    description: content.about?.description || '',
    bioText: content.about?.bioText || '',
    profileImage: content.about?.profileImage || '/assets/img/my-profile-img.jpg',
    birthday: content.about?.birthday || '1 May 1995',
    website: content.about?.website || 'www.example.com',
    phone: content.about?.phone || '+123 456 7890',
    city: content.about?.city || 'New York, USA',
    age: content.about?.age || '30',
    degree: content.about?.degree || 'Master',
    email: content.about?.email || 'email@example.com',
    freelance: content.about?.freelance || 'Available',
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
      const ok = updateSection('about', form)
      if (ok) {
        success('Saved', 'About section updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save About section.')
      }
    } catch {
      error('Error', 'Could not save About section.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Edit About Section"
        description="Update personal bio, profile picture, and detail attributes shown on the About section."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Main Content Info */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>About Information</h3>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="adm-form-grid">
              <FormField label="Section Title" id="about-title">
                <Input
                  id="about-title"
                  value={form.title}
                  onChange={e => handleChange('title', e.target.value)}
                />
              </FormField>

              <FormField label="Subtitle / Tagline" id="about-subtitle">
                <Input
                  id="about-subtitle"
                  value={form.subtitle}
                  onChange={e => handleChange('subtitle', e.target.value)}
                />
              </FormField>
            </div>

            <FormField label="Main Description" id="about-desc">
              <Textarea
                id="about-desc"
                rows={4}
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
              />
            </FormField>

            <FormField label="Extended Bio / Bottom Paragraph" id="about-bio">
              <Textarea
                id="about-bio"
                rows={4}
                value={form.bioText}
                onChange={e => handleChange('bioText', e.target.value)}
              />
            </FormField>
          </div>
        </div>

        {/* Profile Image & Personal Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Profile Image */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>About Profile Image</h3>
            </div>
            <div className="adm-card-body">
              <ImageUploader
                value={form.profileImage}
                onChange={val => handleChange('profileImage', val)}
                label="About Profile Picture"
              />
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>Personal Attributes</h3>
            </div>
            <div className="adm-card-body">
              <div className="adm-form-grid">
                <FormField label="Birthday" id="about-bday">
                  <Input
                    id="about-bday"
                    value={form.birthday}
                    onChange={e => handleChange('birthday', e.target.value)}
                  />
                </FormField>
                <FormField label="Age" id="about-age">
                  <Input
                    id="about-age"
                    value={form.age}
                    onChange={e => handleChange('age', e.target.value)}
                  />
                </FormField>
                <FormField label="City / Location" id="about-city">
                  <Input
                    id="about-city"
                    value={form.city}
                    onChange={e => handleChange('city', e.target.value)}
                  />
                </FormField>
                <FormField label="Degree" id="about-degree">
                  <Input
                    id="about-degree"
                    value={form.degree}
                    onChange={e => handleChange('degree', e.target.value)}
                  />
                </FormField>
                <FormField label="Email" id="about-email">
                  <Input
                    id="about-email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                </FormField>
                <FormField label="Phone" id="about-phone">
                  <Input
                    id="about-phone"
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                </FormField>
                <FormField label="Website" id="about-website">
                  <Input
                    id="about-website"
                    value={form.website}
                    onChange={e => handleChange('website', e.target.value)}
                  />
                </FormField>
                <FormField label="Freelance Status" id="about-freelance">
                  <Input
                    id="about-freelance"
                    value={form.freelance}
                    onChange={e => handleChange('freelance', e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
