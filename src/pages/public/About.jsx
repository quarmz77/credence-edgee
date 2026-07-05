import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { GraduationCap } from 'lucide-react'
import { Building2 } from 'lucide-react'
import {Shield} from 'lucide-react'


const About = () => {
  const nav = useNavigate()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 40px' }}>
      <div style={{ marginBottom: 52 }}>
        <h1 className="section-title" style={{ fontSize: 44, marginBottom: 16 }}>About Credify</h1>
        <p style={{ fontSize: 18, color: '#4a6080', lineHeight: 1.8, maxWidth: 680 }}>
          Credify is a private, project-based learning and verification platform where African students gain real experience and pay for credible proof of their skills.
        </p>
      </div>

      <div className="card" style={{ padding: '36px', marginBottom: 28, background: 'linear-gradient(135deg,rgba(15,52,96,0.05),rgba(13,122,82,0.05))', border: '1px solid #c3d8f0' }}>
        <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 14 }}>Our Mission</h2>
        <p style={{ fontSize: 15, color: '#4a6080', lineHeight: 1.8 }}>
          Too many graduates struggle to prove what they can actually do. Credify changes that — by connecting students to real work, rating their output honestly, and issuing verifiable credentials that employers and companies can trust.
        </p>
      </div>

      <div className="grid-2" style={{ gap: 22, marginBottom: 36 }}>
        {[
          [<User size={30} key="students" />, 'For Students', 'Build a verified skills portfolio on Credify. Complete real projects and get GHS 20 certificates that employers can verify by unique ID.'],
          [<GraduationCap size={30} key="graduates" />, 'For Graduates', 'Bridge the gap between education and employment. Prove your skills with real, rated output on Credify — not just a degree certificate.'],
          [<Building2 size={30} key="companies" />, 'For Companies', 'Post real tasks on Credify and discover talented students through verified work.'],
          [<Shield size={30} key="privacy" />, 'Privacy First', 'All Credify project selections, submissions and reviewer feedback are completely private.'],
        ].map(([icon, title, desc]) => (
          <div key={title} className="card" style={{ padding: '26px' }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>{icon}</div>
            <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#0d1f35' }}>{title}</h3>
            <p style={{ fontSize: 14, color: '#4a6080', lineHeight: 1.65 }}>{desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg,#0a1628,#0a3d2a)', borderRadius: 16, padding: '44px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
          Join Credify Today
        </h2>
        <p style={{ color: 'rgba(163,230,208,0.8)', fontSize: 15, marginBottom: 28 }}>
          Start building your verified skills portfolio on Credify for free.
        </p>
        <button className="btn btn-primary" onClick={() => nav('/register')}>Create Free Account</button>
      </div>
    </div>
  )
}

export default About
