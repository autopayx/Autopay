import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { CUSTOMER_NAV_ITEMS } from "@/components/layouts/dashboard/nav-items"

type NavItem = { label: string; icon: LucideIcon; href: string }

function Sidebar({ active = "Home", items = CUSTOMER_NAV_ITEMS }: { active?: string; items?: NavItem[] }) {
  return (
    <aside className="hidden w-20 shrink-0 flex-col gap-2 border-r border-border bg-white p-3 lg:flex">
      {items.map((item) => {
        const isActive = item.label === active
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2.5 text-xs ${
              isActive ? "bg-blue-50 text-blue-600" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        )
      })}
    </aside>
  )
}

export { Sidebar }
