"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "user" | "facility_owner" | "admin"

export interface User {
  id: string
  email: string
  fullName: string
  avatar?: string
  role: UserRole
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, fullName: string, role: UserRole, avatar?: string) => Promise<boolean>
  verifyOTP: (otp: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  pendingUser: Omit<User, "isVerified"> | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [pendingUser, setPendingUser] = useState<Omit<User, "isVerified"> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("quickcourt_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "1",
      email,
      fullName: email === "admin@quickcourt.com" ? "Admin User" : "John Doe",
      role: email === "admin@quickcourt.com" ? "admin" : "user",
      isVerified: true,
    }

    setUser(mockUser)
    localStorage.setItem("quickcourt_user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const signup = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    avatar?: string,
  ): Promise<boolean> => {
    setIsLoading(true)

    // Mock signup - in real app, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Date.now().toString(),
      email,
      fullName,
      role,
      avatar,
    }

    setPendingUser(newUser)
    setIsLoading(false)
    return true
  }

  const verifyOTP = async (otp: string): Promise<boolean> => {
    if (!pendingUser) return false

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock OTP verification
    if (otp === "123456") {
      const verifiedUser: User = { ...pendingUser, isVerified: true }
      setUser(verifiedUser)
      localStorage.setItem("quickcourt_user", JSON.stringify(verifiedUser))
      setPendingUser(null)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    setPendingUser(null)
    localStorage.removeItem("quickcourt_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        verifyOTP,
        logout,
        isLoading,
        pendingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
