"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { AdminDashboardHome } from "@/components/admin/dashboard-home"
import { FacilityApproval } from "@/components/admin/facility-approval"
import { UserManagement } from "@/components/admin/user-management"
import { ReportsModeration } from "@/components/admin/reports-moderation"
import { AdminProfile } from "@/components/admin/admin-profile"

type AdminView = "dashboard" | "facility-approval" | "user-management" | "reports" | "profile"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState<AdminView>("dashboard")

  const renderContent = () => {
    switch (currentView) {
      case "facility-approval":
        return <FacilityApproval />
      case "user-management":
        return <UserManagement />
      case "reports":
        return <ReportsModeration />
      case "profile":
        return <AdminProfile />
      default:
        return <AdminDashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentView("dashboard")}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">QC</span>
                </div>
                <h1 className="text-xl font-semibold text-green-800">QuickCourt - Admin Panel</h1>
              </button>
            </div>

            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "dashboard" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView("facility-approval")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "facility-approval" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Facility Approvals
              </button>
              <button
                onClick={() => setCurrentView("user-management")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "user-management" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setCurrentView("reports")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "reports" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Reports
              </button>
              <button
                onClick={() => setCurrentView("profile")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "profile" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Profile
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-green-700 hidden sm:block">Welcome, {user?.fullName}</span>
              <Button
                onClick={logout}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>{renderContent()}</main>
    </div>
  )
}
