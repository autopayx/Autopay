"use client"

import { useMemo } from "react"
import { useMerchants } from "@/lib/api/hooks/use-merchants"

// the API has no "find merchant by wallet" filter, so list all and match client-side
function useMyMerchant(walletAddress: string | null) {
  const query = useMerchants()
  const merchant = useMemo(
    () => query.data?.find((m) => m.wallet_address === walletAddress) ?? null,
    [query.data, walletAddress]
  )
  return { ...query, merchant }
}

export { useMyMerchant }
