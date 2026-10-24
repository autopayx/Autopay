"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as plansApi from "@/lib/api/endpoints/plans"
import type { PatchedSubscriptionPlanRequest, SubscriptionPlanRequest } from "@/lib/api/types"

const plansKeys = {
  all: ["plans"] as const,
  list: (params?: { ordering?: string }) => [...plansKeys.all, "list", params] as const,
  detail: (planCode: string) => [...plansKeys.all, "detail", planCode] as const,
}

function usePlans(params?: { ordering?: string }) {
  return useQuery({
    queryKey: plansKeys.list(params),
    queryFn: () => plansApi.listPlans(params),
  })
}

function usePlan(planCode: string) {
  return useQuery({
    queryKey: plansKeys.detail(planCode),
    queryFn: () => plansApi.getPlan(planCode),
    enabled: Boolean(planCode),
  })
}

function useCreatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubscriptionPlanRequest) => plansApi.createPlan(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKeys.all }),
  })
}

function useUpdatePlan(planCode: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubscriptionPlanRequest) => plansApi.updatePlan(planCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKeys.detail(planCode) }),
  })
}

function usePatchPlan(planCode: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: PatchedSubscriptionPlanRequest) => plansApi.patchPlan(planCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKeys.detail(planCode) }),
  })
}

function useDeletePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (planCode: string) => plansApi.deletePlan(planCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKeys.all }),
  })
}

function useClosePlan(planCode: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubscriptionPlanRequest) => plansApi.closePlan(planCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKeys.detail(planCode) }),
  })
}

function useReopenPlan(planCode: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubscriptionPlanRequest) => plansApi.reopenPlan(planCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plansKeys.detail(planCode) }),
  })
}

export {
  plansKeys,
  usePlans,
  usePlan,
  useCreatePlan,
  useUpdatePlan,
  usePatchPlan,
  useDeletePlan,
  useClosePlan,
  useReopenPlan,
}
