"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Building, Search, Ban, Eye, Calendar, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  fullName: string
  email: string
  role: "user" | "facility_owner"
  status: "active" | "banned" | "suspended"
  joinedAt: string
  lastActive: string
  totalBookings: number
  totalSpent: number
  avatar?: string
}

interface Booking {
  id: string
  venueName: string
  courtName: string
  date: string
  time: string
  price: number
  status: "confirmed" | "completed" | "cancelled"
}

const mockUsers: User[] = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-01-15T10:00:00Z",
    lastActive: "2024-01-20T14:30:00Z",
    totalBookings: 12,
    totalSpent: 450,
  },
  {
    id: "2",
    fullName: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-01-10T09:15:00Z",
    lastActive: "2024-01-19T16:45:00Z",
    totalBookings: 8,
    totalSpent: 320,
  },
  {
    id: "3",
    fullName: "Mike Wilson",
    email: "mike@example.com",
    role: "user",
    status: "banned",
    joinedAt: "2024-01-05T11:30:00Z",
    lastActive: "2024-01-18T12:00:00Z",
    totalBookings: 3,
    totalSpent: 75,
  },
]

const mockFacilityOwners: User[] = [
  {
    id: "4",
    fullName: "David Brown",
    email: "david@sportzone.com",
    role: "facility_owner",
    status: "active",
    joinedAt: "2023-12-01T08:00:00Z",
    lastActive: "2024-01-20T10:15:00Z",
    totalBookings: 156,
    totalSpent: 0, // Facility owners earn, don't spend
  },
  {
    id: "5",
    fullName: "Emily Davis",
    email: "emily@elitesports.com",
    role: "facility_owner",
    status: "active",
    joinedAt: "2023-11-15T14:20:00Z",
    lastActive: "2024-01-19T18:30:00Z",
    totalBookings: 89,
    totalSpent: 0,
  },
]

