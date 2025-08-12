"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Clock } from "lucide-react"

interface HomePageProps {
  onViewVenues: () => void
  onViewVenue: (venueId: string) => void
}

const popularVenues = [
  {
    id: "1",
    name: "SportZone Arena",
    sports: ["Badminton", "Tennis"],
    price: 25,
    location: "Downtown",
    rating: 4.8,
    image: "/modern-badminton-arena.png",
  },
  {
    id: "2",
    name: "Green Valley Courts",
    sports: ["Tennis", "Squash"],
    price: 30,
    location: "Green Valley",
    rating: 4.6,
    image: "/outdoor-tennis-valley.png",
  },
  {
    id: "3",
    name: "City Sports Complex",
    sports: ["Badminton", "Table Tennis"],
    price: 20,
    location: "City Center",
    rating: 4.7,
    image: "/indoor-badminton-complex.png",
  },
]

const popularSports = [
  { name: "Badminton", count: 45, color: "bg-green-100 text-green-800" },
  { name: "Tennis", count: 32, color: "bg-blue-100 text-blue-800" },
  { name: "Table Tennis", count: 28, color: "bg-purple-100 text-purple-800" },
  { name: "Squash", count: 15, color: "bg-orange-100 text-orange-800" },
]

export function HomePage({ onViewVenues, onViewVenue }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Find Your Perfect Court</h1>
        <p className="text-xl text-green-600 mb-8">Book local sports facilities and join matches in your area</p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
          <Input
            placeholder="Search for venues, sports, or locations..."
            className="pl-10 pr-4 py-3 text-lg border-green-200 focus:border-green-500"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700">
            Search
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewVenues}>
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Browse All Venues
            </CardTitle>
            <CardDescription className="text-green-600">Discover all available sports facilities</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Quick Book
            </CardTitle>
            <CardDescription className="text-green-600">Find available slots for today</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Top Rated
            </CardTitle>
            <CardDescription className="text-green-600">Browse highest rated venues</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Popular Sports */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Popular Sports</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularSports.map((sport) => (
            <Card key={sport.name} className="border-green-200 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Badge className={`${sport.color} mb-2`}>{sport.name}</Badge>
                <p className="text-sm text-green-600">{sport.count} venues</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Venues */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">Popular Venues</h2>
          <Button
            variant="outline"
            onClick={onViewVenues}
            className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularVenues.map((venue) => (
            <Card
              key={venue.id}
              className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewVenue(venue.id)}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img src={venue.image || "/placeholder.svg"} alt={venue.name} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-green-800">{venue.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-green-600 ml-1">{venue.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-green-600">
                  <div className="flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {venue.location}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {venue.sports.map((sport) => (
                      <Badge key={sport} variant="secondary" className="text-xs">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                  <p className="font-semibold text-green-700">From ${venue.price}/hour</p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
