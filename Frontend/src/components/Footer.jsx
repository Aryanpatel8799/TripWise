import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-12">
                
                {/* Brand Info */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">TripWise</h2>
                    <p className="text-gray-400 mt-2 max-w-sm">
                        Navigate your perfect trip with ease. Plan, explore, and budget your travels efficiently.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                        <li><Link to="/itinerary" className="text-gray-400 hover:text-white transition">Itinerary Planner</Link></li>
                        <li><Link to="/smartsuggest" className="text-gray-400 hover:text-white transition">Smart Suggest</Link></li>
                        <li><Link to="/expenselog" className="text-gray-400 hover:text-white transition">Budget Tracker</Link></li>
                        <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="flex justify-center md:justify-start gap-4 mt-2">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition">
                            <FaFacebook className="text-xl" />
                        </a>
                        {/* <a href="#" aria-label="Twitter" className="hover:text-blue-500 transition">
                            <FaX className="text-xl" />
                        </a> */}
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-red-500 transition">
                            <FaYoutube className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm mt-8">
                &copy; 2025 TripWise. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
