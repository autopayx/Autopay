"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import * as checkoutApi from "@/lib/api/endpoints/checkout"

const checkoutKeys = {
  all: ["checkout"] as const,
  detail: (planCode: string) => [...checkoutKeys.all, planCode] as const,
}

function useCheckout(planCode: string) {
  return useQuery({
    queryKey: checkoutKeys.detail(planCode),
    queryFn: () => checkoutApi.getCheckout(planCode),
    enabled: Boolean(planCode),
  })
}

function useCheckoutPreflight(planCode: string) {
  return useMutation({
    mutationFn: (payload?: Record<string, unknown>) => checkoutApi.runCheckoutPreflight(planCode, payload),
  })
}

export { checkoutKeys, useCheckout, useCheckoutPreflight }
