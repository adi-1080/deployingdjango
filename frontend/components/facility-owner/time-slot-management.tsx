"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Settings, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TimeSlot {
  id: string
  courtId: string
  courtName: string
  date: string
  time: string
  status: "available" | "booked" | "blocked" | "maintenance"
  reason?: string
}

interface Court {
  id: string
  name: string
  sport: string
}

const mockCourts: Court[] = [
  { id: "1", name: "Badminton Court 1", sport: "Badminton" },
  { id: "2", name: "Badminton Court 2", sport: "Badminton" },
  { id: "3", name: "Tennis Court 1", sport: "Tennis" },
  { id: "4", name: "Tennis Court 2", sport: "Tennis" },
]

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]

const generateTimeSlots = (date: Date, courtId: string, courtName: string): TimeSlot[] => {
  const dateStr = date.toISOString().split("T")[0]
  return timeSlots.map((time, index) => ({
    id: `${courtId}-${dateStr}-${time}`,
    courtId,
    courtName,
    date: dateStr,
    time,
    status: Math.random() > 0.7 ? "booked" : ("available" as TimeSlot["status"]),
  }))
}

export function TimeSlotManagement() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCourt, setSelectedCourt] = useState<string>("all")
  const [timeSlotData, setTimeSlotData] = useState<TimeSlot[]>([])
  const [isBlockingSlot, setIsBlockingSlot] = useState(false)
  const [blockingSlot, setBlockingSlot] = useState<TimeSlot | null>(null)
  const [blockReason, setBlockReason] = useState("")
  const { toast } = useToast()

  // Generate time slots when date or court changes
  React.useEffect(() => {
    if (selectedDate) {
      const courts = selectedCourt === "all" ? mockCourts : mockCourts.filter((c) => c.id === selectedCourt)
      const slots = courts.flatMap((court) => generateTimeSlots(selectedDate, court.id, court.name))
      setTimeSlotData(slots)
    }
  }, [selectedDate, selectedCourt])

  const handleBlockSlot = (slot: TimeSlot) => {
    setBlockingSlot(slot)
    setIsBlockingSlot(true)
  }

  const confirmBlockSlot = () => {
    if (!blockingSlot) return

    setTimeSlotData((prev) =>
      prev.map((slot) =>
        slot.id === blockingSlot.id ? { ...slot, status: "blocked" as const, reason: blockReason } : slot,
      ),
    )

    toast({
      title: "Time Slot Blocked",
      description: `${blockingSlot.courtName} at ${blockingSlot.time} has been blocked.`,
    })

    setIsBlockingSlot(false)
    setBlockingSlot(null)
    setBlockReason("")
  }

  const handleUnblockSlot = (slot: TimeSlot) => {
    setTimeSlotData((prev) =>
      prev.map((s) => (s.id === slot.id ? { ...s, status: "available" as const, reason: undefined } : s)),
    )

    toast({
      title: "Time Slot Unblocked",
      description: `${slot.courtName} at ${slot.time} is now available.`,
    })
  }

  const handleMaintenanceSlot = (slot: TimeSlot) => {
    setTimeSlotData((prev) =>
      prev.map((s) =>
        s.id === slot.id ? { ...s, status: "maintenance" as const, reason: "Scheduled maintenance" } : s,
      ),
    )

    toast({
      title: "Maintenance Scheduled",
      description: `${slot.courtName} at ${slot.time} marked for maintenance.`,
    })
  }

  const getStatusColor = (status: TimeSlot["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "booked":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: TimeSlot["status"]) => {
    switch (status) {
      case "available":
        return <Clock className="w-4 h-4" />
      case "booked":
        return <Clock className="w-4 h-4" />
      case "blocked":
        return <AlertTriangle className="w-4 h-4" />
      case "maintenance":
        return <Settings className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const groupedSlots = timeSlotData.reduce(
    (acc, slot) => {
      if (!acc[slot.courtName]) {
        acc[slot.courtName] = []
      }
      acc[slot.courtName].push(slot)
      return acc
    },
    {} as Record<string, TimeSlot[]>,
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Time Slot Management</h1>
        <p className="text-green-600">Manage court availability and block time slots for maintenance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar and Filters */}
        <div className="lg:col-span-1">
          <Card className="border-green-200 mb-6">
            <CardHeader>
              <CardTitle className="text-green-800">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date("1900-01-01")}
                className="rounded-md border border-green-200"
              />
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Filter by Court</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courts</SelectItem>
                  {mockCourts.map((court) => (
                    <SelectItem key={court.id} value={court.id}>
                      {court.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Time Slots Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Time Slots for {selectedDate?.toLocaleDateString()}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-800">Available</Badge>
              <Badge className="bg-blue-100 text-blue-800">Booked</Badge>
              <Badge className="bg-red-100 text-red-800">Blocked</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedSlots).map(([courtName, slots]) => (
              <Card key={courtName} className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">{courtName}</CardTitle>
                  <CardDescription className="text-green-600">
                    {slots.filter((s) => s.status === "available").length} available,{" "}
                    {slots.filter((s) => s.status === "booked").length} booked,{" "}
                    {slots.filter((s) => s.status === "blocked").length} blocked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-2 rounded-lg border text-center text-sm ${getStatusColor(slot.status)}`}
                      >
                        <div className="flex items-center justify-center mb-1">{getStatusIcon(slot.status)}</div>
                        <div className="font-medium">{slot.time}</div>
                        <div className="text-xs mt-1 capitalize">{slot.status}</div>

                        {slot.status === "available" && (
                          <div className="mt-2 space-y-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleBlockSlot(slot)}
                              className="w-full text-xs border-red-300 text-red-700 hover:bg-red-50"
                            >
                              Block
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMaintenanceSlot(slot)}
                              className="w-full text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                            >
                              Maintenance
                            </Button>
                          </div>
                        )}

                        {(slot.status === "blocked" || slot.status === "maintenance") && (
                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUnblockSlot(slot)}
                              className="w-full text-xs border-green-300 text-green-700 hover:bg-green-50"
                            >
                              Unblock
                            </Button>
                          </div>
                        )}

                        {slot.reason && (
                          <div className="text-xs mt-1 text-gray-600" title={slot.reason}>
                            {slot.reason.length > 15 ? `${slot.reason.substring(0, 15)}...` : slot.reason}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {Object.keys(groupedSlots).length === 0 && (
            <Card className="border-green-200">
              <CardContent className="text-center py-12">
                <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">No Time Slots</h3>
                <p className="text-green-600">Select a date to view available time slots.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Block Slot Dialog */}
      <Dialog open={isBlockingSlot} onOpenChange={setIsBlockingSlot}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-800">Block Time Slot</DialogTitle>
            <DialogDescription className="text-green-600">
              Block {blockingSlot?.courtName} at {blockingSlot?.time} on {selectedDate?.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-green-700">
                Reason for blocking (optional)
              </Label>
              <Textarea
                id="reason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g., Equipment maintenance, Private event, etc."
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={confirmBlockSlot} className="bg-red-600 hover:bg-red-700">
                Block Time Slot
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsBlockingSlot(false)}
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
