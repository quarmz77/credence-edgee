import { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null
  const widths = { sm: 420, md: 560, lg: 720, xl: 900 }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,22,40,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 18, width: '100%', maxWidth: widths[size], maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(10,22,40,0.22)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #e1ecf8', flexShrink: 0 }}>
          <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 18, fontWeight: 700, color: '#0d1f35' }}>{title}</h2>
          <button onClick={onClose} style={{ background: '#f0f7ff', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a6080' }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && (
          <div style={{ padding: '16px 28px', borderTop: '1px solid #e1ecf8', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
