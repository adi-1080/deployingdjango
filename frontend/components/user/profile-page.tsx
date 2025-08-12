"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Edit } from "lucide-react"

export function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">My Profile</h1>
        <p className="text-green-600">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="border-green-200">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.fullName} />
                <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                  {user?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-green-800">{user?.fullName}</CardTitle>
              <CardDescription className="text-green-600">
                {user?.role === "user"
                  ? "Sports Enthusiast"
                  : user?.role === "facility_owner"
                    ? "Facility Owner"
                    : "Admin"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-green-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">Member since Jan 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-green-200 mt-6">
            <CardHeader>
              <CardTitle className="text-green-800">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-600">Total Bookings:</span>
                  <span className="font-semibold text-green-800">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Favorite Sport:</span>
                  <span className="font-semibold text-green-800">Badminton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Hours Played:</span>
                  <span className="font-semibold text-green-800">24</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-800">Profile Information</CardTitle>
                  <CardDescription className="text-green-600">Update your personal information</CardDescription>
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
              <div className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-green-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                      className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-green-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter your city"
                      className="border-green-200 focus:border-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-green-700">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself and your favorite sports"
                    rows={4}
                    className="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
