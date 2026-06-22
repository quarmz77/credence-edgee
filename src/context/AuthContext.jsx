import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const BASE_USER = {
  id: 'u1',
  name: 'Annastasia Amarachi',
  email: 'annastasia@gmail.com',
  role: 'student',
  university: 'University of Ghana',
  programme: 'BSc Computer Science',
  phone: '0244123456',
  location: 'Accra, Ghana',
  skills: ['Design', 'Marketing', 'Data'],
  subscribed: true,
  profileComplete: true,
  avatar: null,
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken]     = useState(null)

  useEffect(() => {
    const stored      = localStorage.getItem('ce_user')
    const storedToken = localStorage.getItem('ce_token')
    if (stored && storedToken) {
      try { setUser(JSON.parse(stored)); setToken(storedToken) } catch {}
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    await new Promise(r => setTimeout(r, 800))
    const mockToken = 'ce_token_' + Date.now()

    let role = 'student'
    if (email.toLowerCase().includes('company') || email.toLowerCase().includes('business')) role = 'company'
    else if (email.toLowerCase().includes('admin'))    role = 'admin'
    else if (email.toLowerCase().includes('graduate')) role = 'graduate'

    const user = { ...BASE_USER, email, role }
    setUser(user)
    setToken(mockToken)
    localStorage.setItem('ce_user',  JSON.stringify(user))
    localStorage.setItem('ce_token', mockToken)
    return { success: true, role }
  }, [])

  const register = useCallback(async (data) => {
    await new Promise(r => setTimeout(r, 900))
    const newUser   = { ...BASE_USER, ...data, id: 'u' + Date.now() }
    const mockToken = 'ce_token_' + Date.now()
    setUser(newUser)
    setToken(mockToken)
    localStorage.setItem('ce_user',  JSON.stringify(newUser))
    localStorage.setItem('ce_token', mockToken)
    return { success: true, role: data.role }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ce_user')
    localStorage.removeItem('ce_token')
  }, [])

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('ce_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout, updateUser,
      isAuthenticated: !!user,
      isStudent:  user?.role === 'student',
      isGraduate: user?.role === 'graduate',
      isCompany:  user?.role === 'company',
      isAdmin:    user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
