// Badge.jsx — Status badges
const variants = {
  published: { cls: 'adm-badge-success', icon: 'bi-check-circle', label: 'Published' },
  draft:     { cls: 'adm-badge-warning', icon: 'bi-pencil',        label: 'Draft' },
  archived:  { cls: 'adm-badge-muted',   icon: 'bi-archive',       label: 'Archived' },
  active:    { cls: 'adm-badge-success', icon: 'bi-circle-fill',   label: 'Active' },
  hidden:    { cls: 'adm-badge-muted',   icon: 'bi-eye-slash',     label: 'Hidden' },
  success:   { cls: 'adm-badge-success', icon: 'bi-check-circle',  label: 'Success' },
  danger:    { cls: 'adm-badge-danger',  icon: 'bi-x-circle',      label: 'Error' },
  warning:   { cls: 'adm-badge-warning', icon: 'bi-exclamation-triangle', label: 'Warning' },
  info:      { cls: 'adm-badge-info',    icon: 'bi-info-circle',   label: 'Info' },
}

export default function Badge({ type = 'info', label, icon }) {
  const v = variants[type] || variants.info
  return (
    <span className={`adm-badge ${v.cls}`}>
      <i className={`bi ${icon || v.icon}`}></i>
      {label ?? v.label}
    </span>
  )
}

// Empty state component
export function EmptyState({ icon = 'bi-inbox', title, message, action }) {
  return (
    <div className="adm-empty">
      <i className={`bi ${icon} adm-empty-icon`}></i>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action && action}
    </div>
  )
}

// PageHeader component
export function PageHeader({ title, description, actions }) {
  return (
    <div className="adm-page-header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="adm-flex">{actions}</div>}
    </div>
  )
}

// Section save bar (sticky bottom bar for editors)
export function SaveBar({ onSave, loading, dirty }) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: 'var(--adm-surface)',
        borderTop: '1px solid var(--adm-border)',
        padding: '14px 0 0',
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '10px',
      }}
    >
      {dirty && (
        <span style={{ fontSize: '12px', color: 'var(--adm-text-dim)' }}>
          <i className="bi bi-dot"></i> Unsaved changes
        </span>
      )}
      <button className="adm-btn adm-btn-primary" onClick={onSave} disabled={loading}>
        {loading ? (
          <><span className="spinner"></span> Saving…</>
        ) : (
          <><i className="bi bi-check2"></i> Save Changes</>
        )}
      </button>
    </div>
  )
}
