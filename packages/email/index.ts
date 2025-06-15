import { Resend } from 'resend';
import { ResetPasswordEmail } from './templates/reset-password';
import type { ResetPasswordEmailData } from '@repo/types/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(data: ResetPasswordEmailData) {    
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: data.toEmail,
    subject: 'Reset Password Request',
    react: ResetPasswordEmail({ userFirstname: data.userFirstname, resetPasswordLink: data.resetPasswordLink }),
  });
}