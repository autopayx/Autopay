"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { connectWallet, disconnectWallet } from "@/lib/stellar/wallet-kit"

const STORAGE_KEY = "autopayx:wallet-id"

type WalletContextValue = {
  walletAddress: string | null
  walletId: string | null
  connecting: boolean
  connect: (walletId: string) => Promise<string>
  disconnect: () => Promise<void>
}

const WalletContext = createContext<WalletContextValue | null>(null)

function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [walletId, setWalletId] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  // silently restore the last connected wallet on page load
  useEffect(() => {
    const savedWalletId = localStorage.getItem(STORAGE_KEY)
    if (!savedWalletId) return
    setConnecting(true)
    connectWallet(savedWalletId)
      .then((address) => {
        setWalletAddress(address)
        setWalletId(savedWalletId)
      })
      .catch(() => localStorage.removeItem(STORAGE_KEY))
      .finally(() => setConnecting(false))
  }, [])

  const connect = useCallback(async (id: string) => {
    setConnecting(true)
    try {
      const address = await connectWallet(id)
      setWalletAddress(address)
      setWalletId(id)
      localStorage.setItem(STORAGE_KEY, id)
      return address
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(async () => {
    await disconnectWallet()
    setWalletAddress(null)
    setWalletId(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <WalletContext.Provider value={{ walletAddress, walletId, connecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider")
  return ctx
}

export { WalletProvider, useWallet }
