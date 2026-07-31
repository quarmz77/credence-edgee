
import Skeleton from './Skeleton';

export default function ProjectCardSkeleton() {
  return (
    <div className="p-4 rounded-lg bg-gray-900 border border-gray-800 space-y-3">
      <Skeleton className="h-4 w-2/3" />   {/* title */}
      <Skeleton className="h-3 w-1/3" />   {/* company name */}
      <Skeleton className="h-3 w-full" />  {/* description line */}
      <Skeleton className="h-3 w-5/6" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-6 w-16 rounded-full" /> {/* badge */}
        <Skeleton className="h-8 w-20 rounded-md" />   {/* button */}
      </div>
    </div>
  );
}