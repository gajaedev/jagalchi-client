'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <Card className={cn('w-[400px] gap-6 p-6 shadow-sm', className)}>
      <CardHeader className="gap-1 p-0">
        <CardTitle className="text-base font-bold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm tracking-[0.07px]">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
      {footer && <CardFooter className="h-10 items-start justify-center p-0">{footer}</CardFooter>}
    </Card>
  );
}
