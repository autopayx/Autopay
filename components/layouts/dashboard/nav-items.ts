import { CreditCard, Home, Link2, Receipt, Settings } from "lucide-react"

const CUSTOMER_NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

const MERCHANT_NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/merchant" },
  { label: "Plans", icon: Receipt, href: "/merchant/plans" },
  { label: "Checkout", icon: Link2, href: "/merchant/checkout" },
  { label: "Billing", icon: CreditCard, href: "/merchant/billing" },
  { label: "Settings", icon: Settings, href: "/merchant/settings" },
]

export { CUSTOMER_NAV_ITEMS, MERCHANT_NAV_ITEMS }
