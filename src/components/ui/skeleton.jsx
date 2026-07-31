export default function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = 'rounded-md' 
}) {
  return (
    <div
      className={`animate-pulse bg-gray-700/50 ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonText({ className = '' }) {
  return <Skeleton className={`h-3 ${className}`} />;
}

export function SkeletonTitle({ className = '' }) {
  return <Skeleton className={`h-5 ${className}`} />;
}

export function SkeletonAvatar({ size = 'w-10 h-10' }) {
  return <Skeleton className={size} rounded="rounded-full" />;
}

export function SkeletonButton({ className = 'w-20 h-8' }) {
  return <Skeleton className={className} rounded="rounded-md" />;
}