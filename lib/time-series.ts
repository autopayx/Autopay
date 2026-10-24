// builds a cumulative N-day trend series from any list of dated items (used for stat sparklines)
function cumulativeSeries<T>(items: T[], getDate: (item: T) => string | null | undefined, getValue: (item: T) => number, days: number): number[] {
  const dayMs = 24 * 60 * 60 * 1000
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

  const dated = items
    .map((item) => {
      const raw = getDate(item)
      const time = raw ? new Date(raw).getTime() : NaN
      return Number.isFinite(time) ? { time, value: getValue(item) } : null
    })
    .filter((entry): entry is { time: number; value: number } => entry !== null)

  return Array.from({ length: days }, (_, i) => {
    const bucketEnd = startOfToday + (i - days + 1) * dayMs + dayMs
    return dated.filter((entry) => entry.time < bucketEnd).reduce((sum, entry) => sum + entry.value, 0)
  })
}

export { cumulativeSeries }
