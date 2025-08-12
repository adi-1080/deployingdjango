"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, MapPin, Wifi, Car, Coffee, Users, Dumbbell, ShowerHeadIcon as Shower } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Facility {
  id: string
  name: string
  description: string
  address: string
  sports: string[]
  amenities: string[]
  images: string[]
  status: "active" | "pending" | "inactive"
}

const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "SportZone Arena",
    description: "Premier indoor sports facility with state-of-the-art courts and professional lighting.",
    address: "123 Sports Street, Downtown, City 12345",
    sports: ["Badminton", "Tennis"],
    amenities: ["WiFi", "Parking", "Cafeteria", "Changing Rooms"],
    images: ["/modern-badminton-arena.png", "/indoor-professional-tennis-court.png"],
    status: "active",
  },
]

const availableSports = ["Badminton", "Tennis", "Squash", "Table Tennis", "Basketball", "Volleyball"]
const availableAmenities = [
  { id: "wifi", label: "Free WiFi", icon: Wifi },
  { id: "parking", label: "Parking", icon: Car },
  { id: "cafeteria", label: "Cafeteria", icon: Coffee },
  { id: "changing", label: "Changing Rooms", icon: Users },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "shower", label: "Showers", icon: Shower },
]

export function FacilityManagement() {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities)
  const [isAddingFacility, setIsAddingFacility] = useState(false)
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    sports: [] as string[],
    amenities: [] as string[],
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      address: "",
      sports: [],
      amenities: [],
    })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (editingFacility) {
      // Update existing facility
      setFacilities((prev) =>
        prev.map((facility) =>
          facility.id === editingFacility.id
            ? {
                ...facility,
                ...formData,
                images: facility.images, // Keep existing images
              }
            : facility,
        ),
      )
      toast({
        title: "Facility Updated",
        description: "Your facility information has been updated successfully.",
      })
      setEditingFacility(null)
    } else {
      // Add new facility
      const newFacility: Facility = {
        id: Date.now().toString(),
        ...formData,
        images: ["/placeholder.svg"],
        status: "pending",
      }
      setFacilities((prev) => [...prev, newFacility])
      toast({
        title: "Facility Added",
        description: "Your new facility has been submitted for approval.",
      })
      setIsAddingFacility(false)
    }

    resetForm()
  }

  const handleEdit = (facility: Facility) => {
    setFormData({
      name: facility.name,
      description: facility.description,
      address: facility.address,
      sports: facility.sports,
      amenities: facility.amenities,
    })
    setEditingFacility(facility)
  }

  const handleDelete = (facilityId: string) => {
    setFacilities((prev) => prev.filter((facility) => facility.id !== facilityId))
    toast({
      title: "Facility Deleted",
      description: "The facility has been removed from your listings.",
    })
  }

  const handleSportToggle = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport) ? prev.sports.filter((s) => s !== sport) : [...prev.sports, sport],
    }))
  }

  const handleAmenityToggle = (amenityId: string) => {
    const amenity = availableAmenities.find((a) => a.id === amenityId)
    if (!amenity) return

    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity.label)
        ? prev.amenities.filter((a) => a !== amenity.label)
        : [...prev.amenities, amenity.label],
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Facility Management</h1>
          <p className="text-green-600">Manage your sports facilities and their details</p>
        </div>
        <Dialog open={isAddingFacility} onOpenChange={setIsAddingFacility}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Facility
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-green-800">Add New Facility</DialogTitle>
              <DialogDescription className="text-green-600">
                Create a new sports facility listing. It will be submitted for admin approval.
              </DialogDescription>
            </DialogHeader>
            <FacilityForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsAddingFacility(false)
                resetForm()
              }}
              handleSportToggle={handleSportToggle}
              handleAmenityToggle={handleAmenityToggle}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Facilities List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {facilities.map((facility) => (
          <Card key={facility.id} className="border-green-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-green-800">{facility.name}</CardTitle>
                  <CardDescription className="text-green-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {facility.address}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    facility.status === "active"
                      ? "default"
                      : facility.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    facility.status === "active"
                      ? "bg-green-600"
                      : facility.status === "pending"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }
                >
                  {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-green-600 text-sm">{facility.description}</p>

                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Sports Available</h4>
                  <div className="flex flex-wrap gap-2">
                    {facility.sports.map((sport) => (
                      <Badge key={sport} variant="secondary" className="text-xs">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {facility.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs border-green-300 text-green-700">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(facility)}
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-green-800">Edit Facility</DialogTitle>
                        <DialogDescription className="text-green-600">
                          Update your facility information.
                        </DialogDescription>
                      </DialogHeader>
                      <FacilityForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                          setEditingFacility(null)
                          resetForm()
                        }}
                        handleSportToggle={handleSportToggle}
                        handleAmenityToggle={handleAmenityToggle}
                        isEditing={true}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(facility.id)}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {facilities.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="text-center py-12">
            <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">No Facilities Yet</h3>
            <p className="text-green-600 mb-4">Start by adding your first sports facility.</p>
            <Button onClick={() => setIsAddingFacility(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Facility
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface FacilityFormProps {
  formData: {
    name: string
    description: string
    address: string
    sports: string[]
    amenities: string[]
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  onSubmit: () => void
  onCancel: () => void
  handleSportToggle: (sport: string) => void
  handleAmenityToggle: (amenityId: string) => void
  isEditing?: boolean
}

function FacilityForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  handleSportToggle,
  handleAmenityToggle,
  isEditing = false,
}: FacilityFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-green-700">
          Facility Name *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
          placeholder="Enter facility name"
          className="border-green-200 focus:border-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-green-700">
          Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your facility..."
          rows={3}
          className="border-green-200 focus:border-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-green-700">
          Address *
        </Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, address: e.target.value }))}
          placeholder="Enter full address"
          className="border-green-200 focus:border-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-green-700">Sports Available</Label>
        <div className="grid grid-cols-2 gap-3">
          {availableSports.map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={sport}
                checked={formData.sports.includes(sport)}
                onCheckedChange={() => handleSportToggle(sport)}
                className="border-green-300"
              />
              <Label htmlFor={sport} className="text-green-600 text-sm">
                {sport}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-green-700">Amenities</Label>
        <div className="grid grid-cols-2 gap-3">
          {availableAmenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.id}
                checked={formData.amenities.includes(amenity.label)}
                onCheckedChange={() => handleAmenityToggle(amenity.id)}
                className="border-green-300"
              />
              <Label htmlFor={amenity.id} className="text-green-600 text-sm flex items-center">
                <amenity.icon className="w-4 h-4 mr-1" />
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
          {isEditing ? "Update Facility" : "Add Facility"}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
