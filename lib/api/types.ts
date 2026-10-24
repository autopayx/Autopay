// Types mirroring the AutoPayX backend OpenAPI schema (https://api.autopayx.xyz/api/schema/?format=json)

type ActiveRole = "CUSTOMER" | "MERCHANT"
type BillingInterval = "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM"
type SubscriptionPlanStatus = "ACTIVE" | "CLOSED"
type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED" | "EXPIRED"

interface AccountProfile {
  wallet_address: string
  is_customer: boolean
  is_merchant: boolean
  active_role: ActiveRole
  notify_vault_running_low: boolean
  notify_payment_skipped_or_failed: boolean
  notify_authorization_ending: boolean
  notify_payment_receipts: boolean
  created_at: string
  updated_at: string
}

type AccountProfileRequest = Partial<Omit<AccountProfile, "created_at" | "updated_at">>

interface MerchantProfile {
  id: number
  merchant_id: string
  wallet_address: string
  receiving_wallet: string
  business_name: string
  business_description?: string
  website_url?: string
  support_email?: string
  initials: string
  active: boolean
  onchain_registered: boolean
  tx_hash?: string
  created_first_plan: boolean
  shared_checkout_link: boolean
  tested_checkout: boolean
  created_at: string
  updated_at: string
}

interface MerchantProfileRequest {
  wallet_address: string
  receiving_wallet?: string
  business_name: string
  business_description?: string
  website_url?: string
  support_email?: string
  active?: boolean
  tx_hash?: string
  created_first_plan?: boolean
  shared_checkout_link?: boolean
  tested_checkout?: boolean
}

type PatchedMerchantProfileRequest = Partial<MerchantProfileRequest>

interface SubscriptionPlan {
  id: number
  plan_code: string
  onchain_plan_id: number | null
  merchant_id: string
  merchant_name: string
  merchant_website: string
  merchant_support_email: string
  name: string
  description?: string
  amount_usdc: string
  billing_interval: BillingInterval
  interval_seconds: number
  duration_seconds: number
  max_spending_limit: string
  starts_at: string
  expires_at: string | null
  receiving_wallet: string
  status: SubscriptionPlanStatus
  tx_hash?: string
  subscriber_count: number
  checkout_url: string
  sdk_snippet: string
  embed_html: string
  created_at: string
  updated_at: string
}

interface SubscriptionPlanRequest {
  onchain_plan_id?: number | null
  merchant_id: string
  name: string
  description?: string
  amount_usdc: string
  billing_interval?: BillingInterval
  interval_seconds?: number
  duration_seconds?: number
  max_spending_limit: string
  starts_at?: string
  expires_at?: string | null
  receiving_wallet?: string
  status?: SubscriptionPlanStatus
  tx_hash?: string
}

type PatchedSubscriptionPlanRequest = Partial<SubscriptionPlanRequest>

interface Subscription {
  id: number
  sub_code: string
  onchain_sub_id: number | null
  plan_code: string
  plan_name: string
  billing_interval: string
  merchant_id: string
  merchant_name: string
  customer_wallet: string
  merchant_receiving_wallet: string
  token_address: string
  amount_usdc: string
  interval_seconds: number
  max_spending_limit: string
  total_spent: string
  remaining_allowance: string
  vault_balance: string
  held_for_next_payment: string
  free_to_withdraw: string
  funded_ratio_display: string
  payments_count: number
  start_time: string
  expiration_time: string
  last_payment_time: string | null
  next_payment_time: string
  paused_at: string | null
  status: SubscriptionStatus
  pending_plan_price_change: string | null
  pending_wallet_change: string
  last_skip_reason: string
  tx_hash?: string
  explorer_url: string
  authorization_summary: string
  attention_alerts: unknown[]
  payment_schedule: unknown[]
  created_at: string
  updated_at: string
}

interface SubscriptionRequest {
  onchain_sub_id?: number | null
  plan_code: string
  customer_wallet: string
  max_spending_limit?: string
  initial_deposit?: string
  start_time?: string
  expiration_time?: string
  next_payment_time?: string
  tx_hash?: string
}

type PatchedSubscriptionRequest = Partial<SubscriptionRequest>

// the top-up/withdraw actions use a separate, undocumented body shape (not SubscriptionRequest)
interface VaultActionRequest {
  amount_usdc: string
}

interface BillingHistoryParams {
  customer_wallet?: string
  days?: number
  merchant_id?: string
  plan_code?: string
  status?: string
}

export type {
  ActiveRole,
  BillingInterval,
  SubscriptionPlanStatus,
  SubscriptionStatus,
  AccountProfile,
  AccountProfileRequest,
  MerchantProfile,
  MerchantProfileRequest,
  PatchedMerchantProfileRequest,
  SubscriptionPlan,
  SubscriptionPlanRequest,
  PatchedSubscriptionPlanRequest,
  Subscription,
  SubscriptionRequest,
  PatchedSubscriptionRequest,
  VaultActionRequest,
  BillingHistoryParams,
}
