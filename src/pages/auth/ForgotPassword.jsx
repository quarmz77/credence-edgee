import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/layout/Logo'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft } from 'lucide-react'

const ForgotPassword = () => {
  const nav = useNavigate()
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) { toast.error('Enter your Credence Edge email address'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
    toast.success('Reset link sent!')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f7ff', padding: 20 }}>
      <div className="card" style={{ width: '100%', maxWidth: 440, padding: '44px' }}>
        <div style={{ marginBottom: 28 }}><Logo size={30} /></div>
        {!sent ? (
          <>
            <h1 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Reset Your Credence Edge Password
            </h1>
            <p style={{ color: '#4a6080', fontSize: 14, marginBottom: 28 }}>
              Enter your Credence Edge email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Credence Edge Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7a9ec0' }} />
                  <input className="form-input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: 36 }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ padding: '12px' }} disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Check Your Email</h2>
            <p style={{ color: '#4a6080', fontSize: 14, lineHeight: 1.65, marginBottom: 28 }}>
              We sent a Credence Edge password reset link to <strong>{email}</strong>.
            </p>
            <button className="btn btn-primary btn-block" onClick={() => nav('/login')}>Back to Credence Edge Sign In</button>
          </div>
        )}
        <button onClick={() => nav('/login')} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#7a9ec0', fontSize: 13.5, fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back to Sign In
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
