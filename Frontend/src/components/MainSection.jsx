import { Link } from "react-router-dom";
import bgImage from "../assets/bg-ref.png";
import mapRef from "../assets/map-ref-1.png";
import itineraryRef from "../assets/itinerary-ref-1.png";
import expenseLogRef from "../assets/expenselog-ref-1.png";
import goTogetherRef from "../assets/gotogether.png";
import PopularDestinations from "./PopularDestination";

const MainSection = () => {
    const features = [
        { title: "Itinerary", img: mapRef, desc: "Craft your perfect itinerary with TripWise. Organize your trip day-by-day with ease tocreate the optimal travel plan tailored just for you." 
        },
        { title: "Smart Suggest", img: itineraryRef, desc: "Embark on a journey of discovery with our intelligent SmartSuggest.Whether you're seeking serene beaches, bustling cityscapes, or hidden gems off the beaten path, weve got you covered." 
        },
        { title: "Expense Log", img: expenseLogRef, desc: "Take control of your travel spending with ease. Our Budget Tracker helps you plan, monitor, and manage your expenses throughout your journey."
        },
    ];

    return (
        <main>
            <div className="relative w-full md:h-[500px]">
                {/* Background Image */}
                <img src={bgImage} alt="Background" className="w-full h-full object-cover" />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-xl md:text-3xl font-bold tracking-widest text-center px-4 bg-black bg-opacity-30">
                    <p>NAVIGATE YOUR IDEAL TRIP WITH TRIPWISE</p>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-row gap-9 items-center py-6">
                    {["Itinerary", "SmartSuggest", "ExpenseLog"].map((text, index) => (
                        <Link key={index} to={`/${text.toLowerCase()}`}>
                            <button className="w-52 px-6 py-3 bg-primary text-secondary font-semibold rounded-3xl shadow-lg hover:bg-secondary hover:opacity-75 hover:text-primary hover:border transition hover:-translate-y-2">
                                {text.toUpperCase()}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Buttons */}
            <div className="flex flex-col md:hidden items-center gap-5 py-5 bg-primary">
                {["Itinerary", "SmartSuggest", "ExpenseLog"].map((text, index) => (
                    <Link key={index} to={`/${text.toLowerCase()}`}>
                        <button className="w-52 px-6 py-3 bg-secondary opacity-75 text-primary font-semibold rounded-3xl shadow-lg hover:bg-highlight hover:opacity-75 hover:text-secondary hover:border transition hover:-translate-y-2">
                            {text.toUpperCase()}
                        </button>
                    </Link>
                ))}
            </div>

            {/* Features Section */}
            <section className="py-16 bg-primary">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary">How TripWise Helps You Travel Smarter</h2>
                    <p className="text-gray-600 mt-2">Making every trip smoother and smarter – plan with ease.</p>
                </div>

                <section className="max-w-6xl mx-auto px-6 md:px-10 space-y-16">
                    {features.map((feature, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 md:gap-10`}>
                            <div className="flex justify-center">
                                <img src={feature.img} className="w-56 h-56" alt={feature.title} />
                            </div>
                            <div className="text-center md:text-left">
                                <span className="uppercase text-2xl px-3 py-1 bg-highlight bg-opacity-30 font-bold">{feature.title}</span>
                                <p className="mt-2 text-lg font-semibold text-gray-800">{feature.title}</p>
                                <p className="mt-1 text-gray-700">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </section>

            {/* Popular Destinations Section */}
            <PopularDestinations />
        </main>
    );
};

export default MainSection;
