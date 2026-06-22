import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Loader from '@/components/common/Loader'

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loader fullScreen />
  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'admin')   return <Navigate to="/admin" replace />
    if (user.role === 'company') return <Navigate to="/company" replace />
    return <Navigate to="/student-dashboard" replace />
  }
  return children
}

export default RoleBasedRoute
