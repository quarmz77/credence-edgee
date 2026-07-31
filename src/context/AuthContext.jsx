import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { registerUser, getMe, loginUser, updateProfile } from '@/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('ce_token')

    if (!storedToken) {
      setLoading(false)
      return
    }

    // getMe uses the token from the axios interceptor (ce_token in localStorage)
    getMe()
      .then((res) => {
        // Backend: { success, data: { user } } → authService returns res.data.data → { user }
        const userData = res?.user || res
        setUser(userData)
        setToken(storedToken)
      })
      .catch(() => {
        localStorage.removeItem('ce_user')
        localStorage.removeItem('ce_token')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const login = useCallback(async (email, password) => {
    const response = await loginUser({ email, password })
    // authService.loginUser returns res.data.data → { accessToken, user }
    const { accessToken, user } = response

    setUser(user)
    setToken(accessToken)

    localStorage.setItem('ce_user', JSON.stringify(user))
    localStorage.setItem('ce_token', accessToken)
    return { success: true, role: user.role || 'user' }
  }, [])

  const register = useCallback(async (data) => {
    const response = await registerUser(data)
    // After the OTP flow: registerUser returns { email, requiresOtp: true }
    // Do NOT set user/token yet — the user must verify OTP first
    return response
  }, [])

  const loginWithToken = useCallback((accessToken, userData) => {
    setUser(userData)
    setToken(accessToken)
    localStorage.setItem('ce_user', JSON.stringify(userData))
    localStorage.setItem('ce_token', accessToken)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ce_user')
    localStorage.removeItem('ce_token')
  }, [])

  const updateUser = useCallback(async (updates) => {
    const res = await updateProfile(updates)
    // authService.updateProfile returns res.data.data → { user }
    const updatedUser = res?.user || res
    setUser(updatedUser)
    localStorage.setItem('ce_user', JSON.stringify(updatedUser))
    return updatedUser
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginWithToken,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isGraduate: user?.role === 'graduate',
        isCompany: user?.role === 'company',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
