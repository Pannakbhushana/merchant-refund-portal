import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { getTransactions } from "../services/transactionService"
import type { Transaction } from "../types/transaction"

const TransactionsPage = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const limit = 10

  const fetchTransactions = async () => {
    try {
      setLoading(true)

      const res = await getTransactions({
        page,
        limit,
        status,
        search,
      })

      setTransactions(res.data)
      setTotalPages(res.meta.totalPages)

    } catch (error) {
      toast.error("Failed to fetch transactions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [page, status, search])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-page-title">Transactions</h1>
        <p className="text-body">
          View and manage all merchant transactions
        </p>
      </div>

      <div className="bg-white border border-border rounded-lg p-4 flex flex-wrap gap-4 items-center">

        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(1)
            setStatus(e.target.value)
          }}
          className="border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option>All</option>
          <option>success</option>
          <option>failed</option>
          <option>pending</option>
          <option>refunded</option>
        </select>

      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 border-b">
            <tr className="text-left">
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr
                  key={txn._id}
                  onClick={() => navigate(`/transactions/${txn._id}`)}
                  className="border-b hover:bg-slate-50 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    {txn.transactionId}
                  </td>

                  <td className="px-4 py-3">
                    {txn.currency} {txn.amount}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {txn.status}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      <div className="flex justify-center items-center gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border border-border rounded-md text-sm hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border border-border rounded-md text-sm hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>

      </div>

    </div>
  )
}

export default TransactionsPage