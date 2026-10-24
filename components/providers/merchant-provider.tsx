"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useWallet } from "@/components/providers/wallet-provider"
import { useMyMerchant } from "@/lib/api/hooks/use-my-merchant"
import type { MerchantProfile } from "@/lib/api/types"

type MerchantContextValue = {
  merchant: MerchantProfile | null
  isLoading: boolean
}

const MerchantContext = createContext<MerchantContextValue | null>(null)

function MerchantProvider({ children }: { children: ReactNode }) {
  const { walletAddress } = useWallet()
  const { merchant, isLoading } = useMyMerchant(walletAddress)

  return <MerchantContext.Provider value={{ merchant, isLoading }}>{children}</MerchantContext.Provider>
}

function useMerchantContext() {
  const ctx = useContext(MerchantContext)
  if (!ctx) throw new Error("useMerchantContext must be used within a MerchantProvider")
  return ctx
}

export { MerchantProvider, useMerchantContext }
