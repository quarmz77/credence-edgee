import useCourses from '@/hooks/useCourses'
import { SkillTag } from '@/components/badge/RatingBadge'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const MyCourses = () => {
  const { myCourses, updateProgress } = useCourses()
  const nav = useNavigate()

  const handleContinue = (course) => {
    const next = Math.min(course.progress + 25, 100)
    updateProgress(course.id, next)
    if (next === 100) toast.success(`"${course.title}" completed! Badge earned on Credence Edge 🏅`)
    else toast.success('Progress updated!')
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>My Credence Edge Courses</h1>
        <p>Track your enrolled courses and earn badges upon completion.</p>
      </div>

      <div className="grid-2" style={{ gap: 18 }}>
        {myCourses.map(c => (
          <div key={c.id} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <SkillTag skill={c.skill} />
              {c.status === 'Completed'
                ? <span className="pill pill-green">✓ Completed</span>
                : <span className="pill pill-yellow">In Progress</span>}
            </div>
            <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{c.title}</h3>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#4a6080' }}>Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1565c0' }}>{c.progress}%</span>
              </div>
              <div style={{ height: 7, background: '#e1ecf8', borderRadius: 4 }}>
                <div style={{ width: `${c.progress}%`, height: '100%', background: 'linear-gradient(90deg,#0f3460,#0d7a52)', borderRadius: 4 }} />
              </div>
            </div>
            <button className="btn btn-sm btn-block" style={{ background: c.status === 'Completed' ? '' : '' }}
              onClick={() => handleContinue(c)}
              disabled={c.status === 'Completed'}>
              {c.status === 'Completed' ? '✓ Completed on Credence Edge' : 'Continue →'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCourses
