import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { useToast } from '../context/ToastContext'
import { PageHeader, SaveBar } from '../components/Badge'
import { FormField, Input, Select } from '../components/FormField'
import ConfirmDialog from '../components/ConfirmDialog'
import Toggle from '../components/Toggle'
import { generateId } from '../data/defaultContent'

const categories = [
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Database', label: 'Database' },
  { value: 'Design', label: 'Design' },
  { value: 'CMS', label: 'CMS' },
  { value: 'Other', label: 'Other' },
]

export default function SkillsEditor() {
  const { content, updateSection } = useContent()
  const { success, error } = useToast()

  const [skills, setSkills] = useState(() => content.skills || [])
  const [dirty, setDirty] = useState(false)
  const [loading, setLoading] = useState(false)

  // Add / Edit Modal state
  const [editingSkill, setEditingSkill] = useState(null) // null = closed, {} = new or existing
  const [skillForm, setSkillForm] = useState({
    name: '',
    percentage: 80,
    category: 'Frontend',
    visible: true,
  })

  // Delete Confirm Dialog state
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAddModal = () => {
    setSkillForm({
      name: '',
      percentage: 85,
      category: 'Frontend',
      visible: true,
    })
    setEditingSkill({ isNew: true })
  }

  const openEditModal = (skill) => {
    setSkillForm({ ...skill })
    setEditingSkill(skill)
  }

  const handleModalSave = (e) => {
    e.preventDefault()
    if (!skillForm.name.trim()) return

    if (editingSkill.isNew) {
      const newSkill = {
        ...skillForm,
        id: generateId(),
        order: skills.length + 1,
      }
      setSkills(prev => [...prev, newSkill])
    } else {
      setSkills(prev =>
        prev.map(s => (s.id === editingSkill.id ? { ...s, ...skillForm } : s))
      )
    }

    setDirty(true)
    setEditingSkill(null)
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    setSkills(prev => prev.filter(s => s.id !== deleteTarget.id))
    setDirty(true)
    setDeleteTarget(null)
    success('Deleted', `Skill "${deleteTarget.name}" removed. Remember to save changes!`)
  }

  const handleToggle = (id, checked) => {
    setSkills(prev =>
      prev.map(s => (s.id === id ? { ...s, visible: checked } : s))
    )
    setDirty(true)
  }

  const handleSave = () => {
    setLoading(true)
    try {
      const ok = updateSection('skills', skills)
      if (ok) {
        success('Saved', 'Skills updated successfully!')
        setDirty(false)
      } else {
        error('Error', 'Failed to save skills.')
      }
    } catch {
      error('Error', 'Could not save skills.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Manage Skills"
        description="Add, edit, reorder, and adjust percentage proficiency bars for technical skills."
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAddModal}>
            <i className="bi bi-plus-lg"></i> Add New Skill
          </button>
        }
      />

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Skills List ({skills.length})</h3>
          <span style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>
            Drag or edit proficiency percentages
          </span>
        </div>

        <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {skills.map((skill) => (
            <div key={skill.id} className="adm-skill-row">
              <div className="adm-skill-row-name">
                <div>{skill.name}</div>
                <span style={{ fontSize: '11px', color: 'var(--adm-text-dim)' }}>
                  {skill.category}
                </span>
              </div>

              <div className="adm-skill-bar-wrap">
                <div
                  className="adm-skill-bar"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>

              <div className="adm-skill-row-pct">{skill.percentage}%</div>

              <Toggle
                checked={skill.visible !== false}
                onChange={(val) => handleToggle(skill.id, val)}
                id={`skill-toggle-${skill.id}`}
              />

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  className="adm-btn-icon"
                  onClick={() => openEditModal(skill)}
                  title="Edit Skill"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="adm-btn-icon danger"
                  onClick={() => setDeleteTarget(skill)}
                  title="Delete Skill"
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--adm-text-muted)' }}>
              No skills added yet. Click "+ Add New Skill" above.
            </div>
          )}
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingSkill && (
        <div className="adm-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setEditingSkill(null)}>
          <div className="adm-modal">
            <form onSubmit={handleModalSave}>
              <div className="adm-modal-header">
                <div className="adm-modal-icon warning">
                  <i className="bi bi-bar-chart-line"></i>
                </div>
                <div>
                  <h3>{editingSkill.isNew ? 'Add New Skill' : 'Edit Skill'}</h3>
                  <p>Configure skill title, proficiency percentage, and category tag.</p>
                </div>
              </div>

              <div className="adm-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormField label="Skill Name" required id="skill-name-input">
                  <Input
                    id="skill-name-input"
                    value={skillForm.name}
                    onChange={e => setSkillForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. React.js"
                    autoFocus
                  />
                </FormField>

                <FormField label={`Proficiency: ${skillForm.percentage}%`} id="skill-pct-input">
                  <input
                    id="skill-pct-input"
                    type="range"
                    min="1"
                    max="100"
                    className="adm-range"
                    value={skillForm.percentage}
                    onChange={e => setSkillForm(p => ({ ...p, percentage: Number(e.target.value) }))}
                  />
                </FormField>

                <FormField label="Category" id="skill-cat-input">
                  <Select
                    id="skill-cat-input"
                    options={categories}
                    value={skillForm.category}
                    onChange={e => setSkillForm(p => ({ ...p, category: e.target.value }))}
                  />
                </FormField>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary"
                  onClick={() => setEditingSkill(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn adm-btn-primary">
                  {editingSkill.isNew ? 'Add Skill' : 'Update Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Skill?"
        itemName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <SaveBar onSave={handleSave} loading={loading} dirty={dirty} />
    </div>
  )
}
