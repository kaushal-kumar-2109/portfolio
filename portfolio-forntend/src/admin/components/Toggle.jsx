// Toggle.jsx — Accessible on/off switch
export default function Toggle({ checked, onChange, label, id }) {
  const toggleId = id || `toggle-${Math.random().toString(36).slice(2)}`
  return (
    <label className="adm-toggle-wrap" htmlFor={toggleId}>
      <span className="adm-toggle">
        <input
          id={toggleId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          role="switch"
          aria-checked={checked}
        />
        <span className="adm-toggle-slider"></span>
      </span>
      {label && <span className="adm-toggle-label">{label}</span>}
    </label>
  )
}
