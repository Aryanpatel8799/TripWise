import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/bg-ref.png";
import mapRef from "../assets/map-ref-1.png";
import itineraryRef from "../assets/itinerary-ref-1.png";
import expenseLogRef from "../assets/expenselog-ref-1.png";
import goTogetherRef from "../assets/gotogether.png";
import PopularDestinations from "./PopularDestination";

const MainSection = () => {
    const features = [
        { 
            title: "Itinerary", 
            img: mapRef, 
            desc: "Craft your perfect itinerary with TripWise. Organize your trip day-by-day with ease to create the optimal travel plan tailored just for you.",
            icon: "🗺️",
            color: "from-blue-500/80 to-cyan-400/80",
            route: "itinerary"
        },
        { 
            title: "Smart Suggest", 
            img: itineraryRef, 
            desc: "Embark on a journey of discovery with our intelligent SmartSuggest. Whether you're seeking serene beaches, bustling cityscapes, or hidden gems off the beaten path, we've got you covered.",
            icon: "✨",
            color: "from-purple-500/80 to-pink-400/80",
            route: "smartsuggest"
        },
        { 
            title: "Expense Log", 
            img: expenseLogRef, 
            desc: "Take control of your travel spending with ease. Our Budget Tracker helps you plan, monitor, and manage your expenses throughout your journey.",
            icon: "💰",
            color: "from-green-500/80 to-emerald-400/80",
            route: "expenselog"
        },
    ];

    const navCards = [
        {
            title: "Plan Your Trip",
            route: "itinerary",
            icon: (
                <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            description: "Create detailed day-by-day travel plans",
            gradient: "from-cyan-600/90 to-blue-600/90",
            bgGlow: "group-hover:bg-cyan-500/20"
        },
        {
            title: "Get Suggestions",
            route: "smartsuggest",
            icon: (
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            description: "Discover personalized travel recommendations",
            gradient: "from-purple-600/90 to-pink-600/90",
            bgGlow: "group-hover:bg-purple-500/20"
        },
        {
            title: "Track Expenses",
            route: "expenselog",
            icon: (
                <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            description: "Manage and track your travel expenses",
            gradient: "from-emerald-600/90 to-teal-600/90",
            bgGlow: "group-hover:bg-emerald-500/20"
        }
    ];

    return (
        <main className="min-h-screen py-10">
            {/* Hero Section */}
            <div className="relative w-full min-h-screen overflow-hidden">
                <motion.img 
                    src={bgImage} 
                    alt="Background" 
                    className="fixed inset-0 w-full h-full object-cover object-center brightness-[0.3] -z-10"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Hero Content */}
                <motion.div 
                    className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div
                        className="max-w-4xl mx-auto text-center space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.h1 
                            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 mb-6"
                        >
                            NAVIGATE YOUR IDEAL TRIP
                        </motion.h1>
                        <motion.p 
                            className="text-xl sm:text-2xl md:text-3xl text-blue-100/90 max-w-3xl mx-auto font-light"
                        >
                            Plan, explore, and experience your perfect journey with our intelligent travel companion
                        </motion.p>
                    </motion.div>
                    
                    {/* Navigation Cards */}
                    <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {navCards.map((card, index) => (
                            <Link key={index} to={`/${card.route}`} className="w-full">
                                <motion.div 
                                    className={`group relative overflow-hidden rounded-2xl bg-gray-900/30 backdrop-blur-xl border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all duration-300 h-full`}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                >
                                    {/* Gradient Glow Effect */}
                                    <div className={`absolute inset-0 opacity-0 ${card.bgGlow} transition-opacity duration-300 blur-2xl group-hover:opacity-100`} />
                                    
                                    {/* Card Content */}
                                    <div className="relative z-10 h-full flex flex-col">
                                        <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl w-fit`}>
                                            {card.icon}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 sm:mt-6">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-300/90 mt-2 sm:mt-3 text-sm sm:text-base flex-grow">
                                            {card.description}
                                        </p>
                                        <div className="mt-4 sm:mt-6">
                                            <span className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent group-hover:text-white transition-colors`}>
                                                EXPLORE 
                                                <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                </div>
                                </motion.div>
                        </Link>
                    ))}
                </div>
                </motion.div>
            </div>

            {/* Features Section */}
            <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-xl -z-10" />
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
                            How TripWise Helps You <br/>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Travel Smarter</span>
                    </h2>
                        <p className="text-xl sm:text-2xl text-gray-300/90 max-w-3xl mx-auto">
                        Making every trip smoother and smarter – plan with ease.
                    </p>
                    </motion.div>

                    <div className="space-y-32">
                    {features.map((feature, index) => (
                            <motion.div 
                                key={index}
                                className={`flex flex-col ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="flex-1 w-full">
                                    <div className="relative group">
                                        <motion.div
                                            className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${feature.color} opacity-75 group-hover:opacity-100 blur-xl transition duration-500`}
                                        />
                                        <motion.img 
                                            src={feature.img} 
                                            alt={feature.title}
                                            className="relative w-full rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center lg:justify-start gap-4 bg-gray-800/50 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
                                        <span className="text-4xl">{feature.icon}</span>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white">{feature.title}</h3>
                                    </div>
                                    <p className="text-xl text-gray-300/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                        {feature.desc}
                                    </p>
                                    <Link to={`/${feature.route}`}>
                                        <motion.button 
                                            className={`group px-8 py-4 bg-gradient-to-r ${feature.color} backdrop-blur-xl text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold relative overflow-hidden`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <span className="relative z-10 inline-flex items-center">
                                                Learn More
                                                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </motion.button>
                                    </Link>
                            </div>
                            </motion.div>
                        ))}
                            </div>
                        </div>
            </section>

            {/* Popular Destinations Section */}
            <PopularDestinations />
        </main>
    );
};

export default MainSection;
