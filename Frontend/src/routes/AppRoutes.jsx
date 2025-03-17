import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/MainSection";
import Itinerary from "../components/Itinerary"; 
import SmartSuggest from "../components/SmartSuggest";
import ExpenseLog from "../components/ExpenseLog";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/itinerary" element={<Itinerary />} /> 
      <Route path="/smartsuggest" element={<SmartSuggest />} />
      <Route path="/expenselog" element={<ExpenseLog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
