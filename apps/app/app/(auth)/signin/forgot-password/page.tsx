"use client"

import type React from "react"

import { useState } from "react"
import { forgetPassword } from "@repo/auth/client"
import { Input } from "@repo/ui/components/input"
import { Button } from "@repo/ui/components/button"
import { Label } from "@repo/ui/components/label"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
//import { LogoIcon } from "@/components/logo"

export default function ForgotPasswordPage() {
  const params = useSearchParams()
  const emailFromQuery = params.get("email") || ""
  const [email, setEmail] = useState(emailFromQuery)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await forgetPassword({
      email,
      redirectTo: `${window.location.origin}/signin/forgot-account/forgot-password/reset-password`,
    })

    if (error) {
      setMessage("Something went wrong. Please try again.")
    } else {
      setMessage("Check your email for the reset link.")
    }
    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="p-6 max-w-md mx-auto space-y-4 container">
      <form
        onSubmit={handleSubmit}
        className="bg-muted h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div>
            {/* <Link href="/" aria-label="go home">
              <LogoIcon />
            </Link> */}
            <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
            <p className="text-sm">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          {message && (
            <div className="mt-6 text-center">
              <p className={`text-sm ${message.includes("Check your email") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/signin">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  )
}
