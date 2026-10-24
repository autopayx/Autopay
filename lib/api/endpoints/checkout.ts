import { apiClient } from "@/lib/api/client"

const BASE = "/checkout"

// checkout details + payment schedule preview for a plan
async function getCheckout(planCode: string) {
  const { data } = await apiClient.get(`${BASE}/${planCode}/`)
  return data
}

// pre-flight checks on the customer wallet (XLM, USDC trustline, balance, network)
async function runCheckoutPreflight(planCode: string, payload?: Record<string, unknown>) {
  const { data } = await apiClient.post(`${BASE}/${planCode}/`, payload)
  return data
}

export { getCheckout, runCheckoutPreflight }
