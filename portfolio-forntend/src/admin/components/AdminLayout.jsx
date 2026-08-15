import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout({ title }) {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return (
    <div className="admin-root">
      <div className="adm-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="adm-main">
          <AdminHeader
            title={title}
            onToggleSidebar={() => setSidebarOpen(prev => !prev)}
          />
          <div className="adm-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
