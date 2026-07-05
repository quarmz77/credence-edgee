import { useState } from 'react'
import Button from '@/components/common/Button'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    toast.success('Message sent to Credify! We\'ll reply within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 40px' }}>
      <div style={{ marginBottom: 52 }}>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Contact Credify</h1>
        <p style={{ color: '#4a6080', fontSize: 15 }}>Students, companies, partners and press — we'd love to hear from you.</p>
      </div>

      <div className="grid-2" style={{ gap: 40, alignItems: 'start' }}>
        <div className="card" style={{ padding: '36px' }}>
          <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Send a Message</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Full Name <span style={{ color: '#ef4444' }}>*</span></label>
              <input className="form-input" placeholder="e.g. Kwame Asante" value={form.name} onChange={set('name')} />
            </div>
            <div className="form-group">
              <label className="form-label">Email <span style={{ color: '#ef4444' }}>*</span></label>
              <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-input" value={form.subject} onChange={set('subject')}>
                <option value="">Select a topic</option>
                {['General Enquiry', 'Student Support', 'Company Partnership', 'Technical Issue', 'Press / Media'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message <span style={{ color: '#ef4444' }}>*</span></label>
              <textarea className="form-input" rows={5} placeholder="Tell the Credify team what you need..." value={form.message} onChange={set('message')} style={{ resize: 'vertical' }} />
            </div>
            <Button type="submit" loading={loading} block>Send to Credify →</Button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: <Mail size={20} />, title: 'Email', value: 'hello@credify.com.gh', sub: 'We reply within 24 hours' },
            { icon: <Phone size={20} />, title: 'Phone / WhatsApp', value: '+233 XX XXX XXXX', sub: 'Mon–Fri, 9am–6pm GMT' },
            { icon: <MapPin size={20} />, title: 'Location', value: 'Accra, Ghana 🇬🇭', sub: 'Remote-first team' },
          ].map(item => (
            <div key={item.title} className="card" style={{ padding: '22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: 'linear-gradient(135deg,rgba(15,52,96,0.08),rgba(13,122,82,0.08))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0',
              }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#7a9ec0', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0d1f35', marginBottom: 2 }}>{item.value}</div>
                <div style={{ fontSize: 12.5, color: '#7a9ec0' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact
