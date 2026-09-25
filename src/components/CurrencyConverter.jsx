import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currencies = ["USD", "BRL", "EUR", "GBP", "JPY", "CAD", "AUD"];
  const numericAmount = Number(amount);

  async function handleConvert() {
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setResult(null);
      setError("Enter an amount greater than zero.");
      return;
    }

    setError("");

    if (fromCurrency === toCurrency) {
      setResult(numericAmount);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `/api/convert?from=${encodeURIComponent(fromCurrency)}&to=${encodeURIComponent(toCurrency)}&amount=${encodeURIComponent(numericAmount)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Currency conversion failed.");
      }

      setResult(data.conversionResult);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setError("Unable to convert currencies. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Currency Converter
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConvert()}
          className="shadow border rounded py-2 px-3 text-gray-700 w-full"
        />
        <select
          value={fromCurrency}
          onChange={(e) => {
            setFromCurrency(e.target.value);
            setResult(null);
          }}
          className="shadow border rounded py-2 px-3 text-gray-700"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <span className="flex items-center font-bold text-gray-500">→</span>
        <select
          value={toCurrency}
          onChange={(e) => {
            setToCurrency(e.target.value);
            setResult(null);
          }}
          className="shadow border rounded py-2 px-3 text-gray-700"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleConvert}
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Converting..." : "Convert"}
      </button>
      {error && (
        <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
      {result !== null && (
        <p
          aria-live="polite"
          className="mt-4 text-lg font-semibold text-gray-800"
        >
          {formatCurrency(numericAmount, fromCurrency)} ={" "}
          {formatCurrency(result, toCurrency)}
        </p>
      )}
    </div>
  );
}

export default CurrencyConverter;
