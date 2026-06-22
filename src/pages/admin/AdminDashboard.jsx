import { useNavigate } from 'react-router-dom'
import { Users, FolderOpen, CheckSquare, Award, Building2, FileText } from 'lucide-react'

const STAT_CARDS = [
  { label: 'Total Users',       value: '2,148', icon: <Users size={20} />,      grad: 'linear-gradient(135deg,#1565c0,#42a5f5)' },
  { label: 'Live Projects',     value: '38',    icon: <FolderOpen size={20} />, grad: 'linear-gradient(135deg,#0d7a52,#1dbf86)' },
  { label: 'Pending Approvals', value: '7',     icon: <CheckSquare size={20} />, grad: 'linear-gradient(135deg,#b45309,#f59e0b)' },
  { label: 'Badges Issued',     value: '412',   icon: <Award size={20} />,      grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
  { label: 'Companies',         value: '34',    icon: <Building2 size={20} />, grad: 'linear-gradient(135deg,#0891b2,#38bdf8)' },
  { label: 'Certificates Sold', value: '96',    icon: <FileText size={20} />,  grad: 'linear-gradient(135deg,#be185d,#f472b6)' },
]

const AdminDashboard = () => {
  const nav = useNavigate()
  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Credence Edge Admin Dashboard</h1>
        <p>Full control of the Credence Edge platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
        {STAT_CARDS.map(c => (
          <div key={c.label} className="stat-card" style={{ background: c.grad }}>
            <div style={{ marginBottom: 10 }}>{c.icon}</div>
            <div className="stat-card-value">{c.value}</div>
            <div className="stat-card-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🗂 Control Panel</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['📌', 'Manage Projects', '/admin/projects'],
            ['👤', 'Manage Users', '/admin/users'],
            ['📤', 'Review Submissions', '/admin/submissions'],
            ['⭐', 'Ratings Manager', '/admin/ratings'],
            ['📜', 'Certificates', '/admin/certificates'],
            ['🏢', 'Approve Companies', '/admin/companies'],
          ].map(([icon, label, path]) => (
            <button key={label} onClick={() => nav(path)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
              borderRadius: 10, border: '1px solid #e1ecf8', background: '#fff',
              cursor: 'pointer', fontSize: 13.5, fontWeight: 600, color: '#0d1f35', textAlign: 'left',
            }}>
              <span style={{ fontSize: 20 }}>{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
