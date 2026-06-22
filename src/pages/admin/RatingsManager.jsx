import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'

const MOCK_RATED = [
  { id: 1, student: 'Annastasia Amarachi', project: 'Social Media Campaign Design', skill: 'Marketing', rating: 'green' },
]

const RatingsManager = () => (
  <div className="animate-fade-up">
    <div className="dash-header">
      <h1>Ratings Manager</h1>
      <p>View and edit all issued Credence Edge ratings.</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {MOCK_RATED.map(r => (
        <div key={r.id} className="card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <SkillTag skill={r.skill} />
            <RatingBadge rating={r.rating} />
          </div>
          <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700 }}>{r.project}</h3>
          <p style={{ fontSize: 12.5, color: '#7a9ec0' }}>👤 {r.student}</p>
        </div>
      ))}
    </div>
  </div>
)

export default RatingsManager
