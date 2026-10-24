// the /billing-history/ endpoint has no documented response schema (OpenAPI marks it as a
// free-form object), so rows are normalized defensively from whichever common field names exist
type BillingHistoryRow = {
  id: string
  merchant: string
  merchantId: string
  plan: string
  planCode: string
  customerWallet: string
  status: string
  amount: string
  amountValue: number
  date: string
  dateValue: string | null
  txHash?: string
}

function normalizeBillingRow(raw: unknown, index: number): BillingHistoryRow {
  const record = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>
  const amount = record.amount_usdc ?? record.amount ?? record.amount_paid
  const date = record.created_at ?? record.paid_at ?? record.date ?? record.payment_date
  const amountNumber = Number(amount)
  const txHash = record.tx_hash ?? record.transaction_hash

  return {
    id: String(record.id ?? record.tx_hash ?? index),
    merchant: String(record.merchant_name ?? record.merchant_id ?? "—"),
    merchantId: String(record.merchant_id ?? ""),
    plan: String(record.plan_name ?? record.plan_code ?? "—"),
    planCode: String(record.plan_code ?? ""),
    customerWallet: String(record.customer_wallet ?? ""),
    status: String(record.status ?? "—"),
    amount: Number.isFinite(amountNumber) ? `${amountNumber.toFixed(2)} USDC` : "—",
    amountValue: Number.isFinite(amountNumber) ? amountNumber : 0,
    date: date ? new Date(String(date)).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : "—",
    dateValue: date ? String(date) : null,
    txHash: txHash ? String(txHash) : undefined,
  }
}

function normalizeBillingHistory(data: unknown): BillingHistoryRow[] {
  const record = data as Record<string, unknown> | undefined
  const list = Array.isArray(data) ? data : Array.isArray(record?.results) ? (record!.results as unknown[]) : []
  return list.map(normalizeBillingRow)
}

export { normalizeBillingHistory }
export type { BillingHistoryRow }
