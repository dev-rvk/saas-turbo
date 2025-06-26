"use client";

import { useState, useEffect } from "react";
import { authClient } from "@repo/auth/client";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";

interface OtpFormProps {
  email: string;
  onSuccess: () => void;
}

const RESEND_COOLDOWN_FIRST = 120; // 2 minutes
const RESEND_COOLDOWN_SUBSEQUENT = 300; // 5 minutes

export default function OtpForm({ email, onSuccess }: OtpFormProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Email verified successfully!");
      onSuccess();
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("A new verification code has been sent.");
      setResendCount(prev => prev + 1);
      setResendCooldown(resendCount === 0 ? RESEND_COOLDOWN_FIRST : RESEND_COOLDOWN_SUBSEQUENT);
    }
    setLoading(false);
  };

  const minutes = Math.floor(resendCooldown / 60);
  const seconds = resendCooldown % 60;

  return (
    <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-8 shadow-md">
      <h1 className="text-title mb-1 text-xl font-semibold">Verify your email</h1>
      <p className="text-sm text-muted-foreground">
        We've sent a 6-digit code to <strong>{email}</strong>. Please enter it
        below to verify your email address.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-5">
        <div className="flex justify-center">
          <Label htmlFor="otp" className="sr-only">
            Verification Code
          </Label>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button
          className="w-full"
          type="submit"
          disabled={loading || otp.length < 6}
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Didn't receive the code?{" "}
        <Button
          variant="link"
          className="px-1"
          disabled={resendCooldown > 0 || loading}
          onClick={handleResendOtp}
        >
          {resendCooldown > 0
            ? `Resend in ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
            : "Resend code"}
        </Button>
      </div>
       <p className="mt-2 text-xs text-center text-muted-foreground">
        Note: The resend timer is for user experience. Spamming is prevented on the server.
      </p>
    </div>
  );
} 