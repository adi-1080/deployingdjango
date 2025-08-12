"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, MapPin, Eye, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PendingFacility {
  id: string
  name: string
  ownerName: string
  ownerEmail: string
  description: string
  address: string
  sports: string[]
  amenities: string[]
  images: string[]
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  adminComments?: string
}

const mockPendingFacilities: PendingFacility[] = [
  {
    id: "1",
    name: "Elite Sports Complex",
    ownerName: "John Smith",
    ownerEmail: "john@elitesports.com",
    description: "State-of-the-art sports complex with premium facilities and professional coaching services.",
    address: "456 Elite Avenue, Uptown District, City 67890",
    sports: ["Tennis", "Badminton", "Squash"],
    amenities: ["WiFi", "Parking", "Cafeteria", "Changing Rooms", "Pro Shop"],
    images: ["/elite-sports-hub-multiple-courts.png", "/modern-badminton-arena.png"],
    submittedAt: "2024-01-18T10:30:00Z",
    status: "pending",
  },
  {
    id: "2",
    name: "Community Sports Hub",
    ownerName: "Sarah Johnson",
    ownerEmail: "sarah@communitysports.com",
    description: "Affordable community sports facility focused on making sports accessible to everyone.",
    address: "789 Community Road, Riverside, City 54321",
    sports: ["Badminton", "Table Tennis", "Basketball"],
    amenities: ["WiFi", "Parking", "Changing Rooms"],
    images: ["/badminton-center-indoor-courts.png"],
    submittedAt: "2024-01-17T14:15:00Z",
    status: "pending",
  },
  {
    id: "3",
    name: "Metro Tennis Academy",
    ownerName: "Mike Wilson",
    ownerEmail: "mike@metrotennis.com",
    description: "Professional tennis academy with certified coaches and tournament-grade courts.",
    address: "321 Tennis Lane, Metro City, City 98765",
    sports: ["Tennis"],
    amenities: ["WiFi", "Parking", "Cafeteria", "Pro Shop", "Coaching"],
    images: ["/outdoor-tennis-valley.png", "/indoor-professional-tennis-court.png"],
    submittedAt: "2024-01-16T09:45:00Z",
    status: "pending",
  },
]

const approvedFacilities: PendingFacility[] = [
  {
    id: "4",
    name: "SportZone Arena",
    ownerName: "David Brown",
    ownerEmail: "david@sportzone.com",
    description: "Premier indoor sports facility with state-of-the-art courts.",
    address: "123 Sports Street, Downtown, City 12345",
    sports: ["Badminton", "Tennis"],
    amenities: ["WiFi", "Parking", "Cafeteria", "Changing Rooms"],
    images: ["/modern-badminton-arena.png"],
    submittedAt: "2024-01-10T11:20:00Z",
    status: "approved",
    adminComments: "Excellent facility with all required amenities. Approved for immediate listing.",
  },
]

const rejectedFacilities: PendingFacility[] = [
  {
    id: "5",
    name: "Budget Courts",
    ownerName: "Alex Davis",
    ownerEmail: "alex@budgetcourts.com",
    description: "Low-cost sports facility for budget-conscious players.",
    address: "999 Budget Street, Outskirts, City 11111",
    sports: ["Badminton"],
    amenities: ["Parking"],
    images: ["/placeholder.svg"],
    submittedAt: "2024-01-12T16:30:00Z",
    status: "rejected",
    adminComments:
      "Facility does not meet minimum safety and quality standards. Please upgrade facilities and resubmit.",
  },
]

