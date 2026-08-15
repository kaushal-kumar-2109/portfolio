import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input } from '../components/FormField'

export default function StatsEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [stats, setStats] = useState(() => {
    return content.stats && content.stats.length > 0
      ? content.stats
      : [
          { id: 's1', icon: 'bi-emoji-smile', value: 232, label: 'Happy Clients' },
          { id: 's2', icon: 'bi-journal-richtext', value: 521, label: 'Projects' },
          { id: 's3', icon: 'bi-headset', value: 1453, label: 'Hours of Support' },
          { id: 's4', icon: 'bi-people', value: 32, label: 'Hard Workers' },
        ]
  })

  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleStatChange = (idx, field, val) => {
    setStats(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: val }
      return copy
    })
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('stats', stats)
      if (ok) {
        success('Saved', 'Stats section updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save stats.')
      }
    } catch {
      error('Error', 'Could not save stats.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Edit Stats Section"
        description="Update numerical counter statistics, labels, and Bootstrap icon classes."
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Counter Stats Items</h3>
          <span style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>
            These numbers are animated with PureCounter on the public page
          </span>
        </div>
        <div className="adm-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              style={{
                background: 'var(--adm-surface-2)',
                border: '1px solid var(--adm-border)',
                borderRadius: 'var(--adm-radius)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--adm-primary-glow)',
                    color: 'var(--adm-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--adm-text)' }}>
                  Stat #{idx + 1}
                </h4>
              </div>

              <FormField label="Icon Class (Bootstrap Icons)" id={`stat-icon-${idx}`}>
                <Input
                  id={`stat-icon-${idx}`}
                  value={stat.icon}
                  onChange={e => handleStatChange(idx, 'icon', e.target.value)}
                  placeholder="e.g. bi-emoji-smile"
                />
              </FormField>

              <FormField label="Target Number" id={`stat-val-${idx}`}>
                <Input
                  id={`stat-val-${idx}`}
                  type="number"
                  value={stat.value}
                  onChange={e => handleStatChange(idx, 'value', Number(e.target.value))}
                  placeholder="e.g. 232"
                />
              </FormField>

              <FormField label="Label / Title" id={`stat-lbl-${idx}`}>
                <Input
                  id={`stat-lbl-${idx}`}
                  value={stat.label}
                  onChange={e => handleStatChange(idx, 'label', e.target.value)}
                  placeholder="e.g. Happy Clients"
                />
              </FormField>
            </div>
          ))}
        </div>
      </div>

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
