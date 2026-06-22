import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'

const CompanyProfile = () => {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    companyName: user?.companyName || 'TechBridge Ltd',
    industry: user?.industry || 'Technology',
    location: user?.location || 'Accra, Ghana',
    description: user?.description || '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSave = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    updateUser(form)
    setLoading(false)
    toast.success('Credence Edge company profile updated!')
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Company Profile</h1>
        <p>Keep your Credence Edge profile updated. Admin verification required to go live.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
        <span style={{ fontSize: 18 }}>🛡️</span>
        <p style={{ fontSize: 13.5, color: '#166534' }}>
          Your Credence Edge company profile has been submitted for review.
        </p>
        <span className="pill pill-yellow" style={{ marginLeft: 'auto' }}>Under Review</span>
      </div>

      <div className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 600 }}>
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input className="form-input" value={form.companyName} onChange={set('companyName')} />
        </div>
        <div className="form-group">
          <label className="form-label">Industry</label>
          <select className="form-input" value={form.industry} onChange={set('industry')}>
            {['Technology', 'Marketing', 'Finance', 'Logistics', 'Healthcare', 'Other'].map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input className="form-input" value={form.location} onChange={set('location')} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input" rows={3} value={form.description} onChange={set('description')} style={{ resize: 'vertical' }} />
        </div>
        <button className="btn btn-primary btn-block" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving…' : 'Save Profile →'}
        </button>
      </div>
    </div>
  )
}

export default CompanyProfile
