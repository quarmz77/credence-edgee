const getRankDisplay = (rank) => {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

const LeaderboardTable = ({ data = [], highlightName = '' }) => (
  <div style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg,#0a1628 0%,#0a3d2a 50%,#0d2040 100%)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 90px 90px 70px 70px', gap: 8, padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      {['Rank', 'Name', 'Badges', 'Score', '🟢', '🟡'].map(h => (
        <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{h}</span>
      ))}
    </div>
    {data.map((u, i) => {
      const isHighlight = u.name === highlightName
      return (
        <div key={u.rank} style={{
          display: 'grid', gridTemplateColumns: '52px 1fr 90px 90px 70px 70px', gap: 8, padding: '15px 24px',
          borderBottom: i < data.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          background: isHighlight ? 'rgba(29,191,134,0.12)' : i < 3 ? 'rgba(255,255,255,0.04)' : 'transparent',
        }}>
          <span style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 800, fontSize: i < 3 ? 20 : 15, color: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'rgba(255,255,255,0.5)' }}>{getRankDisplay(u.rank)}</span>
          <span style={{ fontWeight: isHighlight ? 700 : 500, color: isHighlight ? '#4dd9a8' : '#fff', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            {u.name}
            {isHighlight && <span style={{ fontSize: 10, background: 'rgba(29,191,134,0.2)', color: '#4dd9a8', padding: '2px 7px', borderRadius: 10, fontWeight: 700 }}>YOU</span>}
          </span>
          <span style={{ color: '#a7f3d8', fontWeight: 700, fontSize: 14 }}>{u.badges} 🏅</span>
          <span style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 800, fontSize: 16, background: 'linear-gradient(90deg,#90caf9,#4dd9a8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{u.score}</span>
          <span style={{ color: '#4ade80', fontSize: 13, fontWeight: 600 }}>{u.green}×</span>
          <span style={{ color: '#fde68a', fontSize: 13, fontWeight: 600 }}>{u.yellow}×</span>
        </div>
      )
    })}
  </div>
)

export default LeaderboardTable
