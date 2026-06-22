import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'

const DashboardTopBar = ({ role }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Signed out of Credence Edge')
    navigate('/')
  }

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e1ecf8', padding: '0 32px', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <NavLink to="/" style={{ fontSize: 13, color: '#4a6080', textDecoration: 'none' }}>← Back to site</NavLink>
        <span style={{ color: '#c3d8f0' }}>|</span>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#7a9ec0' }}>
          Credence Edge · {role} Portal
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13.5, color: '#4a6080', fontWeight: 500 }}>{user?.name}</span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg,#0f3460,#0d7a52)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 13, overflow: 'hidden',
        }}>
          {user?.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (user?.name?.charAt(0) || 'U')}
        </div>
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  )
}

const DashboardLayout = ({ role = 'student' }) => (
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
    <Sidebar role={role} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <DashboardTopBar role={role} />
      <main className="dashboard-main" style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  </div>
)

export default DashboardLayout
