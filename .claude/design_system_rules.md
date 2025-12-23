# Jagalchi Design System Rules for Figma Integration

This document provides comprehensive design system patterns for integrating Figma designs with the Jagalchi Client codebase using the Model Context Protocol (MCP).

## 1. Token Definitions

### Color Tokens

**Primary Location**: `src/constants/colors.ts` (Figma Design System)

**Format**: TypeScript constant with full Tailwind palette (20 colors × 11 shades)

**Currently Used Colors**:

- **Neutral (gray)**: All values used - primary gray scale
- **Red**: 5 values used (100, 300, 500, 600, 700) - error states
- **Blue**: 1 value used (500) - info states

**Full Color Palette Available**:

```typescript
import { colors, semanticColors } from '@/constants/colors';

// Access specific colors
colors.gray[500]; // #737373
colors.red[500]; // #EF4444
colors.blue[500]; // #3B82F6

// Semantic mappings
semanticColors.error.DEFAULT; // red-500
semanticColors.success.DEFAULT; // emerald-500
semanticColors.warning.DEFAULT; // amber-500
semanticColors.info.DEFAULT; // blue-500
```

**Secondary Location**: `src/app/globals.css:46-113` (CSS Custom Properties)

**OKLCH Color Space** (for smooth gradients and better color perception):

**Light Mode Theme** (`:root`):

```css
--background: oklch(1 0 0); /* White */
--foreground: oklch(0.145 0 0); /* Near black */
--primary: oklch(0.205 0 0); /* Dark gray */
--primary-foreground: oklch(0.985 0 0); /* Off-white */
--secondary: oklch(0.97 0 0); /* Light gray */
--muted: oklch(0.97 0 0); /* Light gray */
--muted-foreground: oklch(0.556 0 0); /* Medium gray */
--destructive: oklch(0.577 0.245 27.325); /* Red */
--border: oklch(0.922 0 0); /* Light border */
--input: oklch(0.922 0 0); /* Input border */
--ring: oklch(0.708 0 0); /* Focus ring */
```

**Dark Mode Theme** (`.dark`):

```css
--background: oklch(0.145 0 0); /* Dark background */
--foreground: oklch(0.985 0 0); /* Light text */
--primary: oklch(0.922 0 0); /* Light primary */
--primary-foreground: oklch(0.205 0 0); /* Dark text */
```

**Tailwind Integration** (`@theme inline`):

```css
--color-background: var(--background);
--color-foreground: var(--foreground);
--color-primary: var(--primary);
/* Mapped to Tailwind utilities: bg-background, text-foreground, bg-primary */
```

**Color Usage Guidelines**:

1. **Semantic Colors**: Use `semanticColors` for consistent error/success/warning/info states
2. **Direct Colors**: Use `colors` object for specific design needs
3. **CSS Variables**: Use CSS custom properties for theme-aware components
4. **Tailwind Classes**: Prefer utility classes (`bg-gray-500`, `text-red-600`) for direct color application

### Spacing & Border Radius Tokens

**Location**: `src/app/globals.css:40-44`

```css
--radius: 0.625rem; /* Base radius: 10px */
--radius-sm: calc(var(--radius) - 4px); /* 6px */
--radius-md: calc(var(--radius) - 2px); /* 8px */
--radius-lg: var(--radius); /* 10px */
--radius-xl: calc(var(--radius) + 4px); /* 14px */
```

**Usage in Components**:

```tsx
className = 'rounded-md'; // 8px (md)
className = 'rounded-xl'; // 14px (xl)
```

### Typography Tokens

**Primary Location**: `src/constants/typography.ts` (Figma Design System)

**Format**: TypeScript constant with complete typography scale

**Typography Scale**:

```typescript
import { typography } from '@/constants/typography';

// Headings
typography.heading.h1; // 48px / 48px / -1.5px / 600
typography.heading.h2; // 30px / 30px / -1px / 600
typography.heading.h3; // 24px / 28.8px / -1px / 600
typography.heading.h4; // 20px / 24px / 0px / 600

// Paragraphs
typography.paragraph.regular; // 16px / 24px / 0px / 400
typography.paragraph.medium; // 16px / 24px / 0px / 500
typography.paragraph.bold; // 16px / 24px / 0px / 600
typography.paragraph.small; // 14px / 21px / 0.5px / 400
typography.paragraph.smallMedium; // 14px / 21px / 0.5px / 500
typography.paragraph.mini; // 12px / 16px / 1.5px / 400
typography.paragraph.miniMedium; // 12px / 16px / 1.5px / 500
typography.paragraph.miniBold; // 12px / 16px / 1.5px / 600

// Monospace
typography.monospace; // 16px / 24px / 0px / 400
```

