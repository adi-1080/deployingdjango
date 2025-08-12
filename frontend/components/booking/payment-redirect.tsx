"use client"

import { Button } from "@/components/ui/button"

interface PaymentRedirectProps {
  venueName: string
  bookingDate: string
  startTime: string
  endTime: string
  totalHours: number
  pricePerHour: number
}

export function PaymentRedirect({
  venueName,
  bookingDate,
  startTime,
  endTime,
  totalHours,
  pricePerHour
}: PaymentRedirectProps) {
  
  const redirectToPayment = () => {
    const params = new URLSearchParams({
      venue_name: venueName,
      booking_date: bookingDate,
      start_time: startTime,
      end_time: endTime,
      total_hours: totalHours.toString(),
      price_per_hour: pricePerHour.toString()
    })
    
    // Redirect to Django payment page
    const paymentUrl = `http://127.0.0.1:8000/api/payment/?${params.toString()}`
    window.open(paymentUrl, '_blank', 'width=800,height=600')
  }

  const totalAmount = totalHours * pricePerHour

  return (
    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
      <h3 className="text-lg font-semibold text-green-800 mb-4">Complete Your Booking</h3>
      
      <div className="space-y-2 mb-4">
        <p><strong>Venue:</strong> {venueName}</p>
        <p><strong>Date:</strong> {bookingDate}</p>
        <p><strong>Time:</strong> {startTime} - {endTime}</p>
        <p><strong>Duration:</strong> {totalHours} hours</p>
        <p><strong>Rate:</strong> ${pricePerHour}/hour</p>
        <p className="text-xl font-bold text-green-800">
          <strong>Total: ${totalAmount.toFixed(2)}</strong>
        </p>
      </div>

      <Button 
        onClick={redirectToPayment}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        Proceed to Payment
      </Button>
    </div>
  )
}