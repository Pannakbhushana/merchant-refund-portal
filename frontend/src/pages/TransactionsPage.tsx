import { useState } from "react";

const TransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-page-title">Transactions</h1>
        <p className="text-body">
          View and manage all merchant transactions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-lg p-4 flex flex-wrap gap-4 items-center">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            border border-border
            rounded-md
            px-3 py-2
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-primary
          "
        />

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            border border-border
            rounded-md
            px-3 py-2
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-primary
          "
        >
          <option>All</option>
          <option>Successful</option>
          <option>Failed</option>
          <option>Pending</option>
          <option>Refunded</option>
        </select>

        {/* Date Filters (placeholder) */}
        <input
          type="date"
          className="border border-border rounded-md px-3 py-2 text-sm"
        />

        <input
          type="date"
          className="border border-border rounded-md px-3 py-2 text-sm"
        />

      </div>

      {/* Transactions Table */}
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
            <tr className="border-b hover:bg-slate-50 cursor-pointer">
              <td className="px-4 py-3">TXN123456</td>
              <td className="px-4 py-3">$120</td>
              <td className="px-4 py-3">Successful</td>
              <td className="px-4 py-3">2026-03-01</td>
            </tr>

            <tr className="border-b hover:bg-slate-50 cursor-pointer">
              <td className="px-4 py-3">TXN123457</td>
              <td className="px-4 py-3">$80</td>
              <td className="px-4 py-3">Pending</td>
              <td className="px-4 py-3">2026-03-02</td>
            </tr>
          </tbody>

        </table>

      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-end gap-2">

        <button className="px-3 py-1 border border-border rounded-md text-sm hover:bg-slate-100">
          Previous
        </button>

        <button className="px-3 py-1 border border-border rounded-md text-sm hover:bg-slate-100">
          Next
        </button>

      </div>

    </div>
  );
};

export default TransactionsPage;