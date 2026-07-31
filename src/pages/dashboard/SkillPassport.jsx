import { useMemo } from 'react'
import useAuth from '@/hooks/useAuth'
import useProjects from '@/hooks/useProjects'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import { Award, ShieldCheck, Sparkles } from 'lucide-react'

const SkillPassport = () => {
  const { user } = useAuth()
  const { myProjects } = useProjects()

  const skills = useMemo(() => {
    const all = myProjects.map((p) => p.skill || 'General')
    return [...new Set(all)]
  }, [myProjects])

  const verifiedSkills = useMemo(() => {
    const verified = myProjects
      .filter((p) => p.rating)
      .map((p) => p.skill || 'General')
    return [...new Set(verified)]
  }, [myProjects])

  const passportStrength = Math.min(100, 30 + verifiedSkills.length * 12 + skills.length * 4)

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Student Skill Passport</h1>
        <p>Track every verified skill, earned credential, and real-world task you completed on Credify.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Award size={20} />
            <div>
              <div style={{ fontSize: 12, color: '#7a9ec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Skills</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{verifiedSkills.length}</div>
            </div>
          </div>
          <p style={{ color: '#4a6080', fontSize: 14 }}>Skills verified by reviewed Credify projects and employer feedback.</p>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <ShieldCheck size={20} />
            <div>
              <div style={{ fontSize: 12, color: '#7a9ec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Passport Strength</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{passportStrength}%</div>
            </div>
          </div>
          <p style={{ color: '#4a6080', fontSize: 14 }}>Your skill passport strength grows as you complete more projects and earn reviews.</p>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Sparkles size={20} />
            <div>
              <div style={{ fontSize: 12, color: '#7a9ec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills Captured</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{skills.length}</div>
            </div>
          </div>
          <p style={{ color: '#4a6080', fontSize: 14 }}>Unique skills extracted from your Credify project work.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Your Skill Passport</h2>
            <p style={{ margin: '8px 0 0', color: '#4a6080' }}>All the skills Credify has captured from your project submissions.</p>
          </div>
          <span className="pill pill-blue">Updated automatically</span>
        </div>

        {skills.length === 0 ? (
          <p style={{ color: '#7a9ec0' }}>You don’t have any skills yet. Start a Credify project to build your skill passport.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Verified Skill Highlights</h2>
        {verifiedSkills.length === 0 ? (
          <p style={{ color: '#7a9ec0' }}>No verified skills yet. Complete and review more projects to earn verified skill badges.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
            {verifiedSkills.map((skill) => (
              <div key={skill} className="card" style={{ padding: 18, background: '#f8fbff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, color: '#0d1f35' }}>{skill}</span>
                  <span className="pill pill-green">Verified</span>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: '#4a6080' }}>Evidenced by your completed Credify projects and reviewer feedback.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillPassport
