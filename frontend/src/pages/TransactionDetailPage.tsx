import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getTransactionById } from "../services/transactionService"

import type { Transaction } from "../types/transaction"
import { createRefund } from "../services/refundService"

const TransactionDetailPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchTransaction = async () => {
      try {
        if (!id) return
        const data = await getTransactionById(id)
        setTransaction(data)
      } catch (error) {
        toast.error("Failed to load transaction")
      } finally {
        setLoading(false)
      }
    }
    fetchTransaction()
  }, [id])

  const handleRefund = async () => {
    if (!transaction) return
    try {
      await createRefund({
        transactionId: transaction._id,
        amount: transaction.amount,
        reason: "Customer requested refund"
      })

      toast.success("Refund created successfully")
      navigate("/transactions")

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message || "Refund failed"
      )
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading transaction details...
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="p-6">
        Transaction not found
      </div>
    )
  }

  const isRefundEligible = transaction.status === "success"

  return (
    <div className="space-y-6">

      <button
        onClick={() => navigate("/transactions")}
        className="text-sm text-primary hover:underline cursor-pointer"
      >
        ← Back to Transactions
      </button>

      <div>
        <h1 className="text-page-title">Transaction Details</h1>
        <p className="text-body">
          Transaction ID: {transaction.transactionId}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="bg-white border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-section-title">
            Transaction Information
          </h2>

          <div className="grid grid-cols-2 gap-y-3 text-sm">

            <span className="text-muted">Amount</span>
            <span>
              {transaction.currency} {transaction.amount}
            </span>

            <span className="text-muted">Status</span>
            <span className="capitalize">
              {transaction.status}
            </span>

            <span className="text-muted">Date</span>
            <span>
              {new Date(transaction.createdAt).toLocaleString()}
            </span>

            <span className="text-muted">Payment Method</span>
            <span>{transaction.paymentMethod}</span>
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-section-title">
            Refund
          </h2>
          {isRefundEligible ? (
            <button
              onClick={handleRefund}
              className="
                px-4 py-2
                bg-primary
                text-white
                bg-blue-600
                cursor-pointer
                rounded-md
                text-sm
                hover:bg-primaryHover
                transition"
            >
              Raise Refund
            </button>

          ) : (
            <p className="text-body">
              This transaction is not eligible for refund.
            </p>
          )}
        </div>

      </div>

      <div className="bg-white border border-border rounded-lg p-5">

        <h2 className="text-section-title mb-4">
          Status Timeline
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 mt-1 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">
                {transaction.status}
              </p>

              <p className="text-muted">
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetailPage