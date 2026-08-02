import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  registerUser,
  getMe,
  loginUser,
  updateProfile,
  logoutUser,
} from "@/services/authService";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
useEffect(() => {
  getMe()
    .then((res) => {
      const userData = res?.user || res;
      setUser(userData);
    })
    .catch(() => {
      setUser(null);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
  

  const login = useCallback(async (email, password) => {
    const response = await loginUser({ email, password })
    const { user, redirectPath } = response;

    setUser(user);

    return {
      success: true,
      role: user.role,
      redirectPath,
    };
  }, [])

  const register = useCallback(async (data) => {
    const response = await registerUser(data)
    // After the OTP flow: registerUser returns { email, requiresOtp: true }
    // Do NOT set user/token yet — the user must verify OTP first
    return response
  }, [])

  

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates) => {
    const res = await updateProfile(updates)
    // authService.updateProfile returns res.data.data → { user }
    const updatedUser = res?.user || res
    setUser(updatedUser)
    return updatedUser
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        setUser,
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
