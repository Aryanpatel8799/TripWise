const PopularDestinations = () => {
    return (
        <section className="px-6 py-12 bg-primary">
            {/* Popular Destinations Section */}
            <div className="text-center">
                <h1 className="uppercase text-3xl md:text-4xl font-bold text-secondary">Popular Destinations TO VISIT</h1>
                <p className="text-gray-600 mt-4 leading-6 max-w-full">
                    Uncover new horizons with destinations that blend unique experiences, stunning landscapes, and rich cultures.
                    Whether you're seeking adventure, relaxation, or cultural exploration, we offer destinations that cater to every traveler’s preferences.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-24 p-12">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-60 h-60 bg-highlight bg-opacity-50 rounded-2xl"></div>
                ))}
            </div>

            {/* Reviews Section */}
            <div className="text-left md:text-center px-6 py-12">
                <h2 className="uppercase text-2xl md:text-4xl font-bold text-secondary">Don't take our word for it</h2>
                <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    See what our users have to say about revolutionizing their travel experiences with TripWise.
                </p>

                <div className="flex flex-wrap justify-center gap-12 md:gap-20 p-12">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-48 h-48 bg-highlight bg-opacity-50 rounded-2xl"></div>
                    ))}
                </div>
            </div>

            {/* Description Section */}
            <div className="text-left md:text-center px-6 py-12">
                <h2 className="uppercase text-2xl md:text-4xl font-bold text-secondary">"The only tool you'll ever need to travel!"</h2>
                <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    TripWise—your ultimate travel companion.
                </p>
                <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    From creating seamless itineraries to discovering tailored destinations and managing your budget effortlessly,
                    TripWise brings everything you need for hassle-free travel planning under one roof.
                </p>
                <p className="italic text-gray-500 mt-4 max-w-3xl mx-auto">
                    "Let us take the guesswork out of travel and help you explore the world, your way."
                </p>
            </div>
        </section>
    );
};

export default PopularDestinations;
