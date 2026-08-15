// FormField.jsx — Labeled input/textarea/select with validation
export function FormField({ label, required, hint, error, children, id }) {
  return (
    <div className="adm-form-group">
      {label && (
        <label htmlFor={id} className="adm-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="adm-field-hint">{hint}</p>}
      {error && (
        <p className="adm-field-error" role="alert">
          <i className="bi bi-exclamation-circle"></i> {error}
        </p>
      )}
    </div>
  )
}

export function Input({ id, error, ...props }) {
  return (
    <input
      id={id}
      className={`adm-input${error ? ' error' : ''}`}
      {...props}
    />
  )
}

export function Textarea({ id, error, rows = 4, ...props }) {
  return (
    <textarea
      id={id}
      className={`adm-textarea${error ? ' error' : ''}`}
      rows={rows}
      {...props}
    />
  )
}

export function Select({ id, error, options = [], placeholder, ...props }) {
  return (
    <select id={id} className={`adm-select${error ? ' error' : ''}`} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
