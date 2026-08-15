import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loadContent, saveContent, saveSection, DEFAULT_CONTENT } from '../data/defaultContent'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => loadContent())

  // Reload content whenever storage changes (e.g. from other tab)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'iportfolio_cms') {
        setContent(loadContent())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const updateSection = useCallback((sectionKey, data) => {
    const updated = saveSection(sectionKey, data)
    if (updated) {
      setContent(updated)
      return true
    }
    return false
  }, [])

  const updateFullContent = useCallback((updates) => {
    const updated = saveContent(updates)
    if (updated) {
      setContent(updated)
      return true
    }
    return false
  }, [])

  const resetToDefault = useCallback(() => {
    localStorage.removeItem('iportfolio_cms')
    setContent(DEFAULT_CONTENT)
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        updateFullContent,
        resetToDefault,
        refresh: () => setContent(loadContent()),
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within a ContentProvider')
  return ctx
}
