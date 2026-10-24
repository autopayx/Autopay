import { apiClient } from "@/lib/api/client"
import type { AccountProfile, AccountProfileRequest } from "@/lib/api/types"

const BASE = "/gateway"

// wallet gateway profile: roles, balances, notification settings
async function getGatewayProfile(walletAddress: string) {
  const { data } = await apiClient.get<AccountProfile>(`${BASE}/${walletAddress}/`)
  return data
}

// update notification reminders or active role
async function patchGatewayProfile(walletAddress: string, payload: AccountProfileRequest) {
  const { data } = await apiClient.patch<AccountProfile>(`${BASE}/${walletAddress}/`, payload)
  return data
}

export { getGatewayProfile, patchGatewayProfile }
