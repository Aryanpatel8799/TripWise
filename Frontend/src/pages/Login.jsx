import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import photo from "../assets/log ref1.jpg"
import logo from "../assets/logo-final.png"; // Correct import
import axios from "axios";
import { UserDataContext } from "../context/userContext";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


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
        <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />

            <label className="flex items-center text-sm text-gray-700 mb-4">
              <input type="checkbox" className="mr-2" /> I agree to the
              <a href="#" className="text-blue-500 ml-1">Terms & Conditions</a> and
              <a href="#" className="text-blue-500 ml-1">Privacy Policy</a>
            </label>

            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>
      </div>
    </div>
  );
};

export default Login;
