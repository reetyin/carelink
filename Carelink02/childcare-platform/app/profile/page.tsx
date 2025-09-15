"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Heart,
  User,
  Baby,
  FileText,
  Settings,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Shield,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
} from "lucide-react"

// Blank profile for new users
const userProfile = {
  id: 1,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  emergencyContact: "",
  emergencyPhone: "",
  profileImage: "/placeholder.svg?height=100&width=100",
  joinDate: "",
}

const childProfiles: any[] = [];

const notificationSettings = {
  applicationUpdates: false,
  messageNotifications: false,
  availabilityAlerts: false,
  marketingEmails: false,
  smsNotifications: false,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)
  const [editedChildren, setEditedChildren] = useState(childProfiles)
  const [notifications, setNotifications] = useState(notificationSettings)
  const [showPassword, setShowPassword] = useState(false)

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
  }

  const handleAddChild = () => {
    const newChild = {
      id: editedChildren.length + 1,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      ageGroup: "",
      allergies: "",
      medicalConditions: "",
      specialNeeds: "",
      currentProvider: "",
      profileImage: "/placeholder.svg?height=80&width=80",
      documents: [],
    }
    setEditedChildren([...editedChildren, newChild])
  }

  const handleUpdateChild = (childId: number, field: string, value: string) => {
    setEditedChildren(editedChildren.map((child) => (child.id === childId ? { ...child, [field]: value } : child)))
  }

  const handleDeleteChild = (childId: number) => {
    setEditedChildren(editedChildren.filter((child) => child.id !== childId))
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "medical":
        return "🏥"
      case "legal":
        return "📋"
      default:
        return "📄"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">CareLink</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={editedProfile.profileImage || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="text-2xl">
                    {editedProfile.firstName[0]}
                    {editedProfile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">
                    {editedProfile.firstName} {editedProfile.lastName}
                  </h1>
                  <p className="text-muted-foreground">{editedProfile.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="secondary">Parent</Badge>
                    <span className="text-sm text-muted-foreground">
                      Member since {new Date(userProfile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="children" className="flex items-center">
                <Baby className="w-4 h-4 mr-2" />
                Children
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Your primary contact details for providers to reach you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={editedProfile.lastName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Home Address</Label>
                    <Input
                      id="address"
                      value={editedProfile.address}
                      onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={editedProfile.city}
                        onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={editedProfile.state}
                        onValueChange={(value) => setEditedProfile({ ...editedProfile, state: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={editedProfile.zipCode}
                        onChange={(e) => setEditedProfile({ ...editedProfile, zipCode: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Someone providers can contact in case of emergency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={editedProfile.emergencyContact}
                        onChange={(e) => setEditedProfile({ ...editedProfile, emergencyContact: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        value={editedProfile.emergencyPhone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, emergencyPhone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Children Tab */}
            <TabsContent value="children" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Child Profiles</h3>
                  <p className="text-sm text-muted-foreground">Manage information about your children</p>
                </div>
                <Button onClick={handleAddChild}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Child
                </Button>
              </div>

              {editedChildren.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={child.profileImage || "/placeholder.svg"} alt={child.firstName} />
                          <AvatarFallback>
                            {child.firstName[0]}
                            {child.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>
                            {child.firstName} {child.lastName}
                          </CardTitle>
                          <CardDescription>
                            {child.ageGroup} • Born {new Date(child.dateOfBirth).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteChild(child.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input
                          value={child.firstName}
                          onChange={(e) => handleUpdateChild(child.id, "firstName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          value={child.lastName}
                          onChange={(e) => handleUpdateChild(child.id, "lastName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={child.dateOfBirth}
                          onChange={(e) => handleUpdateChild(child.id, "dateOfBirth", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>Age Group</Label>
                        <Select
                          value={child.ageGroup}
                          onValueChange={(value) => handleUpdateChild(child.id, "ageGroup", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Infant">Infant (0-12 months)</SelectItem>
                            <SelectItem value="Toddler">Toddler (1-3 years)</SelectItem>
                            <SelectItem value="Preschool">Preschool (3-5 years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Allergies</Label>
                      <Textarea
                        value={child.allergies}
                        onChange={(e) => handleUpdateChild(child.id, "allergies", e.target.value)}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Medical Conditions</Label>
                      <Textarea
                        value={child.medicalConditions}
                        onChange={(e) => handleUpdateChild(child.id, "medicalConditions", e.target.value)}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Special Needs</Label>
                      <Textarea
                        value={child.specialNeeds}
                        onChange={(e) => handleUpdateChild(child.id, "specialNeeds", e.target.value)}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Document Library</CardTitle>
                      <CardDescription>Upload and manage important documents for your children</CardDescription>
                    </div>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {editedChildren.map((child) => (
                      <div key={child.id}>
                        <h4 className="font-semibold mb-3">
                          {child.firstName} {child.lastName}
                        </h4>
                        {child.documents.length > 0 ? (
                          <div className="space-y-2">
                            {child.documents.map((doc) => (
                              <div
                                key={doc.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                              >
                                <div className="flex items-center space-x-3">
                                  <span className="text-2xl">{getDocumentIcon(doc.type)}</span>
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Uploaded {new Date(doc.uploadDate).toLocaleDateString()} • {doc.size}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground py-4">No documents uploaded yet</p>
                        )}
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive updates and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Application Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about application status changes</p>
                    </div>
                    <Switch
                      checked={notifications.applicationUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, applicationUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Message Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified when providers send messages</p>
                    </div>
                    <Switch
                      checked={notifications.messageNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, messageNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Availability Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get alerts when new spots become available</p>
                    </div>
                    <Switch
                      checked={notifications.availabilityAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, availabilityAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via text message</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive tips and updates about childcare</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Change Password</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control how your information is shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground">Allow providers to see your profile information</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Share anonymized data to improve our services</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions that affect your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
