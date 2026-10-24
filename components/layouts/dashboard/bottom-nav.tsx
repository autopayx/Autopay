import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { CUSTOMER_NAV_ITEMS } from "@/components/layouts/dashboard/nav-items"

type NavItem = { label: string; icon: LucideIcon; href: string }

function BottomNav({ active = "Home", items = CUSTOMER_NAV_ITEMS }: { active?: string; items?: NavItem[] }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-white py-2 lg:hidden">
      {items.map((item) => {
        const isActive = item.label === active
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-1 text-xs ${
              isActive ? "text-blue-600" : "text-muted-foreground"
            }`}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export { BottomNav }
