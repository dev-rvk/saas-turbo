"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { DashboardContent } from "./dashboard-content"
import { ProfileContent } from "./profile-content"
import type { UserType } from "@repo/types/user"



interface Session {
  user: UserType
}

interface DashboardLayoutProps {
  session: Session
}

export type NavigationItem = "dashboard" | "analytics" | "users" | "settings" | "profile"

export function DashboardLayout({ session }: DashboardLayoutProps) {
  const [activeItem, setActiveItem] = useState<NavigationItem>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeItem) {
      case "profile":
        return <ProfileContent user={session.user} />
      case "dashboard":
        return <DashboardContent user={session.user} />
      case "analytics":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">Analytics content coming soon...</p>
          </div>
        )
      case "users":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground mt-2">Users management coming soon...</p>
          </div>
        )
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">Settings panel coming soon...</p>
          </div>
        )
      default:
        return <DashboardContent user={session.user} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="lg:pl-64">
        <Navbar user={session.user} setSidebarOpen={setSidebarOpen} setActiveItem={setActiveItem} />

        <main className="min-h-[calc(100vh-4rem)]">{renderContent()}</main>
      </div>
    </div>
  )
}
