import React from "react";

const SmartSuggestForm = () => {
    // Add this function at the top before return
const handleBudgetChange = (e) => {
    document.getElementById("budgetValue").textContent = `₹${e.target.value}`;
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="bg-secondary bg-opacity-80 shadow-2xl rounded-2xl p-8 w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-primary mb-4">
        Find Your Perfect Getaway
        </h2>

        <form className="space-y-4">
          {/* Country, City, or Region */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Country, City, or Region{" "}
              <span className="text-gray-900 text-sm">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Enter location (optional)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Trip Type
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
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
            <label className="block text-lg font-semibold text-primary mb-1">
              Preferred Season
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Season</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="monsoon">Monsoon</option>
              <option value="spring">Spring</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Preferred Trip Length
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select duration</option>
              <option value="3-5">3-5 Days</option>
              <option value="6-10">6-10 Days</option>
              <option value="11-15">11-15 Days</option>
              <option value="15+">More than 15 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Purpose of Travel
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select purpose</option>
              <option value="leisure">Leisure / Vacation</option>
              <option value="business">Business</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="family">Family Trip</option>
              <option value="solo">Solo Adventure</option>
            </select>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Interests
            </label>
            <div className="flex flex-wrap gap-3">
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
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    className="appearance-none h-5 w-5 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-primary">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          {/* <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Budget (in ₹)
            </label>
            <input
              type="number"
              placeholder="Enter your budget"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div> */}
          {/* Budget */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
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
                onChange={(e) => {
                  document.getElementById(
                    "budgetValue"
                  ).textContent = `₹${e.target.value}`;
                }}
              />
              <span id="budgetValue" className="text-primary font-bold">
                ₹10,000
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
          >
            Suggest a Place
          </button>
          {/* Reset Button */}
          <button
            type="reset"
            className="w-full bg-red-500 text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmartSuggestForm;
