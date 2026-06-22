import { useNavigate } from 'react-router-dom'
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable'
import useLeaderboard from '@/hooks/useLeaderboard'

const Leaderboard = () => {
  const { leaderboard } = useLeaderboard()
  const nav = useNavigate()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 40px' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Credence Edge Leaderboard</h1>
        <p style={{ color: '#4a6080', fontSize: 15 }}>
          Rankings based on: <strong>Score = (🟢 × 3) + (🟡 × 2) + (🔴 × 1)</strong>. Projects, submissions and reviews are never shown publicly on Credence Edge.
        </p>
      </div>

      <div className="grid-3" style={{ gap: 14, marginBottom: 32 }}>
        {[
          ['🟢', 'Excellent', '3 points', 'pill-green'],
          ['🟡', 'Satisfactory', '2 points', 'pill-yellow'],
          ['🔴', 'Needs Improvement', '1 point', 'pill-red'],
        ].map(([emoji, label, pts, cls]) => (
          <div key={label} className="card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{emoji}</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0d1f35', marginBottom: 4 }}>{label}</div>
            <span className={`pill ${cls}`}>{pts}</span>
          </div>
        ))}
      </div>

      <LeaderboardTable data={leaderboard} />

      <div style={{ marginTop: 24, padding: '16px 20px', background: '#f0f7ff', borderRadius: 12, border: '1px solid #c3d8f0', fontSize: 13.5, color: '#4a6080', lineHeight: 1.65 }}>
        🔒 <strong>Credence Edge Privacy:</strong> The leaderboard shows only Name, Badges and Score. Projects selected, submissions made and reviewer feedback are <strong>never</strong> visible to anyone else.
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Verify a Credence Edge Certificate</h2>
        <p style={{ color: '#4a6080', fontSize: 14, marginBottom: 20 }}>
          Enter a Credence Edge certificate ID to confirm its authenticity.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <input className="form-input" placeholder="e.g. CE-2025-ABC123" style={{ flex: 1 }} />
          <button className="btn btn-primary btn-sm">Verify</button>
        </div>
      </div>

      <div style={{ marginTop: 40, background: 'linear-gradient(135deg,#0a1628,#0a3d2a)', borderRadius: 16, padding: '36px', textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
          Want to appear on the Credence Edge Leaderboard?
        </h3>
        <p style={{ color: 'rgba(163,230,208,0.8)', fontSize: 14, marginBottom: 24 }}>
          Complete projects, earn badges, and climb the Credence Edge rankings.
        </p>
        <button className="btn btn-primary" onClick={() => nav('/register')}>
          Join Credence Edge Free →
        </button>
      </div>
    </div>
  )
}

export default Leaderboard
