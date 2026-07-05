import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SKILLS } from '@/utils/constants'
import toast from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'

const AddProject = () => {
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', skill: '', instructions: '', duration: '', type: 'Remote' })

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.skill) { toast.error('Please fill all required fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    toast.success('Project submitted to Credify for admin approval!')
    nav('/company/projects')
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: 8, padding: '6px 0', color: '#7a9ec0' }} onClick={() => nav('/company/projects')}>
          <ArrowLeft size={14} /> Back to Projects
        </button>
        <h1>Add New Credify Project</h1>
        <p>Your project will go live after admin approval.</p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 700 }}>
        <div className="form-group">
          <label className="form-label">Project Title <span style={{ color: '#ef4444' }}>*</span></label>
          <input className="form-input" placeholder="e.g. Social Media Campaign Design" value={form.title} onChange={set('title')} />
        </div>
        <div className="form-group">
          <label className="form-label">Description <span style={{ color: '#ef4444' }}>*</span></label>
          <textarea className="form-input" rows={4} value={form.description} onChange={set('description')} style={{ resize: 'vertical' }} />
        </div>
        <div className="form-group">
          <label className="form-label">Skill Category <span style={{ color: '#ef4444' }}>*</span></label>
          <select className="form-input" value={form.skill} onChange={set('skill')}>
            <option value="">Select a skill</option>
            {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Instructions</label>
          <textarea className="form-input" rows={4} value={form.instructions} onChange={set('instructions')} style={{ resize: 'vertical' }} />
        </div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Duration</label>
            <input className="form-input" placeholder="e.g. 2 weeks" value={form.duration} onChange={set('duration')} />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-input" value={form.type} onChange={set('type')}>
              {['Remote', 'In-Person', 'Hybrid'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit to Credify for Approval →'}
        </button>
      </form>
    </div>
  )
}

export default AddProject
