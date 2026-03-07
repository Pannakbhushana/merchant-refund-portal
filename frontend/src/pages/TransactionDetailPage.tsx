import { useNavigate, useParams } from "react-router-dom";

const TransactionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data (until backend is ready)
  const transaction = {
    id,
    amount: "$120",
    status: "Successful",
    date: "2026-03-01",
    paymentMethod: "Card",
    customer: "John Doe",
  };

  const timeline = [
    { status: "Initiated", time: "2026-03-01 10:00 AM" },
    { status: "Processing", time: "2026-03-01 10:02 AM" },
    { status: "Successful", time: "2026-03-01 10:05 AM" },
  ];

  const isRefundEligible = transaction.status === "Successful";

  return (
    <div className="space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/transactions")}
        className="text-sm text-primary hover:underline"
      >
        ← Back to Transactions
      </button>

      {/* Page Title */}
      <div>
        <h1 className="text-page-title">Transaction Details</h1>
        <p className="text-body">Transaction ID: {transaction.id}</p>
      </div>

      {/* Transaction Info */}
      <div className="grid gap-6 md:grid-cols-2">

        <div className="bg-white border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-section-title">Transaction Information</h2>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-muted">Amount</span>
            <span>{transaction.amount}</span>

            <span className="text-muted">Status</span>
            <span>{transaction.status}</span>

            <span className="text-muted">Date</span>
            <span>{transaction.date}</span>

            <span className="text-muted">Payment Method</span>
            <span>{transaction.paymentMethod}</span>

            <span className="text-muted">Customer</span>
            <span>{transaction.customer}</span>
          </div>
        </div>

        {/* Refund Section */}
        <div className="bg-white border border-border rounded-lg p-5 space-y-4">
          <h2 className="text-section-title">Refund</h2>

          {isRefundEligible ? (
            <button
              className="
                px-4 py-2
                bg-primary
                text-white
                rounded-md
                text-sm
                hover:bg-primaryHover
                transition
              "
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

      {/* Status Timeline */}
      <div className="bg-white border border-border rounded-lg p-5">

        <h2 className="text-section-title mb-4">Status Timeline</h2>

        <div className="space-y-4">

          {timeline.map((event, index) => (
            <div key={index} className="flex items-start gap-3">

              <div className="w-3 h-3 mt-1 rounded-full bg-primary" />

              <div>
                <p className="text-sm font-medium">{event.status}</p>
                <p className="text-muted">{event.time}</p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default TransactionDetailPage;