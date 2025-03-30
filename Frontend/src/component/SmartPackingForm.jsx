import React from "react";

const SmartPackingForm = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="bg-secondary bg-opacity-80 shadow-2xl rounded-2xl p-8 w-full max-w-3xl space-y-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-primary mb-4">
          Smart Packing Assistant
        </h2>

        <form className="space-y-4">
          {/* Destination Type */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Destination Type
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Destination Type</option>
              <option value="city">City</option>
              <option value="beach">Beach</option>
              <option value="mountain">Mountains</option>
              <option value="desert">Desert</option>
            </select>
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Trip Type
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Trip Type</option>
              <option value="business">Business</option>
              <option value="leisure">Leisure</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Duration (in Days)
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Duration</option>
              <option value="1-3">1-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8-14">8-14 Days</option>
              <option value="15+">15+ Days</option>
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

          {/* Activities or Interests */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Activities / Interests
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                "Hiking",
                "Swimming",
                "Nightlife",
                "Photography",
                "Relaxation",
                "Cultural Tours",
              ].map((activity, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="activities"
                    value={activity}
                    className="appearance-none h-5 w-5 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-primary">{activity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-lg font-semibold text-primary mb-1">
              Special Requirements
            </label>
            <textarea
              rows="3"
              placeholder="E.g., Medication, Baby Essentials, etc."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
          >
            Generate Packing List
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

export default SmartPackingForm;
