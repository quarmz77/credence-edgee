const Loader = ({ fullScreen = false, size = 36 }) => {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ width: size, height: size, border: '3px solid #e1ecf8', borderTopColor: '#0f3460', borderRightColor: '#0d7a52', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <p style={{ fontSize: 14, color: '#7a9ec0', fontWeight: 500 }}>Loading Credence Edge…</p>
    </div>
  )
  if (fullScreen) return (
    <div style={{ position: 'fixed', inset: 0, background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>{content}</div>
  )
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>{content}</div>
}

export default Loader
