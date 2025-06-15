import { auth } from "@repo/auth/server"
import { headers } from "next/headers"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { NotAuthenticated } from "@/components/not-authenticated"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return <NotAuthenticated />
  }

  return <DashboardLayout session={session} />
}
