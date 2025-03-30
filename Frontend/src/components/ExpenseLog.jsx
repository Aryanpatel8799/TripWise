import React from "react";
import { Link } from "react-router-dom";
const ExpenseLog = () => {
  return (
    <div className="bg-primary min-h-screen flex items-center justify-center">
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center gap-8 px-6">
        <h1
          id="expense-heading"
          className="text-secondary text-4xl md:text-5xl font-bold max-w-3xl"
        >
          Track Your Expenses, Stay on Budget
        </h1>

        <section className="flex flex-col items-center gap-4">
          <Link to="/expenselog/expensetracker">
          <button 
            id="expense-button"
            aria-label="Add a new expense"
            className="bg-highlight rounded-3xl px-6 py-3 font-semibold text-primary text-lg shadow-md 
            hover:bg-secondary hover:bg-opacity-50 hover:scale-105 transition"
          >
            ADD AN EXPENSE
          </button>
          </Link>
          

          <p id="expense-desc" className="text-gray-700 max-w-2xl mx-auto">
            Keep your travel budget in check with TripWise's expense tracker. Log
            your spending, categorize expenses, and stay financially organized on
            your journey.
          </p>
        </section>
      </main>
    </div>
  );
};

export default ExpenseLog;
