import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => (
  <footer style={{ background: '#0a1628', padding: '56px 40px 32px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
        <div>
          <Logo size={30} light />
          <p style={{ fontSize: 14, lineHeight: 1.75, marginTop: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 300 }}>
            Credify is a private, project-based learning and verification platform where African students gain experience and pay for credible proof of their skills.
          </p>
          <p style={{ fontSize: 13, marginTop: 16, color: 'rgba(255,255,255,0.4)' }}>🇬🇭 Made in Ghana</p>
        </div>
        {[
          { title: 'Platform', links: [{ to: '/projects', label: 'Projects' }, { to: '/pricing', label: 'Pricing' }] },
          { title: 'Company',  links: [{ to: '/about', label: 'About Credify' }, { to: '/contact', label: 'Contact Us' }] },
          { title: 'Account',  links: [{ to: '/register', label: 'Join Free' }, { to: '/login', label: 'Log In' }] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1px' }}>{col.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(link => (
                <NavLink key={link.to} to={link.to} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>© 2026 Credify. All rights reserved.</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Certificate Price: GHS 20 · Mobile Money Accepted</p>
      </div>
    </div>
  </footer>
)

export default Footer
