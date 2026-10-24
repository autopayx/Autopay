import { apiClient } from "@/lib/api/client"
import type { Subscription, SubscriptionRequest, PatchedSubscriptionRequest, VaultActionRequest } from "@/lib/api/types"

const BASE = "/subscriptions"

async function listSubscriptions(params?: { ordering?: string }) {
  const { data } = await apiClient.get<Subscription[]>(`${BASE}/`, { params })
  return data
}

async function getSubscription(subCode: string) {
  const { data } = await apiClient.get<Subscription>(`${BASE}/${subCode}/`)
  return data
}

async function createSubscription(payload: SubscriptionRequest) {
  const { data } = await apiClient.post<Subscription>(`${BASE}/`, payload)
  return data
}

async function updateSubscription(subCode: string, payload: SubscriptionRequest) {
  const { data } = await apiClient.put<Subscription>(`${BASE}/${subCode}/`, payload)
  return data
}

async function patchSubscription(subCode: string, payload: PatchedSubscriptionRequest) {
  const { data } = await apiClient.patch<Subscription>(`${BASE}/${subCode}/`, payload)
  return data
}

async function deleteSubscription(subCode: string) {
  await apiClient.delete(`${BASE}/${subCode}/`)
}

function action<TPayload = SubscriptionRequest>(subCode: string, action: string) {
  return async (payload?: TPayload) => {
    const { data } = await apiClient.post<Subscription>(`${BASE}/${subCode}/${action}/`, payload)
    return data
  }
}

const approvePlanChange = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "approve-plan-change")(payload)
const cancelSubscription = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "cancel")(payload)
const executePayment = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "execute-payment")(payload)
const increaseAllowance = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "increase-allowance")(payload)
const keepCurrentTerms = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "keep-current-terms")(payload)
const pauseSubscription = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "pause")(payload)
const renewSubscription = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "renew")(payload)
const resumeSubscription = (subCode: string, payload?: SubscriptionRequest) => action(subCode, "resume")(payload)
const topUpSubscription = (subCode: string, payload: VaultActionRequest) => action<VaultActionRequest>(subCode, "top-up")(payload)
const withdrawSubscription = (subCode: string, payload: VaultActionRequest) => action<VaultActionRequest>(subCode, "withdraw")(payload)

export {
  listSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  patchSubscription,
  deleteSubscription,
  approvePlanChange,
  cancelSubscription,
  executePayment,
  increaseAllowance,
  keepCurrentTerms,
  pauseSubscription,
  renewSubscription,
  resumeSubscription,
  topUpSubscription,
  withdrawSubscription,
}
