import { formatCurrency } from "../utils/formatCurrency";

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-sm font-bold text-gray-500 uppercase">
          Total Income
        </h2>
        <p className="text-2xl font-bold text-green-600">
          {formatCurrency(totalIncome)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-sm font-bold text-gray-500 uppercase">
          Total Expenses
        </h2>
        <p className="text-2xl font-bold text-red-600">
          {formatCurrency(totalExpenses)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <h2 className="text-sm font-bold text-gray-500 uppercase">
          Net Balance
        </h2>
        <p
          className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}
        >
          {formatCurrency(netBalance)}
        </p>
      </div>
    </div>
  );
}

export default Summary;
