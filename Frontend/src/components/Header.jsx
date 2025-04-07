import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo-final.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext } from "react";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const dropdownRef = useRef(null);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  const handleLogout = async() => {
    try {
      await axios.get('http://localhost:3000/user/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(null);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { path: "/itinerary", label: "ITINERARY", icon: "fas fa-map-marked-alt" },
    { path: "/smartsuggest", label: "SMART SUGGEST", icon: "fas fa-lightbulb" },
    { path: "/expenselog", label: "EXPENSE LOG", icon: "fas fa-wallet" },
  ];

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      } py-4`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img 
              className="h-12 w-auto" 
              src={logo} 
              alt="TripWise Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? (location.pathname === path
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-100/80")
                    : (location.pathname === path
                      ? "bg-white/10 text-white"
                      : "text-white hover:bg-white/10")
                }`}
              >
                <i className={`${icon} ${location.pathname === path ? (isScrolled ? "text-purple-600" : "text-white") : (isScrolled ? "text-gray-500" : "text-white/90")}`} />
                <span>{label}</span>
              </Link>
            ))}

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:bg-gray-100/80"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-medium ring-2 ring-white/20">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white">
                        {user.fullName?.firstName?.[0]?.toUpperCase() || 'A'}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{user.fullName?.firstName || 'User'}</span>
                  <i className={`fas fa-chevron-down text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl py-2"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.fullName?.firstName} {user.fullName?.lastName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <i className="fas fa-user-circle text-gray-400" />
                          <span>View Profile</span>
                        </Link>
                        <Link 
                          to="/settings" 
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <i className="fas fa-cog text-gray-400" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      <div className="py-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                          <i className="fas fa-sign-out-alt text-red-500" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-user-circle" />
                  <span>Sign In</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-gray-600 hover:bg-gray-100/80"
                : "text-white hover:bg-white/10"
            }`}
            onClick={handleMenuToggle}
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white/95 backdrop-blur-lg z-50 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <Link to="/" onClick={handleMenuToggle}>
                  <img className="h-12" src={logo} alt="TripWise Logo" />
                </Link>
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={handleMenuToggle}
                >
                  <i className="fas fa-times text-xl text-gray-600" />
                </button>
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="p-6 border-b bg-gray-50/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-medium ring-4 ring-purple-100">
                      {user.fullName?.firstName?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {user.fullName?.firstName} {user.fullName?.lastName}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{user.email}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Items */}
              <div className="flex-1 overflow-y-auto py-6">
                {navItems.map(({ path, label, icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={handleMenuToggle}
                    className={`flex items-center space-x-3 px-6 py-4 ${
                      location.pathname === path
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className={`${icon} text-xl ${location.pathname === path ? "text-purple-600" : "text-gray-400"}`} />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}

                {user && (
                  <>
                    <div className="h-px bg-gray-200 my-4" />
                    <Link
                      to="/profile"
                      onClick={handleMenuToggle}
                      className="flex items-center space-x-3 px-6 py-4 text-gray-700 hover:bg-gray-50"
                    >
                      <i className="fas fa-user-circle text-xl text-gray-400" />
                      <span className="font-medium">View Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={handleMenuToggle}
                      className="flex items-center space-x-3 px-6 py-4 text-gray-700 hover:bg-gray-50"
                    >
                      <i className="fas fa-cog text-xl text-gray-400" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Auth Button */}
              <div className="p-6 border-t bg-gray-50/50">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      handleMenuToggle();
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-white border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt" />
                    <span>Sign out</span>
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-purple-600 text-white rounded-xl font-medium shadow-md hover:bg-purple-700 hover:shadow-lg transition-all"
                    onClick={handleMenuToggle}
                  >
                    <i className="fas fa-user-circle" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;