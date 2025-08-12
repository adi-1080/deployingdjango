"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { OwnerDashboardHome } from "@/components/facility-owner/dashboard-home"
import { FacilityManagement } from "@/components/facility-owner/facility-management"
import { CourtManagement } from "@/components/facility-owner/court-management"
import { BookingOverview } from "@/components/facility-owner/booking-overview"
import { TimeSlotManagement } from "@/components/facility-owner/time-slot-management"
import { OwnerProfile } from "@/components/facility-owner/owner-profile"

type OwnerView = "dashboard" | "facilities" | "courts" | "bookings" | "time-slots" | "profile"

export function FacilityOwnerDashboard() {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState<OwnerView>("dashboard")

  const renderContent = () => {
    switch (currentView) {
      case "facilities":
        return <FacilityManagement />
      case "courts":
        return <CourtManagement />
      case "bookings":
        return <BookingOverview />
      case "time-slots":
        return <TimeSlotManagement />
      case "profile":
        return <OwnerProfile />
      default:
        return <OwnerDashboardHome />
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
                <h1 className="text-xl font-semibold text-green-800">QuickCourt - Owner Portal</h1>
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
                onClick={() => setCurrentView("facilities")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "facilities" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Facilities
              </button>
              <button
                onClick={() => setCurrentView("courts")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "courts" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Courts
              </button>
              <button
                onClick={() => setCurrentView("bookings")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "bookings" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setCurrentView("time-slots")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "time-slots" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Time Slots
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
