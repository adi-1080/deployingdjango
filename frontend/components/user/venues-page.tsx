"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star } from "lucide-react"

interface Venue {
  id: string
  name: string
  sports: { id: number; name: string }[]
  starting_price_per_hour: string
  city: string
  locality: string
  rating: number | null
  courts: { type: string }[] // optional if needed for filter mapping
  photos: { image: string }[]
}

interface VenuesPageProps {
  onViewVenue: (venueId: string) => void
}

export function VenuesPage({ onViewVenue }: VenuesPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sportFilter, setSportFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [venues, setVenues] = useState<Venue[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const itemsPerPage = 12 // matches backend default page size

  // Helper to map price filter to query params
  function getPriceRange() {
    switch (priceFilter) {
      case "low":
        return { price_min: "0", price_max: "25" }
      case "medium":
        return { price_min: "25", price_max: "35" }
      case "high":
        return { price_min: "35" }
      default:
        return {}
    }
  }

  // Build API query params string
  function buildQueryParams() {
    const params = new URLSearchParams()
    params.append("page", currentPage.toString())

    if (searchTerm.trim() !== "") params.append("search", searchTerm.trim())

    if (sportFilter !== "all") {
      // Assuming you have sport IDs or mapping; for demo we just pass sport name lowercased (adjust if needed)
      params.append("sport", sportFilter)
    }

    if (typeFilter !== "all") {
      params.append("type", typeFilter)
    }

    const priceRange = getPriceRange()
    if (priceRange.price_min) params.append("price_min", priceRange.price_min)
    if (priceRange.price_max) params.append("price_max", priceRange.price_max)

    // Always filter only approved venues (optional, remove if not needed)
    params.append("is_approved", "true")

    // Sort by popularity by default (adjust or add UI control if desired)
    params.append("sort", "popularity")

    return params.toString()
  }

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true)
      try {
        const query = buildQueryParams()
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
        const response = await fetch(`${backendUrl}/venues/?${query}`)
        if (!response.ok) throw new Error("Failed to fetch venues")
        const data = await response.json()
        setVenues(data.results)
        setTotalCount(data.count)
      } catch (error) {
        console.error("Error fetching venues:", error)
      }
      setLoading(false)
    }
    fetchVenues()
  }, [searchTerm, sportFilter, typeFilter, priceFilter, currentPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">All Venues</h1>
        <p className="text-green-600">Find and book your perfect sports venue</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-green-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              <Input
                placeholder="Search venues or locations..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          <Select
            value={sportFilter}
            onValueChange={(value) => {
              setSportFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="border-green-200 focus:border-green-500">
              <SelectValue placeholder="Sport Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="badminton">Badminton</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="squash">Squash</SelectItem>
              <SelectItem value="table tennis">Table Tennis</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="border-green-200 focus:border-green-500">
              <SelectValue placeholder="Venue Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="indoor">Indoor</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priceFilter}
            onValueChange={(value) => {
              setPriceFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="border-green-200 focus:border-green-500">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under $25</SelectItem>
              <SelectItem value="medium">$25 - $35</SelectItem>
              <SelectItem value="high">Above $35</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-green-600">
          Showing {venues.length} of {totalCount} venues
        </p>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <p className="text-green-700">Loading venues...</p>
        ) : venues.length === 0 ? (
          <p className="text-green-700">No venues found.</p>
        ) : (
          venues.map((venue) => (
            <Card
              key={venue.id}
              className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewVenue(venue.id)}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={venue.photos?.[0]?.image || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                {/* Badge - determine type from courts if available */}
                {venue.courts && venue.courts.length > 0 && (
                  <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                    {venue.courts[0].type.charAt(0).toUpperCase() + venue.courts[0].type.slice(1)}
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-green-800">{venue.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-green-600 ml-1">{venue.rating?.toFixed(1) ?? "N/A"}</span>
                  </div>
                </div>
                <CardDescription className="text-green-600">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {venue.city}, {venue.locality}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {venue.sports.map((sport) => (
                      <Badge key={sport.id} variant="secondary" className="text-xs">
                        {sport.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="font-semibold text-green-700">
                    From ${venue.starting_price_per_hour}/hour
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-green-300 text-green-700 hover:bg-green-50"
              }
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
