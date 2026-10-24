"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as merchantsApi from "@/lib/api/endpoints/merchants"
import type { MerchantProfileRequest, PatchedMerchantProfileRequest } from "@/lib/api/types"

const merchantsKeys = {
  all: ["merchants"] as const,
  list: (params?: { ordering?: string }) => [...merchantsKeys.all, "list", params] as const,
  detail: (merchantId: string) => [...merchantsKeys.all, "detail", merchantId] as const,
  dashboard: (merchantId: string) => [...merchantsKeys.all, "dashboard", merchantId] as const,
}

function useMerchants(params?: { ordering?: string }) {
  return useQuery({
    queryKey: merchantsKeys.list(params),
    queryFn: () => merchantsApi.listMerchants(params),
  })
}

function useMerchant(merchantId: string) {
  return useQuery({
    queryKey: merchantsKeys.detail(merchantId),
    queryFn: () => merchantsApi.getMerchant(merchantId),
    enabled: Boolean(merchantId),
  })
}

function useMerchantDashboard(merchantId: string) {
  return useQuery({
    queryKey: merchantsKeys.dashboard(merchantId),
    queryFn: () => merchantsApi.getMerchantDashboard(merchantId),
    enabled: Boolean(merchantId),
  })
}

function useCreateMerchant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantProfileRequest) => merchantsApi.createMerchant(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: merchantsKeys.all }),
  })
}

function useUpdateMerchant(merchantId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MerchantProfileRequest) => merchantsApi.updateMerchant(merchantId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: merchantsKeys.detail(merchantId) }),
  })
}

function usePatchMerchant(merchantId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: PatchedMerchantProfileRequest) => merchantsApi.patchMerchant(merchantId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: merchantsKeys.detail(merchantId) }),
  })
}

function useDeleteMerchant() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (merchantId: string) => merchantsApi.deleteMerchant(merchantId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: merchantsKeys.all }),
  })
}

export {
  merchantsKeys,
  useMerchants,
  useMerchant,
  useMerchantDashboard,
  useCreateMerchant,
  useUpdateMerchant,
  usePatchMerchant,
  useDeleteMerchant,
}
