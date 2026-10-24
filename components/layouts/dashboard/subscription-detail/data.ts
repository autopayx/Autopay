type SubscriptionDetail = {
  slug: string
  name: string
  planLabel: string
  subscriptionId: string
  status: "Active" | "Paused"
  stats: {
    nextPayment: string
    nextAmount: string
    paidSoFar: string
    paidSince: string
    allowanceLeft: string
    allowanceTotal: string
    vaultBalance: string
  }
  authorization: { amount: string; interval: string; cap: string; until: string }
  merchantWallet: string
  started: string
  contract: string
  vault: { balance: string; coversPayments: number; usedPct: number; held: string; free: string }
  schedule: { month: string; day: string; amount: string; status: "Funded" | "Needs top-up" }[]
  history: { date: string; status: "Successful" | "Failed" | "Skipped"; amount: string }[]
}

export type { SubscriptionDetail }

