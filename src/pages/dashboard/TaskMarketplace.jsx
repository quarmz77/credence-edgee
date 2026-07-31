import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProjects from '@/hooks/useProjects'
import { SkillTag } from '@/components/badge/RatingBadge'
import EmptyState from '@/components/common/EmptyState'
import { ShoppingBag, ArrowRight } from 'lucide-react'

const TaskMarketplace = () => {
  const { filtered, projects } = useProjects()
  const [selectedSkill, setSelectedSkill] = useState('All')
  const nav = useNavigate()

  const skills = ['All', ...new Set(projects.map((project) => project.skill || 'General'))]

  const shown = selectedSkill === 'All' ? filtered : projects.filter((p) => p.skill === selectedSkill)

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Task Marketplace</h1>
        <p>Browse Credify tasks and micro-projects that match your verified skills.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {skills.map((skill) => (
          <button
            key={skill}
            className={`btn btn-sm ${selectedSkill === skill ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedSkill(skill)}
            style={{ borderRadius: 20 }}
          >
            {skill}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={56} />}
          title="No tasks found"
          description="Try selecting another skill filter or check back soon for new Credify tasks."
          action={
            <button className="btn btn-primary btn-sm" onClick={() => nav('/projects')}>
              Explore all projects
            </button>
          }
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
          {shown.map((project) => (
            <div key={project.id} className="card card-hover" style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{project.title}</h3>
                  <p style={{ margin: '8px 0 0', color: '#7a9ec0', fontSize: 13 }}>{project.company}</p>
                </div>
                <SkillTag skill={project.skill} />
              </div>

              <p style={{ color: '#4a6080', fontSize: 14, marginBottom: 16, minHeight: 54 }}>{project.description}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span className="pill pill-gray">{project.duration}</span>
                  <span className="pill pill-blue">{project.type}</span>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => nav(`/projects`)}>
                  View task <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskMarketplace
