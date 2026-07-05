const Logo = ({ size = 32, showText = true, light = false }) => {
  const textColor = light ? '#fff' : '#0d1f35'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ceBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0a1628"/><stop offset="100%" stopColor="#0a2618"/></linearGradient>
          <linearGradient id="ceG1" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1a6fd4"/><stop offset="100%" stopColor="#22c97a"/></linearGradient>
          <linearGradient id="ceG2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#1248a8"/><stop offset="100%" stopColor="#1dbf86"/></linearGradient>
          <linearGradient id="ceG3" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22c97a"/><stop offset="100%" stopColor="#3de89a"/></linearGradient>
        </defs>
        <rect width="40" height="40" rx="9" fill="url(#ceBg)"/>
        <rect x="4" y="14" width="14" height="13" rx="2" transform="skewX(-8)" fill="url(#ceG1)" opacity="0.95"/>
        <rect x="13" y="15" width="14" height="13" rx="2" transform="skewX(-8)" fill="url(#ceG2)" opacity="0.90"/>
        <polygon points="26,5 35,5 35,14 31.5,10.5 27.5,14.5 23.5,10.5" fill="url(#ceG3)"/>
        <line x1="5" y1="30" x2="27" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: size * 0.48, color: textColor, letterSpacing: '-0.5px' }}>Credify</span>
        </div>
      )}
    </div>
  )
}

export default Logo
