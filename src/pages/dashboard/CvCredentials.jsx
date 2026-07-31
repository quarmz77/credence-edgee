import { useMemo } from 'react'
import useAuth from '@/hooks/useAuth'
import useProjects from '@/hooks/useProjects'
import { FileText, CheckCircle2, ListChecks } from 'lucide-react'

const CvCredentials = () => {
  const { user } = useAuth()
  const { myProjects } = useProjects()

  const certificates = useMemo(() => myProjects.filter((p) => p.status === 'Reviewed' && p.rating), [myProjects])
  const completedProjects = useMemo(() => myProjects.filter((p) => p.status === 'Reviewed'), [myProjects])

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>CV & Credentials</h1>
        <p>Manage your Credify resume-ready credentials, certificates, and completed project history.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <FileText size={20} />
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', color: '#7a9ec0', letterSpacing: '0.5px' }}>Resume Projects</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{completedProjects.length}</div>
            </div>
          </div>
          <p style={{ color: '#4a6080', fontSize: 14 }}>Projects that can be listed on your Credify CV.</p>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <CheckCircle2 size={20} />
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', color: '#7a9ec0', letterSpacing: '0.5px' }}>Verified Credentials</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{certificates.length}</div>
            </div>
          </div>
          <p style={{ color: '#4a6080', fontSize: 14 }}>Reviewed projects with certificate or rating evidence.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Your Credify CV Summary</h2>
            <p style={{ margin: '8px 0 0', color: '#4a6080' }}>A summary of your top skills, verified achievements, and completed projects.</p>
          </div>
          <span className="pill pill-blue">Download ready</span>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0d1f35' }}>Professional Summary</div>
              <p style={{ margin: '6px 0 0', color: '#4a6080', fontSize: 14 }}>
                {user?.description || 'A motivated student building real skills through paid Credify projects, verified certificates, and professional work evidence.'}
              </p>
            </div>
            <button className="btn btn-ghost btn-sm">Download CV</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            <div className="card" style={{ padding: 16, background: '#f8fbff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <ListChecks size={16} />
                <span style={{ fontWeight: 700 }}>Top Skill</span>
              </div>
              <p style={{ margin: 0, color: '#4a6080' }}>{completedProjects[0]?.skill || 'No skill yet'}</p>
            </div>
            <div className="card" style={{ padding: 16, background: '#f8fbff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <ListChecks size={16} />
                <span style={{ fontWeight: 700 }}>Latest Credential</span>
              </div>
              <p style={{ margin: 0, color: '#4a6080' }}>{certificates[0]?.title || 'No credential yet'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Recent Credential History</h2>
        {certificates.length === 0 ? (
          <p style={{ color: '#7a9ec0' }}>No credentials available yet. Earn them by completing and reviewing Credify projects.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {certificates.map((project) => (
              <div key={project.id} style={{ padding: 16, background: '#fff', borderRadius: 14, border: '1px solid #e1ecf8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{project.title}</div>
                    <p style={{ margin: '6px 0 0', color: '#4a6080', fontSize: 13 }}>{project.company}</p>
                  </div>
                  <span className="pill pill-green">Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CvCredentials
