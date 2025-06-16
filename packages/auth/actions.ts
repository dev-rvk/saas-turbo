"use server";

import { redirect } from "next/navigation";
import { auth } from "./server";
import { prisma } from "@repo/db";
import { APIError } from "better-auth/api";
import { signInSchema, signUpSchema } from "@repo/types/auth";
import { ZodIssue } from "zod";

interface State {
  errorMessage?: string | null;
  success?: boolean;
  needsVerification?: boolean;
  email?: string;
  errors?: ZodIssue[];
}

export async function signIn(prevState: State, formData: FormData): Promise<State> {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
  };

  const validationResult = signInSchema.safeParse({
      email: rawFormData.email,
      pwd: rawFormData.password
  });
  if (!validationResult.success) {
    return {
        errors: validationResult.error.issues,
    }
  }

  const { email, password } = rawFormData;

  try {
    const user = await prisma.user.findUnique({ where: { email }});

    if (user && !user.emailVerified) {
        return { needsVerification: true, email };
    }

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errorMessage: "Incorrect password. Please try again." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid credentials." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    else {
      console.error("sign in with email has not worked", error);
      throw error;
    }
  }
  redirect("/dashboard");
}

export async function signUp(prevState: State, formData: FormData): Promise<State> {
  const rawFormData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    password: formData.get("pwd") as string,
  };

  const validationResult = signUpSchema.safeParse({
      ...rawFormData,
      pwd: rawFormData.password
  });

  if (!validationResult.success) {
    return {
        errors: validationResult.error.issues,
    }
  }

  const { email, password, firstname, lastname } = rawFormData;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstname} ${lastname}`,
        email,
        password,
      },
    });
    return { success: true, email };
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User already exists." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    console.error("sign up with email and password has not worked", error);
    return { errorMessage: "An unexpected error occurred during sign up." };
  }
}

export async function searchAccount(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    return user;
  } else {
    return { errorMessage: "User not found." };
  }
}

export async function getSession(headers: Headers) {
  const session = await auth.api.getSession({
    headers,
  });
  return session;
}

