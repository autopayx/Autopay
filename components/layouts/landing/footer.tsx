import Link from "next/link"
import { RefreshCw } from "lucide-react"
import { Text } from "@/components/reuseables/text"

const FOOTER_LINKS = [
  { heading: "Product", links: [{ label: "How it works", href: "#how-it-works" }, { label: "Checkout demo", href: "/merchant/plans" }] },
  { heading: "Developers", links: [{ label: "SDK", href: "#developers" }, { label: "Documentation", href: "https://api.autopayx.xyz/api/docs/" }] },
  { heading: "Support", links: [{ label: "API status", href: "https://api.autopayx.xyz/api/" }] },
]

function Footer() {
  return (
    <footer className="bg-[#0B1F3A]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-8">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-blue-500 text-white">
              <RefreshCw className="size-3.5" />
            </span>
            <Text as="span" weight="bold" className="text-white">
              AutoPayX
            </Text>
          </div>
          <Text as="p" size="sm" className="mt-2 text-white/50">
            Running on Stellar Testnet.
          </Text>
        </div>

        {FOOTER_LINKS.map((column) => (
          <div key={column.heading}>
            <Text as="p" weight="semibold" className="text-white">
              {column.heading}
            </Text>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => {
                const isExternal = link.href.startsWith("http")
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export { Footer }
