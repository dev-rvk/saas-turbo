"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { searchAccount } from "@/lib/actions";
import { toast } from "sonner";

export default function ForgotAccountPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await searchAccount(email);
    
    if (result && 'errorMessage' in result) {
      toast.error(result.errorMessage);
      return;
    }

    router.push(
      `/signin/forgot-account/forgot-password?email=${encodeURIComponent(email)}`
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="p-6 max-w-md mx-auto space-y-4 container"
    >
      <h1 className="text-xl font-semibold">Find Your Account</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}