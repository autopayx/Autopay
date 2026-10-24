import { apiClient } from "@/lib/api/client"
import type { MerchantProfile, MerchantProfileRequest, PatchedMerchantProfileRequest } from "@/lib/api/types"

const BASE = "/merchants"

async function listMerchants(params?: { ordering?: string }) {
  const { data } = await apiClient.get<MerchantProfile[]>(`${BASE}/`, { params })
  return data
}

async function getMerchant(merchantId: string) {
  const { data } = await apiClient.get<MerchantProfile>(`${BASE}/${merchantId}/`)
  return data
}

async function createMerchant(payload: MerchantProfileRequest) {
  const { data } = await apiClient.post<MerchantProfile>(`${BASE}/`, payload)
  return data
}

async function updateMerchant(merchantId: string, payload: MerchantProfileRequest) {
  const { data } = await apiClient.put<MerchantProfile>(`${BASE}/${merchantId}/`, payload)
  return data
}

async function patchMerchant(merchantId: string, payload: PatchedMerchantProfileRequest) {
  const { data } = await apiClient.patch<MerchantProfile>(`${BASE}/${merchantId}/`, payload)
  return data
}

async function deleteMerchant(merchantId: string) {
  await apiClient.delete(`${BASE}/${merchantId}/`)
}

async function getMerchantDashboard(merchantId: string) {
  const { data } = await apiClient.get(`${BASE}/${merchantId}/dashboard/`)
  return data
}

export {
  listMerchants,
  getMerchant,
  createMerchant,
  updateMerchant,
  patchMerchant,
  deleteMerchant,
  getMerchantDashboard,
}
