"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as gatewayApi from "@/lib/api/endpoints/gateway"
import type { AccountProfileRequest } from "@/lib/api/types"

const gatewayKeys = {
  all: ["gateway"] as const,
  detail: (walletAddress: string) => [...gatewayKeys.all, walletAddress] as const,
}

function useGatewayProfile(walletAddress: string) {
  return useQuery({
    queryKey: gatewayKeys.detail(walletAddress),
    queryFn: () => gatewayApi.getGatewayProfile(walletAddress),
    enabled: Boolean(walletAddress),
  })
}

function usePatchGatewayProfile(walletAddress: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AccountProfileRequest) => gatewayApi.patchGatewayProfile(walletAddress, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gatewayKeys.detail(walletAddress) }),
  })
}

export { gatewayKeys, useGatewayProfile, usePatchGatewayProfile }
