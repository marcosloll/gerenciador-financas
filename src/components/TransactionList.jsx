import { formatCurrency } from "../utils/formatCurrency";

function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction List</h2>
        <p className="text-gray-500 text-center">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction List</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between items-center border-b border-gray-200 py-2"
          >
            <div>
              <p className="font-medium text-gray-800">{transaction.description}</p>
              <p className={`text-sm ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="text-red-500 hover:text-red-700 font-bold px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;