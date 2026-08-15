// ConfirmDialog.jsx — Reusable delete/confirm modal
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  itemName,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  variant = 'danger',  // 'danger' | 'warning'
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  const icon = variant === 'danger' ? 'bi-trash3' : 'bi-exclamation-triangle'

  return (
    <div
      className="adm-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onCancel?.()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="adm-modal">
        <div className="adm-modal-header">
          <div className={`adm-modal-icon ${variant}`}>
            <i className={`bi ${icon}`}></i>
          </div>
          <div>
            <h3 id="confirm-title">{title}</h3>
            <p>
              {message || (
                <>
                  Are you sure you want to delete{' '}
                  {itemName && <strong>"{itemName}"</strong>}
                  ? This action cannot be undone.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="adm-modal-footer" style={{ paddingTop: '20px' }}>
          <button className="adm-btn adm-btn-secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button
            className={`adm-btn adm-btn-${variant}`}
            onClick={onConfirm}
            disabled={loading}
            autoFocus
          >
            {loading ? <><span className="spinner"></span> Deleting…</> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
