"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from "lucide-react"

interface AdminProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  joinedDate: string
  role: string
  permissions: string[]
  avatar?: string
  bio?: string
  lastLogin: string
  totalActions: number
  facilitiesApproved: number
  usersManaged: number
}

const mockAdminProfile: AdminProfile = {
  id: "admin_001",
  name: "Alex Rodriguez",
  email: "alex.rodriguez@quickcourt.com",
  phone: "+1 (555) 123-4567",
  address: "123 Admin Street, City, State 12345",
  joinedDate: "2023-06-15T00:00:00Z",
  role: "Super Admin",
  permissions: [
    "User Management",
    "Facility Approval",
    "Reports & Moderation",
    "System Settings",
    "Analytics Access",
    "Data Export",
  ],
  bio: "Experienced platform administrator with a passion for sports and community building. Dedicated to maintaining a safe and enjoyable environment for all QuickCourt users.",
  lastLogin: "2024-01-20T09:30:00Z",
  totalActions: 1247,
  facilitiesApproved: 89,
  usersManaged: 2156,
}

export function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfile>(mockAdminProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<AdminProfile>(mockAdminProfile)
  const { toast } = useToast()

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your admin profile has been successfully updated.",
    })
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof AdminProfile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Admin Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline" className="border-green-300 text-green-700 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Personal Information</CardTitle>
              <CardDescription className="text-green-600">
                Manage your admin account details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">{profile.name}</h3>
                  <p className="text-green-600">{profile.role}</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-green-700">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border-green-300 focus:ring-green-500"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <User className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800">{profile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-green-700">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-green-300 focus:ring-green-500"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Mail className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800">{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-green-700">
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-green-300 focus:ring-green-500"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Phone className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800">{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="text-green-700">
                    Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editedProfile.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="border-green-300 focus:ring-green-500"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800">{profile.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-green-700">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editedProfile.bio || ""}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="border-green-300 focus:ring-green-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-green-800 mt-1">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Admin Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900">{profile.totalActions}</div>
                <div className="text-sm text-green-600">Total Actions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900">{profile.facilitiesApproved}</div>
                <div className="text-sm text-green-600">Facilities Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-900">{profile.usersManaged}</div>
                <div className="text-sm text-green-600">Users Managed</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-green-600 mr-2" />
                <div>
                  <div className="text-sm text-green-700">Joined</div>
                  <div className="text-sm text-green-800">{new Date(profile.joinedDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 text-green-600 mr-2" />
                <div>
                  <div className="text-sm text-green-700">Last Login</div>
                  <div className="text-sm text-green-800">{new Date(profile.lastLogin).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.permissions.map((permission) => (
                  <Badge key={permission} className="bg-green-100 text-green-800 border-green-300">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