**Secondary Location**: `src/app/globals.css:81-101` (CSS Custom Properties)

**CSS Variables**:

```css
--heading-1-size: 48px;
--heading-1-line-height: 48px;
--heading-1-letter-spacing: -1.5px;

--heading-2-size: 30px;
--heading-2-line-height: 30px;
--heading-2-letter-spacing: -1px;

--heading-3-size: 24px;
--heading-3-line-height: 28.8px;
--heading-3-letter-spacing: -1px;

--heading-4-size: 20px;
--heading-4-line-height: 24px;
--heading-4-letter-spacing: 0px;

--paragraph-regular-size: 16px;
--paragraph-regular-line-height: 24px;
--paragraph-regular-letter-spacing: 0px;

--paragraph-small-size: 14px;
--paragraph-small-line-height: 21px;
--paragraph-small-letter-spacing: 0.5px;

--paragraph-mini-size: 12px;
--paragraph-mini-line-height: 16px;
--paragraph-mini-letter-spacing: 1.5px;
```

**Font Families**: `src/app/layout.tsx:6-14`

```tsx
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});
```

**Tailwind Integration**:

```css
--font-sans: var(--font-inter);
--font-mono: var(--font-jetbrains-mono);
```

**Usage in Components**:

```tsx
<h1 className="text-[length:var(--heading-1-size)] font-semibold leading-[var(--heading-1-line-height)] tracking-[var(--heading-1-letter-spacing)]">
  Heading 1
</h1>

<p className="text-[length:var(--paragraph-regular-size)] font-normal leading-[var(--paragraph-regular-line-height)] tracking-[var(--paragraph-regular-letter-spacing)]">
  Paragraph text
</p>

<code className="font-mono">Monospace text</code>
```

**Typography Usage Guidelines**:

1. **CSS Variables**: Use for design system consistency across themes
2. **TypeScript Constants**: Use for programmatic access and type safety
3. **Font Classes**: `font-sans` for body, `font-semibold` for headings, `font-mono` for code
4. **Antialiasing**: Apply `antialiased` class for smoother rendering

---

## 2. Component Library

### Component Architecture

**Pattern**: Atomic Design + Feature-based organization

**Base UI Components Location**: `src/components/ui/`

- Reusable, primitive components (Button, Input, Card, etc.)
- Built with Radix UI primitives + Tailwind CSS
- Use `class-variance-authority` (CVA) for variant management

**Feature Components Location**: `src/features/[feature]/components/`

```
src/features/auth/components/
├── atoms/           # Single-purpose components (GoogleAuthButton, FormErrorMessage)
├── molecules/       # Composite components (FormField, PasswordInput)
├── organisms/       # Complex components (LoginForm, RegisterForm)
└── templates/       # Layout templates (AuthCard)
```

**CRITICAL RULE**: Features MUST NOT import from each other. Use shared `src/components/ui/` for cross-feature components.

### Component Patterns

#### Base UI Components (shadcn/ui style)

**Example**: `src/components/ui/button.tsx`

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'base-classes', // Base styles
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border bg-background shadow-xs hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({ className, variant, size, ...props }) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

**Key Patterns**:

1. Use CVA for variants
2. Use `cn()` utility for className merging
3. Add `data-slot` attribute for component identification
4. Export both component and variants

#### Feature Components (Atomic Design)

