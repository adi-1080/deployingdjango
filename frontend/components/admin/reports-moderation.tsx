"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Flag, MessageSquare, User, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Report {
  id: string
  type: "user" | "facility" | "booking" | "content"
  reportedBy: string
  reportedByEmail: string
  targetId: string
  targetName: string
  targetType: "user" | "facility"
  reason: string
  description: string
  status: "pending" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high"
  submittedAt: string
  resolvedAt?: string
  adminNotes?: string
}

const mockReports: Report[] = [
  {
    id: "1",
    type: "user",
    reportedBy: "Sarah Johnson",
    reportedByEmail: "sarah@example.com",
    targetId: "user_123",
    targetName: "Mike Wilson",
    targetType: "user",
    reason: "Inappropriate Behavior",
    description: "User was using offensive language during court booking and harassing other players.",
    status: "pending",
    priority: "high",
    submittedAt: "2024-01-19T14:30:00Z",
  },
  {
    id: "2",
    type: "facility",
    reportedBy: "John Smith",
    reportedByEmail: "john@example.com",
    targetId: "facility_456",
    targetName: "Budget Courts",
    targetType: "facility",
    reason: "Safety Concerns",
    description: "The court surface is damaged and poses a safety risk. Equipment is also in poor condition.",
    status: "pending",
    priority: "high",
    submittedAt: "2024-01-18T10:15:00Z",
  },
  {
    id: "3",
    type: "booking",
    reportedBy: "Emily Davis",
    reportedByEmail: "emily@example.com",
    targetId: "booking_789",
    targetName: "SportZone Arena - Court 1",
    targetType: "facility",
    reason: "No-show",
    description: "Booked the court but facility was closed without notice. No refund provided.",
    status: "pending",
    priority: "medium",
    submittedAt: "2024-01-17T16:45:00Z",
  },
  {
    id: "4",
    type: "user",
    reportedBy: "Alex Brown",
    reportedByEmail: "alex@example.com",
    targetId: "user_321",
    targetName: "Tom Anderson",
    targetType: "user",
    reason: "Spam/Fake Account",
    description: "This account appears to be fake and is making multiple bookings without showing up.",
    status: "resolved",
    priority: "medium",
    submittedAt: "2024-01-15T09:20:00Z",
    resolvedAt: "2024-01-16T11:30:00Z",
    adminNotes: "Account verified as legitimate. User was having technical issues with notifications.",
  },
]

const reportReasons = [
  "Inappropriate Behavior",
  "Safety Concerns",
  "Spam/Fake Account",
  "No-show",
  "Poor Service",
  "Fraudulent Activity",
  "Harassment",
  "Other",
]

export function ReportsModeration() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [adminNotes, setAdminNotes] = useState("")
  const { toast } = useToast()

  const pendingReports = reports.filter((r) => r.status === "pending")
  const resolvedReports = reports.filter((r) => r.status === "resolved")
  const dismissedReports = reports.filter((r) => r.status === "dismissed")

  const handleResolveReport = (reportId: string, action: "resolved" | "dismissed") => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: action,
              resolvedAt: new Date().toISOString(),
              adminNotes: adminNotes || undefined,
            }
          : report,
      ),
    )

    const report = reports.find((r) => r.id === reportId)
    toast({
      title: `Report ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `Report about ${report?.targetName} has been ${action}.`,
    })

    setAdminNotes("")
  }

  const getPriorityColor = (priority: Report["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: Report["type"]) => {
    switch (type) {
      case "user":
        return <User className="w-4 h-4" />
      case "facility":
        return <Building className="w-4 h-4" />
      case "booking":
        return <MessageSquare className="w-4 h-4" />
      case "content":
        return <Flag className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const ReportCard = ({ report }: { report: Report }) => (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-green-800 flex items-center">
              {getTypeIcon(report.type)}
              <span className="ml-2">{report.targetName}</span>
            </CardTitle>
            <CardDescription className="text-green-600">
              Reported by {report.reportedBy} ({report.reportedByEmail})
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(report.priority)}>{report.priority.toUpperCase()}</Badge>
            <Badge
              variant={
                report.status === "resolved" ? "default" : report.status === "dismissed" ? "secondary" : "destructive"
              }
              className={
                report.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : report.status === "dismissed"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
              }
            >
              {report.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-green-700">Reason: {report.reason}</p>
          <p className="text-sm text-green-600 mt-1">{report.description}</p>
          <p className="text-xs text-green-500 mt-2">Submitted: {new Date(report.submittedAt).toLocaleDateString()}</p>
          {report.resolvedAt && (
            <p className="text-xs text-green-500">Resolved: {new Date(report.resolvedAt).toLocaleDateString()}</p>
          )}
          {report.adminNotes && (
            <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
              <p className="text-xs font-medium text-green-700">Admin Notes:</p>
              <p className="text-xs text-green-600">{report.adminNotes}</p>
            </div>
          )}
        </div>
        {report.status === "pending" && (
          <div className="mt-4 space-y-2">
            <textarea
              placeholder="Add admin notes (optional)..."
              value={selectedReport?.id === report.id ? adminNotes : ""}
              onChange={(e) => {
                setSelectedReport(report)
                setAdminNotes(e.target.value)
              }}
              className="w-full p-2 text-sm border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={2}
            />
            <div className="flex space-x-2">
              <button
                onClick={() => handleResolveReport(report.id, "resolved")}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                Resolve
              </button>
              <button
                onClick={() => handleResolveReport(report.id, "dismissed")}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </CardHeader>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Pending Reports
            </CardTitle>
            <div className="text-2xl font-bold text-red-900">{pendingReports.length}</div>
          </CardHeader>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Flag className="w-5 h-5 mr-2" />
              Resolved Reports
            </CardTitle>
            <div className="text-2xl font-bold text-green-900">{resolvedReports.length}</div>
          </CardHeader>
        </Card>
        <Card className="border-gray-200 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Dismissed Reports
            </CardTitle>
            <div className="text-2xl font-bold text-gray-900">{dismissedReports.length}</div>
          </CardHeader>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">Pending Reports</h3>
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
            {pendingReports.length === 0 && (
              <Card className="border-green-200">
                <CardHeader>
                  <CardDescription className="text-center text-green-600">
                    No pending reports at this time.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...resolvedReports, ...dismissedReports]
              .sort((a, b) => new Date(b.resolvedAt || "").getTime() - new Date(a.resolvedAt || "").getTime())
              .slice(0, 5)
              .map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
