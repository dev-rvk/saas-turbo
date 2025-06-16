"use client";

import { signIn } from "@repo/auth/actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { Icons } from "@repo/ui/components/icons";
import SignInSocial from "./sign-in-social";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { toast } from "sonner";
import OtpForm from "./otp-form";
import { authClient } from "@repo/auth/client";
import { ZodIssue } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

type State = {
  errorMessage?: string | null;
  needsVerification?: boolean;
  email?: string;
  errors?: ZodIssue[];
};

export default function SigninForm() {
  const initialState: State = {};
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string; pwd?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.errorMessage) {
      toast.error(state.errorMessage);
    }
    if (state?.needsVerification && state.email) {
      toast.info("Your email is not verified. Please check your inbox for the code.");
      
      const sendOtp = async () => {
        await authClient.emailOtp.sendVerificationOtp({
            email: state.email!,
            type: "email-verification",
        });
      }
      sendOtp();

      setUserEmail(state.email);
      setShowOtp(true);
    }
    
    if (state?.errors) {
        const newErrors: { email?: string; pwd?: string } = {};
        state.errors.forEach((err) => {
            if (err.path[0] === "email") newErrors.email = err.message;
            if (err.path[0] === "pwd") newErrors.pwd = err.message;
        });
        setErrors(newErrors);
    } else {
        setErrors({});
    }
  }, [state]);

  if (showOtp) {
    return <OtpForm email={userEmail} onSuccess={() => window.location.reload()} />;
  }

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
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="pwd"
                id="pwd"
                className={`input sz-md variant-mixed ${errors.pwd ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
