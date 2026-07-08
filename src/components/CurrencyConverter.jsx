import { useState } from "react";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = ["USD", "BRL", "EUR", "GBP", "JPY", "CAD", "AUD"];

  async function handleConvert() {
    if (!amount) return;
    if (fromCurrency === toCurrency) {
      setResult(parseFloat(amount));
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await response.json();
      setResult(data.conversion_result);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Currency Converter</h2>
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
          {currencies.map((c) => <option key={c}>{c}</option>)}
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
          {currencies.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <button
        onClick={handleConvert}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Converting..." : "Convert"}
      </button>
      {result !== null && (
        <p className="mt-4 text-lg font-semibold text-gray-800">
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
}

export default CurrencyConverter;