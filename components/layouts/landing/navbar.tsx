"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { AppButton } from "@/components/reuseables/button"
import { AppImages } from "@/lib/app_images"
import { useWallet } from "@/components/providers/wallet-provider"
import { truncateAddress } from "@/lib/stellar/wallet-kit"

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Merchants", href: "#merchants" },
  { label: "Customers", href: "#customers" },
  { label: "Developers", href: "#developers" },
]

function Navbar() {
  const { walletAddress } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-10 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src={AppImages.logo} alt="AutoPayX" width={156} height={32} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <AppButton
            variant="outline"
            nativeButton={false}
            render={<Link href={walletAddress ? "/welcome-back" : "/onboarding"} />}
            className="h-9 min-h-0 min-w-0 px-4 text-sm"
          >
            {walletAddress ? truncateAddress(walletAddress) : "Connect wallet"}
          </AppButton>
          <AppButton
            nativeButton={false}
            render={<Link href="/onboarding" />}
            className="h-9 min-h-0 min-w-0 bg-[#0B1F3A] px-4 text-sm text-white hover:bg-[#0B1F3A]/90"
          >
            Get started
          </AppButton>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden"
        >
          {menuOpen ? <X className="size-6 text-foreground" /> : <Menu className="size-6 text-foreground" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <AppButton
              variant="outline"
              nativeButton={false}
              render={<Link href={walletAddress ? "/welcome-back" : "/onboarding"} />}
              className="w-full rounded-full"
            >
              {walletAddress ? truncateAddress(walletAddress) : "Connect wallet"}
            </AppButton>
            <AppButton
              nativeButton={false}
              render={<Link href="/onboarding" />}
              className="w-full rounded-full bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90"
            >
              Get started
            </AppButton>
          </div>
        </div>
      )}
    </header>
  )
}

export { Navbar }
