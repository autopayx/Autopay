import { apiClient } from "@/lib/api/client"

// customer subscription dashboard overview + vault summary
async function getCustomerDashboard(walletAddress: string) {
  const { data } = await apiClient.get(`/customers/${walletAddress}/dashboard/`)
  return data
}

export { getCustomerDashboard }
