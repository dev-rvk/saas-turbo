"use client"

import type { UserType } from "@repo/types/user"

interface DashboardContentProps {
  user: UserType
}

export function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with your account today.</p>
      </div>

      {/* Dashboard overview content */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium text-card-foreground">Overview</h3>
          <p className="text-sm text-muted-foreground mt-2">Your dashboard overview content goes here.</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium text-card-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground mt-2">Recent activity content goes here.</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium text-card-foreground">Quick Actions</h3>
          <p className="text-sm text-muted-foreground mt-2">Quick actions content goes here.</p>
        </div>
      </div>
    </div>
  )
}
