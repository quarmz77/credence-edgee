import { Outlet } from 'react-router-dom'

const AuthLayout = () => (
  <div style={{ minHeight: '100vh', background: '#f0f7ff' }}>
    <Outlet />
  </div>
)

export default AuthLayout
