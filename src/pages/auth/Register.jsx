import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Logo from '@/components/layout/Logo'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, User, Building2, GraduationCap } from 'lucide-react'

const TYPES = [
  { key: 'student',  label: 'Student',  icon: <GraduationCap size={14} /> },
  { key: 'graduate', label: 'Graduate', icon: <User size={14} /> },
  { key: 'company',  label: 'Company',  icon: <Building2 size={14} /> },
]

const Register = () => {
  const { register } = useAuth()
  const nav = useNavigate()
  const [type, setType]       = useState('student')
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    university: '', programme: '', companyName: '',
    industry: '', location: '', phone: '',
  })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = 'Name is required'
    if (!form.email.trim())    e.email    = 'Email is required'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (type !== 'company' && !form.university.trim()) e.university = 'University is required'
    if (type === 'company'  && !form.companyName.trim()) e.companyName = 'Company name is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const result = await register({
        ...form,
        role: type,
        name: type === 'company' ? form.companyName : form.name,
      })
      // Registration returns { email, requiresOtp: true } — go to OTP verification page
      const email = result?.email || form.email
      toast.success('Account created! Check your email for a 6-digit verification code.', { duration: 6000 })
      nav(`/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-left-blob" style={{ left: '-15%', top: '-20%', width: 460, height: 460, background: 'rgba(21,101,192,0.14)' }} />
        <div className="auth-left-blob" style={{ right: '-10%', bottom: '-10%', width: 300, height: 300, background: 'rgba(13,122,82,0.12)' }} />
        <div className="auth-left-content">
          <Logo size={36} light />
          <h2 className="auth-left-title" style={{ marginTop: 32 }}>
            Build Your Verified<br />Skills on Credify
          </h2>
          <p className="auth-left-subtitle">
            Join thousands of students on Credify proving what they can do through real projects and verified credentials.
          </p>
          <div className="auth-feature-list">
            {[
              'Complete real micro-projects from companies',
              'Pay GHS 20 for verified Credify certificates',
              'Track submissions and ratings privately',
              'Build an employer-ready project portfolio',
            ].map(f => (
              <div key={f} className="auth-feature-item">
                <span className="auth-feature-dot" />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right" style={{ padding: '40px 48px' }}>
        <div className="auth-card" style={{ maxWidth: 400 }}>
          <div style={{ marginBottom: 24 }}><Logo size={30} /></div>
          <h1 className="auth-title">Join Credify</h1>
          <p className="auth-subtitle">Start building your verified skills portfolio today</p>

          <div className="auth-type-tabs">
            {TYPES.map(t => (
              <button key={t.key} type="button" className={`auth-type-tab${type === t.key ? ' active' : ''}`} onClick={() => setType(t.key)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{type === 'company' ? 'Contact Person' : 'Full Name'} <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                <input className={`form-input${errors.name ? ' error' : ''}`} placeholder="e.g. Annastasia Amarachi" value={form.name} onChange={set('name')} style={{ paddingLeft: 36 }} />
              </div>
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            {type === 'company' && (
              <div className="form-group">
                <label className="form-label">Company Name <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                  <input className={`form-input${errors.companyName ? ' error' : ''}`} placeholder="e.g. TechBridge Ltd" value={form.companyName} onChange={set('companyName')} style={{ paddingLeft: 36 }} />
                </div>
                {errors.companyName && <p className="form-error">{errors.companyName}</p>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                <input className={`form-input${errors.email ? ' error' : ''}`} type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} style={{ paddingLeft: 36 }} />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                <input className={`form-input${errors.password ? ' error' : ''}`} type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={set('password')} style={{ paddingLeft: 36, paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7a9ec0', padding: 0 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            {type !== 'company' ? (
              <div className="form-group">
                <label className="form-label">University <span style={{ color: '#ef4444' }}>*</span></label>
                <input className={`form-input${errors.university ? ' error' : ''}`} placeholder="e.g. University of Ghana" value={form.university} onChange={set('university')} />
                {errors.university && <p className="form-error">{errors.university}</p>}
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Industry</label>
                <select className="form-input" value={form.industry} onChange={set('industry')}>
                  <option value="">Select industry</option>
                  {['Technology', 'Marketing', 'Finance', 'Logistics', 'Other'].map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '13px', fontSize: 15, marginTop: 4 }} disabled={loading}>
              {loading ? 'Creating your Credify account…' : 'Join Credify Free →'}
            </button>

            <p className="auth-footer-text">
              Already have a Credify account?{' '}
              <button type="button" className="auth-footer-link" onClick={() => nav('/login')}>Sign in</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
