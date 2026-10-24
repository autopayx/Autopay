import { apiClient } from "@/lib/api/client"
import type { BillingHistoryParams } from "@/lib/api/types"

// list billing/payment history with filters
async function getBillingHistory(params?: BillingHistoryParams) {
  const { data } = await apiClient.get("/billing-history/", { params })
  return data
}

// process all due active subscriptions and execute eligible payments
async function processDueBilling() {
  const { data } = await apiClient.post("/billing/process-due/")
  return data
}

export { getBillingHistory, processDueBilling }
