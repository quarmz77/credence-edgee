import { useUserStore } from '@/store/userStore'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import EmptyState from '@/components/common/EmptyState'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const MyBadges = () => {
  const { badges } = useUserStore()
  const nav = useNavigate()

  const handleDownload = (badge) => {
    toast.success(`"${badge.title}" badge downloaded!`)
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>My Credence Edge Badges</h1>
        <p>Free skill badges earned from completed projects and courses.</p>
      </div>

      {badges.length === 0 ? (
        <EmptyState icon="🏅" title="No badges yet" description="Complete projects and courses to earn free Credence Edge skill badges."
          action={<button className="btn btn-primary btn-sm" onClick={() => nav('/projects')}>Browse Projects →</button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {badges.map(b => (
            <div key={b.id} className="card" style={{ padding: '24px', display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 14, flexShrink: 0,
                background: 'linear-gradient(135deg,#0f3460,#0d7a52)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>🏅</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <SkillTag skill={b.skill} />
                  <RatingBadge rating={b.rating} />
                </div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{b.title}</h3>
                <p style={{ fontSize: 12.5, color: '#7a9ec0' }}>🏢 {b.company} · Earned on Credence Edge {b.date}</p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => handleDownload(b)}>Download Badge</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBadges
