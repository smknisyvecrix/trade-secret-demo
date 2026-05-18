export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="h-12 bg-gray-100 border-b"></div>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-16 border-b border-gray-100 px-6 flex items-center gap-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  );
}
