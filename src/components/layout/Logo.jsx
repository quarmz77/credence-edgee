const Logo = ({ size = 32, showText = true, light = false }) => {
  const textColor = light ? '#fff' : '#0d1f35'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      <img
        src="/credify-favicon.svg"
        alt="Credify logo"
        width={size}
        height={size}
        style={{ display: 'block', borderRadius: size * 0.25, objectFit: 'contain' }}
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: size * 0.48, color: textColor, letterSpacing: '-0.5px' }}>Credify</span>
        </div>
      )}
    </div>
  )
}

export default Logo
