"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@repo/ui/components/button"
import { AlertCircle } from "lucide-react"

export function NotAuthenticated() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signin")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const handleSignIn = () => {
    router.push("/signin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-card-foreground mb-4">Not Authenticated</h1>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            You need to sign in to access this page. You'll be redirected automatically in 3 seconds.
          </p>

          <Button onClick={handleSignIn} className="w-full h-12 text-base font-medium" size="lg">
            Sign In Now
          </Button>
        </div>
      </div>
    </div>
  )
}
