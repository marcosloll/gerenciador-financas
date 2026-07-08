import { useState } from "react";
import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const [transactions, setTransactions] = useState([]);

  function handleAddTransaction(transaction) {
    setTransactions([...transactions, transaction]);
  }

  function handleDeleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <Summary transactions={transactions} />
      <CurrencyConverter />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default App;