import { useState } from "react";
import { Link } from "react-router-dom";
import photo from "../assets/log ref1.jpg"
import logo from "../assets/logo-final.png"; // Correct import


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-3xl">
        {/* Left Section (Image) */}
        <div className="hidden md:block w-1/2">
          <img
            src={photo}
            alt=" Visual"
            className="w-full h-full object-cover"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-24 w-24 mb-4" />
          </Link>
          <h2 className="text-2xl font-semibold text-gray-800">Hello, Traveler!</h2>
          <p className="text-gray-600 mb-4">Let's continue your journey with ease.</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-3 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between w-full text-sm text-gray-600 mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <Link to="#" className="text-blue-500">Forgot Password?</Link>
          </div>

          <button className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>

          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
