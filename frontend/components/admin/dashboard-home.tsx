"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Calendar, MapPin, TrendingUp, Activity, DollarSign, Award } from "lucide-react"
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
  AreaChart,
  Area,
} from "recharts"
import { EnhancedAreaChart, EnhancedPieChart, ComboChart, useRealTimeData } from "@/components/charts/enhanced-charts"

const globalStats = {
  totalUsers: 1247,
  totalFacilityOwners: 89,
  totalBookings: 3456,
  activeCourts: 234,
  pendingApprovals: 12,
  monthlyRevenue: 89750,
}

const bookingActivity = [
  { name: "Jan", bookings: 245, users: 89 },
  { name: "Feb", bookings: 312, users: 124 },
  { name: "Mar", bookings: 398, users: 156 },
  { name: "Apr", bookings: 445, users: 189 },
  { name: "May", bookings: 523, users: 234 },
  { name: "Jun", bookings: 612, users: 278 },
]

const userRegistrationTrends = [
  { month: "Jan", users: 45, owners: 8 },
  { month: "Feb", users: 67, owners: 12 },
  { month: "Mar", users: 89, owners: 15 },
  { month: "Apr", users: 123, owners: 18 },
  { month: "May", users: 156, owners: 22 },
  { month: "Jun", users: 189, owners: 28 },
]

const facilityApprovalTrend = [
  { month: "Jan", approved: 12, rejected: 3, pending: 5 },
  { month: "Feb", approved: 18, rejected: 2, pending: 7 },
  { month: "Mar", approved: 24, rejected: 4, pending: 9 },
  { month: "Apr", approved: 31, rejected: 3, pending: 12 },
]

const mostActiveSports = [
  { name: "Badminton", bookings: 1245, color: "#10b981" },
  { name: "Tennis", bookings: 987, color: "#059669" },
  { name: "Squash", bookings: 654, color: "#047857" },
  { name: "Table Tennis", bookings: 432, color: "#065f46" },
  { name: "Basketball", bookings: 321, color: "#064e3b" },
]

const earningsSimulation = [
  { month: "Jan", platform: 4500, facilities: 18500 },
  { month: "Feb", platform: 5200, facilities: 21800 },
  { month: "Mar", platform: 6100, facilities: 25400 },
  { month: "Apr", platform: 7200, facilities: 29800 },
  { month: "May", platform: 8100, facilities: 33600 },
  { month: "Jun", platform: 8900, facilities: 36800 },
]

const recentActivities = [
  { id: "1", type: "approval", message: "New facility 'Elite Sports Hub' approved", time: "2 hours ago" },
  { id: "2", type: "user", message: "50 new user registrations today", time: "4 hours ago" },
  { id: "3", type: "booking", message: "Peak booking hour: 6-8 PM with 45 bookings", time: "6 hours ago" },
  { id: "4", type: "report", message: "Monthly revenue report generated", time: "1 day ago" },
]

export function AdminDashboardHome() {
  const realTimeUsers = useRealTimeData([{ name: "Active Users", value: globalStats.totalUsers }], 5000)

  const performanceData = [
    { name: "User Satisfaction", value: 85, fill: "#10b981" },
    { name: "Platform Uptime", value: 99.9, fill: "#059669" },
    { name: "Booking Success Rate", value: 94, fill: "#047857" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Admin Dashboard</h1>
        <p className="text-green-600">Platform overview and key metrics</p>
      </div>

      {/* Global Stats KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{realTimeUsers[0].value.toLocaleString()}</div>
            <p className="text-xs text-green-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Facility Owners</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{globalStats.totalFacilityOwners}</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{globalStats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-green-600">+22% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Active Courts</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{globalStats.activeCourts}</div>
            <p className="text-xs text-green-600">+12 new this month</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Pending Approvals</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{globalStats.pendingApprovals}</div>
            <p className="text-xs text-green-600">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">${globalStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Booking Activity Over Time */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Booking Activity Over Time
            </CardTitle>
            <CardDescription className="text-green-600">Monthly booking trends and user growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={bookingActivity}>
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
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Area type="monotone" dataKey="users" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Registration Trends */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Registration Trends
            </CardTitle>
            <CardDescription className="text-green-600">New users vs facility owners registration</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userRegistrationTrends}>
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
                <Bar dataKey="users" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="owners" fill="#059669" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Facility Approval Trend */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Facility Approval Trend
            </CardTitle>
            <CardDescription className="text-green-600">Monthly facility approval statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={facilityApprovalTrend}>
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
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981" }} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Most Active Sports */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Most Active Sports
            </CardTitle>
            <CardDescription className="text-green-600">Sports by total bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mostActiveSports}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="bookings"
                  label={({ name, bookings }) => `${name}: ${bookings}`}
                >
                  {mostActiveSports.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Enhanced Booking Activity */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Advanced Booking Analytics
            </CardTitle>
            <CardDescription className="text-green-600">Multi-metric booking analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ComboChart
              data={bookingActivity.map((item) => ({
                name: item.name,
                bookings: item.bookings,
                revenue: item.bookings * 25, // Simulated revenue
              }))}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Platform Performance Metrics */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Platform Performance
            </CardTitle>
            <CardDescription className="text-green-600">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {performanceData.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-green-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-1000"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-green-800">{metric.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced User Registration */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Enhanced Registration Analytics
            </CardTitle>
            <CardDescription className="text-green-600">Advanced user growth visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedAreaChart
              data={userRegistrationTrends.map((item) => ({
                name: item.month,
                value: item.users + item.owners,
              }))}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Enhanced Sports Distribution */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Sports Popularity Analytics
            </CardTitle>
            <CardDescription className="text-green-600">Enhanced sports booking distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedPieChart
              data={mostActiveSports.map((item) => ({
                name: item.name,
                value: item.bookings,
              }))}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Earnings Simulation and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Simulation Chart */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Earnings Simulation
            </CardTitle>
            <CardDescription className="text-green-600">Platform vs facility owner earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earningsSimulation}>
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
                <Bar dataKey="platform" fill="#10b981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="facilities" fill="#059669" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Recent Activities</CardTitle>
            <CardDescription className="text-green-600">Latest platform activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === "approval" && <Building className="w-5 h-5 text-green-600" />}
                    {activity.type === "user" && <Users className="w-5 h-5 text-blue-600" />}
                    {activity.type === "booking" && <Calendar className="w-5 h-5 text-purple-600" />}
                    {activity.type === "report" && <TrendingUp className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-green-800">{activity.message}</p>
                    <p className="text-xs text-green-600">{activity.time}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      activity.type === "approval"
                        ? "bg-green-100 text-green-800"
                        : activity.type === "user"
                          ? "bg-blue-100 text-blue-800"
                          : activity.type === "booking"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                    }
                  >
                    {activity.type}
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
