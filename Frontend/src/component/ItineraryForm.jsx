import React from "react";

const ItineraryForm = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="bg-secondary bg-opacity-80 shadow-2xl rounded-2xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div id="itinerary_form" className="space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
         Create Your Itinerary
          </h2>
          <form className="space-y-5">
            {/* Destination */}
            <div>
              <label className="block text-lg font-semibold text-primary mb-1">
                Destination
              </label>
              <input
                type="text"
                placeholder="Enter destination"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Trip Duration */}
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full">
                <label className="block text-sm font-semibold text-primary mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-primary mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Number of Travelers */}
            <div>
              <label className="block text-lg font-semibold text-primary mb-1">
                Number of Travelers
              </label>
              <input
                type="number"
                min="1"
                placeholder="Enter number of travelers"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Companion */}
            <div>
              <label className="block text-lg font-semibold text-primary mb-1">
                Companion
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select your companion</option>
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="friends">Friends</option>
                <option value="family">Family</option>
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-lg font-semibold text-primary mb-1">
                Travel Style
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select a travel style</option>
                <option value="relaxation">Relaxation</option>
                <option value="adventure">Adventure</option>
                <option value="sightseeing">Sightseeing</option>
              </select>
            </div>

            {/* Additional Interests */}
            <div>
              <label className="block text-lg font-semibold text-primary mb-1">
                Additional Interests
              </label>
              <div className="flex flex-wrap gap-3 text-primary">
                {[
                  "Hiking",
                  "Food",
                  "Wellness",
                  "Culture",
                  "Hidden Gems",
                  "Museums",
                  "Architecture",
                ].map((interest, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-full border-2 border-gray-300 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Button Section */}
            <div className="flex justify-between gap-3">
              <button
                type="button"
                className="w-full bg-secondary text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
              >
                Generate Itinerary
              </button>
              <button
                type="button"
                className="w-full bg-red-500 text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-50   transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Static Preview Section */}
        <div
          id="itinerary_preview"
          className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-secondary mb-4">Preview</h3>
          <ul className="text-sm space-y-3">
            <li className="flex justify-between">
              <strong className="text-gray-700">Destination:</strong>{" "}
              <span className="text-gray-600">Paris</span>
            </li>
            <li className="flex justify-between">
              <strong className="text-gray-700">Duration:</strong>{" "}
              <span className="text-gray-600">10th April - 15th April</span>
            </li>
            <li className="flex justify-between">
              <strong className="text-gray-700">Travel Style:</strong>{" "}
              <span className="text-gray-600">Sightseeing</span>
            </li>
            <li className="flex justify-between">
              <strong className="text-gray-700">Travelers:</strong>{" "}
              <span className="text-gray-600">2</span>
            </li>
            <li className="flex justify-between">
              <strong className="text-gray-700">Interests:</strong>{" "}
              <span className="text-gray-600">Museums, Food, Architecture</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItineraryForm;
