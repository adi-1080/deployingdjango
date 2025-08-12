"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Search, Filter } from "lucide-react"

interface Booking {
  id: string
  userName: string
  userEmail: string
  courtName: string
  sport: string
  date: string
  time: string
  duration: number
  price: number
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

const mockBookings: Booking[] = [
  {
    id: "1",
    userName: "John Smith",
    userEmail: "john@example.com",
    courtName: "Badminton Court 1",
    sport: "Badminton",
    date: "2024-01-20",
    time: "10:00",
    duration: 2,
    price: 50,
    status: "confirmed",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    courtName: "Tennis Court 2",
    sport: "Tennis",
    date: "2024-01-20",
    time: "14:00",
    duration: 1,
    price: 30,
    status: "confirmed",
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "3",
    userName: "Mike Wilson",
    userEmail: "mike@example.com",
    courtName: "Badminton Court 2",
    sport: "Badminton",
    date: "2024-01-19",
    time: "16:00",
    duration: 1,
    price: 25,
    status: "completed",
    createdAt: "2024-01-14T09:15:00Z",
  },
  {
    id: "4",
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    courtName: "Tennis Court 1",
    sport: "Tennis",
    date: "2024-01-18",
    time: "11:00",
    duration: 2,
    price: 60,
    status: "cancelled",
    createdAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    userName: "Alex Brown",
    userEmail: "alex@example.com",
    courtName: "Badminton Court 1",
    sport: "Badminton",
    date: "2024-01-21",
    time: "09:00",
    duration: 1,
    price: 25,
    status: "confirmed",
    createdAt: "2024-01-17T11:20:00Z",
  },
]

export function BookingOverview() {
  const [bookings] = useState<Booking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sportFilter, setSportFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.courtName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesSport = sportFilter === "all" || booking.sport.toLowerCase() === sportFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesSport
  })

  const upcomingBookings = filteredBookings.filter((booking) => {
    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    return bookingDate > new Date() && booking.status === "confirmed"
  })

  const todayBookings = filteredBookings.filter((booking) => {
    const today = new Date().toISOString().split("T")[0]
    return booking.date === today && booking.status === "confirmed"
  })

  const pastBookings = filteredBookings.filter((booking) => {
    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    return bookingDate <= new Date() || booking.status === "completed"
  })

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-green-800 flex items-center">
              <User className="w-4 h-4 mr-2" />
              {booking.userName}
            </CardTitle>
            <CardDescription className="text-green-600">{booking.userEmail}</CardDescription>
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-green-600">Court:</span>
            <span className="text-green-800 font-medium">{booking.courtName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Sport:</span>
            <Badge variant="secondary">{booking.sport}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Date:
            </span>
            <span className="text-green-800">{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Time:
            </span>
            <span className="text-green-800">
              {booking.time} ({booking.duration}h)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Amount:</span>
            <span className="text-green-800 font-semibold">${booking.price}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-600">Booked:</span>
            <span className="text-green-800 text-sm">{new Date(booking.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Booking Overview</h1>
        <p className="text-green-600">View and manage all court bookings</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-green-800">{bookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Today's Bookings</p>
                <p className="text-2xl font-bold text-green-800">{todayBookings.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-green-800">{upcomingBookings.length}</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-green-800">
                  ${bookings.reduce((sum, booking) => sum + booking.price, 0)}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">$</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-200 mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sportFilter} onValueChange={setSportFilter}>
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue placeholder="Filter by sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="badminton">Badminton</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="squash">Squash</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({filteredBookings.length})</TabsTrigger>
          <TabsTrigger value="today">Today ({todayBookings.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="today" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredBookings.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">No Bookings Found</h3>
            <p className="text-green-600">No bookings match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
