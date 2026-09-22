import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Loader from '@/components/common/Loader'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth()

  // Wait until the auth state is determined before rendering anything.
  // Without this, the login page flashes briefly even for logged-in users.
  if (loading) return <Loader fullScreen />

  if (!isAuthenticated) return children
  if (user?.role === 'admin')   return <Navigate to="/admin" replace />
  if (user?.role === 'company') return <Navigate to="/company" replace />
  return <Navigate to="/student-dashboard" replace />
}

export default PublicRoute
