"use client";

import { signIn } from "@/lib/actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
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

  useEffect(() => {
    if (state.errorMessage.length) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

  return (
    <form
      action={formAction}
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

        <hr className="my-4 border-dashed" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Email
            </Label>
            <Input type="email" required name="email" id="email" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="pwd" className="text-title text-sm">
                Password
              </Label>
              <Button asChild variant="link" size="sm">
                <Link
                  href="/signin/forgot-account"
                  className="link intent-info variant-ghost text-sm"
                >
                  Forgot your Account ?
                </Link>
              </Button>
            </div>
            <Input
              type="password"
              required
              name="pwd"
              id="pwd"
              className="input sz-md variant-mixed"
            />
          </div>

          {
            // errorMessage && !pending && toast.promise(errorMessage)
            // <p aria-live="polite" className="text-sm text-red-500">
            //   {errorMessage}
            // </p>
          }
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
