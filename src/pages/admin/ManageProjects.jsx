import { useState } from 'react'
import { MOCK_PROJECTS } from '@/utils/constants'
import { SkillTag } from '@/components/badge/RatingBadge'
import ProjectStatusBadge from '@/components/project/ProjectStatusBadge'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle } from 'lucide-react'

const ManageProjects = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS.map(p => ({ ...p, approval: 'Pending' })))

  const approve = (id) => {
    setProjects(ps => ps.map(p => p.id === id ? { ...p, approval: 'Approved', status: 'Open' } : p))
    toast.success('Project approved and live on Credence Edge!')
  }
  const reject = (id) => {
    setProjects(ps => ps.map(p => p.id === id ? { ...p, approval: 'Rejected' } : p))
    toast.error('Project rejected.')
  }

  const pill = { Pending: 'pill-yellow', Approved: 'pill-green', Rejected: 'pill-red' }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Manage Credence Edge Projects</h1>
        <p>Review and approve company-submitted projects.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {projects.map(p => (
          <div key={p.id} className="card" style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <SkillTag skill={p.skill} />
                <ProjectStatusBadge status={p.status} />
                <span className={`pill ${pill[p.approval]}`}>{p.approval}</span>
              </div>
              <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700 }}>{p.title}</h3>
              <p style={{ fontSize: 12.5, color: '#7a9ec0' }}>🏢 {p.company}</p>
            </div>
            {p.approval === 'Pending' && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm" style={{ background: '#dcfce7', color: '#166534', border: 'none' }} onClick={() => approve(p.id)}>
                  <CheckCircle size={13} /> Approve
                </button>
                <button className="btn btn-sm" style={{ background: '#fee2e2', color: '#991b1b', border: 'none' }} onClick={() => reject(p.id)}>
                  <XCircle size={13} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProjects
