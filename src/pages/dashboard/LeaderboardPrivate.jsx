import useLeaderboard from '@/hooks/useLeaderboard'
import useAuth from '@/hooks/useAuth'
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable'

const LeaderboardPrivate = () => {
  const { leaderboard, userRank } = useLeaderboard()
  const { user } = useAuth()

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Credence Edge Leaderboard</h1>
        <p>Your ranking among all Credence Edge students.</p>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: 28, display: 'flex', gap: 32, alignItems: 'center', background: 'linear-gradient(135deg,rgba(15,52,96,0.05),rgba(13,122,82,0.05))', border: '1px solid #c3d8f0' }}>
        {[
          ['Your Rank', `#${userRank.rank}`],
          ['Your Score', userRank.score],
          ['Your Badges', userRank.badges],
        ].map(([label, val]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 28, fontWeight: 800, color: '#0f3460' }}>{val}</div>
            <div style={{ fontSize: 12.5, color: '#4a6080' }}>{label}</div>
          </div>
        ))}
      </div>

      <LeaderboardTable data={leaderboard} highlightName={user?.name} />

      <div style={{ marginTop: 20, padding: '16px 18px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0', fontSize: 13, color: '#166534' }}>
        🔒 <strong>Credence Edge Privacy:</strong> Projects, submissions, and reviews are never visible to others.
      </div>
    </div>
  )
}

export default LeaderboardPrivate
