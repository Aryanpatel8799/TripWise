import Footer from "./Footer";

const Itinerary = () => {
  return (
    <div className="font-poppins bg-primary">
     

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center py-12 px-6 gap-8">
        <h1 id="itinerary-heading" className="text-secondary text-4xl md:text-5xl font-bold max-w-3xl">
          "A World of Possibilities, Planned Your Way"
        </h1>

        <button
          id="itinerary-button"
          className="bg-highlight rounded-3xl px-6 py-3 font-semibold text-primary text-lg shadow-md hover:bg-secondary hover:bg-opacity-50 hover:scale-105 transition"
        >
          CREATE A NEW TRIP
        </button>

        <p id="itinerary-desc" className="text-gray-700 max-w-2xl mx-auto mt-4">
          Let TripWise's AI-powered planner help you build the perfect itinerary for your next adventure, whether it's a vacation, workation, or spontaneous getaway.
        </p>
      </main>

      {/* Saved Itineraries Section */}
      <section className="px-6 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-secondary text-left mb-6">Saved Itineraries</h2>

        <div id="popular-destination" className="flex flex-wrap m-8 gap-8 md:gap-24">
          <div className="w-64 h-96 bg-highlight bg-opacity-50 rounded-2xl"></div>
          <div className="w-64 h-96 bg-highlight bg-opacity-50 rounded-2xl"></div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Itinerary;