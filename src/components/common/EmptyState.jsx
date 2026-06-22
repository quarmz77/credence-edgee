const EmptyState = ({ icon = '📭', title = 'Nothing here yet', description = '', action }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 20px', textAlign: 'center' }}>
    <div style={{ fontSize: 52, marginBottom: 16 }}>{icon}</div>
    <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 18, fontWeight: 700, color: '#0d1f35', marginBottom: 8 }}>{title}</h3>
    {description && <p style={{ fontSize: 14, color: '#4a6080', maxWidth: 360, lineHeight: 1.65, marginBottom: 24 }}>{description}</p>}
    {action && action}
  </div>
)

export default EmptyState
