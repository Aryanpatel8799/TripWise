import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-final.png";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  return (
    <nav className="bg-primary p-3 px-6 w-full flex justify-between items-center relative">
      <Link to="/">
        <img className="object-cover max-w-20 max-h-20" src={logo} alt="TripWise Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-12 text-secondary items-center">
        {[
          { path: "/itinerary", label: "ITINERARY" },
          { path: "/smartsuggest", label: "SMART SUGGEST" },
          { path: "/expenselog", label: "EXPENSELOG" },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`font-bold text-lg transition py-2 ${
              location.pathname === path ? "border-b-2 border-secondary" : "hover:border-b-2 hover:border-secondary"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Login Button (Desktop) */}
      <div className="hidden md:flex items-center gap-3 text-white bg-secondary px-4 py-2 rounded-full font-medium text-lg shadow-md transition hover:bg-highlight hover:bg-opacity-75 hover:text-secondary hover:shadow-lg">
      <i class="fa-regular fa-user"></i>
      <Link to="/login" className="">Login</Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button className="p-2 md:hidden" onClick={handleMenuToggle}>
      <i className="fas fa-bars text-gray-600 text-2xl"></i>
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 shadow-lg flex flex-col md:hidden">
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleMenuToggle}>
              <img className="object-cover max-w-16 max-h-16" src={logo} alt="TripWise Logo" />
            </Link>
            <button className="p-2 text-2xl" onClick={handleMenuToggle}>
              <i className="fa-solid fa-xmark text-gray-600"></i>
            </button>
          </div>

          <div className="mt-6 flex flex-col">
            {[
              { path: "/itinerary", label: "Itinerary" },
              { path: "/smartsuggest", label: "Smart Suggest" },
              { path: "/expenselog", label: "ExpenseLog" },
              // { path: "/gotogether", label: "GoTogether" },
              { path: "/login", label: "Login" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={handleMenuToggle}
                className="font-medium m-3 p-3 hover:bg-gray-200 block rounded-lg"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;