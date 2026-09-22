import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import API from '@/api/axios'
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
    const initAuth = async () => {
      try {
        // Seed the CSRF cookie so subsequent POST/PUT/DELETE requests are accepted.
        // Failures here are non-fatal (e.g. backend not yet running).
        await API.get("/auth/csrf").catch(() => {});

        // Try to load the current user from the access-token cookie.
        // If that fails with 401, the axios interceptor will automatically
        // attempt POST /auth/refresh before this catch block is reached.
        const res = await getMe();
        setUser(res?.user || res || null);
      } catch {
        // Both /auth/me and the silent refresh failed → user is not logged in.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await loginUser({ email, password })
    const { user, redirectPath } = response;
    setUser(user);
    return { success: true, role: user.role, redirectPath };
  }, [])

  const register = useCallback(async (data) => {
    // registerUser returns { email, requiresOtp: true }
    // Do NOT set the user yet — they must complete OTP first.
    return await registerUser(data)
  }, [])

  const logout = useCallback(async () => {
    try { await logoutUser(); } catch { /* ignore */ }
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates) => {
    const res = await updateProfile(updates)
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
