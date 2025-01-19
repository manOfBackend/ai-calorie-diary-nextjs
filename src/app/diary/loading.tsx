import { Skeleton } from '@/components/ui/skeleton';

export default function DiaryLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Date Navigation Skeleton */}
      <div className="flex items-center justify-center space-x-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Food Info Card Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <Skeleton className="w-full h-64 rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>

        {/* Nutrition Charts Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="w-full h-64 rounded-lg" />
          <Skeleton className="w-full h-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
