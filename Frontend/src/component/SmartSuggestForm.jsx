import React from "react";

const SmartSuggestForm = () => {
    // Add this function at the top before return
const handleBudgetChange = (e) => {
    document.getElementById("budgetValue").textContent = `₹${e.target.value}`;
  };
  
  return (
    <div className="min-h-screen bg-primary">
      {/* Add padding-top to prevent header overlap */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="bg-secondary bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Find Your Perfect Getaway
          </h2>

          <form className="space-y-6">
            {/* Form fields with improved spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-lg font-semibold text-primary mb-2">
                    Country, City, or Region
                    <span className="text-gray-900 text-sm ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location (optional)"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/90"
                  />
                </div>

                {/* Trip Type */}
                <div>
                  <label className="block text-lg font-semibold text-primary mb-2">
                    Trip Type
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/90">
                    <option value="">Select Trip Type</option>
                    <option value="solo">Solo</option>
                    <option value="family">Family</option>
                    <option value="adventure">Adventure</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="business">Business</option>
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-lg font-semibold text-primary mb-2">
                    Preferred Season
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/90">
                    <option value="">Select Season</option>
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                    <option value="monsoon">Monsoon</option>
                    <option value="spring">Spring</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Duration */}
                <div>
                  <label className="block text-lg font-semibold text-primary mb-2">
                    Trip Duration
                  </label>
                  <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/90">
                    <option value="">Select duration</option>
                    <option value="3-5">3-5 Days</option>
                    <option value="6-10">6-10 Days</option>
                    <option value="11-15">11-15 Days</option>
                    <option value="15+">More than 15 Days</option>
                  </select>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-lg font-semibold text-primary mb-2">
                    Interests
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Nature",
                      "Adventure",
                      "Relaxation",
                      "Culture",
                      "Shopping",
                      "Food",
                    ].map((interest, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest}
                          className="appearance-none h-5 w-5 rounded-full border-2 border-primary checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm text-primary">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-lg font-semibold text-primary mb-2">
                    Budget Range (in ₹)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      defaultValue="10000"
                      id="budgetRange"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={handleBudgetChange}
                    />
                    <span id="budgetValue" className="text-primary font-bold min-w-[80px]">
                      ₹10,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Suggest Places
              </button>
              <button
                type="reset"
                className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestForm;
