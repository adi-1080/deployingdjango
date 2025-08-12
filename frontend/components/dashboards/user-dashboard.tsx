"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { HomePage } from "@/components/user/home-page"
import { VenuesPage } from "@/components/user/venues-page"
import { VenuePage } from "@/components/user/venue-page"
import { BookingPage } from "@/components/user/booking-page"
import { MyBookingsPage } from "@/components/user/my-bookings-page"
import { ProfilePage } from "@/components/user/profile-page"

type UserView = "home" | "venues" | "venue" | "booking" | "my-bookings" | "profile"

export function UserDashboard() {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState<UserView>("home")
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null)
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null)

  const handleViewVenue = (venueId: string) => {
    setSelectedVenueId(venueId)
    setCurrentView("venue")
  }

  const handleBookCourt = (venueId: string, courtId: string) => {
    setSelectedVenueId(venueId)
    setSelectedCourtId(courtId)
    setCurrentView("booking")
  }

  const handleBookingSuccess = () => {
    setCurrentView("my-bookings")
  }

  const renderContent = () => {
    switch (currentView) {
      case "venues":
        return <VenuesPage onViewVenue={handleViewVenue} />
      case "venue":
        return (
          <VenuePage venueId={selectedVenueId!} onBookCourt={handleBookCourt} onBack={() => setCurrentView("venues")} />
        )
      case "booking":
        return (
          <BookingPage
            venueId={selectedVenueId!}
            courtId={selectedCourtId!}
            onSuccess={handleBookingSuccess}
            onBack={() => setCurrentView("venue")}
          />
        )
      case "my-bookings":
        return <MyBookingsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage onViewVenues={() => setCurrentView("venues")} onViewVenue={handleViewVenue} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <header className="bg-white border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentView("home")}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">QC</span>
                </div>
                <h1 className="text-xl font-semibold text-green-800">QuickCourt</h1>
              </button>
            </div>

            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentView("home")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "home" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView("venues")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "venues" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                Venues
              </button>
              <button
                onClick={() => setCurrentView("my-bookings")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "my-bookings" ? "text-green-700" : "text-green-600 hover:text-green-700"
                }`}
              >
                My Bookings
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
