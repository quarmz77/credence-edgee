import { useState } from 'react'

const MOCK_USERS = [
  { id: 1, name: 'Annastasia Amarachi', email: 'annastasia@gmail.com', role: 'student', badges: 1, status: 'Active' },
  { id: 2, name: 'Kwame Asante', email: 'kwame@gmail.com', role: 'student', badges: 9, status: 'Active' },
  { id: 3, name: 'TechBridge Ltd', email: 'hr@techbridge.gh', role: 'company', badges: 0, status: 'Pending' },
]

const ManageUsers = () => {
  const [users] = useState(MOCK_USERS)
  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Manage Credence Edge Users</h1>
        <p>View and manage all students, graduates, and companies.</p>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {users.map((u, i) => (
          <div key={u.id} style={{ padding: '16px 24px', borderBottom: i < users.length - 1 ? '1px solid #e1ecf8' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
              <div style={{ fontSize: 12, color: '#7a9ec0' }}>{u.email}</div>
            </div>
            <span className="pill pill-blue" style={{ textTransform: 'capitalize' }}>{u.role}</span>
            <span className="pill pill-green">{u.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageUsers
