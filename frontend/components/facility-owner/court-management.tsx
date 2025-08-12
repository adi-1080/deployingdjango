"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Court {
  id: string
  name: string
  sport: string
  pricePerHour: number
  operatingHours: {
    start: string
    end: string
  }
  status: "active" | "maintenance" | "inactive"
  facilityId: string
  facilityName: string
}

const mockCourts: Court[] = [
  {
    id: "1",
    name: "Badminton Court 1",
    sport: "Badminton",
    pricePerHour: 25,
    operatingHours: { start: "06:00", end: "22:00" },
    status: "active",
    facilityId: "1",
    facilityName: "SportZone Arena",
  },
  {
    id: "2",
    name: "Badminton Court 2",
    sport: "Badminton",
    pricePerHour: 25,
    operatingHours: { start: "06:00", end: "22:00" },
    status: "active",
    facilityId: "1",
    facilityName: "SportZone Arena",
  },
  {
    id: "3",
    name: "Tennis Court 1",
    sport: "Tennis",
    pricePerHour: 30,
    operatingHours: { start: "07:00", end: "21:00" },
    status: "maintenance",
    facilityId: "1",
    facilityName: "SportZone Arena",
  },
  {
    id: "4",
    name: "Tennis Court 2",
    sport: "Tennis",
    pricePerHour: 30,
    operatingHours: { start: "07:00", end: "21:00" },
    status: "active",
    facilityId: "1",
    facilityName: "SportZone Arena",
  },
]

const availableSports = ["Badminton", "Tennis", "Squash", "Table Tennis", "Basketball", "Volleyball"]
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0")
  return `${hour}:00`
})

export function CourtManagement() {
  const [courts, setCourts] = useState<Court[]>(mockCourts)
  const [isAddingCourt, setIsAddingCourt] = useState(false)
  const [editingCourt, setEditingCourt] = useState<Court | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    pricePerHour: "",
    startTime: "06:00",
    endTime: "22:00",
    status: "active" as Court["status"],
  })

  const resetForm = () => {
    setFormData({
      name: "",
      sport: "",
      pricePerHour: "",
      startTime: "06:00",
      endTime: "22:00",
      status: "active",
    })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.sport || !formData.pricePerHour) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (editingCourt) {
      // Update existing court
      setCourts((prev) =>
        prev.map((court) =>
          court.id === editingCourt.id
            ? {
                ...court,
                name: formData.name,
                sport: formData.sport,
                pricePerHour: Number.parseInt(formData.pricePerHour),
                operatingHours: {
                  start: formData.startTime,
                  end: formData.endTime,
                },
                status: formData.status,
              }
            : court,
        ),
      )
      toast({
        title: "Court Updated",
        description: "Court information has been updated successfully.",
      })
      setEditingCourt(null)
    } else {
      // Add new court
      const newCourt: Court = {
        id: Date.now().toString(),
        name: formData.name,
        sport: formData.sport,
        pricePerHour: Number.parseInt(formData.pricePerHour),
        operatingHours: {
          start: formData.startTime,
          end: formData.endTime,
        },
        status: formData.status,
        facilityId: "1", // Mock facility ID
        facilityName: "SportZone Arena", // Mock facility name
      }
      setCourts((prev) => [...prev, newCourt])
      toast({
        title: "Court Added",
        description: "New court has been added successfully.",
      })
      setIsAddingCourt(false)
    }

    resetForm()
  }

  const handleEdit = (court: Court) => {
    setFormData({
      name: court.name,
      sport: court.sport,
      pricePerHour: court.pricePerHour.toString(),
      startTime: court.operatingHours.start,
      endTime: court.operatingHours.end,
      status: court.status,
    })
    setEditingCourt(court)
  }

  const handleDelete = (courtId: string) => {
    setCourts((prev) => prev.filter((court) => court.id !== courtId))
    toast({
      title: "Court Deleted",
      description: "The court has been removed from your listings.",
    })
  }

  const handleStatusChange = (courtId: string, newStatus: Court["status"]) => {
    setCourts((prev) => prev.map((court) => (court.id === courtId ? { ...court, status: newStatus } : court)))
    toast({
      title: "Status Updated",
      description: `Court status has been changed to ${newStatus}.`,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Court Management</h1>
          <p className="text-green-600">Manage your courts, pricing, and operating hours</p>
        </div>
        <Dialog open={isAddingCourt} onOpenChange={setIsAddingCourt}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Court
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-green-800">Add New Court</DialogTitle>
              <DialogDescription className="text-green-600">Create a new court for your facility.</DialogDescription>
            </DialogHeader>
            <CourtForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsAddingCourt(false)
                resetForm()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <Card key={court.id} className="border-green-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-green-800">{court.name}</CardTitle>
                  <CardDescription className="text-green-600">{court.facilityName}</CardDescription>
                </div>
                <Badge
                  variant={
                    court.status === "active" ? "default" : court.status === "maintenance" ? "secondary" : "destructive"
                  }
                  className={
                    court.status === "active"
                      ? "bg-green-600"
                      : court.status === "maintenance"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }
                >
                  {court.status.charAt(0).toUpperCase() + court.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Sport:</span>
                  <Badge variant="secondary">{court.sport}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-green-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Price:
                  </span>
                  <span className="font-semibold text-green-800">${court.pricePerHour}/hour</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-green-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Hours:
                  </span>
                  <span className="text-green-800">
                    {court.operatingHours.start} - {court.operatingHours.end}
                  </span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(court)}
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-green-800">Edit Court</DialogTitle>
                        <DialogDescription className="text-green-600">Update court information.</DialogDescription>
                      </DialogHeader>
                      <CourtForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                          setEditingCourt(null)
                          resetForm()
                        }}
                        isEditing={true}
                      />
                    </DialogContent>
                  </Dialog>

                  <Select
                    value={court.status}
                    onValueChange={(value: Court["status"]) => handleStatusChange(court.id, value)}
                  >
                    <SelectTrigger className="w-32 h-8 border-green-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(court.id)}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courts.length === 0 && (
        <Card className="border-green-200">
          <CardContent className="text-center py-12">
            <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">No Courts Yet</h3>
            <p className="text-green-600 mb-4">Start by adding courts to your facility.</p>
            <Button onClick={() => setIsAddingCourt(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Court
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface CourtFormProps {
  formData: {
    name: string
    sport: string
    pricePerHour: string
    startTime: string
    endTime: string
    status: Court["status"]
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
  onSubmit: () => void
  onCancel: () => void
  isEditing?: boolean
}

function CourtForm({ formData, setFormData, onSubmit, onCancel, isEditing = false }: CourtFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="courtName" className="text-green-700">
          Court Name *
        </Label>
        <Input
          id="courtName"
          value={formData.name}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Badminton Court 1"
          className="border-green-200 focus:border-green-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sport" className="text-green-700">
          Sport Type *
        </Label>
        <Select
          value={formData.sport}
          onValueChange={(value) => setFormData((prev: any) => ({ ...prev, sport: value }))}
        >
          <SelectTrigger className="border-green-200 focus:border-green-500">
            <SelectValue placeholder="Select sport" />
          </SelectTrigger>
          <SelectContent>
            {availableSports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price" className="text-green-700">
          Price per Hour ($) *
        </Label>
        <Input
          id="price"
          type="number"
          value={formData.pricePerHour}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, pricePerHour: e.target.value }))}
          placeholder="25"
          className="border-green-200 focus:border-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime" className="text-green-700">
            Opening Time
          </Label>
          <Select
            value={formData.startTime}
            onValueChange={(value) => setFormData((prev: any) => ({ ...prev, startTime: value }))}
          >
            <SelectTrigger className="border-green-200 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime" className="text-green-700">
            Closing Time
          </Label>
          <Select
            value={formData.endTime}
            onValueChange={(value) => setFormData((prev: any) => ({ ...prev, endTime: value }))}
          >
            <SelectTrigger className="border-green-200 focus:border-green-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
          {isEditing ? "Update Court" : "Add Court"}
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
