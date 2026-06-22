import { useState } from 'react'
import { useUserStore } from '@/store/userStore'
import { SkillTag } from '@/components/badge/RatingBadge'
import RatingBadge from '@/components/badge/RatingBadge'
import Modal from '@/components/common/Modal'
import EmptyState from '@/components/common/EmptyState'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'

const Certificates = () => {
  const { badges, markCertPaid } = useUserStore()
  const { user } = useAuth()
  const [payModal, setPayModal] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [method, setMethod]     = useState('mtn')

  const eligible = badges.filter(b => b.certEligible)

  const handlePay = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    markCertPaid(payModal.id)
    setLoading(false)
    setPayModal(null)
    toast.success('🎉 Credence Edge certificate issued! Check your downloads.')
  }

  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Credence Edge Certificates</h1>
        <p>Pay GHS 20 per certificate. Includes a unique verification ID and your performance rating.</p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg,#0a1628,#0a3d2a)', borderRadius: 16,
        padding: '24px 28px', marginBottom: 28, display: 'flex', alignItems: 'center',
        gap: 24, flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            What's in a Credence Edge Certificate?
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Your full name', 'Project title', 'Skill category', 'Performance rating', 'Unique verification ID', 'Issue date'].map(item => (
              <span key={item} style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '4px 12px' }}>
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 36, fontWeight: 800, background: 'linear-gradient(90deg,#4dd9a8,#90caf9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GHS 20</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>per certificate</div>
        </div>
      </div>

      {eligible.length === 0 ? (
        <EmptyState icon="📜" title="No certificates yet" description="Complete a Credence Edge project and receive a rating to become eligible." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {eligible.map(b => (
            <div key={b.id} className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <SkillTag skill={b.skill} />
                  <RatingBadge rating={b.rating} />
                </div>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700 }}>{b.title}</h3>
              </div>
              {b.certPaid
                ? <span className="pill pill-green">✓ Certificate Issued</span>
                : <button className="btn btn-primary btn-sm" onClick={() => setPayModal(b)}>Pay GHS 20 →</button>}
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!payModal} onClose={() => setPayModal(null)} title="Get Your Credence Edge Certificate" size="sm"
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setPayModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={handlePay} disabled={loading}>
              {loading ? 'Processing…' : 'Pay GHS 20 →'}
            </button>
          </>
        }>
        {payModal && (
          <div>
            <p style={{ fontSize: 14, color: '#4a6080', marginBottom: 20 }}>
              Pay GHS 20 to receive your verified Credence Edge certificate for <strong>{payModal.title}</strong>.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['mtn', '🟡 MTN Mobile Money'], ['vodafone', '🔴 Vodafone Cash'], ['airteltigo', '🔵 AirtelTigo Money']].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, border: `1.5px solid ${method === key ? '#1565c0' : '#c3d8f0'}`, cursor: 'pointer' }}>
                  <input type="radio" checked={method === key} onChange={() => setMethod(key)} />
                  {label}
                </label>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Certificates
