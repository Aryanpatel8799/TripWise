import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ExpenseForm = ({ addExpense, editExpense, editingExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      name,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingExpense) {
      editExpense(newExpense);
    } else {
      addExpense(newExpense);
    }

    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const categories = [
    { value: "food", label: "Food & Dining", icon: "🍽️" },
    { value: "bills", label: "Bills & Utilities", icon: "📃" },
    { value: "transport", label: "Transport", icon: "🚗" },
    { value: "fashion", label: "Fashion", icon: "👕" },
    { value: "recharge", label: "Mobile & Internet", icon: "📱" },
    { value: "utilities", label: "Home & Utilities", icon: "🏠" },
    { value: "groceries", label: "Groceries", icon: "🛒" },
    { value: "subscription", label: "Subscriptions", icon: "📺" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Expense Name */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-sm font-medium text-gray-700">Expense Name</label>
            <input
              type="text"
              placeholder="What did you spend on?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Expense Amount */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount (₹)</label>
            <input
              type="number"
              placeholder="How much did you spend?"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Expense Date */}
          <div className="space-y-1 sm:space-y-2">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-purple-700 transition-colors text-sm sm:text-base"
          >
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Reset
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const ExpenseList = ({ expenses, deleteExpense, setEditingExpense }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      food: "🍽️",
      bills: "📃",
      transport: "🚗",
      fashion: "👕",
      recharge: "📱",
      utilities: "🏠",
      groceries: "🛒",
      subscription: "📺"
    };
    return icons[category] || "💰";
  };

  return (
    <div className="mt-6 sm:mt-8">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 sm:px-0">
        Expense History
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {expenses.map((expense, index) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-100 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                      {expense.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-2 sm:mt-0">
                  <span className="text-base sm:text-lg font-bold text-gray-800">
                    ₹{expense.amount.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingExpense(expense)}
                      className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {expenses.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
            No expenses recorded yet. Start by adding one!
          </div>
        )}
      </div>
    </div>
  );
};

const TotalAmount = ({ total }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-lg p-4 sm:p-6 text-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-medium text-purple-100">Total Expenses</h2>
          <p className="text-2xl sm:text-3xl font-bold mt-1">₹{total.toFixed(2)}</p>
        </div>
        <div className="text-3xl sm:text-4xl">💰</div>
      </div>
    </motion.div>
  );
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const editExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Expense Tracker
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Keep track of your expenses and manage your budget effectively
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2">
              <ExpenseForm
                addExpense={addExpense}
                editExpense={editExpense}
                editingExpense={editingExpense}
              />
            </div>
            <div className="lg:col-span-1">
              <TotalAmount total={totalAmount} />
            </div>
          </div>

          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            setEditingExpense={setEditingExpense}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
