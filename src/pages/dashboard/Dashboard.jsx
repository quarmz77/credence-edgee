import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useProjects from '@/hooks/useProjects'
import useCourses from '@/hooks/useCourses'
import { useUserStore } from '@/store/userStore'
import { useLeaderboardStore } from '@/store/leaderboardStore'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import { FolderOpen, Award, FileText, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const nav = useNavigate()
  const { myProjects } = useProjects()
  const { myCourses } = useCourses()
  const { badges } = useUserStore()
  const { userRank } = useLeaderboardStore()

  const inProgress = myProjects.filter(p => p.status === 'In Progress').length
  const reviewed    = myProjects.filter(p => p.status === 'Reviewed').length

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Here's your Credence Edge activity at a glance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Active Projects', value: inProgress, icon: <FolderOpen size={20} />, grad: 'linear-gradient(135deg,#1565c0,#42a5f5)' },
          { label: 'Badges Earned',   value: badges.length, icon: <Award size={20} />,     grad: 'linear-gradient(135deg,#0d7a52,#1dbf86)' },
          { label: 'Certificates',    value: badges.filter(b => b.certPaid).length, icon: <FileText size={20} />, grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
          { label: 'Leaderboard Rank', value: `#${userRank.rank}`, icon: <TrendingUp size={20} />, grad: 'linear-gradient(135deg,#0891b2,#38bdf8)' },
        ].map(c => (
          <div key={c.label} className="stat-card" style={{ background: c.grad }}>
            <div style={{ marginBottom: 10 }}>{c.icon}</div>
            <div className="stat-card-value">{c.value}</div>
            <div className="stat-card-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: 20, alignItems: 'start' }}>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700 }}>Recent Projects</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => nav('/student-dashboard/projects')}>View all →</button>
          </div>
          {myProjects.length === 0 ? (
            <p style={{ fontSize: 13.5, color: '#7a9ec0', textAlign: 'center', padding: '20px 0' }}>
              No Credence Edge projects yet. <button className="btn btn-ghost btn-sm" onClick={() => nav('/projects')}>Browse Projects</button>
            </p>
          ) : (
            myProjects.slice(0, 3).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid #e1ecf8' : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                    <SkillTag skill={p.skill} />
                    {p.rating && <RatingBadge rating={p.rating} />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0d1f35' }}>{p.title}</div>
                </div>
                <span className="pill pill-gray">{p.status}</span>
              </div>
            ))
          )}
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700 }}>My Courses</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => nav('/student-dashboard/courses')}>View all →</button>
          </div>
          {myCourses.map((c, i) => (
            <div key={c.id} style={{ padding: '12px 0', borderBottom: i < myCourses.length - 1 ? '1px solid #e1ecf8' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0d1f35' }}>{c.title}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1565c0' }}>{c.progress}%</span>
              </div>
              <div style={{ height: 6, background: '#e1ecf8', borderRadius: 3 }}>
                <div style={{ width: `${c.progress}%`, height: '100%', background: 'linear-gradient(90deg,#0f3460,#0d7a52)', borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
