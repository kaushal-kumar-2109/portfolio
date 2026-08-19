import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css'
import './styles/responsive.css'
import './admin/styles/admin.css'

import Home from './pages/Home'
import PortfolioDetails from './pages/PortfolioDetails'

import { AuthProvider } from './admin/context/AuthContext'
import { ToastProvider } from './admin/context/ToastContext'
import { ContentProvider } from './admin/context/ContentContext'

import AdminLayout from './admin/components/AdminLayout'
import LoginPage from './admin/pages/LoginPage'
import DashboardPage from './admin/pages/DashboardPage'
import SectionsPage from './admin/pages/SectionsPage'
import HeroEditor from './admin/pages/HeroEditor'
import AboutEditor from './admin/pages/AboutEditor'
import StatsEditor from './admin/pages/StatsEditor'
import SkillsEditor from './admin/pages/SkillsEditor'
import ResumeEditor from './admin/pages/ResumeEditor'
import ServicesEditor from './admin/pages/ServicesEditor'
import TestimonialsEditor from './admin/pages/TestimonialsEditor'
import ContactEditor from './admin/pages/ContactEditor'
import FooterEditor from './admin/pages/FooterEditor'
import ProjectsPage from './admin/pages/ProjectsPage'
import ProjectFormPage from './admin/pages/ProjectFormPage'
import MessagesPage from './admin/pages/MessagesPage'
import MediaPage from './admin/pages/MediaPage'
import SettingsPage from './admin/pages/SettingsPage'
import ProfilePage from './admin/pages/ProfilePage'

function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/portfolio-details" element={<PortfolioDetails />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Protected Admin CMS Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="sections" element={<SectionsPage />} />
              <Route path="sections/hero" element={<HeroEditor />} />
              <Route path="sections/about" element={<AboutEditor />} />
              <Route path="sections/stats" element={<StatsEditor />} />
              <Route path="sections/skills" element={<SkillsEditor />} />
              <Route path="sections/resume" element={<ResumeEditor />} />
              <Route path="sections/services" element={<ServicesEditor />} />
              <Route path="sections/testimonials" element={<TestimonialsEditor />} />
              <Route path="sections/contact" element={<ContactEditor />} />
              <Route path="sections/footer" element={<FooterEditor />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/new" element={<ProjectFormPage />} />
              <Route path="projects/:id/edit" element={<ProjectFormPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </ToastProvider>
      </AuthProvider>
    </ContentProvider>
  )
}

export default App
