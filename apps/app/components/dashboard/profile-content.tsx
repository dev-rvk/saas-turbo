"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Badge } from "@repo/ui/components/badge"
import { BarChart3, Settings, User } from "lucide-react"
import type { UserType } from "@repo/types/user"

interface ProfileContentProps {
  user: UserType
}

export function ProfileContent({ user }: ProfileContentProps) {
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account information and preferences.</p>
      </div>

      {/* Account info cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Account Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Email verification status</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Member Since</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{formatDate(user.createdAt)}</div>
            <p className="text-xs text-muted-foreground">Account creation date</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Last Updated</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{formatDate(user.updatedAt)}</div>
            <p className="text-xs text-muted-foreground">Profile last modified</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile details card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Profile Information</CardTitle>
          <CardDescription>Your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-card-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-2">
                <Badge variant={user.emailVerified ? "default" : "secondary"}>
                  {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <label className="text-sm font-medium text-muted-foreground">User ID</label>
              <p className="text-sm font-mono bg-muted p-2 rounded mt-1 text-muted-foreground">{user.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Account Created</label>
              <p className="text-sm mt-1 text-card-foreground">{formatDate(user.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
