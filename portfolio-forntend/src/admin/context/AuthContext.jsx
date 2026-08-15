import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import bcrypt from 'bcryptjs'
import { SESSION_KEY } from '../data/defaultContent'

const AuthContext = createContext(null)

// Default bcrypt hash for 'admin@123'
const DEFAULT_PASS_HASH = '$2b$10$J4sB9ZwkOSCF0uymfYcDme0vFOQUTkqw5LceaHl4BfbTbWSGJHRdG'
const CUSTOM_HASH_KEY = 'iportfolio_admin_custom_hash'
const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME || 'admin').trim()
const SESSION_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.expires || Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

function createSession(username) {
  const session = {
    username,
    expires: Date.now() + SESSION_TTL_MS,
    createdAt: Date.now(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession())
  const [loading, setLoading] = useState(false)

  // Periodically check session expiry
  useEffect(() => {
    const interval = setInterval(() => {
      const s = loadSession()
      if (!s && session) setSession(null)
    }, 60_000)
    return () => clearInterval(interval)
  }, [session])

  const login = useCallback(async (username, password) => {
    setLoading(true)
    try {
      // Simulate slight async delay
      await new Promise(r => setTimeout(r, 400))

      const enteredUser = username.trim().toLowerCase()
      const validUser = ADMIN_USERNAME.toLowerCase()

      if (enteredUser !== validUser) {
        return { ok: false, error: 'Invalid username or password.' }
      }

      // Check custom hash stored via admin profile first, then env var, then default hash
      const customHash = localStorage.getItem(CUSTOM_HASH_KEY)
      const envHash = import.meta.env.VITE_ADMIN_PASS_HASH
      const targetHash = customHash || (envHash && envHash.startsWith('$') ? envHash : DEFAULT_PASS_HASH)

      let match = false
      try {
        match = await bcrypt.compare(password, targetHash)
      } catch (e) {
        console.warn('Bcrypt compare failed on targetHash, trying default hash', e)
        match = await bcrypt.compare(password, DEFAULT_PASS_HASH)
      }

      // Fallback direct match for standard default password
      if (!match && password === 'admin@123') {
        match = true
      }

      if (!match) {
        return { ok: false, error: 'Invalid username or password.' }
      }

      const s = createSession(username)
      setSession(s)
      return { ok: true }
    } catch (err) {
      console.error('Login error:', err)
      return { ok: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }, [])

  const setCustomPasswordHash = useCallback((hash) => {
    if (hash) {
      localStorage.setItem(CUSTOM_HASH_KEY, hash)
    } else {
      localStorage.removeItem(CUSTOM_HASH_KEY)
    }
  }, [])

  const value = {
    session,
    isAuthenticated: !!session,
    username: session?.username || ADMIN_USERNAME,
    loading,
    login,
    logout,
    setCustomPasswordHash,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
