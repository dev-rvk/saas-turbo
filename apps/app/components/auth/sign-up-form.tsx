"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "@repo/auth/actions";
import { Icons } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import SignInSocial from "./sign-in-social";
import OtpForm from "./otp-form";
import type { ZodIssue } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@repo/auth/client";

type State = {
  errorMessage?: string | null;
  success?: boolean;
  email?: string;
  errors?: ZodIssue[];
};

export default function SignupForm() {
  const router = useRouter();
  const initialState: State = {};
  const [state, formAction, pending] = useActionState(signUp, initialState);
  
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pwd: ""
  });
  const [errors, setErrors] = useState<{ firstname?: string; lastname?: string; email?: string; pwd?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.errorMessage) {
      toast.error(state.errorMessage);
    }
    if (state?.success && state.email) {
      toast.success("Sign up successful! Please verify your email.");
      const sendOtp = async () => {
        try {
          await authClient.emailOtp.sendVerificationOtp({
            email: state.email as string,
            type: "sign-in",
          });
          setUserEmail(state.email as string);
          setShowOtp(true);
        } catch (error) {
          toast.error("Failed to send verification email. Please try again.");
        }
      };
      sendOtp();
    }
    if (state?.errors) {
        const newErrors: { firstname?: string; lastname?: string; email?: string; pwd?: string } = {};
        state.errors.forEach((err) => {
            if (err.path[0] === "firstname") {
              newErrors.firstname = err.message;
              setFormData(prev => ({ ...prev, firstname: "" }));
            }
            if (err.path[0] === "lastname") {
              newErrors.lastname = err.message;
              setFormData(prev => ({ ...prev, lastname: "" }));
            }
            if (err.path[0] === "email") {
              newErrors.email = err.message;
              setFormData(prev => ({ ...prev, email: "" }));
            }
            if (err.path[0] === "pwd") {
              newErrors.pwd = err.message;
              setFormData(prev => ({ ...prev, pwd: "" }));
            }
        });
        setErrors(newErrors);
    } else {
        setErrors({});
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (showOtp) {
    return <OtpForm email={userEmail} onSuccess={() => router.push("/dashboard")} />;
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
              <Input 
                type="text" 
                name="firstname" 
                id="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className={errors.firstname ? "border-red-500" : ""} 
              />
              {errors.firstname && (
                <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="block text-sm">
                Lastname
                {formData.lastname === "" && (
                  <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
                )}
              </Label>
              <Input 
                type="text" 
                name="lastname" 
                id="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className={errors.lastname ? "border-red-500" : ""} 
              />
              {errors.lastname && (
                <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Email
            </Label>
            <Input 
              type="text" 
              name="email" 
              id="email" 
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""} 
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pwd" className="text-title text-sm">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="pwd"
                id="pwd"
                value={formData.pwd}
                onChange={handleInputChange}
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