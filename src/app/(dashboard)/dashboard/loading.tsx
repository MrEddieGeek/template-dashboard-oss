export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-48 animate-pulse rounded bg-surface-2" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-lg bg-surface-2"
          />
        ))}
      </div>
      <div className="h-7 w-32 animate-pulse rounded bg-surface-2" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg bg-surface-2"
          />
        ))}
      </div>
    </div>
  )
}
