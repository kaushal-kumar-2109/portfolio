import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'
import { checkAdminAuths } from '../api/handlers/adminHandler'
import { INFO, SUCCESS } from '../../utils/toastNotify'

export default function AdminLayout({ title }) {

  const Navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const CheckAdminAuth = async () => {
    const response = await checkAdminAuths();
    if (response.status != 200) {
      INFO("Session Expired , Please Login Again");
      Navigate("/admin/login", { replace: true });
    }

    SUCCESS("Welcome Back!");

  }

  useEffect(() => {
    const ADMIN_BG = '#0a0a12';
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;

    document.body.classList.add('admin-body');
    document.body.style.backgroundColor = ADMIN_BG;
    document.body.style.background = ADMIN_BG;
    document.documentElement.style.backgroundColor = ADMIN_BG;
    document.documentElement.style.background = ADMIN_BG;

    CheckAdminAuth();

    return () => {
      document.body.classList.remove('admin-body');
      document.body.style.backgroundColor = prevBodyBg;
      document.body.style.background = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
      document.documentElement.style.background = prevHtmlBg;
    };
  }, []);


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
