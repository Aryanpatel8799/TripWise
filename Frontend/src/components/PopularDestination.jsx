import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PopularDestinations = () => {
    const destinations = [
        {
            name: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
            description: "Tropical paradise with stunning beaches and rich culture",
            rating: 4.8,
            priceRange: "",
            tags: ["Beach", "Culture", "Nature"]
        },
        {
            name: "Santorini, Greece",
            image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
            description: "Iconic white buildings and breathtaking sunsets",
            rating: 4.9,
            priceRange: "",
            tags: ["Romantic", "Views", "History"]
        },
        {
            name: "Kyoto, Japan",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
            description: "Ancient temples and traditional Japanese culture",
            rating: 4.7,
            priceRange: "",
            tags: ["Culture", "History", "Food"]
        },
        {
            name: "Machu Picchu, Peru",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
            description: "Ancient Incan citadel in the Andes mountains",
            rating: 4.9,
            priceRange: "",
            tags: ["Adventure", "History", "Nature"]
        }
    ];

    const reviews = [
        {
            text: "TripWise made planning my dream vacation so effortless! The smart suggestions were spot-on.",
            author: "Sarah M.",
            location: "New York, USA",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        {
            text: "The expense tracking feature helped me stay within budget throughout my entire Euro trip!",
            author: "James L.",
            location: "London, UK",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        },
        {
            text: "Best travel planning app I've ever used. The itinerary suggestions are amazing!",
            author: "Maria G.",
            location: "Barcelona, Spain",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
        }
    ];

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
            {/* Popular Destinations Section */}
            <motion.div 
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        POPULAR DESTINATIONS TO VISIT
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Uncover new horizons with destinations that blend unique experiences, stunning landscapes, and rich cultures.
                        Whether you're seeking adventure, relaxation, or cultural exploration, we offer destinations that cater to every traveler's preferences.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((destination, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={destination.image} 
                                    alt={destination.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-white text-sm">{destination.rating}</span>
                                        <span className="text-white/80 text-sm ml-2">{destination.priceRange}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {destination.tags.map((tag, tagIndex) => (
                                        <span 
                                            key={tagIndex}
                                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto mt-32">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        DON'T TAKE OUR WORD FOR IT
                    </h2>
                    <p className="text-xl text-gray-600">
                        See what our users have to say about revolutionizing their travel experiences with TripWise.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img 
                                    src={review.avatar} 
                                    alt={review.author} 
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{review.author}</h3>
                                    <p className="text-sm text-gray-500">{review.location}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {"★".repeat(review.rating).split("").map((star, i) => (
                                    <span key={i} className="text-yellow-400">{star}</span>
                                ))}
                            </div>
                            <p className="text-gray-600">{review.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Final CTA Section */}
            <motion.div 
                className="text-center mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    "The only tool you'll ever need to travel!"
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                    TripWise—your ultimate travel companion.
                </p>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    From creating seamless itineraries to discovering tailored destinations and managing your budget effortlessly,
                    TripWise brings everything you need for hassle-free travel planning under one roof.
                </p>
                <p className="italic text-xl text-gray-500">
                    "Let us take the guesswork out of travel and help you explore the world, your way."
                </p>
                <Link to="/smartsuggest">
                    <motion.button
                        className="mt-8 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Planning Your Journey
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
};

export default PopularDestinations;
