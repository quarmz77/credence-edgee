import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProjects from '@/hooks/useProjects'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import EmptyState from '@/components/common/EmptyState'
import toast from 'react-hot-toast'

const MyProjects = () => {
  const { myProjects } = useProjects()
  const [filter, setFilter] = useState('All')
  const nav = useNavigate()

  const filters = ['All', 'In Progress', 'Submitted', 'Reviewed']
  const shown = filter === 'All' ? myProjects : myProjects.filter(p => p.status === filter)

  const handleSubmit = (project) => {
    toast.success(`Work submitted for "${project.title}" on Credence Edge!`)
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>My Credence Edge Projects</h1>
        <p>Track your project progress and reviewer feedback. All private to you.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFilter(f)} style={{ borderRadius: 20 }}>
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState icon="📌" title="No projects here" description="Browse the Credence Edge project board to get started."
          action={<button className="btn btn-primary btn-sm" onClick={() => nav('/projects')}>Browse Projects →</button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {shown.map(p => (
            <div key={p.id} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <SkillTag skill={p.skill} />
                    <span className="pill pill-gray">{p.status}</span>
                    {p.rating && <RatingBadge rating={p.rating} />}
                  </div>
                  <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontSize: 12.5, color: '#7a9ec0', marginBottom: p.feedback ? 10 : 0 }}>🏢 {p.company}</p>
                  {p.feedback && (
                    <div style={{ marginTop: 10, padding: '10px 12px', background: '#f0fdf4', borderRadius: 8, borderLeft: '3px solid #0d7a52', fontSize: 13, color: '#166534' }}>
                      {p.feedback}
                    </div>
                  )}
                </div>
                {p.status === 'In Progress' && (
                  <button className="btn btn-primary btn-sm" onClick={() => handleSubmit(p)}>Submit Work →</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProjects
