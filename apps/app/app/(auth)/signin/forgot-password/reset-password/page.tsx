"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@repo/auth/client";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import Link from "next/link";
import { signUpSchema } from "@repo/types/auth";


export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ password?: string }>({});
  const searchParams = useSearchParams()
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing token.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    try {
      const passwordSchema = signUpSchema.shape.pwd;
      passwordSchema.parse(password);
      setErrors({});
    } catch (error) {
      if (error instanceof Error) {
        let zodError;
        try {
          zodError = JSON.parse(error.message);
        } catch {
          zodError = error;
        }
        const newErrors: { password?: string } = {};
        if (Array.isArray(zodError)) {
          zodError.forEach((err: { path: string[]; message: string }) => {
            if (err.path.length === 0 || err.path[0] === "pwd") {
              newErrors.password = err.message;
            }
          });
        }
        setErrors(newErrors);
        return;
      }
    }

    const { error } = await resetPassword({
      token,
      newPassword: password,
    });

    if (error) {
      setMessage("Failed to reset password.");
    } else {
      setMessage("Password reset! You can now sign in.");
      setTimeout(() => router.push("/signin"), 3000);
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              {/* <LogoIcon /> */}
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Reset Password</h1>
            <p className="text-sm">Enter your new password below</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm">
                New Password
              </Label>
              <Input
                type="password"
                required
                name="password"
                id="password"
                value={password}
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={!token || isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={!token || isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>

          {message && (
            <div className="mt-6 text-center">
              <p
                className={`text-sm ${
                  message.includes("Password reset!")
                    ? "text-green-600"
                    : message.includes("Invalid or missing token") || message.includes("Failed")
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remember your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/signin">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
  )
}