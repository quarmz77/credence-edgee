import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_COURSES, SKILLS } from '@/utils/constants'
import { SkillTag } from '@/components/badge/RatingBadge'
import useAuth from '@/hooks/useAuth'
import useCourses from '@/hooks/useCourses'
import toast from 'react-hot-toast'
import { BookOpen, Clock } from 'lucide-react'

const Courses = () => {
  const { isAuthenticated } = useAuth()
  const { myCourses } = useCourses()
  const nav = useNavigate()
  const [filter, setFilter] = useState('All')

  const allSkills = ['All', ...SKILLS]
  const filtered = filter === 'All' ? MOCK_COURSES : MOCK_COURSES.filter(c => c.skill === filter)

  const handleEnroll = (course) => {
    if (!isAuthenticated) { nav('/register'); return }
    toast.success(`Enrolled in "${course.title}" on Credence Edge!`)
    nav('/student-dashboard/courses')
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 40px' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Credence Edge Courses</h1>
        <p style={{ color: '#4a6080', fontSize: 15 }}>
          Short, focused courses on Credence Edge. Complete for a <strong>free badge</strong>, or pay <strong>GHS 20</strong> for a verified certificate.
        </p>
      </div>

      <div className="grid-3" style={{ gap: 16, marginBottom: 36 }}>
        {[
          ['🏅', 'Free Credence Edge Badges', 'Every completed course earns a downloadable Credence Edge skill badge for your portfolio.'],
          ['📜', 'Paid Certificates', 'Pay GHS 20 for a verified Credence Edge certificate with a unique ID after completion.'],
          ['🔒', 'Private Progress', 'Your Credence Edge course progress and completion is visible only to you.'],
        ].map(([icon, title, desc]) => (
          <div key={title} style={{ display: 'flex', gap: 14, padding: '18px', background: '#fff', borderRadius: 12, border: '1px solid #e1ecf8' }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12.5, color: '#4a6080', lineHeight: 1.55 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {allSkills.map(s => (
          <button key={s}
            className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(s)} style={{ borderRadius: 20 }}>
            {s}
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13.5, color: '#7a9ec0', marginBottom: 20 }}>
        Showing <strong style={{ color: '#0d1f35' }}>{filtered.length}</strong> Credence Edge courses
      </p>

      <div className="grid-3" style={{ gap: 20 }}>
        {filtered.map(c => {
          const enrolled = myCourses?.find(mc => mc.id === c.id)
          const progress = enrolled?.progress || 0
          return (
            <div key={c.id} className="card card-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <SkillTag skill={c.skill} />
                <span className="pill pill-blue">Free Badge</span>
              </div>
              <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, color: '#0d1f35', marginBottom: 8, flex: 1 }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: '#4a6080', lineHeight: 1.65, marginBottom: 16 }}>{c.description}</p>
              <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: '#7a9ec0' }}><BookOpen size={13} /> {c.lessons} lessons</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: '#7a9ec0' }}><Clock size={13} /> {c.duration}</span>
              </div>
              {enrolled && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: '#4a6080' }}>Progress</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1565c0' }}>{progress}%</span>
                  </div>
                  <div style={{ height: 6, background: '#e1ecf8', borderRadius: 3 }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#0f3460,#0d7a52)', borderRadius: 3 }} />
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => handleEnroll(c)}>
                  {enrolled ? (progress === 100 ? '✓ Completed' : 'Continue →') : (isAuthenticated ? 'Enrol Free' : 'Join Credence Edge')}
                </button>
                {enrolled && progress === 100 && (
                  <button className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>GHS 20 Cert</button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Courses
