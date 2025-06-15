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
import { signUpSchema, SignUpFormData } from "@repo/types/auth";
import { useState } from "react";

export default function SignupForm() {
  const initialState = { errorMessage: "" };
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const [errors, setErrors] = useState<{ firstname?: string; lastname?: string; email?: string; pwd?: string }>({});

  useEffect(() => {
    if (state.errorMessage.length) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

  const handleSubmit = async (formData: FormData) => {
    const data = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      pwd: formData.get("pwd") as string,
    };
    try {
      signUpSchema.parse(data);
      setErrors({});
      await formAction(formData);
    } catch (error) {
      if (error instanceof Error) {
        let zodError;
        try {
          zodError = JSON.parse(error.message);
        } catch {
          zodError = error;
        }
        const newErrors: { firstname?: string; lastname?: string; email?: string; pwd?: string } = {};
        if (Array.isArray(zodError)) {
          zodError.forEach((err: { path: string[]; message: string }) => {
            if (err.path[0] === "firstname") newErrors.firstname = err.message;
            if (err.path[0] === "lastname") newErrors.lastname = err.message;
            if (err.path[0] === "email") newErrors.email = err.message;
            if (err.path[0] === "pwd") newErrors.pwd = err.message;
          });
        }
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

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">Or continue With</span>
            <hr className="border-dashed" />
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="block text-sm">
                Firstname
              </Label>
              <Input type="text" name="firstname" id="firstname" className={errors.firstname ? "border-red-500" : ""} />
              {errors.firstname && (
                <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="block text-sm">
                Lastname
              </Label>
              <Input type="text" name="lastname" id="lastname" className={errors.lastname ? "border-red-500" : ""} />
              {errors.lastname && (
                <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Email
            </Label>
            <Input type="text" name="email" id="email" className={errors.email ? "border-red-500" : ""} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pwd" className="text-title text-sm">
              Password
            </Label>
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