"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, Edit, Building } from "lucide-react"

export function OwnerProfile() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    businessName: "SportZone Arena",
    businessAddress: "123 Sports Street, Downtown, City 12345",
    businessPhone: "+1 (555) 987-6543",
    bio: "Passionate about providing quality sports facilities for the community. We've been serving athletes and sports enthusiasts for over 10 years.",
  })

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const stats = {
    totalFacilities: 1,
    totalCourts: 4,
    totalBookings: 156,
    monthlyRevenue: 12450,
    memberSince: "January 2023",
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Owner Profile</h1>
        <p className="text-green-600">Manage your account and business information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="border-green-200 mb-6">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.fullName} />
                <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                  {user?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "O"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-green-800">{user?.fullName}</CardTitle>
              <CardDescription className="text-green-600">Facility Owner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-green-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{formData.phone}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Building className="w-4 h-4 mr-2" />
                  <span className="text-sm">{formData.businessName}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">Member since {stats.memberSince}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Business Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-600">Facilities:</span>
                  <span className="font-semibold text-green-800">{stats.totalFacilities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Courts:</span>
                  <span className="font-semibold text-green-800">{stats.totalCourts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Total Bookings:</span>
                  <span className="font-semibold text-green-800">{stats.totalBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Monthly Revenue:</span>
                  <span className="font-semibold text-green-800">${stats.monthlyRevenue.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-800">Personal Information</CardTitle>
                  <CardDescription className="text-green-600">Your personal account details</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-green-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-green-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-green-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-green-700">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Business Information</CardTitle>
              <CardDescription className="text-green-600">Your facility business details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-green-700">
                    Business Name
                  </Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress" className="text-green-700">
                    Business Address
                  </Label>
                  <Input
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => handleInputChange("businessAddress", e.target.value)}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPhone" className="text-green-700">
                    Business Phone
                  </Label>
                  <Input
                    id="businessPhone"
                    value={formData.businessPhone}
                    onChange={(e) => handleInputChange("businessPhone", e.target.value)}
                    disabled={!isEditing}
                    className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex space-x-4">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
