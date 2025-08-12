"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Star, Wifi, Car, Coffee, Users } from "lucide-react"

interface Amenity {
  icon: React.ElementType
  name: string
}

interface Court {
  id: string
  name: string
  sport: string
  price: number
  available: boolean
}

interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

interface Venue {
  id: string
  name: string
  description: string
  address: string
  sports: string[]
  rating: number
  totalReviews: number
  images: string[]
  amenities: Amenity[]
  courts: Court[]
}

interface VenuePageProps {
  venueId: string
  onBookCourt: (venueId: string, courtId: string) => void
  onBack: () => void
}

export function VenuePage({ venueId, onBookCourt, onBack }: VenuePageProps) {
  const [venue, setVenue] = useState<Venue | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVenue() {
      setLoading(true)
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const res = await fetch(`${backendUrl}/venues/${venueId}/`)
        if (!res.ok) throw new Error("Failed to fetch venue")
        const data = await res.json()
        // API returns: { venue: {...}, reviews: [...] }
        const v = data.venue
        setVenue({
          id: v.id,
          name: v.name,
          description: v.description,
          address: `${v.address_line_1 ?? ""} ${v.locality ?? ""}, ${v.city ?? ""} ${v.postal_code ?? ""}`.trim(),
          sports: v.sports.map((s: any) => s.name),
          rating: v.rating,
          totalReviews: data.reviews.length,
          images: v.photos.map((p: any) => p.image),
          amenities: [
            { icon: Wifi, name: "Free WiFi" },
            { icon: Car, name: "Parking" },
            { icon: Coffee, name: "Cafeteria" },
            { icon: Users, name: "Changing Rooms" },
          ], // replace if your API has amenities
          courts: v.courts.map((court: any) => ({
            id: court.id,
            name: court.name,
            sport: court.sport.name,
            price: court.price_per_hour,
            available: true, // you might want to fetch availability separately
          })),
        })
        setReviews(data.reviews.map((r: any) => ({
          id: r.id,
          user: r.user.username || r.user.email || "Anonymous",
          rating: r.rating,
          comment: r.comment,
          date: new Date(r.created_at).toLocaleDateString(),
        })))
        setError(null)
      } catch (err: any) {
        setError(err.message || "Unknown error")
        setVenue(null)
        setReviews([])
      }
      setLoading(false)
    }
    fetchVenue()
  }, [venueId])

  if (loading) {
    return <div className="p-8 text-green-700">Loading venue details...</div>
  }

  if (error || !venue) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Venue Not Found</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-50">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Venues
      </Button>

      {/* Venue Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">{venue.name}</h1>
            <div className="flex items-center text-green-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{venue.address}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-green-700 font-semibold ml-1">{venue.rating.toFixed(1)}</span>
              <span className="text-green-600 ml-1">({venue.totalReviews} reviews)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {venue.sports.map((sport) => (
              <Badge key={sport} className="bg-green-100 text-green-800">
                {sport}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img src={venue.images[0] || "/placeholder.svg"} alt={venue.name} className="w-full h-64 object-cover rounded-lg" />
              </div>
              {venue.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${venue.name} ${index + 2}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">About This Venue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600">{venue.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="mt-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {venue.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-green-600">
                        <amenity.icon className="w-5 h-5 mr-2" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <p className="text-green-700">No reviews yet.</p>
                    ) : (
                      reviews.map((review) => (
                        <div key={review.id} className="border-b border-green-100 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="font-semibold text-green-800">{review.user}</span>
                              <div className="flex items-center ml-2">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-green-600">{review.date}</span>
                          </div>
                          <p className="text-green-600">{review.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Booking */}
        <div>
          <Card className="border-green-200 sticky top-8">
            <CardHeader>
              <CardTitle className="text-green-800">Available Courts</CardTitle>
              <CardDescription className="text-green-600">Select a court to book your session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {venue.courts.map((court) => (
                  <div
                    key={court.id}
                    className={`p-4 rounded-lg border ${
                      court.available ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-semibold ${court.available ? "text-green-800" : "text-gray-500"}`}>
                        {court.name}
                      </h4>
                      <Badge
                        variant={court.available ? "default" : "secondary"}
                        className={court.available ? "bg-green-600" : ""}
                      >
                        {court.available ? "Available" : "Booked"}
                      </Badge>
                    </div>
                    <p className={`text-sm mb-3 ${court.available ? "text-green-600" : "text-gray-500"}`}>
                      {court.sport} • ${court.price}/hour
                    </p>
                    <Button
                      onClick={() => onBookCourt(venue.id, court.id)}
                      disabled={!court.available}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                    >
                      {court.available ? "Book Now" : "Not Available"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
