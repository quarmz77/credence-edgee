import { useNavigate } from 'react-router-dom'
import { MOCK_PROJECTS } from '@/utils/constants'
import { SkillTag } from '@/components/badge/RatingBadge'
import ProjectStatusBadge from '@/components/project/ProjectStatusBadge'
import { Plus } from 'lucide-react'

const CompanyProjects = () => {
  const nav = useNavigate()
  const projects = MOCK_PROJECTS.slice(0, 4)

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>My Credence Edge Projects</h1>
            <p>Manage all your posted projects.</p>
          </div>
          <button className="btn btn-primary" onClick={() => nav('/company/projects/add')}>
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {projects.map(p => (
          <div key={p.id} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <SkillTag skill={p.skill} />
              <ProjectStatusBadge status={p.status} />
              <span className="pill pill-yellow">Pending Approval</span>
            </div>
            <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
            <p style={{ fontSize: 13.5, color: '#4a6080' }}>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyProjects
