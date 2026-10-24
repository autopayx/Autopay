import { apiClient } from "@/lib/api/client"
import type { SubscriptionPlan, SubscriptionPlanRequest, PatchedSubscriptionPlanRequest } from "@/lib/api/types"

const BASE = "/plans"

async function listPlans(params?: { ordering?: string }) {
  const { data } = await apiClient.get<SubscriptionPlan[]>(`${BASE}/`, { params })
  return data
}

async function getPlan(planCode: string) {
  const { data } = await apiClient.get<SubscriptionPlan>(`${BASE}/${planCode}/`)
  return data
}

async function createPlan(payload: SubscriptionPlanRequest) {
  const { data } = await apiClient.post<SubscriptionPlan>(`${BASE}/`, payload)
  return data
}

async function updatePlan(planCode: string, payload: SubscriptionPlanRequest) {
  const { data } = await apiClient.put<SubscriptionPlan>(`${BASE}/${planCode}/`, payload)
  return data
}

async function patchPlan(planCode: string, payload: PatchedSubscriptionPlanRequest) {
  const { data } = await apiClient.patch<SubscriptionPlan>(`${BASE}/${planCode}/`, payload)
  return data
}

async function deletePlan(planCode: string) {
  await apiClient.delete(`${BASE}/${planCode}/`)
}

async function closePlan(planCode: string, payload: SubscriptionPlanRequest) {
  const { data } = await apiClient.post<SubscriptionPlan>(`${BASE}/${planCode}/close/`, payload)
  return data
}

async function reopenPlan(planCode: string, payload: SubscriptionPlanRequest) {
  const { data } = await apiClient.post<SubscriptionPlan>(`${BASE}/${planCode}/reopen/`, payload)
  return data
}

export { listPlans, getPlan, createPlan, updatePlan, patchPlan, deletePlan, closePlan, reopenPlan }
