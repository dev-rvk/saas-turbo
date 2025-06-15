"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Bell, LogOut, Menu, Settings, User } from "lucide-react"
import type { NavigationItem } from "./dashboard-layout"
import { signOut } from "@repo/auth/client"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import type { UserType } from "@repo/types/user"

interface NavbarProps {
  user: UserType
  setSidebarOpen: (open: boolean) => void
  setActiveItem: (item: NavigationItem) => void
}

export function Navbar({ user, setSidebarOpen, setActiveItem }: NavbarProps) {

  const router = useRouter()

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  const handleSignOut = async () => {
    await signOut()
    router.push("/signin")
  }
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ThemeToggle />

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveItem("profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveItem("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
