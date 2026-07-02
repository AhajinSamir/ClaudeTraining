export interface AccountResponse {
  planName: string
  planTier: "starter" | "plus" | "pro"
  renewalDate: string
  monthlyCost: number
  status: "active" | "suspended" | "cancelled"
}

export interface BillingResponse {
  nextPayment: {
    date: string
    amount: number
  }
  lastPayment: {
    date: string
    amount: number
    status: "paid" | "failed" | "pending"
  }
  paymentMethod: {
    type: "visa" | "mastercard" | "amex"
    last4: string
  }
}

export interface UsageResponse {
  usedGB: number
  totalGB: number
  cycleStartDate: string
  cycleEndDate: string
  overageRate: number
  overageRateUnit: "per_mb" | "per_gb"
}

export interface UsageHistoryEntry {
  month: string
  usedGB: number
  totalGB: number
  cost: number
}

export type UsageHistoryResponse = UsageHistoryEntry[]

export type ActivityType = "payment" | "data_topup" | "plan_change" | "addon"
export type ActivityStatus = "completed" | "pending" | "failed"

export interface ActivityEntry {
  id: string
  type: ActivityType
  description: string
  timestamp: string
  amount: number | null
  status: ActivityStatus
}

export type ActivityResponse = ActivityEntry[]

export type TicketStatus = "open" | "resolved" | "pending"
export type TicketPriority = "low" | "medium" | "high"

export interface Ticket {
  id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
  updatedAt: string
}

export type TicketsResponse = Ticket[]

export type AddonCategory = "travel" | "data" | "entertainment" | "insurance"

export interface Addon {
  id: string
  name: string
  description: string
  price: number
  active: boolean
  category: AddonCategory
}

export type AddonsResponse = Addon[]
