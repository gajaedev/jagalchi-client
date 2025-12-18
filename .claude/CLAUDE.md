# Jagalchi Client

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Jagalchi is a learning roadmap platform where students can fork and customize educational paths from seniors.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- UI: shadcn/ui
- State: Jotai (client), TanStack Query (server)
- Form: React Hook Form + Zod
- Test: Vitest, Storybook

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/ui/ # shadcn/ui components
├── features/      # Feature modules (isolated, no cross-import)
├── hooks/         # Shared custom hooks
├── lib/           # Utility functions
├── types/         # Shared type definitions
└── constants/     # Constants
```

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint --fix   # Auto-fix lint issues
pnpm test         # Run Vitest
pnpm storybook    # Start Storybook
```

## Critical Rules

- **NEVER** import between features directly. Use shared modules.
- **ALWAYS** run `pnpm lint` before committing.
- **ALWAYS** use TypeScript strict mode.
