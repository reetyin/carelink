"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Clock, Heart, Filter, Search, Navigation, Users, DollarSign, CheckCircle } from "lucide-react"

// Mock data for providers
const mockProviders = [
  {
    id: 1,
    name: "Sunshine Daycare Center",
    type: "Center-based",
    rating: 4.8,
    reviewCount: 127,
    distance: "0.3 miles",
    address: "123 Oak Street, Springfield",
    ageGroups: ["Infant", "Toddler", "Preschool"],
    tuitionRange: "$800-1200/month",
    availability: "Immediate",
    image: "/bright-colorful-daycare-center-exterior.jpg",
    features: ["Licensed", "Background Checked", "Meals Included"],
    description: "A warm, nurturing environment where children learn and grow through play-based activities.",
    openSpots: 3,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Little Learners Home Care",
    type: "Home-based",
    rating: 4.9,
    reviewCount: 89,
    distance: "0.7 miles",
    address: "456 Maple Avenue, Springfield",
    ageGroups: ["Toddler", "Preschool"],
    tuitionRange: "$600-900/month",
    availability: "1-3 months",
    image: "/cozy-home-daycare-with-children-playing.jpg",
    features: ["Licensed", "CPR Certified", "Organic Meals"],
    description: "Small group care in a loving home environment with personalized attention.",
    openSpots: 1,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Rainbow Kids Academy",
    type: "Center-based",
    rating: 4.7,
    reviewCount: 203,
    distance: "1.2 miles",
    address: "789 Pine Road, Springfield",
    ageGroups: ["Infant", "Toddler", "Preschool"],
    tuitionRange: "$900-1400/month",
    availability: "Immediate",
    image: "/modern-daycare-center-with-playground.jpg",
    features: ["Licensed", "STEM Programs", "Bilingual"],
    description: "Comprehensive early childhood education with structured learning programs.",
    openSpots: 5,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Cozy Corner Family Care",
    type: "Home-based",
    rating: 4.6,
    reviewCount: 45,
    distance: "0.9 miles",
    address: "321 Elm Street, Springfield",
    ageGroups: ["Infant", "Toddler"],
    tuitionRange: "$700-1000/month",
    availability: "3+ months",
    image: "/family-home-daycare-with-toys-and-books.jpg",
    features: ["Licensed", "First Aid Certified", "Flexible Hours"],
    description: "Family-style care with flexible scheduling and individual attention.",
    openSpots: 2,
    isFavorite: false,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [providers, setProviders] = useState(mockProviders)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    window.addEventListener("error", handleResizeObserverError)
    return () => window.removeEventListener("error", handleResizeObserverError)
  }, [])

  const toggleFavorite = (id: number) => {
    setProviders(
      providers.map((provider) => (provider.id === id ? { ...provider, isFavorite: !provider.isFavorite } : provider)),
    )
  }

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAge = selectedAgeGroup === "all" || provider.ageGroups.includes(selectedAgeGroup)
    const matchesType = selectedType === "all" || provider.type === selectedType
    const matchesAvailability = selectedAvailability === "all" || provider.availability === selectedAvailability

    return matchesSearch && matchesAge && matchesType && matchesAvailability
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Immediate":
        return "bg-green-100 text-green-800"
      case "1-3 months":
        return "bg-yellow-100 text-yellow-800"
      case "3+ months":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CareLink</span>
            </div>
            <Link href="/profile">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, address, or ZIP code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Navigation className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-primary text-primary-foreground" : ""}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Chips */}
          <div className={`transition-all duration-200 overflow-hidden ${showFilters ? "max-h-96 mt-4" : "max-h-0"}`}>
            <div className="p-4 bg-muted/50 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Age Group</label>
                  <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="All ages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ages</SelectItem>
                      <SelectItem value="Infant">Infant (0-12 months)</SelectItem>
                      <SelectItem value="Toddler">Toddler (1-3 years)</SelectItem>
                      <SelectItem value="Preschool">Preschool (3-5 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Facility Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Home-based">Home-based</SelectItem>
                      <SelectItem value="Center-based">Center-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any availability</SelectItem>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3+ months">3+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Childcare Providers Near You</h1>
            <p className="text-muted-foreground">{filteredProviders.length} providers found in Springfield</p>
          </div>
          <Select defaultValue="distance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Sort by Distance</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="price">Sort by Price</SelectItem>
              <SelectItem value="availability">Sort by Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Provider Cards */}
        <div className="grid gap-6">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-80 h-48 md:h-auto flex-shrink-0">
                  <img
                    src={provider.image || "/placeholder.svg"}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-xl mb-1 truncate">{provider.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            {provider.distance}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                            {provider.rating} ({provider.reviewCount} reviews)
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{provider.address}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(provider.id)}
                        className="text-muted-foreground hover:text-red-500 flex-shrink-0"
                      >
                        <Heart className={`w-5 h-5 ${provider.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">{provider.description}</CardDescription>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{provider.type}</Badge>
                        {provider.ageGroups.map((age) => (
                          <Badge key={age} variant="outline">
                            {age}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {provider.tuitionRange}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {provider.openSpots} spots available
                          </span>
                        </div>
                        <Badge className={getAvailabilityColor(provider.availability)}>
                          <Clock className="w-3 h-3 mr-1" />
                          {provider.availability}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {provider.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center text-xs text-green-700 bg-green-50 px-2 py-1 rounded"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => (window.location.href = `/provider/${provider.id}`)}
                        >
                          View Details
                        </Button>
                        <Button className="flex-1">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No providers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more options.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedAgeGroup("all")
                setSelectedType("all")
                setSelectedAvailability("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
