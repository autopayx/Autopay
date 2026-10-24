"use client"

import { useMutation } from "@tanstack/react-query"
import * as stellarApi from "@/lib/api/endpoints/stellar"

function useFundTestnetWallet() {
  return useMutation({
    mutationFn: (payload?: Record<string, unknown>) => stellarApi.fundTestnetWallet(payload),
  })
}

export { useFundTestnetWallet }
