import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Logo from './Logo'
import toast from 'react-hot-toast'
import { Search, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/projects',    label: 'Projects'    },
  { to: '/courses',     label: 'Courses'     },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/about',       label: 'About'       },
]

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal]   = useState('')

  const handleLogout = () => {
    logout()
    toast.success('Signed out of Credence Edge')
    navigate('/')
  }

  const getDashPath = () => {
    if (user?.role === 'admin')   return '/admin'
    if (user?.role === 'company') return '/company'
    return '/student-dashboard'
  }

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #e1ecf8', padding: '0 40px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <NavLink to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Logo size={34} />
        </NavLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              padding: '7px 14px', borderRadius: 8,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 500, fontSize: 14, textDecoration: 'none',
              color: isActive ? '#1565c0' : '#4a6080',
              background: isActive ? '#f0f7ff' : 'transparent',
              transition: 'all 0.15s',
            })}>
              {label}
            </NavLink>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button onClick={() => setSearchOpen(o => !o)} style={{
            width: 38, height: 38, borderRadius: 10,
            background: searchOpen ? '#f0f7ff' : 'transparent',
            border: `1.5px solid ${searchOpen ? '#c3d8f0' : 'transparent'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#7a9ec0', transition: 'all 0.15s',
          }}>
            <Search size={17} />
          </button>

          {isAuthenticated ? (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate(getDashPath())}>Dashboard</button>
              <div onClick={() => navigate(getDashPath() + '/profile')} style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg,#0f3460,#0d7a52)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 13,
                cursor: 'pointer', border: '2px solid #e1ecf8', overflow: 'hidden',
              }}>
                {user?.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (user?.name?.charAt(0) || 'U')}
              </div>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>Log In</button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Join Free</button>
            </>
          )}
        </div>
      </nav>

      {searchOpen && (
        <div style={{
          position: 'sticky', top: 64, zIndex: 99, background: '#fff',
          borderBottom: '1px solid #e1ecf8', padding: '10px 40px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Search size={16} color="#7a9ec0" />
          <input autoFocus placeholder="Search Credence Edge projects, courses, skills…"
            value={searchVal} onChange={e => setSearchVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') { setSearchOpen(false); setSearchVal('') } }}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, color: '#0d1f35', fontFamily: "'Plus Jakarta Sans',sans-serif", background: 'transparent' }} />
          <button onClick={() => { setSearchOpen(false); setSearchVal('') }} style={{ background: '#e1ecf8', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a6080' }}>
            <X size={13} />
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar
