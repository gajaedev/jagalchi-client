export function LoadingSkeleton() {
  return (
    <div className="flex h-screen w-screen flex-col bg-white">
      {/* Header Skeleton */}
      <div className="flex h-14 items-center gap-4 border-b px-4">
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Canvas + Sidebar */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Canvas Skeleton */}
        <div className="flex-1 animate-pulse bg-gray-50" />

        {/* Sidebar Skeleton */}
        <div className="w-[240px] border-l border-gray-200 bg-white p-4">
          <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="space-y-4">
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Toolbar Skeleton (absolute positioned) */}
        <div className="absolute bottom-10 left-1/2 h-12 w-60 -translate-x-1/2 animate-pulse rounded-lg bg-gray-200 shadow-md" />
      </div>
    </div>
  );
}
