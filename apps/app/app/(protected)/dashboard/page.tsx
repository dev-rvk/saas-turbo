import { getSession } from "@repo/auth/actions"
import { headers } from "next/headers"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { NotAuthenticated } from "@/components/not-authenticated"

export default async function DashboardPage() {
  const session = await getSession(await headers())

  if (!session) {
    return <NotAuthenticated />
  }

  return <DashboardLayout session={session} />
}
