"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, MapPin, Users, TrendingUp, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  EnhancedAreaChart,
  EnhancedPieChart,
  ComboChart,
  HeatmapChart,
  useRealTimeData,
} from "@/components/charts/enhanced-charts"

const kpiData = {
  totalBookings: 156,
  activeCourts: 8,
  monthlyEarnings: 12450,
  todayBookings: 12,
}

const bookingTrends = [
  { name: "Mon", bookings: 12, earnings: 480 },
  { name: "Tue", bookings: 15, earnings: 600 },
  { name: "Wed", bookings: 18, earnings: 720 },
  { name: "Thu", bookings: 22, earnings: 880 },
  { name: "Fri", bookings: 28, earnings: 1120 },
  { name: "Sat", bookings: 35, earnings: 1400 },
  { name: "Sun", bookings: 30, earnings: 1200 },
]

const earningsData = [
  { month: "Jan", earnings: 8500 },
  { month: "Feb", earnings: 9200 },
  { month: "Mar", earnings: 11800 },
  { month: "Apr", earnings: 12450 },
]

const peakHours = [
  { hour: "6-8 AM", bookings: 8, color: "#10b981" },
  { hour: "8-10 AM", bookings: 15, color: "#059669" },
  { hour: "10-12 PM", bookings: 12, color: "#047857" },
  { hour: "12-2 PM", bookings: 18, color: "#065f46" },
  { hour: "2-4 PM", bookings: 22, color: "#064e3b" },
  { hour: "4-6 PM", bookings: 35, color: "#022c22" },
  { hour: "6-8 PM", bookings: 42, color: "#14532d" },
  { hour: "8-10 PM", bookings: 28, color: "#166534" },
]

const upcomingBookings = [
  {
    id: "1",
    user: "John Smith",
    court: "Badminton Court 1",
    time: "10:00 AM",
    date: "Today",
    status: "confirmed",
  },
  {
    id: "2",
    user: "Sarah Johnson",
    court: "Tennis Court 2",
    time: "2:00 PM",
    date: "Today",
    status: "confirmed",
  },
  {
    id: "3",
    user: "Mike Wilson",
    court: "Badminton Court 2",
    time: "4:00 PM",
    date: "Tomorrow",
    status: "confirmed",
  },
]

export function OwnerDashboardHome() {
  const realTimeBookings = useRealTimeData(
    bookingTrends.map((item) => ({ name: item.name, value: item.bookings })),
    3000,
  )

  const heatmapData = [
    { name: "6AM", value: 8 },
    { name: "7AM", value: 12 },
    { name: "8AM", value: 15 },
    { name: "9AM", value: 18 },
    { name: "10AM", value: 22 },
    { name: "11AM", value: 25 },
    { name: "12PM", value: 30 },
    { name: "1PM", value: 28 },
    { name: "2PM", value: 32 },
    { name: "3PM", value: 35 },
    { name: "4PM", value: 40 },
    { name: "5PM", value: 45 },
    { name: "6PM", value: 50 },
    { name: "7PM", value: 48 },
    { name: "8PM", value: 42 },
    { name: "9PM", value: 38 },
    { name: "10PM", value: 25 },
    { name: "11PM", value: 15 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Dashboard Overview</h1>
        <p className="text-green-600">Monitor your facility performance and bookings</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{kpiData.totalBookings}</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Active Courts</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{kpiData.activeCourts}</div>
            <p className="text-xs text-green-600">All courts operational</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">${kpiData.monthlyEarnings.toLocaleString()}</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Today's Bookings</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{kpiData.todayBookings}</div>
            <p className="text-xs text-green-600">6 more than yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Booking Trends */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Weekly Booking Trends
            </CardTitle>
            <CardDescription className="text-green-600">Daily bookings and earnings this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="name" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Earnings */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Monthly Earnings
            </CardTitle>
            <CardDescription className="text-green-600">Revenue growth over the past 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="earnings" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Real-time Booking Trends */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Live Booking Trends
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardTitle>
            <CardDescription className="text-green-600">Real-time booking updates</CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedAreaChart data={realTimeBookings} height={300} />
          </CardContent>
        </Card>

        {/* Enhanced Monthly Earnings */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Revenue Analytics
            </CardTitle>
            <CardDescription className="text-green-600">Enhanced earnings visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <ComboChart
              data={bookingTrends.map((item) => ({
                name: item.name,
                bookings: item.bookings,
                revenue: item.earnings,
              }))}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* New Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Hourly Booking Heatmap */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hourly Booking Heatmap
            </CardTitle>
            <CardDescription className="text-green-600">Booking intensity throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <HeatmapChart data={heatmapData} height={200} />
          </CardContent>
        </Card>

        {/* Enhanced Peak Hours */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Peak Hours Distribution
            </CardTitle>
            <CardDescription className="text-green-600">Enhanced visualization of popular time slots</CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedPieChart
              data={peakHours.map((item) => ({
                name: item.hour,
                value: item.bookings,
              }))}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours and Upcoming Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Peak Hours */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Peak Booking Hours
            </CardTitle>
            <CardDescription className="text-green-600">Most popular time slots this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={peakHours}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="bookings"
                  label={({ hour, bookings }) => `${hour}: ${bookings}`}
                >
                  {peakHours.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Upcoming Bookings</CardTitle>
            <CardDescription className="text-green-600">Next scheduled court reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-green-800">{booking.user}</p>
                    <p className="text-sm text-green-600">{booking.court}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-800">{booking.time}</p>
                    <p className="text-sm text-green-600">{booking.date}</p>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
