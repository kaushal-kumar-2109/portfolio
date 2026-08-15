import { useRef, useState } from 'react'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE_MB = 5

export default function ImageUploader({
  value,            // current image URL (string)
  onChange,         // (dataUrl | null) => void
  label = 'Image',
  hint = 'JPG, PNG, WebP or GIF · Max 5MB',
  aspectRatio,      // e.g. '1:1', '16:9'
}) {
  const [dragover, setDragover] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const validate = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Please use JPG, PNG, WebP, GIF or SVG.')
      return false
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Max size is ${MAX_SIZE_MB}MB.`)
      return false
    }
    setError(null)
    return true
  }

  const readFile = (file) => {
    if (!validate(file)) return
    const reader = new FileReader()
    reader.onload = (e) => onChange(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragover(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) readFile(file)
    e.target.value = ''
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Preview */}
      {value && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div className="adm-img-preview" style={{ width: '100px', height: '100px' }}>
            <img src={value} alt="Preview" />
            <div className="adm-img-preview-actions">
              <button
                className="adm-btn-icon danger"
                onClick={() => onChange(null)}
                title="Remove image"
                type="button"
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--adm-text-muted)' }}>Current {label}</p>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              style={{ marginTop: '8px', fontSize: '12px', padding: '6px 12px', minHeight: '30px' }}
              onClick={() => inputRef.current?.click()}
            >
              <i className="bi bi-arrow-repeat"></i> Replace
            </button>
          </div>
        </div>
      )}

      {/* Dropzone */}
      {!value && (
        <div
          className={`adm-uploader${dragover ? ' dragover' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragover(true) }}
          onDragLeave={() => setDragover(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label={`Upload ${label}`}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            onChange={handleChange}
            aria-label={`Choose ${label} file`}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
          />
          <i className="bi bi-cloud-upload adm-uploader-icon"></i>
          <p>
            <span>Click to upload</span> or drag & drop
          </p>
          {hint && <p className="adm-uploader-hint">{hint}</p>}
        </div>
      )}

      {error && (
        <p className="adm-field-error">
          <i className="bi bi-exclamation-circle"></i> {error}
        </p>
      )}

      {/* Hidden file input (for replace button) */}
      {value && (
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleChange}
          style={{ display: 'none' }}
          aria-label={`Replace ${label} file`}
        />
      )}
    </div>
  )
}
