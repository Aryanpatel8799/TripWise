import { Link } from "react-router-dom";

const SmartSuggest = () => {
  return (
    <main className="flex flex-col items-center text-center py-12 px-6 gap-8 bg-primary">
      <h1 className="text-secondary text-4xl md:text-5xl font-bold max-w-3xl">
        "It's a Big World Out There, <br /> Go and Explore"
      </h1>

      {/* Destination Suggestion Button */}
      <div>
        <button
          className="bg-highlight rounded-3xl px-6 py-3 font-semibold text-primary text-lg shadow-md hover:bg-secondary hover:bg-opacity-50 hover:scale-105 transition"
        >
          FIND YOUR NEXT DESTINATION
        </button>
      </div>

      <p className="text-gray-700 max-w-2xl mx-auto mt-4">
        Not sure where to go? Let SmartSuggest inspire you with AI-driven recommendations based on your preferences, ensuring a perfect getaway.
      </p>

      {/* Smart Packing Assistant Button */}
      <div>
        <button
          className="bg-highlight rounded-3xl px-6 py-3 font-semibold text-primary text-lg shadow-md hover:bg-secondary hover:bg-opacity-50 hover:scale-105 transition uppercase"
        >
          SMART PACKING ASSISTANT
        </button>
      </div>
    </main>
  );
};

export default SmartSuggest;