**Example**: `src/features/auth/components/templates/AuthCard.tsx`

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, className }: AuthCardProps) {
  return (
    <Card className={cn('w-[400px] gap-6 p-6 shadow-sm', className)}>
      <CardHeader className="gap-1 p-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
```

**Composition Pattern**:

- Template components compose UI primitives
- Props follow TypeScript strict mode
- Use composition over configuration

---

## 3. Frameworks & Libraries

### UI Framework

**Framework**: Next.js 16 (App Router) + React 19

- **Location**: `src/app/` (routes), `src/components/` (components)
- **Routing**: File-based routing with App Router
- **Server Components**: Default (use `'use client'` directive for client components)

### Styling Libraries

**Primary**: Tailwind CSS v4

- **Config**: `postcss.config.mjs` (no tailwind.config.ts in v4)
- **Import**: `@import "tailwindcss";` in `globals.css`
- **Utilities**: Direct CSS custom properties via `@theme inline`

**Utility Libraries**:

- `clsx` + `tailwind-merge` → Combined in `cn()` helper (`src/lib/utils.ts`)
- `class-variance-authority` → Variant management for components
- `tw-animate-css` → Animation utilities

**Usage Pattern**:

```tsx
import { cn } from '@/lib/utils';

className={cn(
  'base-classes',
  variant === 'primary' && 'primary-classes',
  className // User override
)}
```

### Build System

**Bundler**: Next.js built-in (webpack/turbopack)

- **Config**: `next.config.ts`
- **React Compiler**: Enabled (`reactCompiler: true`)
- **PostCSS**: Tailwind processing via `@tailwindcss/postcss`

---

## 4. Asset Management

### Storage Locations

**Static Assets**: `/public/`

- SVG icons: `public/*.svg` (e.g., `vercel.svg`, `globe.svg`)
- Images and media files

**Component-Embedded Assets**: Inline SVG in components

- **Example**: `src/features/auth/components/atoms/GoogleAuthButton.tsx:12-33`

```tsx
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="..." fill="#4285F4" />
      {/* Multi-colored SVG paths */}
    </svg>
  );
}
```

### Asset Referencing

**Static Files**:

```tsx
import Image from 'next/image';

<Image src="/logo.svg" alt="Logo" width={100} height={100} />;
```

**Inline SVG Components**:

```tsx
<GoogleIcon className="size-4" />
```

### Optimization

- **Next.js Image**: Use `next/image` for automatic optimization
- **SVG**: Prefer inline SVG components for icons (better tree-shaking)
- **No CDN Config**: Assets served from Next.js static file serving

---

## 5. Icon System

### Icon Library

**Primary**: `lucide-react` (package.json:37)

**Usage Pattern**:

```tsx
import { Icon } from 'lucide-react';

