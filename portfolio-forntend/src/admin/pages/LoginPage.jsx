import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/admin.css'
import { handleAdminLogin } from '../api/handlers/adminHandler'
import { ERROR, INFO, SUCCESS } from '../../utils/toastNotify';

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    const ADMIN_BG = '#0a0a12';
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;

    document.body.classList.add('admin-body');
    document.body.style.backgroundColor = ADMIN_BG;
    document.body.style.background = ADMIN_BG;
    document.documentElement.style.backgroundColor = ADMIN_BG;
    document.documentElement.style.background = ADMIN_BG;

    return () => {
      document.body.classList.remove('admin-body');
      document.body.style.backgroundColor = prevBodyBg;
      document.body.style.background = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
      document.documentElement.style.background = prevHtmlBg;
    };
  }, []);

  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [success, setSuccess] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />

  const validate = () => {
    const e = {}
    if (!form.username.trim()) e.username = 'Username is required'
    if (!form.password) e.password = 'Password is required'
    if (form.password && form.password.length < 4) e.password = 'Password too short'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)

    if (!validate()) return

    const result = await handleAdminLogin({ username: form.username.trim(), password: form.password });

    if (result.status != 200) {
      if (result.status == 500) {
        ERROR(result.message);
      } else {
        INFO(result.message);
        return;
      }
      setApiError(result.message)
      setTimeout(() => setApiError(null), 2000);
    } else {
      SUCCESS(result.message);
      setTimeout(() => navigate('/admin/dashboard'), 600);
    }
  }

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
    if (apiError) setApiError(null)
  }

  return (
    <div className="admin-root">
      <div className="adm-login-page">
        {/* Background */}
        <div className="adm-login-bg" aria-hidden="true"></div>
        <div className="adm-login-overlay" aria-hidden="true"></div>

        {/* Login Card */}
        <div className="adm-login-card" role="main">
          {/* Brand */}
          <div className="adm-login-brand">
            <div className="brand-icon">
              <i className="bi bi-briefcase-fill"></i>
            </div>
            <h1>iPortfolio</h1>
            <p>Admin Panel</p>
            <p className="brand-tagline">Sign in to continue</p>
          </div>

          {/* Error / Success alerts */}
          {apiError && (
            <div className="adm-login-alert" role="alert">
              <i className="bi bi-exclamation-circle-fill"></i>
              {apiError}
            </div>
          )}

          {success && (
            <div className="adm-login-success" role="status">
              <i className="bi bi-check-circle-fill"></i>
              Login successful! Redirecting…
            </div>
          )}

          {/* Form */}
          <form className="adm-login-form" onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="adm-form-group">
              <label htmlFor="login-username" className="adm-label">
                Username <span className="required">*</span>
              </label>
              <div className="adm-input-wrapper">
                <input
                  id="login-username"
                  type="text"
                  className={`adm-input${errors.username ? ' error' : ''}`}
                  placeholder="Enter username"
                  value={form.username}
                  onChange={handleChange('username')}
                  autoComplete="username"
                  autoFocus
                  disabled={loading || success}
                  aria-describedby={errors.username ? 'username-err' : undefined}
                />
              </div>
              {errors.username && (
                <p id="username-err" className="adm-field-error" role="alert">
                  <i className="bi bi-exclamation-circle"></i> {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="adm-form-group">
              <label htmlFor="login-password" className="adm-label">
                Password <span className="required">*</span>
              </label>
              <div className="adm-input-wrapper">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className={`adm-input${errors.password ? ' error' : ''}`}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="current-password"
                  disabled={loading || success}
                  aria-describedby={errors.password ? 'pass-err' : undefined}
                />
                <button
                  type="button"
                  className="adm-input-icon-right"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {errors.password && (
                <p id="pass-err" className="adm-field-error" role="alert">
                  <i className="bi bi-exclamation-circle"></i> {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="adm-btn adm-btn-primary adm-btn-full"
              disabled={loading || success}
            >
              {loading ? (
                <><span className="spinner"></span> Signing in…</>
              ) : (
                <><i className="bi bi-box-arrow-in-right"></i> Sign In</>
              )}
            </button>
          </form>

          {/* Footer hint */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '11.5px', color: 'var(--adm-text-dim)' }}>
            Default credentials are set in <code style={{ color: 'var(--adm-primary-light)', background: 'var(--adm-surface-2)', padding: '1px 5px', borderRadius: '4px' }}>.env.local</code>
          </p>
        </div>
      </div>
    </div>
  )
}
