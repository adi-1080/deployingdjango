"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { LoginPage } from "@/components/auth/login-page"
import { SignupPage } from "@/components/auth/signup-page"
import { OTPVerification } from "@/components/auth/otp-verification"
import { UserDashboard } from "@/components/dashboards/user-dashboard"
import { FacilityOwnerDashboard } from "@/components/dashboards/facility-owner-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { useState } from "react"

type AuthView = "login" | "signup" | "otp"

export function AppRouter() {
  const { user, pendingUser, isLoading } = useAuth()
  const [authView, setAuthView] = useState<AuthView>("login")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-green-600 text-lg">Loading QuickCourt...</div>
      </div>
    )
  }

  // Show OTP verification if user just signed up
  if (pendingUser && !user) {
    return <OTPVerification onBack={() => setAuthView("signup")} />
  }

  // Show auth pages if not logged in
  if (!user) {
    switch (authView) {
      case "signup":
        return <SignupPage onSwitchToLogin={() => setAuthView("login")} onSignupSuccess={() => setAuthView("otp")} />
      default:
        return <LoginPage onSwitchToSignup={() => setAuthView("signup")} />
    }
  }

  // Show role-based dashboard
  switch (user.role) {
    case "admin":
      return <AdminDashboard />
    case "facility_owner":
      return <FacilityOwnerDashboard />
    default:
      return <UserDashboard />
  }
}
