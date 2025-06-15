"use client"

import { Button } from "@repo/ui/components/button"
import { BarChart3, Home, Settings, Users, X } from "lucide-react"
import type { NavigationItem } from "./dashboard-layout"

interface SidebarProps {
  activeItem: NavigationItem
  setActiveItem: (item: NavigationItem) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const navigation = [
  { name: "Dashboard", key: "dashboard" as NavigationItem, icon: Home },
  { name: "Analytics", key: "analytics" as NavigationItem, icon: BarChart3 },
  { name: "Users", key: "users" as NavigationItem, icon: Users },
  { name: "Settings", key: "settings" as NavigationItem, icon: Settings },
]

export function Sidebar({ activeItem, setActiveItem, sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
            <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
              <h1 className="text-xl font-semibold text-sidebar-foreground">Dashboard</h1>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveItem(item.key)
                    setSidebarOpen(false)
                  }}
                  className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeItem === item.key
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border">
          <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
            <h1 className="text-xl font-semibold text-sidebar-foreground">Dashboard</h1>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveItem(item.key)}
                className={`group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeItem === item.key
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
