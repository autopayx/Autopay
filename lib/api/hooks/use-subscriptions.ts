"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as subscriptionsApi from "@/lib/api/endpoints/subscriptions"
import type { PatchedSubscriptionRequest, Subscription, SubscriptionRequest, VaultActionRequest } from "@/lib/api/types"

const subscriptionsKeys = {
  all: ["subscriptions"] as const,
  list: (params?: { ordering?: string }) => [...subscriptionsKeys.all, "list", params] as const,
  detail: (subCode: string) => [...subscriptionsKeys.all, "detail", subCode] as const,
}

function useSubscriptions(params?: { ordering?: string }) {
  return useQuery({
    queryKey: subscriptionsKeys.list(params),
    queryFn: () => subscriptionsApi.listSubscriptions(params),
  })
}

function useSubscription(subCode: string) {
  return useQuery({
    queryKey: subscriptionsKeys.detail(subCode),
    queryFn: () => subscriptionsApi.getSubscription(subCode),
    enabled: Boolean(subCode),
  })
}

function useCreateSubscription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubscriptionRequest) => subscriptionsApi.createSubscription(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subscriptionsKeys.all }),
  })
}

function useUpdateSubscription(subCode: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubscriptionRequest) => subscriptionsApi.updateSubscription(subCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subscriptionsKeys.detail(subCode) }),
  })
}

function usePatchSubscription(subCode: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: PatchedSubscriptionRequest) => subscriptionsApi.patchSubscription(subCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subscriptionsKeys.detail(subCode) }),
  })
}

function useDeleteSubscription() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (subCode: string) => subscriptionsApi.deleteSubscription(subCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subscriptionsKeys.all }),
  })
}

// shared factory for the subscription lifecycle actions (pause, resume, cancel, etc.)
function useSubscriptionAction(
  subCode: string,
  action: (subCode: string, payload?: SubscriptionRequest) => Promise<Subscription>
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload?: SubscriptionRequest) => action(subCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subscriptionsKeys.detail(subCode) }),
  })
}

// top-up/withdraw require an amount_usdc payload (not optional, unlike the other actions)
function useVaultAction(subCode: string, action: (subCode: string, payload: VaultActionRequest) => Promise<Subscription>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: VaultActionRequest) => action(subCode, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: subscriptionsKeys.detail(subCode) }),
  })
}

function useApprovePlanChange(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.approvePlanChange)
}
function useCancelSubscription(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.cancelSubscription)
}
function useExecutePayment(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.executePayment)
}
function useIncreaseAllowance(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.increaseAllowance)
}
function useKeepCurrentTerms(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.keepCurrentTerms)
}
function usePauseSubscription(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.pauseSubscription)
}
function useRenewSubscription(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.renewSubscription)
}
function useResumeSubscription(subCode: string) {
  return useSubscriptionAction(subCode, subscriptionsApi.resumeSubscription)
}
function useTopUpSubscription(subCode: string) {
  return useVaultAction(subCode, subscriptionsApi.topUpSubscription)
}
function useWithdrawSubscription(subCode: string) {
  return useVaultAction(subCode, subscriptionsApi.withdrawSubscription)
}

export {
  subscriptionsKeys,
  useSubscriptions,
  useSubscription,
  useCreateSubscription,
  useUpdateSubscription,
  usePatchSubscription,
  useDeleteSubscription,
  useApprovePlanChange,
  useCancelSubscription,
  useExecutePayment,
  useIncreaseAllowance,
  useKeepCurrentTerms,
  usePauseSubscription,
  useRenewSubscription,
  useResumeSubscription,
  useTopUpSubscription,
  useWithdrawSubscription,
}
