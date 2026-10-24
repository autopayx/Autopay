import { apiClient } from "@/lib/api/client"

// generate or fund a Stellar Testnet wallet with XLM and Testnet USDC
async function fundTestnetWallet(payload?: Record<string, unknown>) {
  const { data } = await apiClient.post("/stellar/testnet/", payload)
  return data
}

export { fundTestnetWallet }
