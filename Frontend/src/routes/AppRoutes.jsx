import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/MainSection";
import Itinerary from "../components/Itinerary"; 
import SmartSuggest from "../components/SmartSuggest";
import ExpenseLog from "../components/ExpenseLog";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ItineraryForm from "../component/ItineraryForm";
import SmartPackingForm from "../component/SmartPackingForm";
import SmartSuggestForm from "../component/SmartSuggestForm";
import ExpenseTracker from "../component/ExpenseTracker";
import UserProtectedwrapper from "../components/UserProtectedwrapper";
import Profile from "../pages/Profile";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <UserProtectedwrapper>
          <Home />
        </UserProtectedwrapper>
      } />
      <Route path="/itinerary" element={<Itinerary />} /> 
      {/* <Route path="/itinerary/itineraryform" element={<ItineraryForm />} />  */}
      <Route path="/smartsuggest" element={<SmartSuggest />} />
      <Route path="/smartsuggest/smartsuggestform" element={<SmartSuggestForm />} />
      <Route path="/smartsuggest/smartpackingform" element={<SmartPackingForm />} />
      <Route path="/expenselog" element={<ExpenseLog />} />
      <Route path="/expenselog/expensetracker" element={<ExpenseTracker />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={
        <UserProtectedwrapper>
        <userLogout />
        </UserProtectedwrapper>
        } />
      <Route path="/profile" element={
        <UserProtectedwrapper>
          <Profile />
        </UserProtectedwrapper>
      } />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
