import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return children
  if (user?.role === 'admin')   return <Navigate to="/admin" replace />
  if (user?.role === 'company') return <Navigate to="/company" replace />
  return <Navigate to="/student-dashboard" replace />
}

export default PublicRoute
