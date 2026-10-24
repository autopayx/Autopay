"use client"

import Link from "next/link"
import { ChevronDown, RefreshCw } from "lucide-react"
import { Text } from "@/components/reuseables/text"
import { useWallet } from "@/components/providers/wallet-provider"
import { truncateAddress } from "@/lib/stellar/wallet-kit"

function MerchantTopbar() {
  const { walletAddress } = useWallet()
  const label = walletAddress ? truncateAddress(walletAddress) : "Not connected"

  return (
    <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-[#0B1F3A] text-white">
          <RefreshCw className="size-3.5" />
        </span>
        <Text as="span" weight="bold">
          AutoPayX
        </Text>
      </Link>

      <div className="flex items-center gap-4">
        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 sm:flex">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Stellar Testnet
          <ChevronDown className="size-3" />
        </span>
        <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
          Help
        </a>
        <a href="#" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
          Docs
        </a>
        {/* desktop: separate network + wallet badges */}
        <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground sm:flex">
          <span className="size-3 rounded-full bg-blue-500" />
          {label}
        </span>
        {/* mobile: combined status + wallet pill */}
        <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground sm:hidden">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          {label}
        </span>
      </div>
    </header>
  )
}

export { MerchantTopbar }
