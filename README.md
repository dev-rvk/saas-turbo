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
   - exports  `better-auth/client` and `better-auth/server`
   - `client` exports functions `signIn, signOut, signUp, useSession, resetPassword, forgetPassword`
   - 









