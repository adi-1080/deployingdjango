"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star } from "lucide-react"

interface HomePageProps {
  onViewVenues: () => void
  onViewVenue: (venueId: number) => void
}

interface Venue {
  id: number
  name: string
  sports: string[]
  min_price: number
  location: string
  rating: number
  image: string
}

interface Sport {
  id: number
  name: string
}

export function HomePage({ onViewVenues, onViewVenue }: HomePageProps) {
  const [popularVenues, setPopularVenues] = useState<Venue[]>([])
  const [popularSports, setPopularSports] = useState<Sport[]>([])

  useEffect(() => {
    const token = localStorage.getItem("access")
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}` }
      : {}
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home/`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setPopularVenues(data.popular_venues || [])
        setPopularSports(data.popular_sports || [])
      })
      .catch((err) => console.error("Error fetching home data:", err))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Find Your Perfect Court</h1>
        <p className="text-xl text-green-600 mb-8">
          Book local sports facilities and join matches in your area
        </p>

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

      {/* Browse Venues Quick Action */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
        <Card
          className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={onViewVenues}
        >
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Browse All Venues
            </CardTitle>
            <CardDescription className="text-green-600">
              Discover all available sports facilities
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Popular Sports */}
      {popularSports.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Popular Sports</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSports.map((sport) => (
              <Card
                key={sport.id}
                className="border-green-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <Badge className="bg-green-100 text-green-800">{sport.name}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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
                <img
                  src={venue.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
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
                  <p className="font-semibold text-green-700">
                    From ₹{venue.min_price}/hour
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}