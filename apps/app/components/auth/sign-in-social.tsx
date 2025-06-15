"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { signIn } from "@repo/auth/client";

export default function SignInSocial({
  provider,
  children,
}: {
  provider:
    | "github"
    | "apple"
    | "discord"
    | "facebook"
    | "google"
    | "microsoft"
    | "spotify"
    | "twitch"
    | "twitter"
    | "dropbox"
    | "linkedin"
    | "gitlab"
    | "tiktok"
    | "reddit"
    | "roblox"
    | "vk"
    | "kick";
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider,
          callbackURL: "/dashboard",
        });
      }}
      type="button"
      variant={"outline"}
    >
      {children}
    </Button>
  );
}
