import api from "./api"

export interface RefundPayload {
  transactionId: string
  amount: number
  reason: string
}

export const createRefund = async (data: RefundPayload) => {
  const res = await api.post("/refunds", data)
  return res.data
}