import React from "react";
import { Link } from "react-router-dom";
import photo from "../assets/log ref1.jpg"
import logo from "../assets/logo-final.png";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-wrap bg-white rounded-3xl shadow-lg max-w-4xl overflow-hidden">
        {/* Left Box - Image */}
        <div className="hidden md:flex w-1/2">
          <img
            src={photo}
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right Box - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center">
          <Link to='/'>
            <img
              src={logo}
              alt="TripWise Logo"
              className="h-20 mb-4"

            />
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600 mb-4">Join us and start your journey!</p>

          <input
            type="text"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
          <input
            type="email"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
          />
          <input
            type="password"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
          <input
            type="password"
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
          />

          <label className="flex items-center text-sm text-gray-700 mb-4">
            <input type="checkbox" className="mr-2" /> I agree to the
            <a href="#" className="text-blue-500 ml-1">Terms & Conditions</a> and
            <a href="#" className="text-blue-500 ml-1">Privacy Policy</a>
          </label>

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Sign Up</button>

          <p className="mt-4 text-gray-600 text-sm">
            Already have an account? <a href="/login" className="text-blue-500">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;