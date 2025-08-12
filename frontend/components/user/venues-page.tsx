"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star } from "lucide-react"

interface VenuesPageProps {
  onViewVenue: (venueId: string) => void
}

const allVenues = [
  {
    id: "1",
    name: "SportZone Arena",
    sports: ["Badminton", "Tennis"],
    price: 25,
    location: "Downtown",
    rating: 4.8,
    type: "Indoor",
    image: "/modern-badminton-arena.png",
  },
  {
    id: "2",
    name: "Green Valley Courts",
    sports: ["Tennis", "Squash"],
    price: 30,
    location: "Green Valley",
    rating: 4.6,
    type: "Outdoor",
    image: "/outdoor-tennis-valley.png",
  },
  {
    id: "3",
    name: "City Sports Complex",
    sports: ["Badminton", "Table Tennis"],
    price: 20,
    location: "City Center",
    rating: 4.7,
    type: "Indoor",
    image: "/indoor-badminton-complex.png",
  },
  {
    id: "4",
    name: "Riverside Tennis Club",
    sports: ["Tennis"],
    price: 35,
    location: "Riverside",
    rating: 4.9,
    type: "Outdoor",
    image: "/placeholder-fsh1l.png",
  },
  {
    id: "5",
    name: "Metro Badminton Center",
    sports: ["Badminton"],
    price: 22,
    location: "Metro Station",
    rating: 4.5,
    type: "Indoor",
    image: "/badminton-center-indoor-courts.png",
  },
  {
    id: "6",
    name: "Elite Sports Hub",
    sports: ["Tennis", "Badminton", "Squash"],
    price: 40,
    location: "Uptown",
    rating: 4.8,
    type: "Indoor",
    image: "/elite-sports-hub-multiple-courts.png",
  },
]

export function VenuesPage({ onViewVenue }: VenuesPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sportFilter, setSportFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredVenues = allVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport =
      sportFilter === "all" || venue.sports.some((sport) => sport.toLowerCase() === sportFilter.toLowerCase())
    const matchesType = typeFilter === "all" || venue.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && venue.price <= 25) ||
      (priceFilter === "medium" && venue.price > 25 && venue.price <= 35) ||
      (priceFilter === "high" && venue.price > 35)

    return matchesSearch && matchesSport && matchesType && matchesPrice
  })

  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage)

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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          <Select value={sportFilter} onValueChange={setSportFilter}>
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

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="border-green-200 focus:border-green-500">
              <SelectValue placeholder="Venue Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="indoor">Indoor</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
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
          Showing {paginatedVenues.length} of {filteredVenues.length} venues
        </p>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedVenues.map((venue) => (
          <Card
            key={venue.id}
            className="border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onViewVenue(venue.id)}
          >
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img src={venue.image || "/placeholder.svg"} alt={venue.name} className="w-full h-full object-cover" />
              <Badge className="absolute top-2 right-2 bg-green-600 text-white">{venue.type}</Badge>
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
                <div className="flex items-center mb-2">
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
