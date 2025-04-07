import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.category || !formData.date) {
      // Add toast notification here
      return;
    }

    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingExpense) {
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? newExpense : exp));
      setEditingExpense(null);
    } else {
      setExpenses([newExpense, ...expenses]);
    }

    setFormData({
      name: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const categories = [
    { value: "food", label: "Food & Dining", icon: "🍽️", color: "from-orange-400 to-red-400" },
    { value: "transport", label: "Transport", icon: "🚗", color: "from-blue-400 to-indigo-400" },
    { value: "shopping", label: "Shopping", icon: "🛍️", color: "from-pink-400 to-purple-400" },
    { value: "entertainment", label: "Entertainment", icon: "🎮", color: "from-green-400 to-teal-400" },
    { value: "bills", label: "Bills & Utilities", icon: "📃", color: "from-yellow-400 to-orange-400" },
    { value: "health", label: "Healthcare", icon: "⚕️", color: "from-red-400 to-pink-400" },
    { value: "travel", label: "Travel", icon: "✈️", color: "from-cyan-400 to-blue-400" },
    { value: "others", label: "Others", icon: "📦", color: "from-gray-400 to-gray-500" }
  ];

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const currentCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-36 sm:pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Expense Tracker
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Keep track of your expenses and manage your budget effectively
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="text-emerald-400">{editingExpense ? '✏️' : '+'}</span>
                  {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Expense Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="What did you spend on?"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="How much did you spend?"
                      min="0"
                      step="0.01"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                          className={`flex items-center gap-2 p-2 sm:p-3 rounded-lg border ${
                            formData.category === cat.value
                              ? `bg-gradient-to-r ${cat.color} border-transparent text-white`
                              : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
                          } transition-all duration-200`}
                        >
                          <span className="text-xl sm:text-2xl">{cat.icon}</span>
                          <span className="text-xs sm:text-sm font-medium">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <button
                      type="submit"
                      className={`flex-1 bg-gradient-to-r ${
                        currentCategory ? currentCategory.color : 'from-emerald-500 to-teal-500'
                      } text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300`}
                    >
                      {editingExpense ? 'Update Expense' : 'Add Expense'}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600 transition-all text-sm sm:text-base"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="relative">
                  <h2 className="text-base sm:text-lg font-medium text-emerald-100 mb-2">Total Expenses</h2>
                  <motion.p 
                    className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2"
                    key={totalAmount}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    ₹{totalAmount.toFixed(2)}
                  </motion.p>
                  <p className="text-sm text-emerald-200">{expenses.length} transactions</p>
                </div>
                <div className="absolute bottom-0 right-0 p-4 sm:p-6 text-4xl sm:text-6xl opacity-20">💰</div>
              </motion.div>

              {/* Category Distribution */}
              <motion.div 
                className="mt-4 sm:mt-6 bg-gray-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-base sm:text-lg font-medium text-white mb-4">Category Breakdown</h3>
                <div className="space-y-3">
                  {categories.map(cat => {
                    const categoryTotal = expenses
                      .filter(exp => exp.category === cat.value)
                      .reduce((acc, curr) => acc + curr.amount, 0);
                    const percentage = totalAmount > 0 ? (categoryTotal / totalAmount) * 100 : 0;
                    
                    if (categoryTotal === 0) return null;

                    return (
                      <div key={cat.value} className="flex items-center gap-3">
                        <span className="text-xl">{cat.icon}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">{cat.label}</span>
                            <span className="text-white">₹{categoryTotal.toFixed(2)}</span>
                          </div>
                          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${cat.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 p-4 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-emerald-400">📊</span> Expense History
            </h3>
            {expenses.length === 0 ? (
              <div className="text-center py-8 sm:py-12 text-gray-400">
                <motion.div 
                  className="text-4xl sm:text-6xl mb-3 sm:mb-4"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  📝
                </motion.div>
                <p className="text-base sm:text-lg">No expenses recorded yet. Start by adding one!</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {expenses.map((expense, index) => {
                  const category = categories.find(cat => cat.value === expense.category);
                  return (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 transition-all group relative overflow-hidden`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${category?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center text-xl sm:text-2xl`}>
                            {category?.icon || '💰'}
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                              {expense.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400">
                              {new Date(expense.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="text-base sm:text-lg font-bold text-white">
                            ₹{expense.amount.toFixed(2)}
                          </span>
                          <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingExpense(expense);
                                setFormData({
                                  name: expense.name,
                                  amount: expense.amount.toString(),
                                  category: expense.category,
                                  date: expense.date
                                });
                              }}
                              className="p-1.5 sm:p-2 text-emerald-400 hover:bg-emerald-400/20 rounded-lg transition-colors"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="p-1.5 sm:p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpenseTracker; 