import { useState } from 'react'
import { SkillTag } from '@/components/badge/RatingBadge'
import toast from 'react-hot-toast'

const MOCK_SUBS = [
  { id: 1, student: 'Annastasia Amarachi', project: 'Social Media Campaign Design', skill: 'Marketing', status: 'Pending' },
  { id: 2, student: 'Kwame Asante', project: 'Build a REST API', skill: 'IT', status: 'Pending' },
]

const ReviewSubmissions = () => {
  const [subs, setSubs] = useState(MOCK_SUBS)

  const rate = (id, rating) => {
    setSubs(s => s.map(x => x.id === id ? { ...x, status: 'Rated', rating } : x))
    toast.success('Rating submitted on Credence Edge! Badge issued.')
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Review Credence Edge Submissions</h1>
        <p>Rate student submissions. Only the student sees their rating.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {subs.map(s => (
          <div key={s.id} className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <SkillTag skill={s.skill} />
              <span className="pill pill-yellow">{s.status}</span>
            </div>
            <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700 }}>{s.project}</h3>
            <p style={{ fontSize: 12.5, color: '#7a9ec0', marginBottom: 12 }}>👤 {s.student}</p>
            {s.status === 'Pending' && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm pill-green" style={{ background: '#dcfce7', color: '#166534', border: 'none' }} onClick={() => rate(s.id, 'green')}>🟢 Excellent</button>
                <button className="btn btn-sm" style={{ background: '#fef9c3', color: '#854d0e', border: 'none' }} onClick={() => rate(s.id, 'yellow')}>🟡 Satisfactory</button>
                <button className="btn btn-sm" style={{ background: '#fee2e2', color: '#991b1b', border: 'none' }} onClick={() => rate(s.id, 'red')}>🔴 Needs Improvement</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSubmissions
