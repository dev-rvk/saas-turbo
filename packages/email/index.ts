import { Resend } from 'resend';
import { ResetPasswordEmail } from './templates/reset-password';
import type { ResetPasswordEmailData, VerificationEmailData  } from '@repo/types/auth';
import { VerificationEmail } from './templates/verification-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(data: ResetPasswordEmailData) {    
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: data.toEmail,
    subject: 'Reset Password Request',
    react: ResetPasswordEmail({ userFirstname: data.userFirstname, resetPasswordLink: data.resetPasswordLink }),
  });
}

export async function sendVerificationEmail(data: VerificationEmailData) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: data.toEmail,
    subject: 'Welcome! Verify your email to get started!',
    react: VerificationEmail({ userFirstname: data.userFirstname, validationCode: data.code }),
  });
}