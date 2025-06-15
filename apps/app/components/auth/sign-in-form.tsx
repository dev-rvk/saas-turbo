"use client";

import { signIn } from "@/lib/actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { Icons } from "@repo/ui/components/icons";
import SignInSocial from "./sign-in-social";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { toast } from "sonner";
import { signInSchema, SignInFormData } from "@repo/types/auth";

export default function SigninForm() {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [errors, setErrors] = useState<{ email?: string; pwd?: string }>({});

  useEffect(() => {
    if (state.errorMessage.length) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

  const handleSubmit = async (formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      pwd: formData.get("pwd") as string,
    };

    try {
      // Validate the data
      signInSchema.parse(data);
      setErrors({});
      await formAction(formData);
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const newErrors: { email?: string; pwd?: string } = {};
        
        zodError.forEach((err: { path: string[]; message: string }) => {
          if (err.path[0] === "email") {
            newErrors.email = err.message;
          } else if (err.path[0] === "pwd") {
            newErrors.pwd = err.message;
          }
        });
        
        setErrors(newErrors);
      }
    }
  };

  return (
    <form
      action={handleSubmit}
      className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
    >
      <div className="p-8 pb-6">
        <div>
          <Link href="/" aria-label="go home">
            {/* <Icons.logo className="h-8 w-8" /> */}
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">
            Sign In to Better-Auth Starter Example.
          </h1>
          <p className="text-sm">Welcome back! Sign in to continue</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <SignInSocial provider="google">
            <Icons.google />
            <span>Google</span>
          </SignInSocial>
          <SignInSocial provider="github">
            <Icons.gitHub />
            <span>GitHub</span>
          </SignInSocial>
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">Or continue With</span>
            <hr className="border-dashed" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Email
            </Label>
            <Input 
              type="text"
              name="email" 
              id="email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="pwd" className="text-title text-sm">
                Password
              </Label>
              <Button asChild variant="link" size="sm">
                <Link
                  href="/signin/forgot-password"
                  className="link intent-info variant-ghost text-sm"
                >
                  Forgot your Password ?
                </Link>
              </Button>
            </div>
            <Input
              type="password"
              name="pwd"
              id="pwd"
              className={`input sz-md variant-mixed ${errors.pwd ? "border-red-500" : ""}`}
            />
            {errors.pwd && (
              <p className="text-sm text-red-500 mt-1">{errors.pwd}</p>
            )}
          </div>

          <Button className="w-full" disabled={pending}>
            Sign In
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-(--radius) border p-3">
        <p className="text-accent-foreground text-center text-sm">
          Don&apos;t have an account ?
          <Button asChild variant="link" className="px-2">
            <Link href="/signup">Create account</Link>
          </Button>
        </p>
      </div>
    </form>
  );
}
