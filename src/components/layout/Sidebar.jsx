import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Logo from './Logo'
import toast from 'react-hot-toast'
import { LayoutDashboard, FolderOpen, Upload, Award, FileText, User, LogOut, Plus, Users, CheckSquare, Building2 } from 'lucide-react'

const STUDENT_LINKS = [
  { to: '/student-dashboard',              label: 'Overview',     icon: LayoutDashboard, end: true },
  { to: '/student-dashboard/projects',     label: 'My Projects',  icon: FolderOpen },
  { to: '/student-dashboard/submissions',  label: 'Submissions',  icon: Upload },
  { to: '/student-dashboard/certificates', label: 'Certificates', icon: FileText },
  { to: '/student-dashboard/profile',      label: 'Profile',      icon: User },
]

const COMPANY_LINKS = [
  { to: '/company',              label: 'Overview',        icon: LayoutDashboard, end: true },
  { to: '/company/projects',     label: 'My Projects',     icon: FolderOpen },
  { to: '/company/projects/add', label: 'Add Project',     icon: Plus },
  { to: '/company/profile',      label: 'Company Profile', icon: Building2 },
]

const ADMIN_LINKS = [
  { to: '/admin',              label: 'Dashboard',          icon: LayoutDashboard, end: true },
  { to: '/admin/projects',     label: 'Manage Projects',    icon: FolderOpen },
  { to: '/admin/users',        label: 'Manage Users',       icon: Users },
  { to: '/admin/submissions',  label: 'Review Submissions', icon: CheckSquare },
  { to: '/admin/ratings',      label: 'Ratings Manager',    icon: Award },
  { to: '/admin/certificates', label: 'Certificates',       icon: FileText },
  { to: '/admin/companies',    label: 'Approve Companies',  icon: Building2 },
]

const Sidebar = ({ role = 'student' }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = role === 'admin' ? ADMIN_LINKS : role === 'company' ? COMPANY_LINKS : STUDENT_LINKS

  const handleLogout = () => {
    logout()
    toast.success('Signed out of Credify')
    navigate('/')
  }

  return (
    <aside className="dashboard-sidebar">
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid #e1ecf8' }}>
        <Logo size={28} />
      </div>
      <div className="dashboard-sidebar-user">
        <div className="dashboard-sidebar-avatar">
          {user?.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (user?.name?.charAt(0) || 'U')}
        </div>
        <div className="dashboard-sidebar-name">{user?.name || 'User'}</div>
        <div className="dashboard-sidebar-sub">
          {role === 'admin' ? 'Administrator' : role === 'company' ? (user?.companyName || 'Company') : (user?.university || 'Student')}
        </div>
        <span className="pill pill-blue" style={{ fontSize: 10, padding: '2px 8px', textTransform: 'capitalize' }}>{role}</span>
      </div>
      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <Icon size={15} />{label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 10px', borderTop: '1px solid #e1ecf8' }}>
        <button className="sidebar-link" style={{ color: '#991b1b' }} onClick={handleLogout}>
          <LogOut size={15} />Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
