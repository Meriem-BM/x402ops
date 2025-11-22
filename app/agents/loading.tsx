import { DashboardShell } from '@/components/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-full max-w-sm" />
        </div>

        {/* Table Skeleton */}
        <Card>
          <div className="space-y-4 p-6">
            {/* Table Header */}
            <div className="flex items-center justify-between border-b pb-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-24" />
              ))}
            </div>
            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
