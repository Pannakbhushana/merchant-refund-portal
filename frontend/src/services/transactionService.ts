import type { Transaction, TransactionListResponse } from "../types/transaction"
import api from "./api"

interface GetTransactionsParams {
  page?: number
  limit?: number
  status?: string
  search?: string
  fromDate?: string
  toDate?: string
}

export const getTransactions = async (params: GetTransactionsParams) => {
  const res = await api.get<TransactionListResponse>("/transactions", {
    params,
  })
  return res.data
}

export const getTransactionById = async (id: string) => {
  const res = await api.get<Transaction>(`/transactions/${id}`)
  return res.data
}