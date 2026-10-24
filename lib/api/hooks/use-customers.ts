"use client"

import { useQuery } from "@tanstack/react-query"
import * as customersApi from "@/lib/api/endpoints/customers"

const customersKeys = {
  all: ["customers"] as const,
  dashboard: (walletAddress: string) => [...customersKeys.all, "dashboard", walletAddress] as const,
}

function useCustomerDashboard(walletAddress: string) {
  return useQuery({
    queryKey: customersKeys.dashboard(walletAddress),
    queryFn: () => customersApi.getCustomerDashboard(walletAddress),
    enabled: Boolean(walletAddress),
  })
}

export { customersKeys, useCustomerDashboard }