export function FacilityApproval() {
  const [pendingFacilities, setPendingFacilities] = useState<PendingFacility[]>(mockPendingFacilities)
  const [selectedFacility, setSelectedFacility] = useState<PendingFacility | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewComments, setReviewComments] = useState("")
  const { toast } = useToast()

  const handleApprove = () => {
    if (!selectedFacility) return

    setPendingFacilities((prev) => prev.filter((f) => f.id !== selectedFacility.id))

    toast({
      title: "Facility Approved",
      description: `${selectedFacility.name} has been approved and is now live on the platform.`,
    })

    setIsReviewing(false)
    setSelectedFacility(null)
    setReviewComments("")
  }

  const handleReject = () => {
    if (!selectedFacility || !reviewComments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please provide comments explaining the rejection reason.",
        variant: "destructive",
      })
      return
    }

    setPendingFacilities((prev) => prev.filter((f) => f.id !== selectedFacility.id))

    toast({
      title: "Facility Rejected",
      description: `${selectedFacility.name} has been rejected. Owner will be notified with your comments.`,
    })

    setIsReviewing(false)
    setSelectedFacility(null)
    setReviewComments("")
  }

  const FacilityCard = ({ facility, showActions = true }: { facility: PendingFacility; showActions?: boolean }) => (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-green-800">{facility.name}</CardTitle>
            <CardDescription className="text-green-600">
              Owner: {facility.ownerName} ({facility.ownerEmail})
            </CardDescription>
          </div>
          <Badge
            variant={
              facility.status === "approved" ? "default" : facility.status === "rejected" ? "destructive" : "secondary"
            }
            className={
              facility.status === "approved"
                ? "bg-green-600"
                : facility.status === "rejected"
                  ? "bg-red-600"
                  : "bg-yellow-600"
            }
          >
            {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
            <span className="text-green-600 text-sm">{facility.address}</span>
          </div>

          <p className="text-green-600 text-sm">{facility.description}</p>

          <div>
            <h4 className="font-semibold text-green-800 mb-2">Sports Available</h4>
            <div className="flex flex-wrap gap-2">
              {facility.sports.map((sport) => (
                <Badge key={sport} variant="secondary" className="text-xs">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-800 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {facility.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs border-green-300 text-green-700">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm text-green-600">
            <Clock className="w-4 h-4 inline mr-1" />
            Submitted: {new Date(facility.submittedAt).toLocaleDateString()}
          </div>

          {facility.adminComments && (
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-1 flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                Admin Comments
              </h4>
              <p className="text-green-600 text-sm">{facility.adminComments}</p>
            </div>
          )}

          {showActions && facility.status === "pending" && (
            <div className="flex space-x-2 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFacility(facility)}
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-green-800">Review Facility: {facility.name}</DialogTitle>
                    <DialogDescription className="text-green-600">
                      Review facility details and approve or reject the submission.
                    </DialogDescription>
                  </DialogHeader>
                  <FacilityReviewDialog
                    facility={facility}
                    reviewComments={reviewComments}
                    setReviewComments={setReviewComments}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </DialogContent>
              </Dialog>

              <Button
                size="sm"
                onClick={() => {
                  setSelectedFacility(facility)
                  handleApprove()
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Quick Approve
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Facility Approval</h1>
        <p className="text-green-600">Review and approve new facility registrations</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-green-800">{pendingFacilities.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-800">{approvedFacilities.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-green-800">{rejectedFacilities.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facility Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingFacilities.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedFacilities.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedFacilities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          {pendingFacilities.length === 0 ? (
            <Card className="border-green-200">
              <CardContent className="text-center py-12">
                <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">No Pending Facilities</h3>
                <p className="text-green-600">All facility submissions have been reviewed.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingFacilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {approvedFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} showActions={false} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rejectedFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} showActions={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface FacilityReviewDialogProps {
  facility: PendingFacility
  reviewComments: string
  setReviewComments: (comments: string) => void
  onApprove: () => void
  onReject: () => void
}

function FacilityReviewDialog({
  facility,
  reviewComments,
  setReviewComments,
  onApprove,
  onReject,
}: FacilityReviewDialogProps) {
  return (
    <div className="space-y-6">
      {/* Facility Images */}
      <div>
        <h3 className="text-lg font-semibold text-green-800 mb-3">Facility Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {facility.images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${facility.name} ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border border-green-200"
            />
          ))}
        </div>
      </div>

      {/* Facility Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-3">Facility Information</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-green-700">Name:</span>
              <span className="ml-2 text-green-600">{facility.name}</span>
            </div>
            <div>
              <span className="font-medium text-green-700">Owner:</span>
              <span className="ml-2 text-green-600">
                {facility.ownerName} ({facility.ownerEmail})
              </span>
            </div>
            <div>
              <span className="font-medium text-green-700">Address:</span>
              <span className="ml-2 text-green-600">{facility.address}</span>
            </div>
            <div>
              <span className="font-medium text-green-700">Submitted:</span>
              <span className="ml-2 text-green-600">{new Date(facility.submittedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-3">Sports & Amenities</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-green-700 block mb-1">Sports:</span>
              <div className="flex flex-wrap gap-1">
                {facility.sports.map((sport) => (
                  <Badge key={sport} variant="secondary" className="text-xs">
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-green-700 block mb-1">Amenities:</span>
              <div className="flex flex-wrap gap-1">
                {facility.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs border-green-300 text-green-700">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-green-800 mb-3">Description</h3>
        <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">{facility.description}</p>
      </div>

      {/* Review Comments */}
      <div className="space-y-2">
        <Label htmlFor="comments" className="text-green-700">
          Review Comments (required for rejection)
        </Label>
        <Textarea
          id="comments"
          value={reviewComments}
          onChange={(e) => setReviewComments(e.target.value)}
          placeholder="Add your review comments here..."
          rows={4}
          className="border-green-200 focus:border-green-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve Facility
        </Button>
        <Button
          onClick={onReject}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Reject Facility
        </Button>
      </div>
    </div>
  )
}
