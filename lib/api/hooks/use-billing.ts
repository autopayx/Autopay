"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import * as billingApi from "@/lib/api/endpoints/billing"
import type { BillingHistoryParams } from "@/lib/api/types"

const billingKeys = {
  all: ["billing-history"] as const,
  list: (params?: BillingHistoryParams) => [...billingKeys.all, params] as const,
}

function useBillingHistory(params?: BillingHistoryParams) {
  return useQuery({
    queryKey: billingKeys.list(params),
    queryFn: () => billingApi.getBillingHistory(params),
  })
}

function useProcessDueBilling() {
  return useMutation({
    mutationFn: () => billingApi.processDueBilling(),
  })
}

export { billingKeys, useBillingHistory, useProcessDueBilling }