const mockUserBookings: Record<string, Booking[]> = {
  "1": [
    {
      id: "b1",
      venueName: "SportZone Arena",
      courtName: "Badminton Court 1",
      date: "2024-01-20",
      time: "10:00",
      price: 50,
      status: "confirmed",
    },
    {
      id: "b2",
      venueName: "Elite Sports Complex",
      courtName: "Tennis Court 2",
      date: "2024-01-18",
      time: "14:00",
      price: 60,
      status: "completed",
    },
  ],
  "2": [
    {
      id: "b3",
      venueName: "SportZone Arena",
      courtName: "Badminton Court 2",
      date: "2024-01-19",
      time: "16:00",
      price: 40,
      status: "completed",
    },
  ],
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [facilityOwners, setFacilityOwners] = useState<User[]>(mockFacilityOwners)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  const allUsers = [...users, ...facilityOwners]

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const regularUsers = filteredUsers.filter((user) => user.role === "user")
  const owners = filteredUsers.filter((user) => user.role === "facility_owner")

  const handleBanUser = (userId: string) => {
    const updateUserStatus = (userList: User[], setUserList: React.Dispatch<React.SetStateAction<User[]>>) => {
      setUserList((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "banned" as const } : user)))
    }

    if (users.find((u) => u.id === userId)) {
      updateUserStatus(users, setUsers)
    } else {
      updateUserStatus(facilityOwners, setFacilityOwners)
    }

    const user = allUsers.find((u) => u.id === userId)
    toast({
      title: "User Banned",
      description: `${user?.fullName} has been banned from the platform.`,
    })
  }

  const handleUnbanUser = (userId: string) => {
    const updateUserStatus = (userList: User[], setUserList: React.Dispatch<React.SetStateAction<User[]>>) => {
      setUserList((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "active" as const } : user)))
    }

    if (users.find((u) => u.id === userId)) {
      updateUserStatus(users, setUsers)
    } else {
      updateUserStatus(facilityOwners, setFacilityOwners)
    }

    const user = allUsers.find((u) => u.id === userId)
    toast({
      title: "User Unbanned",
      description: `${user?.fullName} has been unbanned and can access the platform again.`,
    })
  }

  const UserCard = ({ user }: { user: User }) => (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
              <AvatarFallback className="bg-green-100 text-green-800">
                {user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-green-800">{user.fullName}</CardTitle>
              <CardDescription className="text-green-600">{user.email}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={user.role === "facility_owner" ? "default" : "secondary"}
              className={user.role === "facility_owner" ? "bg-blue-600" : "bg-gray-600"}
            >
              {user.role === "facility_owner" ? "Owner" : "User"}
            </Badge>
            <Badge
              variant={user.status === "active" ? "default" : user.status === "banned" ? "destructive" : "secondary"}
              className={
                user.status === "active" ? "bg-green-600" : user.status === "banned" ? "bg-red-600" : "bg-yellow-600"
              }
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-green-600">Joined:</span>
            <span className="text-green-800">{new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Last Active:</span>
            <span className="text-green-800">{new Date(user.lastActive).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Total Bookings:</span>
            <span className="text-green-800">{user.totalBookings}</span>
          </div>
          {user.role === "user" && (
            <div className="flex justify-between">
              <span className="text-green-600">Total Spent:</span>
              <span className="text-green-800">${user.totalSpent}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(user)}
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-green-800">User Details: {user.fullName}</DialogTitle>
                <DialogDescription className="text-green-600">
                  Complete user information and booking history
                </DialogDescription>
              </DialogHeader>
              <UserDetailsDialog user={user} />
            </DialogContent>
          </Dialog>

          {user.status === "active" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBanUser(user.id)}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <Ban className="w-4 h-4 mr-1" />
              Ban User
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUnbanUser(user.id)}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Unban User
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">User Management</h1>
        <p className="text-green-600">Manage platform users and facility owners</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-green-800">{regularUsers.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Facility Owners</p>
                <p className="text-2xl font-bold text-green-800">{owners.length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-green-800">
                  {allUsers.filter((u) => u.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Banned Users</p>
                <p className="text-2xl font-bold text-green-800">
                  {allUsers.filter((u) => u.status === "banned").length}
                </p>
              </div>
              <Ban className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-green-200 mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              <Input
                placeholder="Search users..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
          <TabsTrigger value="users">Regular Users ({regularUsers.length})</TabsTrigger>
          <TabsTrigger value="owners">Facility Owners ({owners.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regularUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="owners" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {owners.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredUsers.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">No Users Found</h3>
            <p className="text-green-600">No users match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function UserDetailsDialog({ user }: { user: User }) {
  const userBookings = mockUserBookings[user.id] || []

  return (
    <div className="space-y-6">
      {/* User Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-3">User Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Full Name:</span>
              <span className="text-green-600">{user.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Email:</span>
              <span className="text-green-600">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Role:</span>
              <Badge
                variant={user.role === "facility_owner" ? "default" : "secondary"}
                className={user.role === "facility_owner" ? "bg-blue-600" : "bg-gray-600"}
              >
                {user.role === "facility_owner" ? "Facility Owner" : "Regular User"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Status:</span>
              <Badge
                variant={user.status === "active" ? "default" : user.status === "banned" ? "destructive" : "secondary"}
                className={
                  user.status === "active" ? "bg-green-600" : user.status === "banned" ? "bg-red-600" : "bg-yellow-600"
                }
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Joined:</span>
              <span className="text-green-600">{new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Last Active:</span>
              <span className="text-green-600">{new Date(user.lastActive).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-3">Activity Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-700">Total Bookings</span>
              </div>
              <span className="font-semibold text-green-800">{user.totalBookings}</span>
            </div>
            {user.role === "user" && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">Total Spent</span>
                </div>
                <span className="font-semibold text-green-800">${user.totalSpent}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking History */}
      {user.role === "user" && userBookings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-3">Recent Booking History</h3>
          <div className="space-y-3">
            {userBookings.map((booking) => (
              <div key={booking.id} className="p-3 border border-green-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-green-800">{booking.venueName}</p>
                    <p className="text-sm text-green-600">{booking.courtName}</p>
                    <p className="text-sm text-green-600">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-800">${booking.price}</p>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "completed"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        booking.status === "confirmed"
                          ? "bg-green-600"
                          : booking.status === "completed"
                            ? "bg-gray-600"
                            : "bg-red-600"
                      }
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
