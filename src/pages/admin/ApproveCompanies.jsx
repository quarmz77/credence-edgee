import { useState } from 'react'
import toast from 'react-hot-toast'

const MOCK_COMPANIES = [
  { id: 1, name: 'TechBridge Ltd', industry: 'Technology', status: 'Pending' },
  { id: 2, name: 'AdVantage Ghana', industry: 'Marketing', status: 'Approved' },
]

const ApproveCompanies = () => {
  const [companies, setCompanies] = useState(MOCK_COMPANIES)
  const approve = (id) => {
    setCompanies(c => c.map(x => x.id === id ? { ...x, status: 'Approved' } : x))
    toast.success('Company approved on Credence Edge!')
  }
  return (
    <div className="animate-fade-up">
      <div className="dash-header">
        <h1>Approve Companies</h1>
        <p>Verify company profiles before they can post on Credence Edge.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {companies.map(c => (
          <div key={c.id} className="card" style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700 }}>{c.name}</h3>
              <p style={{ fontSize: 12.5, color: '#7a9ec0' }}>{c.industry}</p>
            </div>
            {c.status === 'Pending'
              ? <button className="btn btn-primary btn-sm" onClick={() => approve(c.id)}>Approve</button>
              : <span className="pill pill-green">Approved</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApproveCompanies
