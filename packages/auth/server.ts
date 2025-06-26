import { betterAuth } from 'better-auth';
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db"
import { sendResetPasswordEmail, sendVerificationEmail } from '@repo/email';
import type { UserType } from '@repo/types/user';
import { emailOTP } from "better-auth/plugins"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    plugins: [
      nextCookies(),
      emailOTP({
        otpLength: 6,
        expiresIn: 300, // 5 minutes
        allowedAttempts: 3,
        sendVerificationOnSignUp: false,
        disableSignUp: true,
        async sendVerificationOTP({ email, otp, type}) {
          console.log(`[Auth] Attempting to send OTP. Email: ${email}, Type: ${type}`);

          try {
            const user = await prisma.user.findUnique({
              where: { email },
            });

            if (!user) {
              console.log(`[Auth] User not found for email: ${email}. OTP not sent.`);
              return;
            }

            // We can handle different email templates based on the OTP type
            switch (type) {
              case 'email-verification':
              case 'sign-in':
              case 'forget-password':
                await sendVerificationEmail({
                    toEmail: email,
                    userFirstname: user.name,
                    code: otp,
                });
                console.log(`[Auth] Verification email sent successfully to ${email}.`);
                break;
              default:
                console.log(`[Auth] Unknown OTP type: ${type}. OTP not sent.`);
            }
          } catch (error) {
            console.error(`[Auth] Failed to send verification email to ${email}.`, error);
          }
        },
      }),
    ],
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
        requireUppercase: true,
        sendResetPassword: async ({user, url}: {user: UserType, url: string}) => {
            if (!user) {
                return;
            }
            await sendResetPasswordEmail({
                toEmail: user.email,
                userFirstname: user.name,
                resetPasswordLink: url,
            });
        },
        resetPasswordTokenExpiresIn: 3600, // 1 hour
        requireEmailVerification: true
    },
    accountLinking: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    }
  });