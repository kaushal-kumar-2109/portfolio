import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { PageHeader } from '../components/Badge'
import { FormField, Input } from '../components/FormField'
import bcrypt from 'bcryptjs'

export default function ProfilePage() {
  const { username, setCustomPasswordHash } = useAuth()
  const { success, error, info } = useToast()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [generatedHash, setGeneratedHash] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerateHash = async (e) => {
    e.preventDefault()
    if (!newPassword || newPassword.length < 6) {
      error('Password Error', 'Password must be at least 6 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      error('Mismatch', 'Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const hash = await bcrypt.hash(newPassword, 10)
      setGeneratedHash(hash)
      setCustomPasswordHash(hash)
      success('Password Updated!', 'Your new admin password has been activated successfully!')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      error('Error', 'Failed to generate password hash.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyHash = () => {
    if (!generatedHash) return
    navigator.clipboard?.writeText(generatedHash)
    info('Copied', 'New password hash copied to clipboard!')
  }

  return (
    <div>
      <PageHeader
        title="Admin Profile &amp; Security"
        description="Manage administrator credentials and update your admin password."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Account Info */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Administrator Account</h3>
          </div>
          <div className="adm-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--adm-primary-glow)',
                  border: '2px solid var(--adm-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'var(--adm-primary-light)',
                }}
              >
                {username?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--adm-text)', margin: 0 }}>
                  {username || 'admin'}
                </h4>
                <span style={{ fontSize: '12px', color: 'var(--adm-success)' }}>
                  <i className="bi bi-shield-check"></i> Super Administrator
                </span>
              </div>
            </div>

            <div
              style={{
                background: 'var(--adm-surface-2)',
                padding: '14px 16px',
                borderRadius: 'var(--adm-radius-sm)',
                border: '1px solid var(--adm-border)',
                fontSize: '13px',
                color: 'var(--adm-text-muted)',
                lineHeight: 1.6,
              }}
            >
              <i className="bi bi-info-circle" style={{ color: 'var(--adm-primary-light)', marginRight: '6px' }}></i>
              You are currently logged in as the primary administrator.
            </div>
          </div>
        </div>

        {/* Change Password Tool */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Change Admin Password</h3>
          </div>
          <div className="adm-card-body">
            <form onSubmit={handleGenerateHash} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <FormField label="New Password" required id="prof-new-pass">
                <Input
                  id="prof-new-pass"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                />
              </FormField>

              <FormField label="Confirm New Password" required id="prof-conf-pass">
                <Input
                  id="prof-conf-pass"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                />
              </FormField>

              <button
                type="submit"
                className="adm-btn adm-btn-primary"
                disabled={loading}
                style={{ marginTop: '4px' }}
              >
                {loading ? <><span className="spinner"></span> Updating…</> : 'Update Password'}
              </button>
            </form>

            {generatedHash && (
              <div style={{ marginTop: '20px', borderTop: '1px solid var(--adm-border)', paddingTop: '16px' }}>
                <label className="adm-label" style={{ marginBottom: '6px', display: 'block' }}>
                  Generated Bcrypt Hash:
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    readOnly
                    value={generatedHash}
                    className="adm-input"
                    style={{ fontSize: '11.5px', fontFamily: 'monospace' }}
                  />
                  <button
                    type="button"
                    className="adm-btn adm-btn-secondary"
                    onClick={handleCopyHash}
                    title="Copy Hash"
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
