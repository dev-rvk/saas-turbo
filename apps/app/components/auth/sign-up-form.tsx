"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { signUp } from "@/lib/actions";
import { Icons } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import SignInSocial from "./sign-in-social";

export default function SignupForm() {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signUp, initialState);

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
          <h1 className="text-title mb-1 mt-4 text-xl font-semibold">
            Sign Up to Better-Auth
          </h1>
          <p className="text-sm">Welcome! Create an account to get started</p>
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

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="block text-sm">
                Firstname
              </Label>
              <Input type="text" required name="firstname" id="firstname" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="block text-sm">
                Lastname
              </Label>
              <Input type="text" required name="lastname" id="lastname" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Email
            </Label>
            <Input type="email" required name="email" id="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pwd" className="text-title text-sm">
              Password
            </Label>
            <Input
              type="password"
              required
              name="pwd"
              id="pwd"
              className="input sz-md variant-mixed"
            />
          </div>
          <Button className="w-full" disabled={pending}>
            Continue
          </Button>
        </div>
      </div>

      <div className="bg-muted rounded-(--radius) border p-3">
        <p className="text-accent-foreground text-center text-sm">
          Have an account ?
          <Button asChild variant="link" className="px-2">
            <Link href="/signin">Sign In</Link>
          </Button>
        </p>
      </div>
    </form>
  );
}