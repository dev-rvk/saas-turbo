# SAAS Turborepo Template

A modern, full-stack SAAS starter template built with Turborepo, featuring Next.js, Better Auth, Prisma, and Shadcn UI. This monorepo template provides a solid foundation for building scalable SAAS applications.

## 🚀 Features

- **Monorepo Architecture**: Built with Turborepo for optimal development experience
- **Modern Stack**:
  - Next.js for the frontend
  - Better Auth for authentication
  - Prisma for database management
  - Shadcn UI for beautiful, accessible components
- **Type Safety**: Full TypeScript support
- **Code Quality**: ESLint and Prettier for consistent code style
- **Package Management**: PNPM for efficient dependency management

## 📦 Project Structure

```
saas-turbo/
├── apps/
│   ├── app/      # Main application
│   ├── studio/   # Admin dashboard
│   └── web/      # Marketing website
├── packages/     # Shared packages and configurations
└── ...
```

## 🛠️ Prerequisites

- Node.js >= 20
- PNPM >= 10.4.1

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone 
   cd saas-turbo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in each app directory
   - Fill in the required environment variables

4. **Start the development server**
   ```bash
   pnpm dev
   ```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build all applications and packages
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Usage Guide

1. **packages/auth**
   - Exports:
      - `@repo/auth/client` which is a better auth client exporting `signIn`, `signOut`, `signUp`, `useSession`, `resetPassword`, `forgetPassword`
      - `@repo/auth/server` which exports `better-auth` instance to be used in the server component.
      - `@repo/auth/actions` which has augmented functions which check for the users in the database and return either the error message in case the form data is violated. 
   - Setup the env variables in the respective app directory and then run `pnpm run auth:db:generate` to generate User and Account Schema in your database `@repo/db`, make sure you migrate the database after that.
   - exports  `better-auth/client` and `better-auth/server`
   - `client` exports functions `signIn, signOut, signUp, useSession, resetPassword, forgetPassword`
   - The `apps/app/lib/actions.ts` file exports two functions to signin, signup the user from the FormData.
   - Reset Password: in `auth/setver.ts`, for email and password login, reset link is sent using the send `sendResetPasswordEmail` defined in the `@repo/email`


2. **packages/db**
   - exprots prisma client as prisma








