import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useProjects from '@/hooks/useProjects'
import { useUserStore } from '@/store/userStore'
import { getCertificates } from '@/services/certificateService'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import { CheckCircle, FileText, FolderOpen } from 'lucide-react'
import CountdownTimer from '@/components/common/CountdownTimer'

const Dashboard = () => {
  const { user } = useAuth()
  const nav = useNavigate()
  const { myProjects, submissionsLoading } = useProjects()
  const { certificateItems, setCertificateItems } = useUserStore()
  const [certsCount, setCertsCount] = useState(0)

  useEffect(() => {
    if (!user?.id) return
    getCertificates({ userId: user.id })
      .then((res) => {
        const certs = res?.items ?? []
        setCertsCount(certs.length)
      })
      .catch((err) => console.error("Failed to load dashboard certificates count", err))
  }, [user?.id])

  const inProgress = myProjects.filter(p => p.status === 'In Progress').length
  const reviewed = myProjects.filter(p => p.status === 'Reviewed').length
  const paidCertificates = certsCount

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p>Here's your Credify activity at a glance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Active Projects', value: inProgress, icon: <FolderOpen size={20} />, grad: 'linear-gradient(135deg,#1565c0,#42a5f5)' },
          { label: 'Reviewed Projects', value: reviewed, icon: <CheckCircle size={20} />, grad: 'linear-gradient(135deg,#0d7a52,#1dbf86)' },
          { label: 'Certificates', value: paidCertificates, icon: <FileText size={20} />, grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
        ].map(c => (
          <div key={c.label} className="stat-card" style={{ background: c.grad }}>
            <div style={{ marginBottom: 10 }}>{c.icon}</div>
            <div className="stat-card-value">{c.value}</div>
            <div className="stat-card-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700 }}>Recent Projects</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('/student-dashboard/projects')}>View all -&gt;</button>
        </div>
        {myProjects.length === 0 ? (
          <p style={{ fontSize: 13.5, color: '#7a9ec0', textAlign: 'center', padding: '20px 0' }}>
            No Credify projects yet. <button className="btn btn-ghost btn-sm" onClick={() => nav('/projects')}>Browse Projects</button>
          </p>
        ) : (
          myProjects.slice(0, 3).map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid #e1ecf8' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                  <SkillTag skill={p.skill} />
                  {p.rating && <RatingBadge rating={p.rating} />}
                  {p.status === 'In Progress' && (
                    <CountdownTimer deadline={p.deadline} createdAt={p.createdAt} duration={p.duration} />
                  )}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0d1f35' }}>{p.title}</div>
              </div>
              <span className="pill pill-gray">{p.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
