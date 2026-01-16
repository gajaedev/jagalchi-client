import { cn } from '@/lib/utils';

export interface EditorTemplateProps {
  children: React.ReactNode; // React Flow canvas
  header?: React.ReactNode; // EditorHeader
  toolbar?: React.ReactNode; // EditorToolbar
  sidebar?: React.ReactNode; // Dynamic sidebar
  className?: string;
}

/**
 * Editor page layout template
 * Provides fixed positioning for header, toolbar, sidebar, and canvas
 */
export function EditorTemplate({
  children,
  header,
  toolbar,
  sidebar,
  className,
}: EditorTemplateProps) {
  return (
    <div className={cn('relative h-screen w-screen overflow-hidden', className)}>
      {/* Header (top, fixed) */}
      {header && <div className="fixed top-0 right-0 left-0 z-40">{header}</div>}

      {/* Canvas (absolute, full viewport) */}
      <div className="absolute inset-0">{children}</div>

      {/* Toolbar (bottom center, fixed) */}
      {toolbar && <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">{toolbar}</div>}

      {/* Sidebar (right, conditional) */}
      {sidebar}
    </div>
  );
}
