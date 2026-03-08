export interface Transaction {
  _id: string
  transactionId: string
  merchantId: string
  amount: number
  currency: string
  status: string
  paymentMethod: string
  createdAt: string
}

export interface TransactionListResponse {
  data: Transaction[]
  meta: {
    page: number
    totalPages: number
    totalRecords: number
  }
}