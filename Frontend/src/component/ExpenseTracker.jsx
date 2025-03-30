import React, { useState, useEffect } from "react";

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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary bg-opacity-80 p-6 rounded-lg shadow-lg "
    >
      <h2 className="text-2xl font-bold text-primary mb-4">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>
      <div className="flex flex-col gap-4">
        {/* Expense Name */}
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
        />

        {/* Expense Amount */}
        <input
          type="number"
          placeholder="Expense amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="food">Food</option>
          <option value="bills">Bills</option>
          <option value="transport">Transport</option>
          <option value="fashion">Fashion</option>
          <option value="recharge">Recharge</option>
          <option value="utilities">Utilities</option>
          <option value="groceries">Groceries</option>
          <option value="subscription">Subscription</option>
        </select>

        {/* Expense Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="w-full bg-gray-900  text-primary font-semibold py-2 rounded-lg hover:bg-opacity-50 transition"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

const ExpenseList = ({ expenses, deleteExpense, setEditingExpense }) => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-secondary mb-3">
        Expense Logs
      </h3>
      <ul className="space-y-4">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div>
              <h4 className="text-lg font-bold text-secondary">
                {expense.name}
              </h4>
              <p className="text-sm text-gray-600">
                ₹{expense.amount} - {expense.category} - {expense.date}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingExpense(expense)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TotalAmount = ({ total }) => {
  return (
    <div className="text-center mt-6 bg-secondary p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-primary">
        Total Expense: ₹{total.toFixed(2)}
      </h2>
    </div>
  );
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Add New Expense
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // Edit Expense
  const editExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate Total Amount
  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-highlight bg-opacity-60 min-h-screen">
      <h1 className="text-3xl font-bold text-secondary text-center mb-6">
        Expense Tracker
      </h1>

      {/* Add/Edit Form */}
      <ExpenseForm
        addExpense={addExpense}
        editExpense={editExpense}
        editingExpense={editingExpense}
      />

      {/* Show Total */}
      <TotalAmount total={totalAmount} />

      {/* Show Expense List */}
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        setEditingExpense={setEditingExpense}
      />
    </div>
  );
};

export default ExpenseTracker;
