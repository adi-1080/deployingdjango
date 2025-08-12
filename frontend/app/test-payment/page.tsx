import { PaymentRedirect } from "@/components/booking/payment-redirect"

export default function TestPaymentPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Payment Integration</h1>
      
      <PaymentRedirect
        venueName="Test Tennis Court"
        bookingDate="2024-01-15"
        startTime="10:00"
        endTime="12:00"
        totalHours={2}
        pricePerHour={35}
      />
    </div>
  )
}