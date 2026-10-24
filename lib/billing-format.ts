const INTERVAL_LABELS: Record<string, string> = {
  WEEKLY: "week",
  MONTHLY: "month",
  YEARLY: "year",
  CUSTOM: "billing cycle",
}

function intervalLabel(billingInterval: string) {
  return INTERVAL_LABELS[billingInterval] ?? "billing cycle"
}

function formatUsdc(value: string | number) {
  const n = typeof value === "string" ? Number(value) : value
  return `${Number.isFinite(n) ? n.toFixed(2) : "0.00"} USDC`
}

function formatShortDate(iso: string | null | undefined) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatLongDate(iso: string | null | undefined) {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export { intervalLabel, formatUsdc, formatShortDate, formatLongDate }
