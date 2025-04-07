import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import photo from "../assets/log ref1.jpg"
import logo from "../assets/logo-final.png";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const {user, setUser} = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const newUser = {
      fullName: {
        firstName: fName,
        lastName: lName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`http://localhost:3000/user/register`, newUser);

      if (response.status === 201) {
        setUser(response.data.user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
      }
      
      setemail('');
      setPassword('');
      setfName('');
      setlName('');
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <motion.div 
        className="flex bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section (Image) */}
        <motion.div 
          className="hidden md:block w-1/2 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={photo}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Join TripWise Today!</h2>
              <p className="text-gray-200">Create your account and start planning your perfect journey</p>
            </div>
          </div>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.div 
          className="w-full md:w-1/2 p-8 md:p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/" className="block mb-8">
            <img src={logo} alt="TripWise Logo" className="h-16" />
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">Join us and start your journey!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setfName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setlName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Create a password"
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2" 
              />
              <label className="text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.button 
              type="submit" 
              className="w-full bg-purple-600 text-white p-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;