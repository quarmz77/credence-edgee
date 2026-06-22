import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Logo from '@/components/layout/Logo'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

const Login = () => {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.email)    e.email    = 'Email is required'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const result = await login(form.email, form.password)
      toast.success('Welcome back to Credence Edge!')
      if (result.role === 'admin')   nav('/admin')
      else if (result.role === 'company') nav('/company')
      else nav('/student-dashboard')
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-left-blob" style={{ left: '-15%', top: '-20%', width: 480, height: 480, background: 'rgba(21,101,192,0.14)' }} />
        <div className="auth-left-blob" style={{ right: '-10%', bottom: '-10%', width: 320, height: 320, background: 'rgba(13,122,82,0.12)' }} />
        <div className="auth-left-content">
          <Logo size={36} light />
          <h2 className="auth-left-title" style={{ marginTop: 32 }}>
            Welcome back to<br />Credence Edge
          </h2>
          <p className="auth-left-subtitle">
            Sign in to your Credence Edge dashboard to track projects, badges, and your leaderboard ranking.
          </p>
          <div className="auth-feature-list">
            {[
              'Access your private Credence Edge dashboard',
              'Track your submitted work and ratings',
              'Download your Credence Edge badges',
              'View your Credence Edge leaderboard rank',
            ].map(f => (
              <div key={f} className="auth-feature-item">
                <span className="auth-feature-dot" />{f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div style={{ marginBottom: 28 }}><Logo size={30} /></div>
          <h1 className="auth-title">Sign In to Credence Edge</h1>
          <p className="auth-subtitle">Enter your credentials to access your account</p>

          {/* Demo hint */}
          <div style={{ background: '#f0f7ff', border: '1px solid #c3d8f0', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 12.5, color: '#4a6080', lineHeight: 1.6 }}>
            💡 <strong>Demo:</strong> use an email containing "company" for company portal, "admin" for admin portal, or any other email for student portal.
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                <input className={`form-input${errors.email ? ' error' : ''}`} type="email" placeholder="you@email.com"
                  value={form.email} onChange={set('email')} style={{ paddingLeft: 36 }} />
              </div>
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" style={{ margin: 0 }}>Password <span style={{ color: '#ef4444' }}>*</span></label>
                <Link to="/forgot-password" style={{ fontSize: 12.5, color: '#1565c0', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                <input className={`form-input${errors.password ? ' error' : ''}`} type={showPw ? 'text' : 'password'} placeholder="Your password"
                  value={form.password} onChange={set('password')} style={{ paddingLeft: 36, paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7a9ec0', padding: 0 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '13px', fontSize: 15, marginTop: 4 }} disabled={loading}>
              {loading ? 'Signing in to Credence Edge…' : 'Sign In to Credence Edge →'}
            </button>

            <p className="auth-footer-text">
              Don't have a Credence Edge account?{' '}
              <button type="button" className="auth-footer-link" onClick={() => nav('/register')}>Join free</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
