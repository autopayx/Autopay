function LoadingSubscriptions() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-6 flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-9 shrink-0 animate-pulse rounded-full bg-muted" />
              <div className="flex-1">
                <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-3 w-48 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-3 w-12 shrink-0 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-3 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

export { LoadingSubscriptions }