<Icon className="size-4" />;
```

### Custom Icons

**Location**: Embedded in feature components or `src/components/ui/`

**Pattern**: Functional SVG components

```tsx
function CustomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      {/* SVG paths */}
    </svg>
  );
}
```

### Icon Sizing Convention

```tsx
className = 'size-4'; // 16px × 16px (default for buttons)
className = 'size-5'; // 20px × 20px
className = 'size-6'; // 24px × 24px
```

### Naming Convention

- **Lucide**: Use direct icon names (e.g., `ChevronDown`, `User`, `Settings`)
- **Custom**: Suffix with `Icon` (e.g., `GoogleIcon`, `LogoIcon`)

---

## 6. Styling Approach

### CSS Methodology

**Primary**: Utility-first with Tailwind CSS

**Global Styles**: `src/app/globals.css`

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Component Styling Pattern

1. **Utility Classes** (primary approach):

```tsx
<div className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm">
```

2. **CVA Variants** (for components with multiple states):

```tsx
const cardVariants = cva('base-classes', {
  variants: {
    variant: { default: 'shadow-sm', elevated: 'shadow-lg' },
  },
});
```

3. **Design Tokens via CSS Variables**:

```tsx
className = 'bg-background text-foreground border-border';
```

### Responsive Design

**Breakpoints** (Tailwind defaults):

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**Usage**:

```tsx
className = 'flex-col md:flex-row gap-4 md:gap-6';
```

### Dark Mode

**Strategy**: Class-based with `.dark` selector

**Implementation**:

```css
@custom-variant dark (&:is(.dark *));
```

**Usage**:

```tsx
className = 'bg-white dark:bg-zinc-900';
```

---

## 7. Project Structure

### Directory Organization

```
src/
├── app/                    # Next.js App Router (routes & layouts)
│   ├── (auth)/            # Route group (auth pages)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & tokens
│
├── components/
│   └── ui/                # Shared shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
│
├── features/              # Feature modules (ISOLATED)
│   └── auth/
│       ├── components/
│       │   ├── atoms/     # Single-purpose components
│       │   ├── molecules/ # Composite components
│       │   ├── organisms/ # Complex components
│       │   └── templates/ # Layout templates
│       ├── hooks/         # Feature-specific hooks
│       ├── schemas/       # Zod validation schemas
│       ├── types/         # TypeScript types
│       ├── __tests__/     # Vitest tests
│       └── index.ts       # Public API exports
│
├── lib/                   # Utility functions
│   └── utils.ts           # cn() helper, etc.
│
└── types/                 # Shared TypeScript types
```

### Import Path Aliases

```tsx
'@/components/*'  →  src/components/*
'@/lib/*'         →  src/lib/*
'@/features/*'    →  src/features/*
'@/app/*'         →  src/app/*
```

### Feature Isolation Rules

**✅ ALLOWED**:

```tsx
// Inside feature
import { Button } from '@/components/ui/button';
import { useAuth } from './hooks/use-auth';
```

**❌ FORBIDDEN**:

```tsx
// Cross-feature import
import { LoginForm } from '@/features/auth/components/organisms/LoginForm';
```

---

## 8. Figma Integration Guidelines

### When Generating Code from Figma

1. **Use Design Tokens**:
   - Map Figma colors to CSS variables: `--primary`, `--background`, etc.
   - Use radius tokens: `rounded-md`, `rounded-xl`
   - Reference typography: `font-sans`, `antialiased`

2. **Component Selection**:
   - Check `src/components/ui/` for existing primitives BEFORE creating new ones
   - Compose from existing components: `Button`, `Card`, `Input`, `Label`
   - Follow atomic design pattern for feature components

3. **Styling Approach**:
   - Prefer Tailwind utilities over inline styles
   - Use `cn()` for className composition
   - Apply CVA for components with multiple variants

4. **File Placement**:
   - UI primitives → `src/components/ui/`
   - Feature components → `src/features/[feature]/components/[atoms|molecules|organisms|templates]/`
   - NEVER cross-import between features

5. **Accessibility**:
   - Use semantic HTML elements
   - Include ARIA attributes: `aria-invalid`, `aria-describedby`
   - Use Radix UI primitives for complex interactions (Dialog, DropdownMenu, etc.)

6. **TypeScript**:
   - Strict mode enabled - all props must be typed
   - Prefer interfaces for component props
   - Use `React.ComponentProps<'element'>` for extending native elements

### Example: Figma to Code Workflow

**Figma Design**: Button with variants (primary, secondary, outline)

**Generated Code**:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border bg-background hover:bg-accent',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
```

---

## 9. Common Patterns Reference

### Form Components

**Pattern**: React Hook Form + Zod validation

**Example**: `src/features/auth/components/organisms/LoginForm.tsx`

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../schemas/auth.schema';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} aria-invalid={!!errors.email} />
      {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
    </form>
  );
}
```

### Client Components

**Use `'use client'` directive when**:

- Using hooks (`useState`, `useForm`, etc.)
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `document`)

```tsx
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Layout Composition

**Pattern**: Flexbox utilities with gap spacing

```tsx
<div className="flex flex-col gap-6">
  <div className="flex items-center justify-between gap-4">{/* Content */}</div>
</div>
```

**Card Layouts**:

```tsx
<Card className="gap-6 p-6">
  <CardHeader className="gap-1 p-0">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="p-0">Content</CardContent>
</Card>
```

---

## 10. Testing & Documentation

### Component Testing

**Framework**: Vitest + Testing Library

**Test Location**: `src/features/[feature]/__tests__/`

**Pattern**:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Component Documentation

**Framework**: Storybook

**Commands**:

```bash
pnpm storybook       # Start Storybook dev server
pnpm build-storybook # Build static Storybook
```

---

## Quick Reference Checklist

When implementing Figma designs:

- [ ] Check existing `src/components/ui/` components first
- [ ] Use design tokens from `globals.css` (colors, radius, fonts)
- [ ] Apply `cn()` utility for className merging
- [ ] Add `data-slot` attributes to components
- [ ] Use CVA for components with variants
- [ ] Include TypeScript types (strict mode)
- [ ] Add ARIA attributes for accessibility
- [ ] Place components in correct atomic design folder
- [ ] Never cross-import between features
- [ ] Use `'use client'` directive only when needed
- [ ] Follow existing naming conventions (PascalCase components, camelCase functions)
- [ ] Run `pnpm lint` before committing
