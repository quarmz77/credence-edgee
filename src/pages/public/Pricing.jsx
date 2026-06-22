import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const PLANS = [
  { label: 'Free', price: 'GHS 0', sub: 'forever free', primary: false,
    features: ['Browse all Credence Edge projects', 'Enrol in all Credence Edge courses', 'Free downloadable Credence Edge badges', 'Private student dashboard', 'Credence Edge leaderboard ranking'],
    cta: 'Join Credence Edge Free' },
  { label: 'Certificate', price: 'GHS 20', sub: 'per certificate', primary: true,
    features: ['Everything in Free', 'Verified Credence Edge certificate PDF', 'Unique Credence Edge verification ID', 'Performance rating on certificate', 'Employer-ready and shareable'],
    cta: 'Get Started Free' },
]

const FAQ = [
  ['Do I need to pay to access Credence Edge projects?', 'No. Browsing and starting projects on Credence Edge is completely free. You only pay GHS 20 when you want a verified certificate.'],
  ['How do I pay for a Credence Edge certificate?', 'Credence Edge accepts MTN Mobile Money, Vodafone Cash, and AirtelTigo Money.'],
  ['Is there a subscription fee on Credence Edge?', 'No. Credence Edge is free to use, with a one-time GHS 20 fee per certificate.'],
]

const Pricing = () => {
  const nav = useNavigate()
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h1 className="section-title" style={{ marginBottom: 12, fontSize: 42 }}>Credence Edge Pricing</h1>
        <p style={{ color: '#4a6080', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Join Credence Edge free. Pay only when you want a verified certificate.
        </p>
      </div>

      <div className="grid-2" style={{ gap: 24, marginBottom: 64 }}>
        {PLANS.map(p => (
          <div key={p.label} className="card" style={{ padding: '36px', border: p.primary ? '2px solid #1565c0' : '1px solid #e1ecf8', position: 'relative' }}>
            {p.primary && (
              <div style={{ position: 'absolute', top: 18, right: 18, background: 'linear-gradient(135deg,#1565c0,#10a070)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>BEST VALUE</div>
            )}
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 12, fontWeight: 800, color: p.primary ? '#1565c0' : '#7a9ec0', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 14 }}>{p.label}</div>
            <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 40, fontWeight: 800, color: '#0d1f35' }}>{p.price}</div>
            <div style={{ fontSize: 13, color: '#7a9ec0', marginBottom: 28 }}>{p.sub}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={15} color="#0d7a52" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#0d1f35' }}>{f}</span>
                </div>
              ))}
            </div>
            <button className={`btn ${p.primary ? 'btn-primary' : 'btn-outline'} btn-block`} onClick={() => nav('/register')}>{p.cta}</button>
          </div>
        ))}
      </div>

      <div>
        <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 28, textAlign: 'center' }}>
          Credence Edge — FAQ
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQ.map(([q, a]) => (
            <div key={q} className="card" style={{ padding: '22px 26px' }}>
              <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, color: '#0d1f35', marginBottom: 8 }}>{q}</h3>
              <p style={{ fontSize: 14, color: '#4a6080', lineHeight: 1.65 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
