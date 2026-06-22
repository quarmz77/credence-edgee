import { useState } from 'react'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import toast from 'react-hot-toast'

const MOCK_CERTS = [
  { id: 1, student: 'Annastasia Amarachi', project: 'Social Media Campaign Design', skill: 'Marketing', rating: 'green', status: 'Pending' },
]

const CertificatesApproval = () => {
  const [certs, setCerts] = useState(MOCK_CERTS)
  const approve = (id) => {
    setCerts(c => c.map(x => x.id === id ? { ...x, status: 'Approved' } : x))
    toast.success('Credence Edge certificate approved and issued!')
  }
  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Certificates Approval</h1>
        <p>Review and approve paid Credence Edge certificate requests.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {certs.map(c => (
          <div key={c.id} className="card" style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <SkillTag skill={c.skill} />
                <RatingBadge rating={c.rating} />
                <span className="pill pill-yellow">{c.status}</span>
              </div>
              <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700 }}>{c.project}</h3>
              <p style={{ fontSize: 12.5, color: '#7a9ec0' }}>👤 {c.student}</p>
            </div>
            {c.status === 'Pending' && (
              <button className="btn btn-primary btn-sm" onClick={() => approve(c.id)}>Approve & Issue</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CertificatesApproval
