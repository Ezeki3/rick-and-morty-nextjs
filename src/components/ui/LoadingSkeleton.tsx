export function CardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="bg-gray-700 h-48 w-full" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-4 animate-pulse">
      <div className="bg-gray-700 rounded-lg w-16 h-16 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-1/3" />
        <div className="h-3 bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  );
}

export function GridSkeletons({ count = 20 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </>
  );
}

export function ListSkeletons({ count = 20 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}
