"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, Clock, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookingPageProps {
  venueId: string
  courtId: string
  onSuccess: () => void
  onBack: () => void
}

const timeSlots = [
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
]

const mockVenueData = {
  "1": {
    name: "SportZone Arena",
    courts: {
      "1": { name: "Badminton Court 1", sport: "Badminton", price: 25 },
      "2": { name: "Badminton Court 2", sport: "Badminton", price: 25 },
      "3": { name: "Tennis Court 1", sport: "Tennis", price: 30 },
      "4": { name: "Tennis Court 2", sport: "Tennis", price: 30 },
    },
  },
}

export function BookingPage({ venueId, courtId, onSuccess, onBack }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(1)
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()

  const venue = mockVenueData[venueId as keyof typeof mockVenueData]
  const court = venue?.courts[courtId as keyof typeof venue.courts]

  if (!venue || !court) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Court Not Found</h1>
          <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const totalPrice = court.price * duration

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your booking.",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save booking to localStorage (in real app, this would be API call)
    const bookings = JSON.parse(localStorage.getItem("quickcourt_bookings") || "[]")
    const newBooking = {
      id: Date.now().toString(),
      venueId,
      venueName: venue.name,
      courtId,
      courtName: court.name,
      sport: court.sport,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      duration,
      price: totalPrice,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    bookings.push(newBooking)
    localStorage.setItem("quickcourt_bookings", JSON.stringify(bookings))

    toast({
      title: "Booking Confirmed!",
      description: `Your ${court.sport} court is booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    })

    setIsBooking(false)
    onSuccess()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-50">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Venue
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Book Your Court</h1>
        <p className="text-green-600">
          {venue.name} - {court.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Selection */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Select Date</CardTitle>
              <CardDescription className="text-green-600">Choose your preferred date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                className="rounded-md border border-green-200"
              />
            </CardContent>
          </Card>

          {/* Time Selection */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Select Time</CardTitle>
              <CardDescription className="text-green-600">
                Available time slots for {selectedDate?.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className={
                      selectedTime === time
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-300 text-green-700 hover:bg-green-50"
                    }
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Duration Selection */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Duration</CardTitle>
              <CardDescription className="text-green-600">How long would you like to play?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((hours) => (
                  <Button
                    key={hours}
                    variant={duration === hours ? "default" : "outline"}
                    onClick={() => setDuration(hours)}
                    className={
                      duration === hours
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-300 text-green-700 hover:bg-green-50"
                    }
                  >
                    {hours} hour{hours > 1 ? "s" : ""}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="border-green-200 sticky top-8">
            <CardHeader>
              <CardTitle className="text-green-800">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-600">Venue:</span>
                  <span className="text-green-800 font-medium">{venue.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Court:</span>
                  <span className="text-green-800 font-medium">{court.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Sport:</span>
                  <span className="text-green-800 font-medium">{court.sport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Date:</span>
                  <span className="text-green-800 font-medium">
                    {selectedDate ? selectedDate.toLocaleDateString() : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Time:</span>
                  <span className="text-green-800 font-medium">{selectedTime || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Duration:</span>
                  <span className="text-green-800 font-medium">
                    {duration} hour{duration > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="border-t border-green-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-600">Price per hour:</span>
                  <span className="text-green-800">${court.price}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span className="text-green-800">Total:</span>
                  <span className="text-green-800">${totalPrice}</span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || isBooking}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isBooking ? "Processing..." : `Pay $${totalPrice} & Book`}
              </Button>

              <p className="text-xs text-green-600 text-center">
                Secure payment processing. You can cancel up to 2 hours before your booking.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
