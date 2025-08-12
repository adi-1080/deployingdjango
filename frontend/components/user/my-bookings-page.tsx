"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  id: string
  venueId: string
  venueName: string
  courtId: string
  courtName: string
  sport: string
  date: string
  time: string
  duration: number
  price: number
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("quickcourt_bookings") || "[]")
    setBookings(savedBookings)
  }, [])

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking,
    )
    setBookings(updatedBookings)
    localStorage.setItem("quickcourt_bookings", JSON.stringify(updatedBookings))

    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    })
  }

  const upcomingBookings = bookings.filter((booking) => {
    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    return bookingDate > new Date() && booking.status === "confirmed"
  })

  const pastBookings = bookings.filter((booking) => {
    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    return bookingDate <= new Date() || booking.status === "completed"
  })

  const cancelledBookings = bookings.filter((booking) => booking.status === "cancelled")

  const BookingCard = ({ booking, showCancel = false }: { booking: Booking; showCancel?: boolean }) => (
    <Card key={booking.id} className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-green-800">{booking.venueName}</CardTitle>
            <CardDescription className="text-green-600">
              {booking.courtName} • {booking.sport}
            </CardDescription>
          </div>
          <Badge
            variant={
              booking.status === "confirmed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"
            }
            className={
              booking.status === "confirmed"
                ? "bg-green-600"
                : booking.status === "cancelled"
                  ? "bg-red-600"
                  : "bg-gray-600"
            }
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-green-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-green-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {booking.time} ({booking.duration} hour{booking.duration > 1 ? "s" : ""})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Total Paid:</span>
            <span className="font-semibold text-green-800">${booking.price}</span>
          </div>
        </div>

        {showCancel && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCancelBooking(booking.id)}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel Booking
          </Button>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">My Bookings</h1>
        <p className="text-green-600">Manage your court reservations</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcomingBookings.length === 0 ? (
            <Card className="border-green-200">
              <CardContent className="text-center py-8">
                <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">No Upcoming Bookings</h3>
                <p className="text-green-600 mb-4">You don't have any upcoming court reservations.</p>
                <Button className="bg-green-600 hover:bg-green-700">Browse Venues</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} showCancel={true} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastBookings.length === 0 ? (
            <Card className="border-green-200">
              <CardContent className="text-center py-8">
                <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">No Past Bookings</h3>
                <p className="text-green-600">Your booking history will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          {cancelledBookings.length === 0 ? (
            <Card className="border-green-200">
              <CardContent className="text-center py-8">
                <X className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">No Cancelled Bookings</h3>
                <p className="text-green-600">You haven't cancelled any bookings.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {cancelledBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
