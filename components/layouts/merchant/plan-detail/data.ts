type SubscriberRow = {
  address: string
  vault: string
  status: string
  amount: string
  nextPayment: string
}

type PlanDetail = {
  slug: string
  name: string
  status: "Active" | "Closed" | "Paused"
  createdDate: string
  checkoutLink: string
  stats: {
    activeSubscribers: number
    subscribersNote: string
    collected30d: string
    paymentsCount: number
    next7days: string
    chargesCount: number
    failedOrSkipped: number
  }
  terms: { price: string; interval: string; maxAllowance: string; expires: string }
  recentSubscribers: SubscriberRow[]
}

export type { PlanDetail, SubscriberRow }

